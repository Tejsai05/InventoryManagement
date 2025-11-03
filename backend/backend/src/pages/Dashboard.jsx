import { useMemo } from 'react'
import { useInventory } from '../context/InventoryContext.jsx'
import { formatINR } from '../utils/format.js'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const { products, sales, revenue, totalSalesCount, lowStockProducts } = useInventory()

  const salesByDate = useMemo(() => {
    const map = new Map()
    sales.slice().reverse().forEach(s => {
      const d = new Date(s.dateISO)
      const key = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`
      map.set(key, (map.get(key) || 0) + s.total)
    })
    return Array.from(map.entries()).map(([date, amount]) => ({ date, amount }))
  }, [sales])

  const topProducts = useMemo(() => {
    const map = new Map()
    sales.forEach(s => {
      map.set(s.productName, (map.get(s.productName) || 0) + s.qty)
    })
    return Array.from(map.entries()).map(([name, qty]) => ({ name, qty })).slice(0, 5)
  }, [sales])

  return (
    <div className="grid">
      <div className="grid summary">
        <div className="card">
          <div className="summary-card-title">Total Products</div>
          <div className="summary-card-value">{products.length}</div>
          <div className="summary-card-foot">Across all categories</div>
        </div>
        <div className="card">
          <div className="summary-card-title">Total Sales</div>
          <div className="summary-card-value">{totalSalesCount}</div>
          <div className="summary-card-foot">Units sold</div>
        </div>
        <div className="card">
          <div className="summary-card-title">Revenue</div>
          <div className="summary-card-value">{formatINR(revenue)}</div>
          <div className="summary-card-foot">All time</div>
        </div>
        <div className="card">
          <div className="summary-card-title">Low Stock Items</div>
          <div className="summary-card-value">{lowStockProducts.length}</div>
          <div className="summary-card-foot">Needs reorder</div>
        </div>
      </div>

      <div className="grid half">
        <div className="card">
          <div className="summary-card-title" style={{ marginBottom: 10 }}>Revenue Trend</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={salesByDate}>
              <CartesianGrid stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ background:'#ffffff', border:'1px solid rgba(0,0,0,0.08)' }} />
              <Line type="monotone" dataKey="amount" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="summary-card-title" style={{ marginBottom: 10 }}>Top Products</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topProducts}>
              <CartesianGrid stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ background:'#ffffff', border:'1px solid rgba(0,0,0,0.08)' }} />
              <Bar dataKey="qty" fill="#34d399" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="card">
          <div className="summary-card-title" style={{ marginBottom: 10 }}>Low Stock Alerts</div>
          <div className="alert">
            {lowStockProducts.map(p => (
              <div key={p.id} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0' }}>
                <span>{p.name}</span>
                <span className="tag danger">{p.stock} / RL {p.reorderLevel}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


