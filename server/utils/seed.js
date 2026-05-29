import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Wishlist from '../models/Wishlist.js';

dotenv.config();
const products = [
  { name: 'Men Linen Shirt', brand: 'Urban Loom', category: 'Men', description: 'Breathable casual shirt for office and weekend wear.', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900', photos: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900'], price: 1499, countInStock: 26, rating: 4.4, numReviews: 18 },
  { name: 'Men Street Sneakers', brand: 'StrideX', category: 'Men', description: 'Comfort sneakers with cushioned sole and daily grip.', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900', photos: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900'], price: 2999, countInStock: 0, rating: 4.5, numReviews: 16 },
  { name: 'Women Floral Dress', brand: 'Ava Studio', category: 'Women', description: 'Soft floral dress with relaxed fit and premium finish.', image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=900', photos: ['https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=900', 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=900'], price: 2499, countInStock: 19, rating: 4.7, numReviews: 24 },
  { name: 'Women Tote Bag', brand: 'Carry Co', category: 'Women', description: 'Structured tote bag for work, travel and everyday use.', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=900', photos: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=900'], price: 1999, countInStock: 15, rating: 4.3, numReviews: 10 },
  { name: 'Kids Dino Hoodie', brand: 'TinyTrail', category: 'Kids', description: 'Warm cotton hoodie with playful print for school days.', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=900', photos: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=900'], price: 899, countInStock: 34, rating: 4.6, numReviews: 14 },
  { name: 'Kids School Backpack', brand: 'BrightPack', category: 'Kids', description: 'Lightweight backpack with water pocket and organizer.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900', photos: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900'], price: 1299, countInStock: 22, rating: 4.2, numReviews: 9 },
  { name: 'iPhone 15 Pro', brand: 'Apple', category: 'Mobiles', description: 'Premium smartphone with A17 Pro chip and excellent camera.', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900', price: 129999, countInStock: 12, rating: 4.8, numReviews: 18 },
  { name: 'Galaxy S24', brand: 'Samsung', category: 'Mobiles', description: 'AI-powered flagship Android phone with bright AMOLED display.', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=900', price: 79999, countInStock: 20, rating: 4.6, numReviews: 21 },
  { name: 'MacBook Air M3', brand: 'Apple', category: 'Laptops', description: 'Lightweight laptop with all-day battery and powerful M3 chip.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900', price: 114999, countInStock: 9, rating: 4.9, numReviews: 30 },
  { name: 'Sony WH-1000XM5', brand: 'Sony', category: 'Audio', description: 'Industry-leading wireless noise cancelling headphones.', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900', price: 29999, countInStock: 17, rating: 4.7, numReviews: 14 },
  { name: 'Nike Running Shoes', brand: 'Nike', category: 'Fashion', description: 'Comfortable lightweight shoes for walking and running.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900', price: 5499, countInStock: 50, rating: 4.3, numReviews: 44 },
  { name: 'Smart Watch Pro', brand: 'FitPulse', category: 'Wearables', description: 'Track steps, heart rate, workouts, sleep, and notifications.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900', price: 6999, countInStock: 25, rating: 4.2, numReviews: 12 },
  { name: 'Gaming Keyboard RGB', brand: 'HyperKeys', category: 'Accessories', description: 'Mechanical keyboard with RGB lighting and fast response.', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900', price: 3499, countInStock: 31, rating: 4.5, numReviews: 16 },
  { name: 'Leather Backpack', brand: 'UrbanCarry', category: 'Fashion', description: 'Premium daily backpack for college, office, and travel.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900', price: 2499, countInStock: 40, rating: 4.1, numReviews: 10 }
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany(); await Product.deleteMany(); await Order.deleteMany(); await Cart.deleteMany(); await Wishlist.deleteMany();
  await User.create({ name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' });
  await User.create({ name: 'Nikitha', email: 'nikitha@example.com', password: 'user123', role: 'user' });
  await Product.insertMany(products);
  console.log('Seed data inserted');
  process.exit();
};
run();
