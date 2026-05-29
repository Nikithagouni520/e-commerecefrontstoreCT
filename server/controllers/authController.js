import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const tokenFor = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
const userPayload = (user) => ({ _id: user._id, name: user.name, email: user.email, role: user.role, address: user.address, token: tokenFor(user._id) });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ name, email, password });
  res.status(201).json(userPayload(user));
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) return res.json(userPayload(user));
  res.status(401).json({ message: 'Invalid email or password' });
};

export const me = async (req, res) => res.json(req.user);
