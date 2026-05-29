import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const populatedCart = (userId) => Cart.findOne({ user: userId }).populate('items.product');

export const getCart = async (req, res) => {
  let cart = await populatedCart(req.user._id);
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
  res.json(await populatedCart(req.user._id));
};

export const addToCart = async (req, res) => {
  const { productId, qty = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.countInStock < qty) return res.status(400).json({ message: 'Stock unavailable' });
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
  const item = cart.items.find(i => i.product.toString() === productId);
  const nextQty = item ? item.qty + Number(qty) : Number(qty);
  if (product.countInStock < nextQty) return res.status(400).json({ message: `Only ${product.countInStock} items available` });
  item ? item.qty = nextQty : cart.items.push({ product: productId, qty: nextQty });
  await cart.save();
  res.status(201).json(await populatedCart(req.user._id));
};

export const updateCartItem = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const cart = await Cart.findOne({ user: req.user._id });
  const item = cart?.items.find(i => i.product.toString() === req.params.productId);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  const qty = Math.max(1, Number(req.body.qty));
  if (product.countInStock < qty) return res.status(400).json({ message: `Only ${product.countInStock} items available` });
  item.qty = qty;
  await cart.save();
  res.json(await populatedCart(req.user._id));
};

export const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  await cart.save();
  res.json(await populatedCart(req.user._id));
};

export const clearCart = async (req, res) => {
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] }, { upsert: true });
  res.json({ message: 'Cart cleared' });
};
