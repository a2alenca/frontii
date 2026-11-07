import {Routes,Route} from 'react-router'
import InventarioProvider from './context/InventarioProvider.jsx'
import Navegacion from './components/Navegacion.jsx'
import PiePagina from './components/PiePagina.jsx'
import Inicio from './pages/Inicio.jsx'
import NuevoProducto from './pages/NuevoProducto.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Carrito from './pages/Carrito.jsx'
export default function App(){return <InventarioProvider><div className="flex min-h-screen flex-col"><Navegacion/><div className="grow"><Routes><Route path="/" element={<Inicio/>}/><Route path="/productos/nuevo" element={<NuevoProducto/>}/><Route path="/productos/:id" element={<DetalleProducto/>}/><Route path="/carrito" element={<Carrito/>}/><Route path="*" element={<main className="p-16 text-center"><h1 className="text-3xl font-black">Página no encontrada</h1><a href="/" className="mt-4 inline-block text-emerald-700">Ir al inventario</a></main>}/></Routes></div><PiePagina/></div></InventarioProvider>}
