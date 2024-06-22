# Demos Nodejs

En este proyecto recopilo distintas demos sobre conceptos relacionados con nodejs y servicios de backend en general. Los proyectos solo experimentan con conceptos específicos y no tienen en cuenta escalabilidad, seguridad y otros temas importantes.

## Ejecutar proyectos

Para ejecutar los proyectos se debe ejecutar el script start en el workspace específico:

```bash
npm run start --workspace=hello-world
```

## Instalar dependencias

Para instalar dependencias en un proyecto específico:

```bash
npm install [dependency] -w=hello-world 
```

## Demos

| Proyecto | Descripción |
|----------|-------------|
| hello-world | Servidor básico con express, retorna un mensaje hello world al llamar a la ruta / |
| basic-routes | Se exploran las distintas formas de crear rutas y recibir parámetros desde la url |
| static-files | Se usa el middleware express.static para servir archivos estáticos |
| basic-middleware | Se crea un middleware básico |
| error-handling | Se crea un middleware para manejar excepciones, se retorna un json y se loggea el error con su stack. Además se usa un identificador unico para hacer seguimiento del error sin exponer información sensible |
| contact-form | Se explora como se recibe información desde un formulario. Se utiliza el middleware express.urlencoded |
| basic-auth | Se realiza una autenticación sencilla con cookies y se generá una ruta protegida a la que solo se puede acceder si se está autenticado |
| jwt-auth | Se realiza una autenticación basada en tokens JWT, se utiliza la librería jsonwebtoken para crear y verificar los mismos. |