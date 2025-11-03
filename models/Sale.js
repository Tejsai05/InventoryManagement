const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  dateISO: { type: String, required: true },
  productId: { type: Number, required: true },
  productName: { type: String, required: true },
  qty: { type: Number, required: true },
  priceEach: { type: Number, required: true },
  total: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
