# NavaCart

NavaCart is a full-stack e-commerce website built using the MERN Stack. This project was created to practice full-stack web development by combining React, Node.js, Express.js, and MongoDB. It includes the basic features of an online shopping website for both customers and administrators.

## Features

### User
- Register and Login
- View Products
- Search Products
- View Product Details
- Add Products to Cart
- Update Cart
- Remove Products from Cart
- Place Orders
- View Order History

### Admin
- Add New Products
- Update Products
- Delete Products
- Manage Categories
- View Customer Orders

## Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js

## Project Structure

navacart
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
└── README.md


## Installation

Clone the repository

```bash
git clone [https://github.com/shah853/navacart.git](https://github.com/shah853/navacart.git)
Go to the project folder

Bash
cd navacart
Install frontend dependencies

Bash
cd client
npm install
Install backend dependencies

Bash
cd ../server
npm install
Environment Variables
Create a .env file inside the server folder and add:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the Project
Start the backend

Bash
cd server
npm run dev
Start the frontend

Bash
cd client
npm run dev
The frontend will run on:

http://localhost:5173
The backend will run on:

http://localhost:5000
Future Plans
Stripe Payment Integration

Wishlist

Product Reviews

Email Notifications

Better Admin Dashboard

Author
Muhammad Shah
BS Computer Science Student
Learning MERN Stack Development
