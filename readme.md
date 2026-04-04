# 🛒 E-Commerce Backend — Leandro Soloducha

Proyecto final del curso **Backend I** de CoderHouse. API REST para gestión de productos y carritos de compra, con vistas renderizadas en Handlebars, persistencia en MongoDB y actualizaciones en tiempo real con Socket.io.

---

## 🚀 Tecnologías utilizadas

| Librería             | Versión | Uso                            |
| -------------------- | ------- | ------------------------------ |
| Express              | ^5.2.1  | Servidor HTTP y routing        |
| Express-Handlebars   | ^8.0.6  | Motor de plantillas            |
| Mongoose             | ^9.3.1  | ODM para MongoDB               |
| Mongoose-Paginate-v2 | ^1.9.4  | Paginación de productos        |
| Socket.io            | ^4.8.3  | Actualizaciones en tiempo real |
| dotenv               | ^17.4.0 | Variables de entorno           |

---

## ⚙️ Instalación

**1. Clonar el repositorio**

```bash
git clone <url-del-repo>
cd entrega-soloducha
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto:

```env
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/<db>
```

**4. Iniciar el servidor**

```bash
# Modo normal
npm start

# Modo watch (reinicio automático al guardar cambios)
npm run watch
```

El servidor corre en **http://localhost:8080**

---

## 📁 Estructura del proyecto

```
src/
├── config/
│   └── db-connection.js       # Conexión a MongoDB
├── controllers/
│   ├── product-controller.js
│   └── cart-controller.js
├── models/
│   ├── product-model.js
│   └── cart-model.js
├── repositories/
│   ├── product-repository.js
│   └── cart-repository.js
├── services/
│   ├── product-service.js
│   └── cart-service.js
├── routes/
│   ├── index-router.js
│   ├── product-router.js
│   ├── cart-router.js
│   └── views-router.js
├── views/
│   ├── layouts/main.handlebars
│   ├── partials/navbar.handlebars
│   ├── home.handlebars
│   ├── products.handlebars
│   ├── product-detail.handlebars
│   └── cart.handlebars
├── public/
│   └── index.js               # Lógica cliente (Socket.io)
└── server.js
```

---

## 🔌 Endpoints de la API

### Productos — `/api/products`

| Método | Ruta    | Descripción                                             |
| ------ | ------- | ------------------------------------------------------- |
| GET    | `/`     | Listar productos con filtros, paginación y ordenamiento |
| GET    | `/:pid` | Obtener un producto por ID                              |
| POST   | `/`     | Crear un nuevo producto                                 |
| PUT    | `/:pid` | Actualizar un producto por ID                           |
| DELETE | `/:pid` | Eliminar un producto por ID                             |

**Query params disponibles en `GET /`:**

| Param   | Tipo           | Default | Descripción                            |
| ------- | -------------- | ------- | -------------------------------------- |
| `limit` | Number         | 10      | Cantidad de productos por página       |
| `page`  | Number         | 1       | Página a consultar                     |
| `sort`  | `asc` / `desc` | —       | Ordenar por precio                     |
| `query` | String         | —       | Filtrar por categoría o disponibilidad |

**Ejemplo:**

```
GET /api/products?limit=8&page=2&sort=asc&query=Aperitivos
```

**Formato de respuesta:**

```json
{
  "status": "success",
  "payload": [...],
  "totalPages": 5,
  "page": 2,
  "hasPrevPage": true,
  "hasNextPage": true,
  "prevPage": 1,
  "nextPage": 3,
  "prevLink": "/api/products?limit=4&sort=desc&page=1",
  "nextLink": "/api/products?limit=4&sort=desc&page=3"
}
```

---

### Carritos — `/api/carts`

| Método | Ruta                  | Descripción                                |
| ------ | --------------------- | ------------------------------------------ |
| POST   | `/`                   | Crear un nuevo carrito                     |
| GET    | `/:cid`               | Ver productos del carrito (con populate)   |
| POST   | `/:cid/product/:pid`  | Agregar producto al carrito                |
| PUT    | `/:cid`               | Reemplazar todos los productos del carrito |
| PUT    | `/:cid/products/:pid` | Actualizar cantidad de un producto         |
| DELETE | `/:cid/products/:pid` | Eliminar un producto del carrito           |
| DELETE | `/:cid`               | Vaciar el carrito completo                 |

---

## 🖥️ Vistas

| Ruta                 | Vista                       | Descripción                                    |
| -------------------- | --------------------------- | ---------------------------------------------- |
| `/`                  | `home.handlebars`           | Listado general de productos                   |
| `/api/products`      | `products.handlebars`       | Catálogo con paginación, límite y ordenamiento |
| `/api/products/:pid` | `product-detail.handlebars` | Detalle de un producto                         |
| `/api/carts/:cid`    | `cart.handlebars`           | Contenido de un carrito                        |

---

## 📦 Modelo de Producto

```js
{
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: [String]
}
```

## 🛒 Modelo de Carrito

```js
{
  products: [
    {
      product: ObjectId, // referencia a Product
      quantity: Number,
    },
  ];
}
```
