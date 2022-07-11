# SimpleStore
Tienda online simple en la que puede ver y buscar productos, el Frontend consume API que a su vez realiza solicitudes a la base de datos proporcionada.

[Repositorio Frontend](https://github.com/techeca/SimpleStore-Frontend)

## Instalación API
Primero debemos clonar el repositorio:
```
git clone https://github.com/techeca/SimpleStore-API.git
````

Luego debe ingresar al repositorio descargado e instalar dependencias:
```
cd SimpleStore-API
npm i
```

Debe crear un archivo `.env` y copiar el siguiente contenido, rellene con las credenciales de la base de datos:
```javascript
DB_USER=
DB_PASSWORD=
DATABASE_NAME=
HOST=
```

Para realizar pruebas locales:
```
npm run dev
```
http://localhost:3000

Respuesta
```
Server listening on port 3000
Conexión a DB establecida.
```

## Detalles de API
API realizada con ExpressJS, debe tener creado el archivo para variables de entorno `.env` en la raíz del proyecto.

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

En `/src/routes/index.js` tenemos las solicitudes de categorías y productos

### Endpoints
Los puntos accesibles son `/categorias`, `/productos/` y `/productosByCategoria/`.

#### GET - Lista de categorías

##### Ejemplo
> `/categorias`

##### Respuesta
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

#### GET - Buscar productos por nombre

##### Parámetros
- `nombre`: Texto a buscar.

##### Ejemplo
> `/productos/flor`

##### Respuesta
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

#### GET - Lista de productos por categoría y página

##### Parámetros
- `id`: ID de Categoría.
- `page`: Página de productos.

##### Ejemplo
> `/productosByCategoria/?id=7&page=1`

##### Respuesta
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

# Demo
Fue utilizado [Render](https://render.com) para alojar Frontend y API.

[API](https://simplestore-api2.onrender.com)
