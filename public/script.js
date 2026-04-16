const API_URL = 'https://silkisland-api.amr-mokhtar301.workers.dev';

// Products data
let products = [];
let cart = [];
let currentCategory = 'All';
let currentLang = 'en';

// Gallery state
let currentImageIndex = {};

// Gallery functions
window.nextImage = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || !product.images || product.images.length <= 1) return;
  
  const current = currentImageIndex[productId] || 0;
  const next = (current + 1) % product.images.length;
  setImage(productId, next);
};

window.prevImage = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || !product.images || product.images.length <= 1) return;
  
  const current = currentImageIndex[productId] || 0;
  const prev = (current - 1 + product.images.length) % product.images.length;
  setImage(productId, prev);
};

window.setImage = function(productId, index) {
  const product = products.find(p => p.id === productId);
  if (!product || !product.images) return;
  
  const gallery = document.getElementById(`gallery-${productId}`);
  if (!gallery) return;
  
  const mainImg = gallery.querySelector('.main-image');
  const dots = gallery.querySelectorAll('.dot');
  
  if (mainImg) mainImg.src = product.images[index];
  currentImageIndex[productId] = index;
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
};

// ========== LIGHTBOX FUNCTIONS ==========
let lightboxProduct = null;
let lightboxIndex = 0;

window.openLightbox = function(productId, imageIndex = 0) {
  const product = products.find(p => p.id === productId);
  if (!product || !product.images || product.images.length === 0) return;
  
  lightboxProduct = product;
  lightboxIndex = imageIndex;
  
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  
  lightboxImg.src = product.images[lightboxIndex];
  counter.textContent = `${lightboxIndex + 1} / ${product.images.length}`;
  lightbox.classList.add('active');
  
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
  lightboxProduct = null;
};

window.lightboxNext = function() {
  if (!lightboxProduct) return;
  lightboxIndex = (lightboxIndex + 1) % lightboxProduct.images.length;
  updateLightboxImage();
};

window.lightboxPrev = function() {
  if (!lightboxProduct) return;
  lightboxIndex = (lightboxIndex - 1 + lightboxProduct.images.length) % lightboxProduct.images.length;
  updateLightboxImage();
};

function updateLightboxImage() {
  const lightboxImg = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  lightboxImg.src = lightboxProduct.images[lightboxIndex];
  counter.textContent = `${lightboxIndex + 1} / ${lightboxProduct.images.length}`;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev();
  if (e.key === 'ArrowRight') lightboxNext();
});

// Translations
const translations = {
  en: { 
    home: '𓋹 Home 𓋹', 
    categories: '▼ Categories', 
    lingerie: 'Lingerie', 
    bath: 'Bath Stuff', 
    towels: 'Towels', 
    hero: 'Where Ancient Elegance Meets Modern Desire', 
    shop: 'Enter the Sanctuary', 
    collection: '𓂀 Sacred Collection 𓂀', 
    cart: 'Your Cart', 
    empty: 'Cart is empty', 
    checkout: 'Proceed to Checkout', 
    about: "Our story begins in the most important place in the world: home. At Silk Island, we believe your quiet moments deserve the very best. That's why we created a sanctuary dedicated to fine textures and discreet elegance. From the sheets that turn your bedroom into a non-stop vacation, to the lingerie pieces that make you feel confident in your own skin, everything we choose has one goal: to bring you joy. We don't just sell products; we sell sensory experiences. We invite you to stop for a moment, choose quality, and... Discover the hidden beauty.", 
    addVariant: '+ Add Another Color/Size', 
    addToCart: 'Add to Cart', 
    size: 'Size', 
    color: 'Color', 
    quantity: 'Quantity' 
  },
  ro: { 
    home: '𓋹 Acasă 𓋹', 
    categories: '▼ Categorii', 
    lingerie: 'Lingerie', 
    bath: 'Produse Baie', 
    towels: 'Prosoape', 
    hero: 'Unde eleganța antică se întâlnește cu dorința modernă', 
    shop: 'Intră în Sanctuar', 
    collection: '𓂀 Colecția Sacră 𓂀', 
    cart: 'Coșul Tău', 
    empty: 'Coșul este gol', 
    checkout: 'Finalizează Comanda', 
    about: "Povestea noastră începe în cel mai important loc din lume: acasă. La Silk Island, credem că momentele tale de liniște merită ce e mai bun. De aceea am creat un sanctuar dedicat texturilor fine și eleganței discrete. De la cearșafurile care transformă dormitorul într-o vacanță non-stop, la piesele de lenjerie care te fac să te simți încrezătoare în propria piele, tot ce alegem are un singur scop: să-ți aducă bucurie. Nu vindem doar produse; vindem experiențe senzoriale. Te invităm să te oprești o clipă, să alegi calitatea și... Descoperă frumusețea ascunsă.", 
    addVariant: '+ Adaugă Altă Culoare/Mărime', 
    addToCart: 'Adaugă în Coș', 
    size: 'Mărime', 
    color: 'Culoare', 
    quantity: 'Cantitate' 
  },
  tr: { 
    home: '𓋹 Ana Sayfa 𓋹', 
    categories: '▼ Kategoriler', 
    lingerie: 'İç Giyim', 
    bath: 'Banyo Ürünleri', 
    towels: 'Havlular', 
    hero: 'Antik Zarafet Modern Arzuyla Buluşuyor', 
    shop: 'Tapınağa Gir', 
    collection: '𓂀 Kutsal Koleksiyon 𓂀', 
    cart: 'Sepetiniz', 
    empty: 'Sepet boş', 
    checkout: 'Ödemeye Geç', 
    about: "Hikayemiz dunyanin en onemli yerinde basliyor: evde. Silk Island'da, sakin anlarinizin en iyisini hak ettigine inaniyoruz. Bu yuzden ince dokulara ve zarif sikliga adanmis bir siginak yarattik. Yatak odanizi kesintisiz bir tatile donusturen carsaflardan, kendinizi teninizde ozguvenli hissetmenizi saglayan ic camasirlarina kadar, sectigimiz her seyin tek bir amaci var: size mutluluk getirmek. Biz sadece urun satmiyoruz; duyusal deneyimler satiyoruz. Sizi bir an durmaya, kaliteyi secmeye ve... Gizli guzelligi kesfetmeye davet ediyoruz.", 
    addVariant: '+ Başka Renk/Beden Ekle', 
    addToCart: 'Sepete Ekle', 
    size: 'Beden', 
    color: 'Renk', 
    quantity: 'Adet' 
  }
};

