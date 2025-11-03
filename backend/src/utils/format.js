const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

export function formatINR(value) {
  const num = Number(value)
  if (!Number.isFinite(num)) return '₹0.00'
  return inrFormatter.format(num)
}


