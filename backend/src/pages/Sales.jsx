import { useMemo, useState } from 'react'
import { useInventory } from '../context/InventoryContext.jsx'
import { formatINR } from '../utils/format.js'

export default function Sales() {
  const { products, sales, recordSale } = useInventory()
  const [form, setForm] = useState({ productId:'', qty:'', date:'' })
  const [categoryFilter, setCategoryFilter] = useState('All')

  function submit(e) {
    e.preventDefault()
    const productId = Number(form.productId)
    const qty = Number(form.qty)
    const dateISO = form.date ? new Date(form.date).toISOString() : undefined
    recordSale({ productId, qty, dateISO })
    setForm({ productId:'', qty:'', date:'' })
  }

  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category)))], [products])
  const idToCategory = useMemo(() => new Map(products.map(p => [p.id, p.category])), [products])
  const filteredSales = useMemo(() => (
    categoryFilter === 'All' ? sales : sales.filter(s => idToCategory.get(s.productId) === categoryFilter)
  ), [sales, categoryFilter, idToCategory])

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="card">
        <div className="summary-card-title" style={{ marginBottom: 10 }}>Record Sale</div>
        <form className="grid" style={{ gridTemplateColumns:'repeat(4, 1fr)', gap: 12 }} onSubmit={submit}>
          <select className="select" value={form.productId} onChange={e=>setForm({...form, productId:e.target.value})}>
            <option value="">Select product</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name} (Stock {p.stock})</option>
            ))}
          </select>
          <input className="input" placeholder="Qty" type="number" value={form.qty} onChange={e=>setForm({...form, qty:e.target.value})} />
          <input className="input" placeholder="Date (optional)" type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
          <button className="btn primary" type="submit">Add Sale</button>
        </form>
      </div>

      <div className="card">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
          <div className="summary-card-title">Recent Sales</div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <span className="summary-card-title">Category:</span>
            <select className="select" style={{ width:220 }} value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map(s => (
                <tr key={s.id}>
                  <td>{new Date(s.dateISO).toLocaleDateString()}</td>
                  <td>{s.productName}</td>
                  <td>{s.qty}</td>
                  <td>{formatINR(s.priceEach)}</td>
                  <td>{formatINR(s.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


