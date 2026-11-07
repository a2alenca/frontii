import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import useInventario from '../hooks/useInventario.js'
import { CATEGORIAS } from '../data/categorias.js'
import TarjetaProducto from '../components/TarjetaProducto.jsx'

export default function Inicio() {
  const { productos } = useInventario()
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
      const coincideCategoria = categoria === 'Todas' || producto.categoria === categoria
      return coincideNombre && coincideCategoria
    })
  }, [productos, busqueda, categoria])

  const totalUnidades = productos.reduce((total, producto) => total + producto.stock, 0)

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-md border border-gray-300 bg-white p-5 sm:p-7">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Inventario del supermercado</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          En esta página se pueden revisar los productos, consultar sus datos y ver cuántas unidades quedan disponibles.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/productos/nuevo" className="rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">
            Agregar producto
          </Link>
          <Link to="/carrito" className="rounded-md border border-gray-400 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
            Ver carrito
          </Link>
        </div>
      </section>

      <section className="my-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-sm text-gray-600">Productos registrados</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{productos.length}</p>
        </div>
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-sm text-gray-600">Unidades disponibles</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{totalUnidades}</p>
        </div>
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-sm text-gray-600">Categorías</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{CATEGORIAS.length}</p>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">Listado de productos</h2>
          <p className="mt-1 text-sm text-gray-600">Selecciona un producto para revisar su información completa.</p>
        </div>

        <div className="grid gap-3 rounded-md border border-gray-300 bg-white p-4 sm:grid-cols-2">
          <div>
            <label htmlFor="buscar" className="mb-1 block text-sm font-medium text-gray-700">Buscar por nombre</label>
            <input
              id="buscar"
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ejemplo: leche"
              className="w-full rounded-md border border-gray-400 px-3 py-2 focus:border-green-700 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="categoria" className="mb-1 block text-sm font-medium text-gray-700">Filtrar por categoría</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full rounded-md border border-gray-400 bg-white px-3 py-2 focus:border-green-700 focus:outline-none"
            >
              <option value="Todas">Todas las categorías</option>
              {CATEGORIAS.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <p className="my-3 text-sm text-gray-600" aria-live="polite">
          Se encontraron {productosFiltrados.length} producto(s).
        </p>

        {productosFiltrados.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productosFiltrados.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <p className="rounded-md border border-gray-300 bg-white p-6 text-center text-gray-600">
            No hay productos que coincidan con la búsqueda.
          </p>
        )}
      </section>
    </main>
  )
}
