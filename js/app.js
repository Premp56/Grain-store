/**
 * Native Grains Store — Core JavaScript
 * Handles: Product data, Cart logic, UI utilities
 * 
 * HOW TO ADD A NEW PRODUCT:
 * Simply add a new object to the PRODUCTS array below.
 * All other pages will automatically show the new product.
 */

// ═══════════════════════════════════════════════════
// PRODUCT DATA
// Replace image URLs with real photos later
// ═══════════════════════════════════════════════════

const PRODUCTS = [
  {
    id: 1,
    name: "Karuppu Kavuni Rice",
    nameTamil: "கருப்பு கவுனி அரிசி",
    category: "rice",
    categoryLabel: "Ancient Rice",
    emoji: "🌾",
    description: "Ancient black rice known for its rich anthocyanin content. Used in royal kitchens, now rediscovered for its exceptional health properties.",
    healthBenefits: ["High in Antioxidants", "Rich in Iron", "Controls Blood Sugar", "Boosts Immunity", "Good for Heart"],
    nutrition: { protein: "8.5g", fiber: "4.2g", iron: "3.5mg", calories: "356 per 100g" },
    stock: 45,
    prices: { "500g": 120, "1kg": 220, "5kg": 980 },
    featured: true,
    organic: true,
    native: true,
    image: "https://placehold.co/600x450/5D3A2C/FAF6EE?text=Karuppu+Kavuni+Rice"
  },
  {
    id: 2,
    name: "Kuthiraivali",
    nameTamil: "குதிரைவாலி",
    category: "millet",
    categoryLabel: "Barnyard Millet",
    emoji: "🌿",
    description: "Barnyard millet — nature's superfood. Fast-cooking, high-protein grain that's perfect for diabetics and weight management.",
    healthBenefits: ["Diabetic-Friendly", "High Protein", "Gluten-Free", "Weight Management", "Rich in Fiber"],
    nutrition: { protein: "11.2g", fiber: "10.1g", iron: "18.6mg", calories: "342 per 100g" },
    stock: 8,
    prices: { "500g": 85, "1kg": 160, "5kg": 720 },
    featured: true,
    organic: true,
    native: true,
    image: "https://placehold.co/600x450/8B7355/FAF6EE?text=Kuthiraivali"
  },
  {
    id: 3,
    name: "Saamai",
    nameTamil: "சாமை",
    category: "millet",
    categoryLabel: "Little Millet",
    emoji: "✨",
    description: "Little millet — tiny grains with mighty benefits. Traditional food of Tamil Nadu with incredible mineral density.",
    healthBenefits: ["Bone Health", "Anti-inflammatory", "Liver Protective", "Detox Support", "High Magnesium"],
    nutrition: { protein: "7.7g", fiber: "7.6g", iron: "9.3mg", calories: "341 per 100g" },
    stock: 62,
    prices: { "500g": 75, "1kg": 140, "5kg": 640 },
    featured: false,
    organic: true,
    native: true,
    image: "https://placehold.co/600x450/B8A060/FAF6EE?text=Saamai"
  },
  {
    id: 4,
    name: "Ragi",
    nameTamil: "ராகி",
    category: "millet",
    categoryLabel: "Finger Millet",
    emoji: "💪",
    description: "Finger millet — the calcium king. Best plant source of calcium, traditionally given to children and lactating mothers.",
    healthBenefits: ["Highest Plant Calcium", "Bone Strength", "Prevents Anemia", "Baby Food Safe", "Reduces Cholesterol"],
    nutrition: { protein: "7.3g", fiber: "3.6g", calcium: "344mg", calories: "336 per 100g" },
    stock: 120,
    prices: { "500g": 65, "1kg": 120, "5kg": 540 },
    featured: true,
    organic: false,
    native: false,
    image: "https://placehold.co/600x450/8B6340/FAF6EE?text=Ragi"
  },
  {
    id: 5,
    name: "Thinai",
    nameTamil: "தினை",
    category: "millet",
    categoryLabel: "Foxtail Millet",
    emoji: "🌱",
    description: "Foxtail millet — ancient grain of Tamil Sangam era. Mentioned in Sangam literature, rich in complex carbohydrates.",
    healthBenefits: ["Slow Energy Release", "Thyroid Friendly", "Kidney Health", "Nervous System", "Anti-Microbial"],
    nutrition: { protein: "12.3g", fiber: "8.0g", iron: "2.8mg", calories: "351 per 100g" },
    stock: 0,
    prices: { "500g": 80, "1kg": 150, "5kg": 680 },
    featured: false,
    organic: true,
    native: true,
    image: "https://placehold.co/600x450/C4A45A/FAF6EE?text=Thinai"
  },
  {
    id: 6,
    name: "Varagu",
    nameTamil: "வரகு",
    category: "millet",
    categoryLabel: "Kodo Millet",
    emoji: "🌾",
    description: "Kodo millet — the gut healer. Exceptional dietary fiber content aids digestion and promotes a healthy microbiome.",
    healthBenefits: ["Gut Health", "Probiotic Support", "Blood Pressure Control", "Antioxidant Rich", "Stress Reduction"],
    nutrition: { protein: "8.3g", fiber: "9.8g", iron: "0.5mg", calories: "309 per 100g" },
    stock: 35,
    prices: { "500g": 80, "1kg": 150, "5kg": 670 },
    featured: false,
    organic: true,
    native: true,
    image: "https://placehold.co/600x450/9E8060/FAF6EE?text=Varagu"
  },
  {
    id: 7,
    name: "Mapillai Samba Rice",
    nameTamil: "மாப்பிள்ளை சம்பா",
    category: "rice",
    categoryLabel: "Heritage Rice",
    emoji: "👨‍🌾",
    description: "The Groom's Rice — traditionally given to strengthen young men. Deep red variety with exceptional iron and energy content.",
    healthBenefits: ["Iron Rich", "Energy Booster", "Reproductive Health", "Stamina Building", "Traditional Medicine"],
    nutrition: { protein: "8.5g", fiber: "3.8g", iron: "4.8mg", calories: "362 per 100g" },
    stock: 18,
    prices: { "500g": 135, "1kg": 250, "5kg": 1100 },
    featured: true,
    organic: true,
    native: true,
    image: "https://placehold.co/600x450/7A3E2C/FAF6EE?text=Mapillai+Samba"
  },
  {
    id: 8,
    name: "Traditional Idli Rice",
    nameTamil: "இட்லி அரிசி",
    category: "rice",
    categoryLabel: "Idli Rice",
    emoji: "🍚",
    description: "Specially selected parboiled rice for the fluffiest idlis. Our traditional variety gives authentic taste and perfect texture.",
    healthBenefits: ["Easily Digestible", "Fermentation-Ready", "Gut Friendly", "Rich in B Vitamins", "Good Texture"],
    nutrition: { protein: "6.8g", fiber: "0.6g", iron: "0.8mg", calories: "347 per 100g" },
    stock: 200,
    prices: { "500g": 55, "1kg": 100, "5kg": 450 },
    featured: false,
    organic: false,
    native: true,
    image: "https://placehold.co/600x450/E8D4A0/3D2B1F?text=Idli+Rice"
  },
  {
    id: 9,
    name: "Traditional Ponni Rice",
    nameTamil: "பொன்னி அரிசி",
    category: "rice",
    categoryLabel: "Premium Rice",
    emoji: "⭐",
    description: "Tamil Nadu's most beloved rice variety. Soft, aromatic, and perfect for everyday meals. Sourced from Cauvery delta farmers.",
    healthBenefits: ["Easy to Digest", "Soft Texture", "Aromatic", "Balanced Nutrition", "Farmer-Direct"],
    nutrition: { protein: "6.4g", fiber: "0.4g", iron: "0.6mg", calories: "345 per 100g" },
    stock: 300,
    prices: { "500g": 60, "1kg": 110, "5kg": 490 },
    featured: false,
    organic: false,
    native: true,
    image: "https://placehold.co/600x450/F0E4C0/3D2B1F?text=Ponni+Rice"
  }
];

