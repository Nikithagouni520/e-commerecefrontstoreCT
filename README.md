# MERN E-Commerce Storefront

Amazon/Flipkart style MERN project with user authentication, men/women/kids storefront pages, products, cart, orders, wishlist, reviews, admin CRUD, stock control, and mock payment checkout.

## Run locally

### 1. Install dependencies
```bash
cd mern-ecommerce-storefront
npm install
npm run install-all
```

### 2. Setup MongoDB
Create `server/.env` using `server/.env.example`.

```env
MONGO_URI=mongodb://127.0.0.1:27017/mern_ecommerce_storefront
JWT_SECRET=your_super_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Add sample data
```bash
npm run seed
```

Admin login:
- Email: admin@example.com
- Password: admin123

User login:
- Email: nikitha@example.com
- Password: user123

### 4. Start project
```bash
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## Main Features
- Register/Login with JWT
- Product listing, search, sort, filter, pagination
- Separate navigation pages for Men, Women, and Kids
- Product comparison with similar products
- Product details with reviews
- Cart and wishlist
- Stock unavailable state when quantity becomes 0
- Checkout with mock card payment
- Delivery location form during checkout
- Order history
- Admin dashboard
- Admin user, order, sales, and stock counts
- Admin product create/update/delete
- Admin product name, description, price, photos, and item count management
- Admin order status management
- Role-based protected routes
