define({ "api": [
  {
    "type": "get",
    "url": "/anuncios",
    "title": "GetAnuncios",
    "name": "GetAnuncios",
    "group": "Anuncios",
    "description": "<p>Descripción del método. \t   Este método get de Anuncios devuelve el listado completo de los anuncios registrados en la BBDD.</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "curl -i http://localhost:3000/anuncios",
        "type": "curl"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del Anuncio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "venta",
            "description": "<p>Booleano para saber si esta en venta o en búsqueda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "precio",
            "description": "<p>Precio de Venta o Precio dispuesto a pagar en búsqueda.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "foto",
            "description": "<p>Foto del artículo.</p>"
          },
          {
            "group": "Success 200",
            "type": "[String]",
            "optional": false,
            "field": "tag",
            "description": "<p>Tags de las categorías del artículo.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Anuncios",
            "description": "<p>no encontrado.</p>"
          }
        ]
      }
    },
    "filename": "routes/anuncios.js",
    "groupTitle": "Anuncios"
  },
  {
    "type": "get",
    "url": "/anuncios/json",
    "title": "GetAnunciosJson.",
    "name": "GetAnunciosJson",
    "group": "Anuncios",
    "description": "<p>Descripción del método. \t   Este método get de Anuncios devuelve el listado completo de los anuncios registrados en la BBDD en formato json.</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "curl -i http://localhost:3000/anuncios/json",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "tag",
            "description": "<p>Tag por el que filtrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "venta",
            "description": "<p>Booleano si es venta o búsqueda.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nombre",
            "description": "<p>Nombre por el que filtrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "precio",
            "description": "<p>Precio igual a número exacto. Precio igual a número mas -. Precio igual a - mas número. Precio entre dos valores separado por -.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "start",
            "description": "<p>Artículo por el que empezar a mostrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Número de artículos a mostrar.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo-petición:",
          "content": "http://localhost:3000/anuncios?tag​=mobile&venta​=false&nombre​=ip&precio​=50­&start​=0&limit​=2&sort​=precio\nhttp://localhost:3000/anuncios?venta​=false&precio​=100&sort​=nombre\nhttp://localhost:3000/anuncios?precio​=50­200&start​=1&limit​=2",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del Anuncio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "venta",
            "description": "<p>Booleano para saber si esta en venta o en búsqueda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "precio",
            "description": "<p>Precio de Venta o Precio dispuesto a pagar en búsqueda.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "foto",
            "description": "<p>Foto del artículo.</p>"
          },
          {
            "group": "Success 200",
            "type": "[String]",
            "optional": false,
            "field": "tag",
            "description": "<p>Tags de las categorías del artículo.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "json",
            "description": "<p>con el error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Errpr:",
          "content": "    {\n      \"result\": \"false\",\n\t\t \"error\": err\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/anuncios.js",
    "groupTitle": "Anuncios"
  },
  {
    "type": "post",
    "url": "/anuncios",
    "title": "PostAnuncios.",
    "name": "PostAnuncios",
    "group": "Anuncios",
    "description": "<p>Descripción del método. \t   Este método post de Anuncios devuelve la información del anuncio registrado en la BBDD en formato json.</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "curl -i http://localhost:3000/anuncios",
        "type": "curl"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del Anuncio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "venta",
            "description": "<p>Booleano para saber si esta en venta o en búsqueda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "precio",
            "description": "<p>Precio de Venta o Precio dispuesto a pagar en búsqueda.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "foto",
            "description": "<p>Foto del artículo.</p>"
          },
          {
            "group": "Success 200",
            "type": "[String]",
            "optional": false,
            "field": "tag",
            "description": "<p>Tags de las categorías del artículo.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "json",
            "description": "<p>con el error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Errpr:",
          "content": "    {\n      \"result\": \"false\",\n\t\t \"error\": err\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/anuncios.js",
    "groupTitle": "Anuncios"
  },
  {
    "type": "get",
    "url": "/users/json",
    "title": "GetUsersJson.",
    "name": "GetUsers",
    "group": "Users",
    "description": "<p>Descripción del método. \t   Este método get de Users devuelve el listado completo de los usuarios registrados en la API BBDD en formato json.</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "curl -i http://localhost:3000/users/json",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Id",
            "description": "<p>Único del Usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del Usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del Usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "clave",
            "description": "<p>Clave del Usuario.</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "json",
            "description": "<p>que muestra el resultado a false y el error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Errpr:",
          "content": "    {\n      \"result\": \"false\",\n\t\t \"error\": err\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "GetUsers.",
    "name": "GetUsers",
    "group": "Users",
    "description": "<p>Descripción del método. \t   Este método get de Users devuelve el listado completo de los usuarios registrados en la BBDD</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "curl -i http://localhost:3000/users",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Id",
            "description": "<p>Único del Usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del Usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del Usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "clave",
            "description": "<p>Clave del Usuario.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Users",
            "description": "<p>no encontrado.</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "PostUsers.",
    "name": "PostUsers",
    "group": "Users",
    "description": "<p>Descripción del método. \t   Este método post de Users devuelve la información del usuario registrado en la BBDD.</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "curl -i http://localhost:3000/users",
        "type": "curl"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del Usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del Usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "clave",
            "description": "<p>Clave del Usuario.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "json",
            "description": "<p>que muestra el resultado a false y el error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Errpr:",
          "content": "    {\n      \"result\": \"false\",\n\t\t \"error\": err\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  }
] });
