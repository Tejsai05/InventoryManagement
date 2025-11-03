import { useMemo } from 'react'
import { useInventory } from '../context/InventoryContext.jsx'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Pie, PieChart, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#60a5fa', '#34d399', '#f472b6', '#f59e0b', '#a78bfa', '#22d3ee']

export default function Analytics() {
  const { products, sales } = useInventory()

  const revenueSeries = useMemo(() => {
    const map = new Map()
    sales.forEach(s => {
      const d = new Date(s.dateISO)
      const key = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}`
      map.set(key, (map.get(key) || 0) + s.total)
    })
    return Array.from(map.entries()).map(([month, revenue]) => ({ month, revenue }))
  }, [sales])

  const bestSellers = useMemo(() => {
    const map = new Map()
    sales.forEach(s => map.set(s.productName, (map.get(s.productName) || 0) + s.qty))
    return Array.from(map.entries()).map(([name, qty]) => ({ name, qty }))
  }, [sales])

  const inventoryDistribution = useMemo(() => {
    const map = new Map()
    products.forEach(p => map.set(p.category, (map.get(p.category) || 0) + p.stock))
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [products])

  const salesByCategory = useMemo(() => {
    const idToCategory = new Map(products.map(p => [p.id, p.category]))
    const map = new Map()
    sales.forEach(s => {
      const cat = idToCategory.get(s.productId) || 'Other'
      map.set(cat, (map.get(cat) || 0) + s.total)
    })
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [sales, products])

  const productsCountByCategory = useMemo(() => {
    const map = new Map()
    products.forEach(p => map.set(p.category, (map.get(p.category) || 0) + 1))
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [products])

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="grid half">
        <div className="card">
          <div className="summary-card-title" style={{ marginBottom: 10 }}>Revenue Over Time</div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueSeries}>
              <CartesianGrid stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ background:'#ffffff', border:'1px solid rgba(0,0,0,0.08)' }} />
              <Line type="monotone" dataKey="revenue" stroke="#60a5fa" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="summary-card-title" style={{ marginBottom: 10 }}>Best Sellers</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={bestSellers}>
              <CartesianGrid stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ background:'#ffffff', border:'1px solid rgba(0,0,0,0.08)' }} />
              <Bar dataKey="qty" fill="#34d399" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid half">
        <div className="card">
          <div className="summary-card-title" style={{ marginBottom: 10 }}>Inventory by Category</div>
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie data={inventoryDistribution} dataKey="value" nameKey="name" outerRadius={120} innerRadius={60}>
                {inventoryDistribution.map((entry, index) => (
                  <Cell key={`inv-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background:'#ffffff', border:'1px solid rgba(0,0,0,0.08)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="summary-card-title" style={{ marginBottom: 10 }}>Sales by Category</div>
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie data={salesByCategory} dataKey="value" nameKey="name" outerRadius={120} innerRadius={60}>
                {salesByCategory.map((entry, index) => (
                  <Cell key={`sales-${index}`} fill={COLORS[(index+2) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background:'#ffffff', border:'1px solid rgba(0,0,0,0.08)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="summary-card-title" style={{ marginBottom: 10 }}>Products Count by Category</div>
        <ResponsiveContainer width="100%" height={360}>
          <PieChart>
            <Pie data={productsCountByCategory} dataKey="value" nameKey="name" outerRadius={140} innerRadius={70}>
              {productsCountByCategory.map((entry, index) => (
                <Cell key={`count-${index}`} fill={COLORS[(index+4) % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background:'#ffffff', border:'1px solid rgba(0,0,0,0.08)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


