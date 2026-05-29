# E-Commerce Storefront

## Internship Project

### Intern Details

* **Intern Name:** Gouni Nikitha
* **Intern ID:** CITS618
* **Organization:** Codtech IT Solutions Pvt. Ltd
* **Internship Domain:** MERN Stack Web Development
* **Duration:** 8 Weeks
* **Internship Period:** 17 May 2026 – 12 July 2026

---

# Project Title

## E-Commerce Storefront Using MERN Stack

---

# Project Description

E-Commerce Storefront is a full-stack online shopping platform developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application enables users to browse products, search and filter items, add products to cart, manage orders, and perform secure authentication.

The project demonstrates modern web development practices including REST APIs, database management, authentication, responsive design, and state management.

---

# Project Scope

The main objective of this project is to create a scalable and user-friendly online shopping platform that provides:

* Product browsing and searching
* User authentication and authorization
* Shopping cart management
* Order management
* Responsive user interface
* Secure backend APIs
* MongoDB database integration

---

# Features

### User Features

* User Registration
* User Login & Logout
* JWT Authentication
* Product Listing
* Product Search
* Category Filtering
* Product Details Page
* Shopping Cart
* Quantity Management
* Order Placement
* Order History
* Responsive Design

### Admin Features

* Add Products
* Edit Products
* Delete Products
* Manage Orders
* Manage Users
* Dashboard Overview

---

# Technologies Used

## Frontend

* React.js
* Vite
* React Router DOM
* Axios
* CSS3
* HTML5

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js
* CORS

## Database

* MongoDB
* Mongoose

---

# System Architecture

```text
Client (React)
      |
      ▼
Express REST API
      |
      ▼
Node.js Server
      |
      ▼
MongoDB Database
```

---

# Folder Structure

```text
mern-ecommerce-storefront/

├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/Nikithagouni520/e-commerecefrontstoreCT.git
```

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Backend Setup

```bash
cd server
npm install
npm run dev
```

---

Admin login:
- Email: admin@example.com
- - Password: admin123
User login:
- Email: nikitha@example.com
- - Password: user123

# Environment Variables

Create `.env` file inside server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Products

```http
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

### Orders

```http
POST /api/orders
GET /api/orders
```

### Cart

```http
POST /api/cart
GET /api/cart
DELETE /api/cart/:id
```

---

# Screenshots

Add screenshots of:

* Home Page
  <img width="1913" height="908" alt="image" src="https://github.com/user-attachments/assets/cc07ef8e-784b-4f9d-b044-a0ca1d110adc" />

* Product Listing
  <img width="1917" height="909" alt="image" src="https://github.com/user-attachments/assets/bae26ee0-d0df-4da0-99d5-4a02f77763f6" />

* Product Details
  <img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/83501183-3d83-4963-9c16-dcef35541c9c" />

* Login Page
  <img width="1917" height="900" alt="image" src="https://github.com/user-attachments/assets/90c95548-54bc-4097-a93e-711b3622efd6" />

* Cart Page
  <img width="1918" height="908" alt="image" src="https://github.com/user-attachments/assets/17ed25e2-75c3-428c-a538-4db774e5ed01" />

* Checkout Page
  <img width="1917" height="896" alt="image" src="https://github.com/user-attachments/assets/826bf495-662d-49f6-ad84-efd11de4b8be" />

* Admin Dashboard
<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/a78f9c17-f08e-447f-91ce-ef5e8bc4db2c" />

---

# Output Images


* User Registration
  <img width="1916" height="845" alt="image" src="https://github.com/user-attachments/assets/dac54ffd-0254-4e6e-9531-cd99b32ecc92" />

* Product Browsing
*  <img width="1917" height="909" alt="image" src="https://github.com/user-attachments/assets/bae26ee0-d0df-4da0-99d5-4a02f77763f6" />

* Shopping Cart
  <img width="1918" height="908" alt="image" src="https://github.com/user-attachments/assets/17ed25e2-75c3-428c-a538-4db774e5ed01" />

* Order Placement
  <img width="1917" height="896" alt="image" src="https://github.com/user-attachments/assets/826bf495-662d-49f6-ad84-efd11de4b8be" />
---

# Learning Outcomes

Through this project, the following concepts were implemented:

* MERN Stack Development
* REST API Development
* Authentication & Authorization
* MongoDB Database Design
* State Management
* Responsive UI Development
* Full Stack Deployment Workflow

---

# Future Enhancements

* Payment Gateway Integration
* Wishlist Functionality
* Product Reviews & Ratings
* Email Notifications
* Inventory Management
* AI Product Recommendations
* Multi-Vendor Support

---

# Documentation

This project was developed as part of the MERN Stack Web Development Internship conducted by Codtech IT Solutions Pvt. Ltd.

---

# Conclusion

The E-Commerce Storefront project successfully demonstrates the implementation of a complete online shopping platform using the MERN stack. It provides practical experience in frontend development, backend API creation, database integration, authentication, and full-stack application architecture.
