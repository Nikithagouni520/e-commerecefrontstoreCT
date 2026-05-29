import Wishlist from '../models/Wishlist.js';

export const getWishlist = async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
  if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });
  res.json(await Wishlist.findOne({ user: req.user._id }).populate('products'));
};

export const toggleWishlist = async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });
  const exists = wishlist.products.find(p => p.toString() === productId);
  wishlist.products = exists ? wishlist.products.filter(p => p.toString() !== productId) : [...wishlist.products, productId];
  await wishlist.save();
  res.json(await Wishlist.findOne({ user: req.user._id }).populate('products'));
};
