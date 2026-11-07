import { useEffect, useReducer } from 'react'
import InventarioContext from './InventarioContext.js'
import productosIniciales from '../data/productos.json'
import { crearEstadoInicial, inventarioReducer, ACCIONES } from './inventarioReducer.js'
const STORAGE_KEY = 'mercado-fresco-inventario-v1'
function leerEstadoInicial() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (guardado) {
      const datos = JSON.parse(guardado)
      if (Array.isArray(datos.productos) && Array.isArray(datos.carrito)) return datos
    }
  } catch { /* Si el almacenamiento no está disponible, se usan los datos de ejemplo. */ }
  return crearEstadoInicial(productosIniciales)
}
export default function InventarioProvider({children}) {
  const [estado, dispatch] = useReducer(inventarioReducer, undefined, leerEstadoInicial)
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(estado)) } catch { /* La aplicación sigue funcionando en memoria. */ } }, [estado])
  const agregarProducto = datos => {
    const nombre = datos.nombre.trim()
    if (!nombre || !datos.categoria || !Number.isInteger(Number(datos.stock)) || Number(datos.stock) < 0 || !Number.isFinite(Number(datos.precio)) || Number(datos.precio) <= 0) return {exito:false, mensaje:'Revisa nombre, categoría, precio y stock.'}
    dispatch({type:ACCIONES.AGREGAR_PRODUCTO, producto:{...datos, id:crypto.randomUUID(), nombre, precio:Number(datos.precio), stock:Number(datos.stock)}})
    return {exito:true}
  }
  const value = {productos:estado.productos, carrito:estado.carrito, agregarProducto, agregarAlCarrito:id=>dispatch({type:ACCIONES.AGREGAR_CARRITO,id}), aumentar:id=>dispatch({type:ACCIONES.AUMENTAR,id}), disminuir:id=>dispatch({type:ACCIONES.DISMINUIR,id})}
  return <InventarioContext.Provider value={value}>{children}</InventarioContext.Provider>
}
