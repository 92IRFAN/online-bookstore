# 🌐 Live Demo [Bookstore](https://bms-client-alpha.vercel.app)

# 📚 Online Bookstore Management System

An advanced online bookstore built with the MERN stack allowing users to browse, purchase, and manage books, while giving admins full control over inventory, orders, and customers.

---

## 💡 About this Project

This project is divided into three main parts: **Client**, **Admin**, and **Backend**.  
Users can browse a wide variety of books, add them to the cart or wishlist, make secure payments using **Stripe**, and manage their profiles and order history.  
The Admin side includes full access to manage books, users, and orders including invoice generation, order tracking, and book editing tools.

The project is fully responsive, scalable, and built using modular and reusable code practices. It's a complete e-commerce solution tailored for book-selling businesses.

---

## ⚡ Technologies

- `MongoDB`
- `Express.js`
- `React.js`
- `Node.js`
- `Redux Toolkit`
- `Tailwind CSS`
- `Cloudinary`
- `Stripe API`

---

## 🛠 Dependencies

- `React Router`
- `Axios`
- `React Toastify`
- `React Hook Form`
- `React Icons`
- `DaisyUI`

---

## 📂 Folder Structure

```
/admin     → Admin-side React app
/client    → Client-side React app
/server    → Node.js Express backend
```

---

## 🛠️ Getting Started

### Clone the repository

```bash
git clone https://github.com/92IRFAN/online-bookstore.git
cd online-bookstore
```

---

## 🚦 Running the Project

To run the project locally, follow these steps: ⬇️

### 1️⃣ Install Dependencies

#### Admin App

```bash
cd admin
npm install
```

#### Client App

```bash
cd ../client
npm install
```

#### Server

```bash
cd ../server
npm install
```

---

### 2️⃣ Start the Applications

#### Start Server

```bash
cd server
npm run server
```

#### Start Admin

```bash
cd ../admin
npm run dev
```
Admin runs on: `http://localhost:5174`

#### Start Client

```bash
cd ../client
npm run dev
```
Client runs on: `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in the `/server` directory:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in the `/admin` directory:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_CLOUDINARY_UPLOAD_URL=your_upload_url
VITE_API_URL=http://localhost:5000/api
```

Create a `.env` file in the `/client` directory:

```env
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Reinstalling Dependencies

If `node_modules` is missing in any folder, run:

```bash
npm install
```

---
