import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword ? {
    $or: [
      { name: { $regex: req.query.keyword, $options: 'i' } },
      { brand: { $regex: req.query.keyword, $options: 'i' } },
      { description: { $regex: req.query.keyword, $options: 'i' } }
    ]
  } : {};
  const category = req.query.category ? { category: req.query.category } : {};
  const min = Number(req.query.min) || 0;
  const max = Number(req.query.max) || 10000000;
  const sortMap = { newest: '-createdAt', priceLow: 'price', priceHigh: '-price', rating: '-rating' };
  const filter = { ...keyword, ...category, price: { $gte: min, $lte: max } };
  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter).sort(sortMap[req.query.sort] || '-createdAt').limit(pageSize).skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize), count });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
};

export const createProduct = async (req, res) => {
  const photos = req.body.photos?.length ? req.body.photos : [req.body.image].filter(Boolean);
  const product = await Product.create({ ...req.body, photos, image: req.body.image || photos[0] });
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const photos = req.body.photos?.length ? req.body.photos : [req.body.image].filter(Boolean);
  const product = await Product.findByIdAndUpdate(req.params.id, { ...req.body, photos, image: req.body.image || photos[0] }, { new: true });
  product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
};

export const getSimilarProducts = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const products = await Product.find({
    _id: { $ne: product._id },
    $or: [{ category: product.category }, { brand: product.brand }]
  }).sort({ rating: -1, price: 1 }).limit(4);
  res.json(products);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  await product.deleteOne();
  res.json({ message: 'Product deleted' });
};

export const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
  if (alreadyReviewed) return res.status(400).json({ message: 'Product already reviewed' });
  product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
  await product.save();
  res.status(201).json({ message: 'Review added' });
};
