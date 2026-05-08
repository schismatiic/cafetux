#!/bin/bash

echo "Deploying cafetux..."

## checkeamos que aws-cli este instalado

if
  command -v aws >/dev/null 2>&1
then
  echo "aws-cli instalado"
else
  ## salimos del script con un error
  echo "aws-cli no esta instalado"
  exit 1
fi

## Vamos a asumir que aws configure ya fue ejecutado
## Si no esta en json no funcionara

## El comando retornara un json asi que lo usaremos de variable
VPC_ID=$(aws ec2 create-vpc \
  --cidr-block 10.0.0.0/16 \
  --region us-east-1 \
  --query 'Vpc.VpcId' \
  --output text)

echo "VPC id: $VPC_ID"

## Subnets

PUBLIC_SUBNET_ID=$(
  aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.1.0/24 \
    --availability-zone us-east-1a \
    --region us-east-1 \
    --query 'Subnet.SubnetId' \
    --output text
)

PRIVATE_SUBNET_ID=$(
  aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.2.0/24 \
    --availability-zone us-east-1b \
    --region us-east-1 \
    --query 'Subnet.SubnetId' \
    --output text
)

echo "Subnet Ids"
echo "Public: $PUBLIC_SUBNET_ID"
echo "Private: $PRIVATE_SUBNET_ID"

## Gateways

IGW_ID=$(
  aws ec2 create-internet-gateway \
    --region us-east-1 \
    --query 'InternetGateway.InternetGatewayId' \
    --output text
)

echo "IGW id: $IGW_ID"

## asociamos el gateway a la vpc dandole acceso a internet
## no hace falta guardarlo en una variable

aws ec2 attach-internet-gateway \
  --internet-gateway-id $IGW_ID \
  --vpc-id $VPC_ID \
  --region us-east-1

## Route tables

PUBLIC_RT_ID=$(
  aws ec2 create-route-table \
    --vpc-id $VPC_ID \
    --region us-east-1 \
    --query 'RouteTable.RouteTableId' \
    --output text
)

aws ec2 create-route \
  --route-table-id $PUBLIC_RT_ID \
  --destination-cidr-block 0.0.0.0/0 \
  --gateway-id $IGW_ID \
  --region us-east-1

aws ec2 associate-route-table \
  --subnet-id $PUBLIC_SUBNET_ID \
  --route-table-id $PUBLIC_RT_ID \
  --region us-east-1

## Security Groups

SG_ID=$(
  aws ec2 create-security-group \
    --group-name Cafetux-SG \
    --description "Security group para Cafetux" \
    --vpc-id $VPC_ID \
    --region us-east-1 \
    --query "GroupId" \
    --output text
)
echo "Security group ID: $SG_ID"

MY_IP=$(curl -s ifconfig.me)

## ssh desde la ip publica del computador que corre el script

aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 22 \
  --cidr ${MY_IP}/32 \
  --region us-east-1

## HTTP desde cualquier ip

aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0 \
  --region us-east-1

## EC2
## Si ya tienes la key va a tirar un error pero funcionara
## rm -f ~/.ssh/CafetuxKey.pem

aws ec2 create-key-pair \
  --key-name CafetuxKey \
  --query 'KeyMaterial' \
  --output text \
  --region us-east-1 >~/.ssh/CafetuxKey.pem

## permisos del .pem
## necesitamos sudo porque no me dio permisos

sudo chmod 400 ~/.ssh/CafetuxKey.pem

## Desplegar el EC2

echo "Desplegando EC2..."

EC2_ID=$(aws ec2 run-instances \
  --image-id ami-0fc5d935ebf8bc3bc \
  --count 1 \
  --instance-type t3.micro \
  --key-name CafetuxKey \
  --security-group-ids $SG_ID \
  --subnet-id $PUBLIC_SUBNET_ID \
  --associate-public-ip-address \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=CafetuxServer}]' \
  --region us-east-1 \
  --query "Instances[0].InstanceId" \
  --output text)

## Esperamos a que la EC2 este lista
aws ec2 wait instance-running --instance-ids $EC2_ID

PUBLIC_IP=$(
  aws ec2 describe-instances \
    --instance-ids $EC2_ID \
    --query "Reservations[*].Instances[*].PublicIpAddress" \
    --output text \
    --region us-east-1
)

## Volumen EBS

VOLUME_ID=$(
  aws ec2 create-volume \
    --availability-zone us-east-1a \
    --size 2 \
    --volume-type gp3 \
    --tag-specifications 'ResourceType=volume,Tags=[{Key=Name,Value=CafetuxEBS}]' \
    --region us-east-1 --query 'VolumeId' \
    --output text
)
## Esperamos a que el volumen este listo
aws ec2 wait volume-available --volume-ids $VOLUME_ID

aws ec2 attach-volume \
  --volume-id $VOLUME_ID \
  --instance-id $EC2_ID \
  --device /dev/sdf \
  --region us-east-1

## Conectar por ssh

## PASO 1 copiar el sitio web a la instancia
## Se tiene que correr el script desde infraestructura

scp -o StrictHostKeyChecking=no \
  -i ~/.ssh/CafetuxKey.pem \
  ../sitio-web/* ubuntu@$PUBLIC_IP:/home/ubuntu

## muevo ~/* porque en ese entonces no habran mas archivos
ssh -i ~/.ssh/CafetuxKey.pem ubuntu@$PUBLIC_IP <<'EOF'
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install apache2 -y
sudo mkfs.ext4 /dev/nvme1n1
sudo mkdir /mnt/cafetux-storage
sudo mount /dev/nvme1n1 /mnt/cafetux-storage
df -h
sudo mv /home/ubuntu/* /var/www/html/ 
EOF

echo "Listo"
echo "Conectese a: http://$PUBLIC_IP"
