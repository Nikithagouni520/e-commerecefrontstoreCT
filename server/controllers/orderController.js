import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  if (!orderItems?.length) return res.status(400).json({ message: 'No order items' });
  const hydratedItems = [];
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) return res.status(404).json({ message: `${item.name || 'Product'} not found` });
    if (product.countInStock < item.qty) return res.status(400).json({ message: `${product.name} stock unavailable` });
    hydratedItems.push({ product: product._id, name: product.name, image: product.image, qty: Number(item.qty), price: product.price });
  }
  const itemsPrice = hydratedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const taxPrice = Number((itemsPrice * 0.05).toFixed(2));
  const shippingPrice = itemsPrice > 999 ? 0 : 49;
  const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));
  const order = await Order.create({
    user: req.user._id,
    orderItems: hydratedItems,
    shippingAddress,
    paymentMethod,
    status: 'Placed',
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });
  res.status(201).json(order);
};

export const payOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  if (order.isPaid) return res.json(order);
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = { id: `MOCK-${Date.now()}`, status: 'COMPLETED', update_time: new Date().toISOString(), email_address: req.user.email };
  for (const item of order.orderItems) {
    const product = await Product.findById(item.product);
    if (!product || product.countInStock < item.qty) return res.status(400).json({ message: `${item.name} stock unavailable` });
  }
  for (const item of order.orderItems) {
    await Product.findByIdAndUpdate(item.product, { $inc: { countInStock: -item.qty } });
  }
  order.status = 'Received';
  await order.save();
  res.json(order);
};

export const getMyOrders = async (req, res) => res.json(await Order.find({ user: req.user._id }).sort('-createdAt'));

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  res.json(order);
};

export const getAllOrders = async (req, res) => res.json(await Order.find({}).populate('user', 'name email').sort('-createdAt'));

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = req.body.status || order.status;
  if (order.status === 'Delivered') order.deliveredAt = Date.now();
  await order.save();
  res.json(order);
};
