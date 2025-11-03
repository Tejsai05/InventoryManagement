const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const initialProducts = [
  { id: 1, name: 'Milk 1L', category: 'Dairy', price: 62, stock: 40, reorderLevel: 10 },
  { id: 2, name: 'Bread Loaf', category: 'Bakery', price: 45, stock: 18, reorderLevel: 15 },
  { id: 3, name: 'Eggs (12)', category: 'Dairy', price: 75, stock: 8, reorderLevel: 12 },
  { id: 4, name: 'Apples 1kg', category: 'Produce', price: 140, stock: 30, reorderLevel: 10 },
  { id: 5, name: 'Bananas (6)', category: 'Produce', price: 35, stock: 50, reorderLevel: 15 },
  { id: 6, name: 'Ghee 500g', category: 'Grocery', price: 380, stock: 12, reorderLevel: 6 },
  { id: 7, name: 'Cheese 200g', category: 'Dairy', price: 120, stock: 20, reorderLevel: 8 },
  { id: 8, name: 'Chocolates Bar', category: 'Snacks', price: 40, stock: 60, reorderLevel: 20 },
  { id: 9, name: 'Basmati Rice 5kg', category: 'Grocery', price: 650, stock: 14, reorderLevel: 5 },
  { id: 10, name: 'Wheat Flour 5kg', category: 'Grocery', price: 230, stock: 16, reorderLevel: 6 },
  { id: 11, name: 'Sugar 1kg', category: 'Grocery', price: 52, stock: 35, reorderLevel: 12 },
  { id: 12, name: 'Salt 1kg', category: 'Grocery', price: 20, stock: 40, reorderLevel: 15 },
  { id: 13, name: 'Tea 250g', category: 'Grocery', price: 145, stock: 22, reorderLevel: 8 },
  { id: 14, name: 'Coffee 200g', category: 'Grocery', price: 320, stock: 10, reorderLevel: 5 },
  { id: 15, name: 'Biscuits Pack', category: 'Snacks', price: 30, stock: 70, reorderLevel: 25 },
  { id: 16, name: 'Bath Soap', category: 'Personal Care', price: 28, stock: 55, reorderLevel: 20 },
  { id: 17, name: 'Shampoo 180ml', category: 'Personal Care', price: 120, stock: 18, reorderLevel: 6 },
  { id: 18, name: 'Detergent 1kg', category: 'Home Care', price: 95, stock: 26, reorderLevel: 10 },
  { id: 19, name: 'Sunflower Oil 1L', category: 'Grocery', price: 155, stock: 24, reorderLevel: 8 },
  { id: 20, name: 'Yogurt 400g', category: 'Dairy', price: 55, stock: 25, reorderLevel: 8 },
  { id: 21, name: 'Paneer 200g', category: 'Dairy', price: 95, stock: 14, reorderLevel: 6 },
  { id: 22, name: 'Butter 100g', category: 'Dairy', price: 55, stock: 28, reorderLevel: 10 },
  { id: 23, name: 'Curd 500g', category: 'Dairy', price: 40, stock: 22, reorderLevel: 8 },
  { id: 24, name: 'Orange 1kg', category: 'Produce', price: 120, stock: 18, reorderLevel: 6 },
  { id: 25, name: 'Grapes 500g', category: 'Produce', price: 85, stock: 20, reorderLevel: 6 },
  { id: 26, name: 'Potato 1kg', category: 'Produce', price: 35, stock: 40, reorderLevel: 15 },
  { id: 27, name: 'Onion 1kg', category: 'Produce', price: 48, stock: 38, reorderLevel: 14 },
  { id: 28, name: 'Tomato 1kg', category: 'Produce', price: 52, stock: 34, reorderLevel: 12 },
  { id: 29, name: 'Soda 750ml', category: 'Beverages', price: 45, stock: 30, reorderLevel: 10 },
  { id: 30, name: 'Fruit Juice 1L', category: 'Beverages', price: 110, stock: 16, reorderLevel: 6 },
  { id: 31, name: 'Chips Family Pack', category: 'Snacks', price: 80, stock: 26, reorderLevel: 10 },
  { id: 32, name: 'Cookies Box', category: 'Snacks', price: 120, stock: 22, reorderLevel: 8 },
  { id: 33, name: 'Instant Noodles', category: 'Grocery', price: 25, stock: 60, reorderLevel: 20 },
  { id: 34, name: 'Toothpaste 150g', category: 'Personal Care', price: 95, stock: 18, reorderLevel: 6 },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert initial products
    await Product.insertMany(initialProducts);
    console.log('Seeded initial products');

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
