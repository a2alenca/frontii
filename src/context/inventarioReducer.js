export const ACCIONES = { AGREGAR_PRODUCTO:'AGREGAR_PRODUCTO', AGREGAR_CARRITO:'AGREGAR_CARRITO', AUMENTAR:'AUMENTAR', DISMINUIR:'DISMINUIR' }
export function crearEstadoInicial(productos) {
  return { productos: productos.map(p => ({...p})), carrito: [] }
}
export function inventarioReducer(estado, accion) {
  switch (accion.type) {
    case ACCIONES.AGREGAR_PRODUCTO:
      return {...estado, productos:[...estado.productos, accion.producto]}
    case ACCIONES.AGREGAR_CARRITO: {
      const producto = estado.productos.find(p => p.id === accion.id)
      if (!producto || producto.stock < 1) return estado
      const linea = estado.carrito.find(x => x.productoId === accion.id)
      return {
        productos: estado.productos.map(p => p.id === accion.id ? {...p, stock:p.stock-1} : p),
        carrito: linea ? estado.carrito.map(x => x.productoId === accion.id ? {...x, cantidad:x.cantidad+1} : x) : [...estado.carrito, {productoId:accion.id, cantidad:1}]
      }
    }
    case ACCIONES.AUMENTAR: {
      const producto = estado.productos.find(p => p.id === accion.id)
      if (!producto || producto.stock < 1 || !estado.carrito.some(x => x.productoId === accion.id)) return estado
      return {productos:estado.productos.map(p => p.id === accion.id ? {...p, stock:p.stock-1} : p), carrito:estado.carrito.map(x => x.productoId === accion.id ? {...x, cantidad:x.cantidad+1} : x)}
    }
    case ACCIONES.DISMINUIR: {
      const linea = estado.carrito.find(x => x.productoId === accion.id)
      if (!linea) return estado
      const cantidad = linea.cantidad - 1
      return {productos:estado.productos.map(p => p.id === accion.id ? {...p, stock:p.stock+1} : p), carrito:cantidad === 0 ? estado.carrito.filter(x => x.productoId !== accion.id) : estado.carrito.map(x => x.productoId === accion.id ? {...x, cantidad} : x)}
    }
    default: return estado
  }
}