// Load products from server
async function loadProducts() {
  try {
    const res = await fetch(API_URL + '/api/products');
    products = await res.json();
    console.log('Loaded', products.length, 'products from server');
    renderProducts();
  } catch (e) {
    console.error('Failed to load products:', e);
    products = [
      { id: 1, name: "Isis Silk Robe", price: 289.99, description: "A luxurious silk robe for the ultimate comfort.", category: "Lingerie", image: ["/images/product1.jpg","/images/product5.jpg", "/images/product3.jpg"], sizes: ["S", "M", "L", "XL"], colors: ["Black", "Gold", "Midnight Blue", "Rose"] },
      { id: 2, name: "Cleopatra's Milk Bath", price: 149.99, description: "Experience the ancient Egyptian luxury.", category: "Bath Stuff", image: "/images/product2.jpg", sizes: ["250ml", "500ml", "1000ml"], colors: ["Original", "Rose"] },
      { id: 3, name: "Roman Bath Salts", price: 89.99, description: "Revive your senses with these aromatic salts.", category: "Bath Stuff", image: "/images/product3.jpg", sizes: ["200g", "500g", "1kg"], colors: ["Rose", "Lavender", "Gold"] },
      { id: 4, name: "Golden Anointing Oil", price: 129.99, description: "A premium oil for a luxurious massage experience.", category: "Bath Stuff", image: "/images/product4.jpg", sizes: ["30ml", "50ml", "100ml"], colors: ["Gold", "Midnight Blue"] },
      { id: 5, name: "Nefertiti Lace Set", price: 349.99, description: "Elegance meets comfort in this stunning lace set.", category: "Lingerie", image: "/images/product5.jpg", sizes: ["S", "M", "L"], colors: ["Black", "Rose", "Gold"] }
    ];
    renderProducts();
  }
}

