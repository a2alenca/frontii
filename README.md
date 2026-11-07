# Inventario de supermercado

Proyecto de la Semana 3. La aplicación permite revisar productos de un supermercado y trabajar con su inventario.

## Tecnologías
- React
- Vite
- React Router
- Tailwind CSS

## Funciones
- Ver el listado de productos con nombre, descripción, categoría, precio e inventario.
- Buscar productos por nombre.
- Filtrar por categoría.
- Abrir el detalle de cada producto.
- Agregar productos al carrito y modificar cantidades.
- Actualizar el stock cuando se agregan o se quitan unidades.
- Registrar nuevos productos.
- Guardar los cambios en el navegador usando localStorage.

## Cómo ejecutar
Se necesita Node.js compatible con Vite 8.

```bash
npm install
npm run dev
```

Abrir la dirección que aparece en la terminal, normalmente `http://localhost:5173`.

## Pruebas
```bash
npm test
npm run lint
npm run build
```

## Carpetas principales
- `src/components`: componentes que se usan en distintas páginas.
- `src/context`: estado general del inventario y sus acciones.
- `src/data`: productos y categorías iniciales.
- `src/hooks`: hook para acceder al inventario.
- `src/pages`: páginas de la aplicación.
- `src/util`: funciones de apoyo.

## Datos
Los productos que vienen cargados son datos de ejemplo. La aplicación no está conectada a una base de datos ni a un servicio externo. Los cambios quedan guardados en el almacenamiento local del navegador.

## Publicación
Para publicar el proyecto, primero se debe crear un repositorio en GitHub y subir los archivos. Luego se debe configurar GitHub Pages según la dirección del repositorio. La publicación no está incluida en este ZIP.
