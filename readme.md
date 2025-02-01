# 🛒 Backend de Gestión de Productos y Carritos

Este proyecto es una API backend para la gestión de productos y carritos de compras, construida con Node.js y Express.

## 🚀 Características

- Gestión de productos: agregar, obtener, actualizar y eliminar productos.
- Gestión de carritos: crear carritos vacíos y agregar productos a los carritos.
- Uso de archivos JSON para almacenar datos de productos y carritos.
- Middleware para el manejo de solicitudes HTTP y registro de logs.



## Endpoints
### 🛒 Carrito
- GET /api/products: Obtener todos los productos.
- POST /api/products: Agregar un nuevo producto.
- GET /api/products/:id: Obtener un producto por ID.
- PUT /api/products/:id: Actualizar un producto por ID.
- DELETE /api/products/:id: Eliminar un producto por ID.

### 🖥️ Productos
- GET /api/cart: Obtener todos los carritos.
- POST /api/cart: Crear un carrito vacío.
- POST /api/cart/:id/products: Agregar un producto a un carrito por ID.

## 📄 Licencia
Este proyecto está licenciado bajo la Licencia ISC. Consulta el archivo LICENSE para obtener más detalles.

## 👤 Autor
Santiago Rivero