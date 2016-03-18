# pracNodeMongo
API REST con nodejs & MondoDB

## Setup de entorno de desarrollo

Debes tener instalado [nodejs](http://nodejs.org/en/)
A continuación clona el repositorio e instala las dependencias con `npm install` desde la carpeta del proyecto.

```
$ sudo npm install 
```


Para poder probar la api debemos lanzar un servidor de mongoDB con:

```
$ mongod
```

Toda la información relativa a la documentación de la API REST la puedes encontrar en:
```
$ http://localhost:3000/doc

```

A continuación hay que arrancar una script que inicializa una base de datos de anuncios de prueba con

```
$ npm run install dev
```

## Changelog

### v.1.0.0 - 2016-03-17

* Funcionamiento básico de la app
* Users
* Anuncios
* ApiDoc



