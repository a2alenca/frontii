import { Link, useParams } from 'react-router'
import { useState } from 'react'
import useInventario from '../hooks/useInventario.js'
import { formatoCLP } from '../util/formato.js'

export default function DetalleProducto() {
  const { id } = useParams()
  const { productos, agregarAlCarrito, carrito } = useInventario()
  const [mensaje, setMensaje] = useState('')
  const producto = productos.find((item) => item.id === id)

  if (!producto) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <Link to="/" className="mt-4 inline-block text-green-800 underline">Volver al inventario</Link>
      </main>
    )
  }

  const cantidadCarrito = carrito.find((item) => item.productoId === id)?.cantidad || 0

  function agregar() {
    if (producto.stock > 0) {
      agregarAlCarrito(id)
      setMensaje('El producto se agregó al carrito.')
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link to="/" className="text-sm text-green-800 underline">Volver al inventario</Link>
      <section className="mt-5 grid gap-6 rounded-md border border-gray-300 bg-white p-4 sm:grid-cols-2 sm:p-6">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-64 w-full rounded-sm bg-gray-100 object-cover"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600?text=Producto' }}
        />
        <div>
          <p className="text-sm font-semibold text-green-800">{producto.categoria}</p>
          <h1 className="mt-2 text-2xl font-bold text-gray-800">{producto.nombre}</h1>
          <p className="mt-3 leading-6 text-gray-600">{producto.descripcion}</p>
          <p className="mt-5 text-xl font-bold">{formatoCLP(producto.precio)} / {producto.unidad}</p>
          <div className="mt-4 border-y border-gray-200 py-3 text-sm">
            <p>Stock disponible: <strong>{producto.stock}</strong></p>
            <p className="mt-1">Unidades en el carrito: <strong>{cantidadCarrito}</strong></p>
          </div>
          <button
            type="button"
            onClick={agregar}
            disabled={producto.stock === 0}
            className="mt-5 rounded-md bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {producto.stock > 0 ? 'Agregar al carrito' : 'Producto sin stock'}
          </button>
          {mensaje && <p role="status" className="mt-3 text-sm text-green-800">{mensaje}</p>}
        </div>
      </section>
    </main>
  )
}
