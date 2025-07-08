# Tienda React - Proyecto Final

Comisión 25017 - CC

## Usuario de administración

Usar usuario: **admin**  
Password: **1234**

## Descripción

Este proyecto es una tienda online desarrollada en React, utilizando Material UI y consumo de la [Fake Store API](https://fakestoreapi.com/). Permite visualizar productos, filtrarlos, agregarlos al carrito, y administrar el catálogo (agregar, editar y borrar productos) desde una sección protegida por login.

## Características

- Visualización de productos por categorías: Electrónica, Joyería, Ropa Hombre, Ropa Mujer.
- Filtros avanzados: rango de precio, categoría y búsqueda por descripción/título.
- Carrito de compras con contador de productos distintos.
- Administración: alta, edición y baja de productos (persistencia en localStorage).
- Responsive y menú hamburguesa en dispositivos móviles.
- Feedback visual con toasts y badges.

## Estructura de carpetas

```
src/
  components/
    AppHeader.jsx
    Footer.jsx
    ProductCard.jsx
    Filtros.jsx
    Components.jsx
  context/
    AuthProvider.jsx
    CartProvider.jsx
    AlertProvider.jsx
  pages/
    Home.jsx
    Electronica.jsx
    Joyeria.jsx
    RopaHombre.jsx
    RopaMujer.jsx
    ProductDetalle.jsx
    Admin.jsx
    Carrito.jsx
    Login.jsx
  AppRoutes.jsx
  App.jsx
  index.js
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/tu-repo.git
   cd tu-repo
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npm run dev
   ```

## Uso

- Navega por las categorías desde el menú superior.
- Utiliza los filtros para buscar productos por precio, categoría o descripción.
- Agrega productos al carrito y accede desde el ícono superior derecho.
- Ingresa a /admin (requiere login) para administrar productos.

## Tecnologías utilizadas

- React
- React Router
- Material UI
- Context API (Auth, Cart, Alert)
- Fake Store API
- localStorage

---