// Render products
function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;
  
  if (!Array.isArray(products)) products = [];
  
  const filteredProducts = currentCategory === 'All' ? products : products.filter(p => p.category === currentCategory);
  const t = translations[currentLang];
  
  container.innerHTML = '';
  
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.id = `product-${product.id}`;
    
    let sizesOptions = '';
    let colorsOptions = '';
    if (product.sizes) product.sizes.forEach(s => sizesOptions += `<option>${s}</option>`);
    if (product.colors) product.colors.forEach(c => colorsOptions += `<option>${c}</option>`);
    
    card.innerHTML = `
      <div class="product-gallery" id="gallery-${product.id}">
  <img src="${product.images?.[0] || product.image}" alt="${product.name}" class="main-image" onclick="openLightbox(${product.id}, 0)">
  ${product.images && product.images.length > 1 ? `
    <div class="gallery-nav gallery-prev" onclick="event.stopPropagation(); prevImage(${product.id})">❮</div>
    <div class="gallery-nav gallery-next" onclick="event.stopPropagation(); nextImage(${product.id})">❯</div>
    <div class="gallery-dots">
      ${product.images.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" onclick="event.stopPropagation(); openLightbox(${product.id}, ${i})"></span>`).join('')}
    </div>
  ` : ''}
</div>
      <h3>${product.name}</h3>
      <div class="price">${product.price} RON</div>
      <div class="variant-group" id="variants-${product.id}">
        <div class="variant-item">
          <label>${t.size}:</label>
          <select class="variant-size">${sizesOptions}</select>
        </div>
        <div class="variant-item">
          <label>${t.color}:</label>
          <select class="variant-color">${colorsOptions}</select>
        </div>
        <div class="variant-item">
          <label>${t.quantity}:</label>
          <input type="number" class="variant-qty" value="1" min="1" max="10">
        </div>
      </div>
      <button class="add-variant-btn" data-id="${product.id}">${t.addVariant}</button>
      <button class="add-to-cart" data-id="${product.id}">${t.addToCart}</button>
    `;
    
    container.appendChild(card);
  });
  
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      addProductToCart(parseInt(this.getAttribute('data-id')));
    });
  });
  
  document.querySelectorAll('.add-variant-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      addVariantRow(parseInt(this.getAttribute('data-id')));
    });
  });
}

function addVariantRow(productId) {
  const variantGroup = document.getElementById(`variants-${productId}`);
  const product = products.find(p => p.id === productId);
  const t = translations[currentLang];
  
  let sizesOptions = '', colorsOptions = '';
  product.sizes.forEach(s => sizesOptions += `<option>${s}</option>`);
  product.colors.forEach(c => colorsOptions += `<option>${c}</option>`);
  
  const newRow = document.createElement('div');
  newRow.className = 'variant-item';
  newRow.innerHTML = `
    <label>${t.size}:</label>
    <select class="variant-size">${sizesOptions}</select>
    <label style="margin-left:10px;">${t.color}:</label>
    <select class="variant-color">${colorsOptions}</select>
    <label style="margin-left:10px;">${t.quantity}:</label>
    <input type="number" class="variant-qty" value="1" min="1" max="10" style="width:60px;">
    <span class="remove-variant" onclick="this.parentElement.remove()">✕</span>
  `;
  variantGroup.appendChild(newRow);
}

function addProductToCart(productId) {
  console.log('Adding product:', productId);
  
  const product = products.find(p => p.id === productId);
  const variantGroup = document.getElementById(`variants-${productId}`);
  
  if (!variantGroup) {
    console.error('Variant group not found');
    return;
  }
  
  const sizeSelect = variantGroup.querySelector('.variant-size');
  const colorSelect = variantGroup.querySelector('.variant-color');
  const qtyInput = variantGroup.querySelector('.variant-qty');
  const variantRows = variantGroup.getElementsByClassName('variant-item');
  
  let added = 0;
  
  if (sizeSelect && colorSelect && qtyInput) {
    const size = sizeSelect.value;
    const color = colorSelect.value;
    const qty = parseInt(qtyInput.value) || 0;
    
    if (qty > 0) {
      cart.push({ id: product.id, name: product.name, price: product.price, size, color, quantity: qty });
      added++;
    }
  }
  
  for (let row of variantRows) {
    const rowSize = row.querySelector('.variant-size');
    const rowColor = row.querySelector('.variant-color');
    const rowQty = row.querySelector('.variant-qty');
    
    if (rowSize && rowColor && rowQty) {
      const size = rowSize.value;
      const color = rowColor.value;
      const qty = parseInt(rowQty.value) || 0;
      
      if (qty > 0) {
        cart.push({ id: product.id, name: product.name, price: product.price, size, color, quantity: qty });
        added++;
      }
    }
  }
  
  if (added > 0) {
    updateCartDisplay();
    localStorage.setItem('silkisland_cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  } else {
    alert('Please set quantity to at least 1');
  }
}

function updateCartDisplay() {
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartItemsDiv = document.getElementById('cart-items');
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const t = translations[currentLang];
  
  if (!cartItemsDiv) return;
  
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<p style="color:#E8A2B4;">${t.empty}</p>`;
  } else {
    cartItemsDiv.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div>${item.name}<br><small>${item.size} / ${item.color} x${item.quantity}</small></div>
        <div>${(item.price * item.quantity).toFixed(2)} RON <span style="cursor:pointer;" onclick="removeCartItem(${i})">✕</span></div>
      </div>
    `).join('');
  }
  
  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.textContent = `Total: ${total.toFixed(2)} RON`;
}

function removeCartItem(index) {
  cart.splice(index, 1);
  updateCartDisplay();
  localStorage.setItem('silkisland_cart', JSON.stringify(cart));
}

