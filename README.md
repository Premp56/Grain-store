# 🌾 Native Grains Store — Complete E-Commerce Website

A fully-featured, mobile-friendly e-commerce website for selling traditional South Indian
rice varieties and healthy grains, built with HTML + CSS + JavaScript.

---

## 📁 Folder Structure

```
native-grains/
│
├── index.html              ← Home page
│
├── css/
│   └── style.css           ← All styles (design system, components, responsive)
│
├── js/
│   └── app.js              ← Core logic (products, cart, shared components)
│
├── pages/
│   ├── products.html       ← All products listing with filters & sort
│   ├── product.html        ← Single product detail page (uses ?id=1 URL param)
│   ├── checkout.html       ← Checkout with delivery form + payment options
│   ├── about.html          ← About Us page
│   └── contact.html        ← Contact page with FAQ
│
└── admin/
    └── index.html          ← Admin dashboard (products, orders, stock, analytics)
```

---

## 🚀 How to Run Locally

### Option 1: Open Directly in Browser (Simplest)
```bash
# Just double-click index.html in your file manager
# Or right-click → Open with → Browser
```

### Option 2: Use VS Code Live Server (Recommended)
1. Install VS Code: https://code.visualstudio.com
2. Install the "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"
4. Site opens at http://127.0.0.1:5500

### Option 3: Python HTTP Server
```bash
cd native-grains/
python3 -m http.server 8000
# Then open http://localhost:8000
```

### Option 4: Node.js (if installed)
```bash
npx serve native-grains/
# Or: npx http-server native-grains/
```

---

## ➕ How to Add New Products

**Method 1: Edit the code (permanent)**

Open `js/app.js` and add a new object to the `PRODUCTS` array:

```javascript
{
  id: 10,                              // Unique number (increment from last)
  name: "Your Product Name",
  nameTamil: "தமிழ் பெயர்",
  category: "millet",                  // "rice" or "millet"
  categoryLabel: "Your Category",
  emoji: "🌾",
  description: "Brief description of the product...",
  healthBenefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
  nutrition: { protein: "10g", fiber: "5g", iron: "2mg", calories: "350 per 100g" },
  stock: 50,
  prices: { "500g": 80, "1kg": 150, "5kg": 680 },
  featured: true,                      // Shows on home page if true
  organic: true,
  native: true,
  image: "https://your-image-url.com/image.jpg"  // Or placeholder below
},
```

**Placeholder image URL format:**
```
https://placehold.co/600x450/8B7355/FAF6EE?text=Your+Product+Name
```
Change the hex colors: first = background, second = text color.

**Method 2: Use Admin Dashboard (runtime only)**
1. Go to `admin/index.html`
2. Click "Products" in sidebar
3. Click "+ Add New Product"
4. Fill form and save

> ⚠️ Admin changes are saved to browser localStorage only. To make permanent,
> copy the data into the PRODUCTS array in `js/app.js`.

---

## 💳 How to Connect Payment Gateways

### Razorpay (Recommended for India)
```javascript
// 1. Sign up at https://razorpay.com and get API keys

// 2. Add this script to checkout.html <head>:
// <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

// 3. In placeOrder() function in checkout.html, replace the comment with:
const options = {
  key: "rzp_live_YOUR_KEY_HERE",       // Your Razorpay key
  amount: Cart.total() * 100,          // Amount in paise
  currency: "INR",
  name: "Native Grains Store",
  description: "Order Payment",
  handler: function(response) {
    // Payment successful — create order in your backend
    console.log(response.razorpay_payment_id);
    showSuccessModal(response.razorpay_payment_id);
  },
  prefill: {
    name:  document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    contact: document.getElementById('phone').value,
  },
  theme: { color: "#C4714A" }
};
const rzp = new window.Razorpay(options);
rzp.open();
```

### UPI Payment
```javascript
// For UPI deep link (works on mobile):
const upiId    = "yourname@paytm";   // Your UPI ID
const amount   = Cart.total();
const name     = "Native Grains Store";
const upiLink  = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
window.location.href = upiLink;
```

### Cash on Delivery
COD is already implemented in the checkout page. A ₹30 COD fee is added automatically.

---

## 🤖 Automation-Friendly API Structure

This site is built to easily connect with a backend API. Here's the structure:

### Add Backend (FastAPI example)
```python
# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])

@app.get("/api/products")
def get_products():
    # Return products from database
    return {"products": [...]}

@app.post("/api/orders")
def create_order(order: dict):
    # Save order, send WhatsApp notification
    return {"order_id": "NG-2025-XXXX", "status": "confirmed"}

@app.put("/api/products/{id}/stock")
def update_stock(id: int, stock: int):
    # Update stock in database
    return {"id": id, "stock": stock}
```

### WhatsApp Order Notifications
```python
# Using Twilio WhatsApp API or Meta WhatsApp Business API
import requests

def send_whatsapp(phone, message):
    # Twilio
    requests.post(
        "https://api.twilio.com/2010-04-01/Accounts/ACXXXX/Messages",
        data={"From": "whatsapp:+14155238886", "To": f"whatsapp:{phone}", "Body": message},
        auth=("ACXXXX", "auth_token")
    )
```

### Auto Stock Update
```python
# Auto-update stock when order is placed
@app.post("/api/orders")
def create_order(order: dict):
    for item in order['items']:
        # Reduce stock in database
        db.execute("UPDATE products SET stock = stock - ? WHERE id = ?",
                   [item['quantity'], item['product_id']])
    return {"status": "ok"}
```

---

## 📱 Features Summary

| Feature | Status |
|---------|--------|
| Product listing with filters | ✅ |
| Product detail pages | ✅ |
| Cart sidebar (add/remove/qty) | ✅ |
| Cart persists across pages | ✅ (localStorage) |
| Checkout with delivery form | ✅ |
| Payment options (structure) | ✅ |
| Order confirmation | ✅ |
| Admin dashboard | ✅ |
| Add/Edit/Delete products | ✅ (Admin) |
| Stock management | ✅ (Admin) |
| Order status management | ✅ (Admin) |
| Search bar | ✅ |
| Category filters | ✅ |
| Sort products | ✅ |
| Mobile responsive | ✅ |
| Toast notifications | ✅ |
| Coupon codes | ✅ |
| WhatsApp integration | ✅ (link) |
| Newsletter signup | ✅ |
| SEO meta tags | ✅ |
| About Us page | ✅ |
| Contact page + FAQ | ✅ |

---

## 🎨 Customization

### Change Business Name
Search and replace "Native Grains Store" in all HTML files.

### Change Colors
Edit CSS variables in `css/style.css` at the top:
```css
:root {
  --clay:  #C4714A;   /* Main brand color */
  --sage:  #6B7F5E;   /* Secondary color */
  --soil:  #3D2B1F;   /* Dark text/background */
  --cream: #FAF6EE;   /* Background */
}
```

### Change Contact Info
Search for "+91 99999 00000" and "hello@nativegrains.store" across all HTML files.

### Replace Images
Replace placeholder URLs in `js/app.js` PRODUCTS array with real product photos:
```javascript
image: "https://your-cdn.com/real-product-image.jpg"
```
Recommended image size: 600×450px (4:3 ratio)

---

## 📞 Support

For questions or customization help:
- WhatsApp: +91 99999 00000
- Email: hello@nativegrains.store

---

*Built with ❤️ for Native Grains Store, Thanjavur, Tamil Nadu*
