# Platzi Store - React eCommerce App

## 📌 Project Description

Platzi Store is an eCommerce application built using React, Redux Toolkit, and React Router. It allows users to browse products, add them to a cart, proceed to checkout, and manage authentication via an API.

## 🚀 Features

✅ **Browse product listings** with filtering and pagination  
✅ **Product detail page**  
✅ **Add products to cart** (stored in `localStorage` for session duration)  
✅ **Checkout page (mock implementation)**  
✅ **User registration and authentication** via JWT  
✅ **Redirect after login** to `Home` and display the logged-in user's name  
✅ **Dynamic Header** displaying the cart item count  
✅ **Responsive UI for mobile and desktop devices**

## 📂 Project Structure

```
platzi-store/
│── public/
│   ├── assets/ (static images)
|   ├── index.html
│── src/
│   ├── api/ (axios configuration for API)
│   ├── components/ (reusable UI components)
│   ├── pages/ (application pages)
│   ├── store/ (Redux Toolkit state management)
│   ├── styles/ (CSS files)
|   ├── App.js
|   ├── index.js
│── .gitignore
├── package-lock.json
│── package.json
│── README.md
```

## 🔧 Technologies Used

- **React** (functional components, hooks)
- **Redux Toolkit** (state management for cart, authentication, filters)
- **React Router** (multi-page routing)
- **Axios** (API requests to FakeAPI Platzi Store)
- **CSS (responsive design)**

## 📦 Installation and Setup

1. Clone the repository (SSH) :
   ```sh
   git clone git@github.com:op117/platzi-store.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the local server:
   ```sh
   npm start
   ```
4. The application will be available at: `http://localhost:3000/`

## 🛠 How to Use

1. **Register** or log in.
2. **Browse products**, filter them, and add to the cart.
3. **Go to the cart** to review added items.
4. **Proceed to checkout** (mock implementation).

## 📌 API (FakeAPI Platzi Store)

We use `https://fakeapi.platzi.com/`, which provides:

- `GET /products` — fetch product list
- `GET /products/:id` — fetch product details
- `POST /users` — register a new user
- `POST /auth/login` — authenticate (JWT token)
- `GET /auth/profile` — fetch authenticated user profile
