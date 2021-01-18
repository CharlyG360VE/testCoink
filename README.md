# TestCoink

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Estructura del proyecto

  Proyecto cargado con Lazy Load, despues de compilar redirige directamente a la ruta principal `http://localhost:4200/iniciarSesion`
   1) src/app/_interceptor: Contiene los interceptors el cual mantengo un filtro de todas las peticiones http y me permite injectar de manera global el token en todas las peticiones en el caso de que exista y el otro controlo un spinner de carga de manera global.
   2) src/app/_pages: Contiene los componentes del proyecto cargados mediante lazy load desde el routing papa o principal.
   3) src/app/services: Contiene los servicios utilizados para las peticiones http, ordenados por carpeta de cada componente utilizados en el proyecto.

## Importante

  1) Antes de iniciar el servidor de Angular, instalar las dependencias npm con el siguiente comando "npm i".

  2) Al momento los servicios estan funcionando, el servidor me responde un objeto sin items "null" y la propiedad count: 1, el unico servicio funcionando a un 100% seria el de inicio de sesion.
