import { Link, NavLink } from 'react-router'
import useInventario from '../hooks/useInventario.js'

export default function Navegacion() {
  const { carrito } = useInventario()
  const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0)
  const clase = ({ isActive }) => `rounded px-3 py-2 text-sm ${isActive ? 'bg-green-100 font-semibold text-green-900' : 'text-gray-700 hover:bg-gray-100'}`

  return (
    <header className="border-b border-gray-300 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="text-xl font-bold text-green-800">Supermercado</Link>
        <nav aria-label="Navegación principal" className="flex flex-wrap gap-1">
          <NavLink to="/" end className={clase}>Inventario</NavLink>
          <NavLink to="/productos/nuevo" className={clase}>Agregar producto</NavLink>
          <NavLink to="/carrito" className={clase}>Carrito ({cantidad})</NavLink>
        </nav>
      </div>
    </header>
  )
}