function filterProducts(category) {
  currentCategory = category;
  document.getElementById('active-category').textContent = category;
  renderProducts();
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

function showAllProducts() {
  currentCategory = 'All';
  document.getElementById('active-category').textContent = 'All Products';
  renderProducts();
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

function toggleCart() {
  document.getElementById('cart-modal')?.classList.toggle('active');
}

function scrollToProducts() {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

function goToCheckout() {
  if (cart.length === 0) { alert('Cart is empty!'); return; }
  localStorage.setItem('silkisland_cart', JSON.stringify(cart));
  window.location.href = '/checkout.html';
}

function switchLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.querySelector('.home-btn').textContent = t.home;
  document.querySelector('.categories-btn').textContent = t.categories;
  document.querySelector('.hero p').textContent = t.hero;
  document.querySelector('.shop-btn').textContent = t.shop;
  document.querySelector('.products-section h2').textContent = t.collection;
  document.querySelector('.cart-header h2').textContent = '🛒 ' + t.cart;
  document.querySelector('.checkout-btn').textContent = t.checkout;
  document.getElementById('about-text').textContent = t.about;
  const catLinks = document.querySelectorAll('.categories-list a');
  if (catLinks.length >= 3) {
    catLinks[0].textContent = t.lingerie;
    catLinks[1].textContent = t.bath;
    catLinks[2].textContent = t.towels;
  }
  renderProducts();
  updateCartDisplay();
}

// Search functions
function toggleSearch() {
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  if (!modal) return;
  modal.classList.toggle('active');
  if (modal.classList.contains('active') && input) {
    input.focus();
    input.value = '';
    document.getElementById('search-results').innerHTML = '';
  }
}

function performSearch(query) {
  const results = document.getElementById('search-results');
  if (!results) return;
  if (query.length < 2) {
    results.innerHTML = query.length === 0 ? '' : '<p class="no-results">Type at least 2 characters...</p>';
    return;
  }
  const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
  if (filtered.length === 0) {
    results.innerHTML = '<p class="no-results">No products found</p>';
    return;
  }
  results.innerHTML = filtered.map(p => `
    <div class="search-result-card" onclick="selectSearchResult(${p.id})">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="price">${p.price} RON</div>
      <small style="color:#E8A2B4;">${p.category}</small>
    </div>
  `).join('');
}

function selectSearchResult(productId) {
  toggleSearch();
  showAllProducts();
  setTimeout(() => {
    const el = document.getElementById(`product-${productId}`);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); el.style.boxShadow = '0 0 30px #FFD700'; setTimeout(() => el.style.boxShadow = '', 2000); }
  }, 100);
}

// Cart sync
async function syncCartToBackend() {
  await fetch(API_URL + '/api/cart/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart })
  });
}

async function loadCartFromBackend() {
  const response = await fetch(API_URL + '/api/cart/load');
  const data = await response.json();
  cart = data.cart || [];
  updateCartDisplay();
}


// Gallery functions
window.nextImage = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || !product.images || product.images.length <= 1) return;
  
  const current = currentImageIndex[productId] || 0;
  const next = (current + 1) % product.images.length;
  setImage(productId, next);
};

window.prevImage = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || !product.images || product.images.length <= 1) return;
  
  const current = currentImageIndex[productId] || 0;
  const prev = (current - 1 + product.images.length) % product.images.length;
  setImage(productId, prev);
};

window.setImage = function(productId, index) {
  const product = products.find(p => p.id === productId);
  if (!product || !product.images) return;
  
  const gallery = document.getElementById(`gallery-${productId}`);
  if (!gallery) return;
  
  const mainImg = gallery.querySelector('.main-image');
  const dots = gallery.querySelectorAll('.dot');
  
  if (mainImg) mainImg.src = product.images[index];
  currentImageIndex[productId] = index;
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
};

// Initialize
window.onload = function() {
  console.log('Page loaded');
  
  const savedCart = localStorage.getItem('silkisland_cart');
  if (savedCart) cart = JSON.parse(savedCart);
  
  const savedLang = localStorage.getItem('language') || 'en';
  currentLang = savedLang;
  const langSelect = document.getElementById('language-select');
  if (langSelect) langSelect.value = savedLang;
  
  document.getElementById('about-text').textContent = translations[currentLang].about;
  
  loadProducts();
  updateCartDisplay();
  
  if (langSelect) {
    langSelect.addEventListener('change', e => {
      currentLang = e.target.value;
      switchLanguage(currentLang);
      localStorage.setItem('language', currentLang);
    });
  }
  
  switchLanguage(currentLang);
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => performSearch(e.target.value.toLowerCase().trim()));
  }
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('search-modal')?.classList.contains('active')) {
      toggleSearch();
    }
  });
};
