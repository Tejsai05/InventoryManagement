const express = require('express');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const router = express.Router();

// GET all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single sale
router.get('/:id', async (req, res) => {
  try {
    const sale = await Sale.findOne({ id: parseInt(req.params.id) });
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create sale
router.post('/', async (req, res) => {
  try {
    const { productId, qty, dateISO } = req.body;

    // Find product
    const product = await Product.findOne({ id: productId });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Check stock
    if (product.stock < qty) return res.status(400).json({ error: 'Insufficient stock' });

    // Create sale
    const sale = new Sale({
      id: req.body.id || (await Sale.countDocuments()) + 1,
      dateISO: dateISO || new Date().toISOString(),
      productId,
      productName: product.name,
      qty,
      priceEach: product.price,
      total: product.price * qty,
    });

    await sale.save();

    // Update product stock
    product.stock -= qty;
    await product.save();

    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE sale
router.delete('/:id', async (req, res) => {
  try {
    const sale = await Sale.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!sale) return res.status(404).json({ error: 'Sale not found' });

    // Restore stock
    const product = await Product.findOne({ id: sale.productId });
    if (product) {
      product.stock += sale.qty;
      await product.save();
    }

    res.json({ message: 'Sale deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