// ═══════════════════════════════════════════════════
// CART MANAGEMENT
// ═══════════════════════════════════════════════════

const Cart = {
  // Load cart from localStorage
  items: JSON.parse(localStorage.getItem('nativeGrains_cart') || '[]'),

  // Save cart to localStorage
  save() {
    localStorage.setItem('nativeGrains_cart', JSON.stringify(this.items));
    this.updateUI();
  },

  // Add item to cart
  add(productId, weight, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const key = `${productId}-${weight}`;
    const existing = this.items.find(i => i.key === key);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        key,
        productId,
        name: product.name,
        image: product.image,
        weight,
        price: product.prices[weight],
        quantity
      });
    }

    this.save();
    showToast(`${product.name} (${weight}) added to cart! 🛒`, 'success');
  },

  // Remove item from cart
  remove(key) {
    this.items = this.items.filter(i => i.key !== key);
    this.save();
  },

  // Update quantity
  setQty(key, qty) {
    const item = this.items.find(i => i.key === key);
    if (!item) return;
    if (qty <= 0) {
      this.remove(key);
    } else {
      item.quantity = qty;
      this.save();
    }
  },

  // Calculate subtotal
  subtotal() {
    return this.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  },

  // Shipping cost
  shipping() {
    const sub = this.subtotal();
    if (sub === 0) return 0;
    return sub >= 500 ? 0 : 60;
  },

  // Total including shipping
  total() {
    return this.subtotal() + this.shipping();
  },

  // Total item count
  count() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  },

  // Update cart badge and re-render sidebar if open
  updateUI() {
    const badge = document.querySelector('.cart-badge');
    const count = this.count();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
    renderCartSidebar();
  }
};

