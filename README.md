# 🛒 Tienda React - Proyecto Final

## 🌟 **DEMO EN VIVO** 
### 👀 [Ver proyecto desplegado](https://talentotech-tp-react-25017-cc.netlify.app) 🚀

---

Comisión 25017 - CC

## Usuario de administración

Usar usuario: **admin**  
Password: **1234**

## Descripción

Este proyecto es una tienda online desarrollada en React, utilizando Material UI y consumo de una [API Mock](https://686d9ca7c9090c495386c7b7.mockapi.io/api/v1/articulos). Permite visualizar productos, filtrarlos, agregarlos al carrito, y administrar el catálogo (agregar, editar y borrar productos) desde una sección protegida por login.

## Características

- Visualización de productos por categorías: Electrónica, Joyería, Ropa Hombre, Ropa Mujer.
- Filtros avanzados: rango de precio, categoría y búsqueda por descripción/título.
- Carrito de compras con contador de productos distintos.
- Administración: alta, edición y baja de productos (persistencia en la API).
- Responsive y menú hamburguesa en dispositivos móviles.
- Feedback visual con toasts y badges.
- Accesibilidad y SEO básico con React Helmet y ARIA.

## Estructura de carpetas

```
src/
  components/
    AppHeader.jsx
    Footer.jsx
    ProductCard.jsx
    Filtros.jsx
    Paginado.jsx
    Components.jsx
  context/
    AuthProvider.jsx
    CartProvider.jsx
    AlertProvider.jsx
    ArticulosProvider.jsx
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
   git clone https://github.com/Zelgadis-lol/TalentoTech-ProyectoFinalReact-25017-CC.git
   cd TalentoTech-ProyectoFinalReact-25017-CC
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
- Context API (Auth, Cart, Alert, Articulos)
- [MockAPI](https://686d9ca7c9090c495386c7b7.mockapi.io/api/v1/articulos)
- React Helmet (SEO)
- Accesibilidad ARIA

---

## Datos usados en MockAPI

```json
[
  {
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "price": 109.95,
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "category": "Ropa de Hombre",
    "id": "1"
  },
  {
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "price": 22.3,
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "category": "Ropa de Hombre",
    "id": "2"
  },
  {
    "title": "Mens Cotton Jacket",
    "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "price": 55.99,
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    "category": "Ropa de Hombre",
    "id": "3"
  },
  {
    "title": "Mens Casual Slim Fit",
    "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    "price": 15.99,
    "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    "category": "Ropa de Hombre",
    "id": "4"
  },
  {
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "price": 695,
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "category": "Joyería",
    "id": "5"
  },
  {
    "title": "Solid Gold Petite Micropave ",
    "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    "price": 168,
    "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    "category": "Joyería",
    "id": "6"
  },
  {
    "title": "White Gold Plated Princess",
    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    "price": 9.99,
    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    "category": "Joyería",
    "id": "7"
  },
  {
    "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
    "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    "price": 10.99,
    "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    "category": "Joyería",
    "id": "8"
  },
  {
    "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    "price": 64,
    "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    "category": "Electrónica",
    "id": "9"
  },
  {
    "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    "price": 109,
    "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    "category": "Electrónica",
    "id": "10"
  },
  {
    "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    "price": 109,
    "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    "category": "Electrónica",
    "id": "11"
  },
  {
    "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    "price": 114,
    "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    "category": "Electrónica",
    "id": "12"
  },
  {
    "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    "price": 599,
    "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    "category": "Electrónica",
    "id": "13"
  },
  {
    "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    "price": 999.99,
    "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    "category": "Electrónica",
    "id": "14"
  },
  {
    "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    "price": 56.99,
    "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    "category": "Ropa de Mujer",
    "id": "15"
  },
  {
    "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    "price": 29.95,
    "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    "category": "Ropa de Mujer",
    "id": "16"
  },
  {
    "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    "price": 39.99,
    "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    "category": "Ropa de Mujer",
    "id": "17"
  },
  {
    "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
    "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    "price": 9.85,
    "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    "category": "Ropa de Mujer",
    "id": "18"
  },
  {
    "title": "Opna Women's Short Sleeve Moisture",
    "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    "price": 7.95,
    "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    "category": "Ropa de Mujer",
    "id": "19"
  },
  {
    "title": "DANVOUY Womens T Shirt Casual Cotton Short",
    "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    "price": 12.99,
    "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    "category": "Ropa de Mujer",
    "id": "20"
  }
]
```
