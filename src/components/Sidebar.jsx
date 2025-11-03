import { NavLink } from 'react-router-dom'
import '../styles/layout.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-accent">Smart</span> Inventory
      </div>
      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Dashboard
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Products
        </NavLink>
        <NavLink to="/sales" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Sales
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Analytics
        </NavLink>
      </nav>
    </aside>
  )
}


