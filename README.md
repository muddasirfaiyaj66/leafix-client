# Leafix 🌱

Leafix is an online nursery website where users can browse, filter, and search for plants, add products to their cart, and make online payments securely via Stripe. The website also features product and category management functionalities for administrators, with real-time updates and options for both online and cash-on-delivery payments.

## 🚀 Features

### 🌿 Product Browsing
- **Advanced Filtering, Pagination, and Searching**: Users can efficiently browse and find products.
- **Product Details**: Comprehensive product details with images, descriptions, prices, ratings, and more.

### 🛒 Shopping Cart
- **Add to Cart**: Users can add products to their cart and manage quantities.
- **Proceed to Checkout**: Secure checkout with Stripe or cash-on-delivery options.
  
### 🛠️ Product and Category Management
- Admin users can create, update, delete, and view products and categories in real-time with optimistic UI updates.

### 💳 Checkout and Payment
- **Stripe Integration** for secure online payments.
- **Cash on Delivery**: An alternative payment option for customers.

## 🛠 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/muddasirfaiyaj66/leafix-client.git


cd leafix-client
```



### 2. Install Dependencies
Leafix uses pnpm for package management.
```bash
pnpm install

```

### 3. Start the Development Server

```bash
pnpm run dev

```

### 4. Create .env.local File
```bash
VITE_IMAGE_HOSTING_KEY=your imgbb hosting key
VITE_BACKEND_URL=https://leafix-server.vercel.app
VITE_STRIPE_PUBLIC_KEY=your stripe public key
```

