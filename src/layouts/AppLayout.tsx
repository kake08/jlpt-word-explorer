import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-linen text-stone-700">
      <Navbar />
      <Outlet />
    </div>
  )
}
