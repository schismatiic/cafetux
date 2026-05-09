# **Deploy de Cafetux en AWS**

![Captura del sitio web](/documentacion/capturas/ReadmePage.png)

---

### integrantes.
- Leonardo Jofre.
- Emilia Osores.

### IP publica del deploy.
[Link del deploy](http://3.235.164.201)

### Requisitos previos.
- AWS cli.
- less (requerido por AWS cli).
- Haber configurado AWS por medio de `aws configure` con region `us-east-1` y output `json`

---

### Instrucciones de ejecucion.
```
git clone https://github.com/schismatiic/cafetux.git
cd cafetux/infraestructura
./deploy.sh
```

---

### Documentacion.
- Arquitectura `/documentacion/arquitectura.pdf`
- Capturas `/documentacion/capturas/`
