
# 🛍️ AAI Shop — Product Showcase Platform

**Live Demo:** [aaishop-product-showcase.vercel.app](https://aaishop-product-showcase.vercel.app/)

AAI Shop is a **modern e-commerce product showcase platform** built to demonstrate seamless UI/UX design, responsive architecture, and smooth data-driven interactivity using a **React + Express full-stack setup**.

This project highlights clean design, component modularity, and real-world frontend engineering — ideal for both users and recruiters to experience how I structure scalable web apps.

---

## ✨ Key Highlights

| Feature                    | Description                                                           |
| -------------------------- | --------------------------------------------------------------------- |
| 🖥️ **Responsive UI**      | Fully adaptive layout that scales elegantly across devices.           |
| 🛒 **Product Showcase**    | Interactive product grid with images, price, and category filters.    |
| ❤️ **Wishlist System**     | Users can favorite products (auth-gated).                             |
| 🧾 **Cart Functionality**  | Add-to-cart, remove, and quantity management handled in real time.    |
| 🔍 **Smart Search**        | Instant search from the navbar powered by React hooks.                |
| 👤 **Auth Layer**          | Integrated modal-based login/register logic for seamless UX.          |
| 💡 **Reusable Components** | Built with ShadCN UI + Lucide Icons for consistency and reusability.  |
| ⚙️ **Express Backend**     | Provides structured API endpoints for products and wishlist handling. |
| 🚀 **Deployed on Vercel**  | Optimized build pipeline and instant CI/CD deployment.                |

---

## 🏗️ Tech Stack

### **Frontend**

* ⚛️ React + Vite
* 💨 TailwindCSS
* 🧩 ShadCN UI Components
* 🔔 Lucide Icons
* 🧠 React Router, Custom Hooks (`useCart`, `useWishlist`, etc.)

### **Backend**

* 🟩 Node.js + Express.js
* 📦 RESTful APIs serving product data and wishlist endpoints

### **Deployment**

* 🌍 Vercel (Frontend)
* ☁️ Render / Railway / Local Express (Backend configurable)

---

## 📁 Project Structure

```
AAIShop/
├── client/                # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartDrawer.jsx
│   │   └── data/
│   │       └── products.js
│   │   └── hooks/
│   │       └── useCart.js
│   │   └── pages/
│   │       └── Home.jsx
│   └── ...
│
├── server/                # Express backend
│   ├── index.js
│   ├── routes/
│   │   ├── products.js
│   │   └── wishlist.js
│   ├── controllers/
│   │   ├── productController.js
│   │   └── wishlistController.js
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/aaishop.git
cd aaishop
```

### 2️⃣ Install Dependencies

**Frontend:**

```bash
cd client
npm install
```

**Backend:**

```bash
cd server
npm install
```

### 3️⃣ Run Development Servers

**Start Backend (Express):**

```bash
cd server
npm run dev
```

**Start Frontend (Vite):**

```bash
cd client
npm run dev
```

Then open:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🧭 Application Walkthrough

### 🏠 **Home Page**

* Displays dynamic product grid.
* Product cards have hover effects, wishlist buttons, and quick actions.

### 🔍 **Search Bar**

* Live search filters products based on title or category.

### ❤️ **Wishlist**

* Auth-protected: prompts login when unauthenticated.
* Persists items using Express backend + local state hooks.

### 🛒 **Cart Drawer**

* Add, remove, and update quantities.
* React state synchronization ensures smooth transitions.

### 👤 **Auth Modal**

* Triggered via Navbar “User” icon.
* Includes mock authentication workflow for demo.

---

## 🎨 Design Philosophy

> “Simple, minimal, and meaningful interactions.”

* Clean **white-space-based design** with bold typography.
* Smooth transitions (Framer Motion ready).
* Consistent card layouts with unified visual hierarchy.
* Accessibility-first approach (keyboard + ARIA compliant).

---

## 🚀 Deployment

Deployed on **Vercel** for optimal build and serverless hosting.
To deploy your own:

```bash
npm run build
vercel deploy
```

Or connect GitHub directly to Vercel for **CI/CD auto-deployment** on push.

---

## 📈 Future Roadmap

* 🔐 Firebase Authentication integration
* 💳 Stripe Checkout demo integration
* 🧾 Order history and tracking page
* 🌙 Dark mode toggle
* 🧠 AI-driven product recommendation engine

---

|                                               🏠 Home Page                                               |                                               ❤️ Wishlist                                               |                                               🛒 Cart                                               |
| :------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
| ![Home Page Screenshot](<img width="1788" height="787" alt="image" src="https://github.com/user-attachments/assets/bcc7b7ac-dd9a-4d82-ab9c-b8a18c5855d2" />
) | ![Wishlist Screenshot](https://github.com/user-attachments/assets/d3a6d3a5-8bd6-43cd-8f58-c2f31f825bf6) | ![Cart Screenshot](https://github.com/user-attachments/assets/0c06d503-5b92-4d13-a4a1-2c50db0d0042) |


## 🧑‍💻 Author

**👋 AAISHA SULTANA GUDURU**
Frontend & Full Stack Developer
📍 India
🌐 [LinkedIn](https://www.linkedin.com/in/aaisha-sultana-guduru-877b21302/) | [Portfolio](https://aaisha-portfolio-coral.vercel.app/) | [GitHub](https://github.com/gitsish)

> “Code that feels natural to users and scalable to developers.”

---

