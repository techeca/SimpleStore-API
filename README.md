# SimpleStore
Tienda online simple en la que puede ver y buscar productos, el Frontend consume API que a su vez realiza solicitudes a la base de datos proporcionada.

## Instalación API
Desde la carpeta de su preferenia ejecute el siguiente comando:
```
git clone -b API https://github.com/techeca/storeJS.git API
````

Ingrese al repositorio descargado:
```
cd API
```

Instale depencias:
```
npm i
```

Para realizar pruebas:
```
npm run dev
```
o
```
npm run prod
```
http://localhost:3000

### Detalles de API
API realizada con ExpressJS, debe tener creado el archivo para variables de entorno `.env` en la raíz del proyecto.

En `.env` copie el siguiente contenido y complete con los datos de la base de datos:
```javascript
DB_USER=
DB_PASSWORD=
DATABASE_NAME=
HOST=
```
En `/config/db.js` puede encontrar la configuración de mysql2 con `waitForConnections` para no perder la conexión.

```javascript
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.HOST,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  ...

  module.exports = { pool: mysql.createPool(config) };
};
```

Como configuración básica, se habilita cors y define rutas para endpoints en `/src/index.js`.
```javascript
app.use(cors());
app.use(require('./routes/index')); //Rutas de request
```

En `/src/routes/index.js` tenemos las solicitudes de categorias y productos

#### Endpoints
Los puntos accesibles son `/categorias`, `/productos/:name?` y `/productosByCategoria?`, por ejemplo:

> GET lista de categorias

#### Parámetros:
`/categorias`

#### Respuesta:
```json
{
  "categorias": [
    {
      "id": 1,
      "name": "bebida energetica"
    },
    ...
  ]
}
```

> GET productos por nombre

#### Parámetros:
`nombre`: Texto a buscar.

#### Ejemplo:
`/productos/flor`

#### Respuesta:
```json
{
  "productos": [
    {
      "id": 28,
      "name": "RON FLOR DE CAÑA 4 AÑOS",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/flor49664.jpg",
      "price": 3990,
      "discount": 0,
      "category": 3
    },
    {
      "id": 29,
      "name": "RON FLOR DE CAÑA 5 AÑOS",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/flor59677.jpg",
      "price": 4590,
      "discount": 0,
      "category": 3
    }
  ]
}
```

> GET lista de productos por categoría

#### Parámetros:
`id`: ID de Categoría.\
`page`: Página de productos.

#### Ejemplo:
`/productosByCategoria/?id=7&page=1`

#### Respuesta:
```json
{
  "productos": [
    {
      "id": 104,
      "name": "ABSOLUT",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/absolut21381.png",
      "price": 8990,
      "discount": 30,
      "category": 7
    }
  ],
  "total": [
    {
      "totalProductos": 1
    }
  ]
}
```

# Demos
Fue utilizado [Render](https://render.com) para alojar Frontend y API.

[API](https://api-g2zy.onrender.com)

# Img
