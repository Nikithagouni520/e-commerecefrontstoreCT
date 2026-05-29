import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    qty: Number,
    price: Number
  }],
  shippingAddress: { street: String, city: String, state: String, pincode: String, phone: String },
  paymentMethod: { type: String, default: 'Mock Card' },
  paymentResult: { id: String, status: String, update_time: String, email_address: String },
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  status: { type: String, enum: ['Placed', 'Received', 'Packed', 'Shipped', 'Delivered', 'Cancelled'], default: 'Placed' },
  deliveredAt: Date
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