// ═══════════════════════════════════════════════════
// CART SIDEBAR RENDERING
// ═══════════════════════════════════════════════════

function renderCartSidebar() {
  const container = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('cartSubtotal');
  const shippingEl = document.getElementById('cartShipping');
  const totalEl    = document.getElementById('cartTotal');
  if (!container) return;

  if (Cart.items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <h4>Your cart is empty</h4>
        <p class="mt-2 text-sm text-gray">Add some healthy grains to get started!</p>
      </div>`;
  } else {
    container.innerHTML = Cart.items.map(item => `
      <div class="cart-item" id="ci-${item.key.replace(/[^a-z0-9]/gi,'-')}">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-variant">${item.weight}</div>
          <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
          <div class="qty-control">
            <button class="qty-btn" onclick="Cart.setQty('${item.key}', ${item.quantity - 1})">−</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" onclick="Cart.setQty('${item.key}', ${item.quantity + 1})">+</button>
          </div>
          <button class="cart-item-remove" onclick="Cart.remove('${item.key}')">✕ Remove</button>
        </div>
      </div>`).join('');
  }

  const fmt = n => `₹${n.toLocaleString('en-IN')}`;
  if (subtotalEl) subtotalEl.textContent = fmt(Cart.subtotal());
  if (shippingEl) shippingEl.textContent = Cart.shipping() === 0 ? 'FREE' : fmt(Cart.shipping());
  if (totalEl)    totalEl.textContent    = fmt(Cart.total());
}

// ═══════════════════════════════════════════════════
// CART SIDEBAR OPEN/CLOSE
// ═══════════════════════════════════════════════════

function openCart() {
  document.getElementById('cartSidebar')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartSidebar();
}

function closeCart() {
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════════
// PRODUCT CARD RENDERER
// ═══════════════════════════════════════════════════

function getStockStatus(stock) {
  if (stock === 0)  return { label: 'Out of Stock', cls: 'out',    text: 'out-stock-text' };
  if (stock <= 10)  return { label: 'Low Stock',    cls: 'low',    text: 'low-stock-text' };
  return               { label: 'In Stock',      cls: 'in',     text: 'in-stock-text' };
}

function renderProductCard(product, defaultWeight = '1kg') {
  const status = getStockStatus(product.stock);
  const price  = product.prices[defaultWeight];
  const isOut  = product.stock === 0;

  return `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-badges">
          ${product.organic ? '<span class="badge badge-organic">🌿 Organic</span>' : ''}
          ${product.native  ? '<span class="badge badge-native">🏺 Native</span>'   : ''}
        </div>
        <button class="product-wish" title="Add to wishlist">🤍</button>
      </div>
      <div class="product-info">
        <div class="product-category">${product.categoryLabel}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-desc">${product.description}</div>
        <div class="product-stock">
          <span class="stock-dot ${status.cls}"></span>
          <span class="text-sm ${status.cls === 'in' ? 'text-success' : status.cls === 'low' ? '' : 'text-danger'}"
                style="${status.cls === 'low' ? 'color:#856404' : ''}">
            ${status.label}${product.stock > 0 && product.stock <= 10 ? ` (${product.stock} left)` : ''}
          </span>
        </div>
        <div class="product-footer">
          <div class="product-price-area">
            <div class="product-price">₹${price.toLocaleString('en-IN')}</div>
            <div class="product-unit">per ${defaultWeight}</div>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <button class="btn btn-sm btn-outline"
                    onclick="window.location='pages/product.html?id=${product.id}'"
                    style="padding:8px 12px;font-size:0.78rem">Details</button>
            <button class="add-cart-btn" ${isOut ? 'disabled' : ''}
                    onclick="Cart.add(${product.id}, '${defaultWeight}')">
              ${isOut ? '✗ Sold Out' : '+ Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════════════
// TOAST NOTIFICATIONS
// ═══════════════════════════════════════════════════

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>${message}`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(20px)'; toast.style.transition = '0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function createToastContainer() {
  const div = document.createElement('div');
  div.id = 'toastContainer';
  div.className = 'toast-container';
  document.body.appendChild(div);
  return div;
}

// ═══════════════════════════════════════════════════
// NAVBAR — scroll effect & hamburger
// ═══════════════════════════════════════════════════

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu?.classList.remove('open'));
  });

  // Update active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes(currentPage) || (currentPage === 'index.html' && href === '#') ||
        (currentPage === '' && href === '#')) {
      link.classList.add('active');
    }
  });
}

// ═══════════════════════════════════════════════════
// SEARCH FUNCTIONALITY
// ═══════════════════════════════════════════════════

function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.product-desc')?.textContent.toLowerCase() || '';
      const cat  = card.querySelector('.product-category')?.textContent.toLowerCase() || '';
      card.style.display = (!query || name.includes(query) || desc.includes(query) || cat.includes(query)) ? '' : 'none';
    });
  });
}

// ═══════════════════════════════════════════════════
// FILTER CHIPS
// ═══════════════════════════════════════════════════

function initFilters() {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = (!filter || filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });
}

// ═══════════════════════════════════════════════════
// SHARED NAVBAR HTML — injected into all pages
// ═══════════════════════════════════════════════════

function injectNavbar(basePath = '') {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const root = basePath || '';
  nav.innerHTML = `
    <div class="container">
      <div class="nav-inner">
        <a href="${root}index.html" class="nav-logo">
          <div class="logo-icon">🌾</div>
          Native Grains Store
        </a>
        <nav class="nav-links">
          <a href="${root}index.html" class="nav-link">Home</a>
          <a href="${root}pages/products.html" class="nav-link">Products</a>
          <a href="${root}pages/about.html" class="nav-link">About Us</a>
          <a href="${root}pages/contact.html" class="nav-link">Contact</a>
          <a href="${root}admin/index.html" class="nav-link">Admin</a>
        </nav>
        <div class="nav-actions">
          <div class="search-bar">
            <span>🔍</span>
            <input type="text" id="searchInput" placeholder="Search grains...">
          </div>
          <button class="cart-btn" onclick="openCart()">
            🛒
            <span class="cart-badge" style="display:none">0</span>
          </button>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
      <div class="search-bar" style="border-radius:12px;margin-bottom:8px">
        <span>🔍</span>
        <input type="text" placeholder="Search grains..." style="width:100%">
      </div>
      <a href="${root}index.html" class="nav-link">🏠 Home</a>
      <a href="${root}pages/products.html" class="nav-link">🛍️ Products</a>
      <a href="${root}pages/about.html" class="nav-link">🌿 About Us</a>
      <a href="${root}pages/contact.html" class="nav-link">📞 Contact</a>
      <a href="${root}admin/index.html" class="nav-link">⚙️ Admin</a>
      <div style="padding:16px 0">
        <button class="btn btn-primary w-full" onclick="openCart()">🛒 View Cart</button>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════════════
// SHARED CART SIDEBAR HTML — injected into all pages
// ═══════════════════════════════════════════════════

function injectCartSidebar(basePath = '') {
  const existing = document.getElementById('cartSidebar');
  if (existing) return;

  document.body.insertAdjacentHTML('beforeend', `
    <div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>
    <aside class="cart-sidebar" id="cartSidebar">
      <div class="cart-header">
        <h3>🛒 Your Cart</h3>
        <button class="cart-close-btn" onclick="closeCart()">✕</button>
      </div>
      <div class="cart-items" id="cartItems"></div>
      <div class="cart-footer">
        <div class="cart-subtotal">
          <span>Subtotal</span>
          <span id="cartSubtotal">₹0</span>
        </div>
        <div class="cart-subtotal">
          <span>Shipping</span>
          <span id="cartShipping">₹60</span>
        </div>
        <div class="cart-total">
          <span>Total</span>
          <span id="cartTotal">₹0</span>
        </div>
        <p class="text-xs text-gray" style="margin-bottom:12px;text-align:center">
          🎉 Free shipping on orders above ₹500
        </p>
        <button class="checkout-btn"
                onclick="window.location='${basePath}pages/checkout.html'">
          Proceed to Checkout →
        </button>
      </div>
    </aside>
    <div class="toast-container" id="toastContainer"></div>`);
}

// ═══════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════

function formatPrice(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function getUrlParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// ═══════════════════════════════════════════════════
// INIT — runs on every page load
// ═══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Detect if we're in a subdirectory
  const inSubDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/admin/');
  const base = inSubDir ? '../' : '';

  injectNavbar(base);
  injectCartSidebar(base);
  initNavbar();
  initSearch();
  initFilters();

  // Initialize cart badge
  Cart.updateUI();
});
