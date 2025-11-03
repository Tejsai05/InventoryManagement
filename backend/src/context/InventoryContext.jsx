import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const InventoryContext = createContext(null)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data on mount
  useEffect(() => {
    fetchProducts()
    fetchSales()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`)
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchSales = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sales`)
      if (!response.ok) throw new Error('Failed to fetch sales')
      const data = await response.json()
      setSales(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const nextProductId = useMemo(() => (
    products.length ? Math.max(...products.map(p => p.id)) + 1 : 1
  ), [products])

  async function addProduct(product) {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, id: nextProductId }),
      })
      if (!response.ok) throw new Error('Failed to add product')
      const newProduct = await response.json()
      setProducts(prev => [...prev, newProduct])
    } catch (err) {
      setError(err.message)
    }
  }

  async function updateProduct(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update product')
      const updatedProduct = await response.json()
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p))
    } catch (err) {
      setError(err.message)
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete product')
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  async function recordSale({ productId, qty, dateISO }) {
    try {
      const response = await fetch(`${API_BASE_URL}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, qty, dateISO }),
      })
      if (!response.ok) throw new Error('Failed to record sale')
      const newSale = await response.json()
      setSales(prev => [newSale, ...prev])
      // Update local product stock
      setProducts(prev => prev.map(p =>
        p.id === productId ? { ...p, stock: p.stock - qty } : p
      ))
    } catch (err) {
      setError(err.message)
    }
  }

  const lowStockProducts = useMemo(() => (
    products.filter(p => p.stock <= p.reorderLevel)
  ), [products])

  const revenue = useMemo(() => (
    sales.reduce((sum, s) => sum + s.total, 0)
  ), [sales])

  const totalSalesCount = useMemo(() => (
    sales.reduce((sum, s) => sum + s.qty, 0)
  ), [sales])

  const value = {
    products,
    sales,
    loading,
    error,
    lowStockProducts,
    revenue,
    totalSalesCount,
    addProduct,
    updateProduct,
    deleteProduct,
    recordSale,
  }

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider')
  return ctx
}


