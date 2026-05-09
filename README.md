# **Deploy de Cafetux en AWS**

![Captura del sitio web](/documentacion/capturas/ReadmePage.png)

## Descripcion
Cafetux es un sitio web estatico desplegado en AWS que representa un emprendimiento que busca entregar el mejor cafe Italiano a sus clientes
inspirado en el estilo del legendario streamer Argentino-italiano Momo.

---

## integrantes.
- Leonardo Jofre
- Emilia Osores

## IP publica del deploy.
- URL http://3.235.164.201

## Requisitos previos.
- AWS CLI
- less (requerido por AWS cli como pager)
- Credenciales configuradas con:
  ```bash
  aws configure
  ```
  con region en `us-east-1` y output en `json`

---

## Instrucciones de ejecucion.
```bash
git clone https://github.com/schismatiic/cafetux.git
cd cafetux/infraestructura
chmod +x deploy.sh
./deploy.sh
```

- Al ejecutar el script este creara recursos de en AWS en (EC2, EBS y VPC)

---

## Documentacion.
- Arquitectura `/documentacion/arquitectura.pdf`
- Proceso `/documentacion/capturas/`
