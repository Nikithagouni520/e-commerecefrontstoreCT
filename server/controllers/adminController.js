import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const dashboardStats = async (req, res) => {
  const users = await User.countDocuments();
  const products = await Product.countDocuments();
  const orders = await Order.countDocuments();
  const outOfStock = await Product.countDocuments({ countInStock: 0 });
  const pendingOrders = await Order.countDocuments({ status: { $nin: ['Delivered', 'Cancelled'] } });
  const paidOrders = await Order.find({ isPaid: true });
  const sales = paidOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  res.json({ users, products, orders, outOfStock, pendingOrders, sales });
};

export const getUsers = async (req, res) => res.json(await User.find({}).select('-password').sort('-createdAt'));
