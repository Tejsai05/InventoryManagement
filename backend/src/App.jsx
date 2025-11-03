import { Route, Routes } from 'react-router-dom'
import { InventoryProvider } from './context/InventoryContext.jsx'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Products from './pages/Products.jsx'
import Sales from './pages/Sales.jsx'
import Analytics from './pages/Analytics.jsx'
import NotFound from './pages/NotFound.jsx'
import './styles/layout.css'

export default function App() {
  return (
    <InventoryProvider>
      <div className="app-shell">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </InventoryProvider>
  )
}
