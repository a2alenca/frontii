import { useContext } from 'react'
import InventarioContext from '../context/InventarioContext.js'
export default function useInventario() {
  const context = useContext(InventarioContext)
  if (!context) throw new Error('useInventario debe utilizarse dentro de InventarioProvider')
  return context
}
