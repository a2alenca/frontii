import { Link } from 'react-router'
import { formatoCLP } from '../util/formato.js'

export default function TarjetaProducto({ producto }) {
  return (
    <article className="overflow-hidden rounded-md border border-gray-300 bg-white">
      <Link to={`/productos/${producto.id}`} className="block">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          loading="lazy"
          className="h-40 w-full bg-gray-100 object-cover"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400?text=Producto' }}
        />
        <div className="p-4">
          <p className="text-xs font-semibold text-green-800">{producto.categoria}</p>
          <h3 className="mt-1 text-lg font-bold text-gray-800">{producto.nombre}</h3>
          <p className="mt-2 text-sm leading-5 text-gray-600">{producto.descripcion}</p>
          <p className="mt-3 font-bold text-gray-800">
            {formatoCLP(producto.precio)} <span className="text-sm font-normal text-gray-600">/ {producto.unidad}</span>
          </p>
          <p className={`mt-2 text-sm font-medium ${producto.stock > 0 ? 'text-green-800' : 'text-red-700'}`}>
            {producto.stock > 0 ? `Stock: ${producto.stock} ${producto.unidad}(s)` : 'Sin stock'}
          </p>
          <span className="mt-3 inline-block text-sm font-semibold text-green-800 underline">Ver detalle</span>
        </div>
      </Link>
    </article>
  )
}
