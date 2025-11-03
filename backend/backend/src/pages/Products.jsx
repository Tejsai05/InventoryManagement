import { useMemo, useState } from 'react'
import { useInventory } from '../context/InventoryContext.jsx'
import { formatINR } from '../utils/format.js'

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useInventory()
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ name:'', category:'', price:'', stock:'', reorderLevel:'' })
  const [categoryFilter, setCategoryFilter] = useState('All')

  const isEditing = editingId !== null

  function resetForm() {
    setEditingId(null)
    setForm({ name:'', category:'', price:'', stock:'', reorderLevel:'' })
  }

  function startEdit(p) {
    setEditingId(p.id)
    setForm({ name:p.name, category:p.category, price:String(p.price), stock:String(p.stock), reorderLevel:String(p.reorderLevel) })
  }

  function onSubmit(e) {
    e.preventDefault()
    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      reorderLevel: Number(form.reorderLevel),
    }
    if (!payload.name || !payload.category || !Number.isFinite(payload.price)) return
    if (isEditing) {
      updateProduct(editingId, payload)
    } else {
      addProduct(payload)
    }
    resetForm()
  }

  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category)))], [products])
  const filtered = useMemo(() => (
    categoryFilter === 'All' ? products : products.filter(p => p.category === categoryFilter)
  ), [products, categoryFilter])
  const sorted = useMemo(() => (
    [...filtered].sort((a,b) => a.name.localeCompare(b.name))
  ), [filtered])

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="card">
        <div className="summary-card-title" style={{ marginBottom: 10 }}>{isEditing ? 'Update Product' : 'Add Product'}</div>
        <form className="grid" style={{ gridTemplateColumns:'repeat(5, 1fr)', gap: 12 }} onSubmit={onSubmit}>
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input className="input" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
          <input className="input" placeholder="Price" type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
          <input className="input" placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} />
          <input className="input" placeholder="Reorder Level" type="number" value={form.reorderLevel} onChange={e=>setForm({...form, reorderLevel:e.target.value})} />
          <div style={{ gridColumn:'span 5', display:'flex', gap:8 }}>
            <button className="btn primary" type="submit">{isEditing ? 'Save Changes' : 'Add Product'}</button>
            {isEditing && <button type="button" className="btn ghost" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="card">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
          <div className="summary-card-title">Products</div>
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
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Reorder</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(p => {
                const low = p.stock <= p.reorderLevel
                return (
                  <tr key={p.id} style={{ background: low ? 'rgba(239,68,68,0.06)' : undefined }}>
                    <td>{p.name}</td>
                    <td><span className="tag">{p.category}</span></td>
                    <td>{formatINR(p.price)}</td>
                    <td>
                      <span className={`tag ${low ? 'danger' : 'ok'}`}>{p.stock}</span>
                    </td>
                    <td>{p.reorderLevel}</td>
                    <td style={{ textAlign:'right' }}>
                      <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
                        <button className="btn" onClick={() => startEdit(p)}>Edit</button>
                        <button className="btn danger" onClick={() => deleteProduct(p.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


