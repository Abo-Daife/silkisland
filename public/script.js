const API_URL = 'https://silkisland-api.amr-mokhtar301.workers.dev';

// ========== STATE ==========
let products = [];
let cart = [];
let favorites = JSON.parse(localStorage.getItem('silkisland_favorites') || '[]');
let currentCategory = 'All';
let currentLang = localStorage.getItem('language') || 'en';
let currentImageIndex = {};

// ========== TRANSLATIONS ==========
const translations = {
  en: {
    brand: 'SILKISLAND',
    home: 'Home',
    collections: 'Collections',
    legacy: 'Our Legacy',
    hero_tagline: 'Where Ancient Elegance Meets Modern Desire',
    enter_atrium: 'Enter the Atrium',
    private_collection: 'The Private Collection',
    all_products: 'All Products',
    sanctuary_whispers: 'Sanctuary Whispers',
    your_selection: 'Your Selection',
    total: 'Total',
    proceed_checkout: 'Proceed to Checkout',
    explore: 'Explore',
    support: 'Support',
    follow: 'Follow',
    track_order: 'Track Order',
    size_guide: 'Size Guide',
    favorites: 'Favorites',
    empty_favorites: 'Your collection awaits',
    add_to_cart: 'Add to Cart',
    size: 'Size',
    color: 'Color',
    quantity: 'Quantity',
    add_variant: '+ Add Another Color/Size',
    cart_empty: 'Your selection is empty',
    about_text: 'SilkIsland blends the mystique of ancient elegance with modern desire.',
    search_placeholder: 'Find your essence...',
    type_min_2: 'Type at least 2 characters...',
    no_results: 'No products found',
    login: 'Sign In',
    register: 'Create Account',
    email: 'Email',
    password: 'Password',
    name: 'Full Name',
    phone: 'Phone',
    address: 'Address',
    logout: 'Leave Sanctuary',
    my_atrium: 'My Atrium',
    order_history: 'Order History',
    admin_panel: 'Admin Panel',
    cash_delivery: 'Cash on Delivery',
    card_payment: 'Card / Google Pay',
    complete_purchase: 'Complete Purchase',
    shipping_details: 'Shipping Details',
    order_summary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Private Courier',
    free_shipping: 'FREE',
    delivery_fee_notice: '* delivery fee is not included',
    encrypted_protocol: 'Encrypted through the Aurelian Security Protocol'
  },
  ro: {
    brand: 'SILKISLAND',
    home: 'Acasă',
    collections: 'Colecții',
    legacy: 'Moștenirea',
    hero_tagline: 'Unde Eleganța Antică Întâlnește Dorința Modernă',
    enter_atrium: 'Intră în Atrium',
    private_collection: 'Colecția Privată',
    all_products: 'Toate Produsele',
    sanctuary_whispers: 'Șoaptele Sanctuarului',
    your_selection: 'Selecția Ta',
    total: 'Total',
    proceed_checkout: 'Finalizează Comanda',
    explore: 'Explorează',
    support: 'Suport',
    follow: 'Urmărește',
    track_order: 'Urmărește Comanda',
    size_guide: 'Ghid Mărimi',
    favorites: 'Favorite',
    empty_favorites: 'Colecția ta te așteaptă',
    add_to_cart: 'Adaugă în Coș',
    size: 'Mărime',
    color: 'Culoare',
    quantity: 'Cantitate',
    add_variant: '+ Adaugă Altă Culoare/Mărime',
    cart_empty: 'Selecția ta este goală',
    about_text: 'SilkIsland îmbină mistica eleganței antice cu dorința modernă.',
    search_placeholder: 'Găsește-ți esența...',
    type_min_2: 'Tastează minim 2 caractere...',
    no_results: 'Niciun produs găsit',
    login: 'Autentificare',
    register: 'Creează Cont',
    email: 'Email',
    password: 'Parolă',
    name: 'Nume Complet',
    phone: 'Telefon',
    address: 'Adresă',
    logout: 'Părăsește Sanctuarul',
    my_atrium: 'Atriumul Meu',
    order_history: 'Istoric Comenzi',
    admin_panel: 'Panou Administrator',
    cash_delivery: 'Plată Ramburs',
    card_payment: 'Card / Google Pay',
    complete_purchase: 'Finalizează Achiziția',
    shipping_details: 'Detalii Livrare',
    order_summary: 'Sumar Comandă',
    subtotal: 'Subtotal',
    shipping: 'Curier Privat',
    free_shipping: 'GRATUIT',
    delivery_fee_notice: '* taxa de livrare nu este inclusă',
    encrypted_protocol: 'Criptat prin Protocolul de Securitate Aurelian'
  },
  tr: {
    brand: 'SILKISLAND',
    home: 'Ana Sayfa',
    collections: 'Koleksiyonlar',
    legacy: 'Mirasımız',
    hero_tagline: 'Antik Zarafet Modern Arzuyla Buluşuyor',
    enter_atrium: 'Atriuma Gir',
    private_collection: 'Özel Koleksiyon',
    all_products: 'Tüm Ürünler',
    sanctuary_whispers: 'Tapınak Fısıltıları',
    your_selection: 'Seçiminiz',
    total: 'Toplam',
    proceed_checkout: 'Ödemeye Geç',
    explore: 'Keşfet',
    support: 'Destek',
    follow: 'Takip Et',
    track_order: 'Sipariş Takibi',
    size_guide: 'Beden Rehberi',
    favorites: 'Favoriler',
    empty_favorites: 'Koleksiyonunuz sizi bekliyor',
    add_to_cart: 'Sepete Ekle',
    size: 'Beden',
    color: 'Renk',
    quantity: 'Adet',
    add_variant: '+ Başka Renk/Beden Ekle',
    cart_empty: 'Sepetiniz boş',
    about_text: 'SilkIsland, antik zarafetin gizemini modern arzuyla harmanlıyor.',
    search_placeholder: 'Özünüzü bulun...',
    type_min_2: 'En az 2 karakter yazın...',
    no_results: 'Ürün bulunamadı',
    login: 'Giriş Yap',
    register: 'Hesap Oluştur',
    email: 'E-posta',
    password: 'Şifre',
    name: 'Ad Soyad',
    phone: 'Telefon',
    address: 'Adres',
    logout: 'Tapınaktan Ayrıl',
    my_atrium: 'Atriumum',
    order_history: 'Sipariş Geçmişi',
    admin_panel: 'Yönetici Paneli',
    cash_delivery: 'Kapıda Ödeme',
    card_payment: 'Kart / Google Pay',
    complete_purchase: 'Satın Alımı Tamamla',
    shipping_details: 'Teslimat Detayları',
    order_summary: 'Sipariş Özeti',
    subtotal: 'Ara Toplam',
    shipping: 'Özel Kurye',
    free_shipping: 'ÜCRETSİZ',
    delivery_fee_notice: '* teslimat ücreti dahil değildir',
    encrypted_protocol: 'Aurelian Güvenlik Protokolü ile Şifrelenmiştir'
  }
};

// ========== INITIALIZATION ==========
window.onload = function() {
  console.log('SilkIsland — The Private Atrium');
  
  const savedCart = localStorage.getItem('silkisland_cart');
  if (savedCart) cart = JSON.parse(savedCart);
  
  const savedLang = localStorage.getItem('language') || 'en';
  currentLang = savedLang;
  const langSelect = document.getElementById('language-select');
  if (langSelect) langSelect.value = savedLang;
  
  loadProducts();
  updateCartDisplay();
  applyTranslations();
  
  if (langSelect) {
    langSelect.addEventListener('change', e => {
      currentLang = e.target.value;
      localStorage.setItem('language', currentLang);
      applyTranslations();
      if (typeof renderProducts === 'function') renderProducts();
      updateCartDisplay();
    });
  }
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.placeholder = translations[currentLang].search_placeholder;
    searchInput.addEventListener('input', e => performSearch(e.target.value.toLowerCase().trim()));
  }
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('search-modal')?.classList.contains('active')) {
      toggleSearch();
    }
  });
};

// ========== TRANSLATION FUNCTION ==========
function applyTranslations() {
  const t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });
}

// ========== PRODUCTS ==========
async function loadProducts() {
  try {
    const res = await fetch(API_URL + '/api/products');
    products = await res.json();
    console.log('Loaded', products.length, 'products');
    if (typeof renderProducts === 'function') renderProducts();
  } catch (e) {
    console.error('Failed to load products:', e);
  }
}

function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;
  
  const filteredProducts = currentCategory === 'All' ? products : products.filter(p => p.category === currentCategory);
  const t = translations[currentLang];
  
  container.innerHTML = '';
  
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card group relative flex flex-col space-y-6';
    card.id = `product-${product.id}`;
    
    const images = product.images || [product.image];
    const mainImage = images[0] || '/images/placeholder.jpg';
    
    card.innerHTML = `
      <div class="product-gallery" id="gallery-${product.id}">
        <img src="${mainImage}" alt="${product.name}" class="main-image w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onclick="openLightbox(${product.id}, 0)">
        ${images.length > 1 ? `
          <div class="gallery-nav gallery-prev" onclick="event.stopPropagation(); prevImage(${product.id})">❮</div>
          <div class="gallery-nav gallery-next" onclick="event.stopPropagation(); nextImage(${product.id})">❯</div>
          <div class="gallery-dots">
            ${images.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" onclick="event.stopPropagation(); openLightbox(${product.id}, ${i})"></span>`).join('')}
          </div>
        ` : ''}
      </div>
      <div class="flex justify-between items-start pt-4 border-t border-outline-variant/30">
        <div>
          <h3 class="font-headline text-2xl mb-1 text-on-surface">${product.name}</h3>
          <p class="font-label text-xs uppercase tracking-widest text-on-surface-variant">${product.category || ''}</p>
          ${product.description ? `<p class="product-description">${product.description.substring(0, 80)}${product.description.length > 80 ? '...' : ''}</p>` : ''}
        </div>
        <span class="font-headline text-xl text-primary-container">${product.price} RON</span>
      </div>
      <div class="variant-group" id="variants-${product.id}">
        <div class="variant-item"><label>${t.size}:</label><select class="variant-size">${(product.sizes || ['M']).map(s => `<option>${s}</option>`).join('')}</select></div>
        <div class="variant-item"><label>${t.color}:</label><select class="variant-color">${(product.colors || ['Default']).map(c => `<option>${c}</option>`).join('')}</select></div>
        <div class="variant-item"><label>${t.quantity}:</label><input type="number" class="variant-qty" value="1" min="1" max="10"></div>
      </div>
      <button class="add-variant-btn" onclick="addVariantRow(${product.id})">${t.add_variant}</button>
      <button class="add-to-cart bg-primary-container text-on-primary-container py-4 font-label font-extrabold uppercase tracking-widest text-sm" onclick="addProductToCart(${product.id})">${t.add_to_cart}</button>
      <button onclick="addToFavorites(${product.id})" class="absolute top-4 right-4 glass-effect p-2 rounded-full"><span class="material-symbols-outlined">${favorites.includes(product.id) ? 'favorite' : 'favorite'}</span></button>
    `;
    
    container.appendChild(card);
  });
}

// ========== CART ==========
function addProductToCart(productId) {
  const product = products.find(p => p.id === productId);
  const variantGroup = document.getElementById(`variants-${productId}`);
  if (!variantGroup) return;
  
  const size = variantGroup.querySelector('.variant-size')?.value || 'M';
  const color = variantGroup.querySelector('.variant-color')?.value || 'Default';
  const qty = parseInt(variantGroup.querySelector('.variant-qty')?.value) || 1;
  
  const existing = cart.find(item => item.id === productId && item.size === size && item.color === color);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, size, color, quantity: qty, image: product.images?.[0] || product.image });
  }
  
  localStorage.setItem('silkisland_cart', JSON.stringify(cart));
  updateCartDisplay();
  alert(`${product.name} added to cart!`);
}

function updateCartDisplay() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = count;
  
  const itemsDiv = document.getElementById('cart-items');
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const t = translations[currentLang];
  
  if (itemsDiv) {
    if (cart.length === 0) {
      itemsDiv.innerHTML = `<p class="text-tertiary-fixed-dim text-center py-8">${t.cart_empty}</p>`;
    } else {
      itemsDiv.innerHTML = cart.map((item, i) => `
        <div class="flex gap-4 items-center border-b border-white/5 pb-4">
          <div class="w-16 h-20 bg-surface-container-high flex-shrink-0 overflow-hidden rounded"><img src="${item.image || '/images/placeholder.jpg'}" class="w-full h-full object-cover"></div>
          <div class="flex-grow"><p class="text-xs font-bold uppercase">${item.name}</p><p class="text-[10px] text-tertiary-fixed-dim">${item.size} / ${item.color} x${item.quantity}</p></div>
          <div class="text-right"><p class="text-primary-container">${(item.price * item.quantity).toFixed(2)} RON</p><button onclick="removeCartItem(${i})" class="text-[10px] text-error">Remove</button></div>
        </div>
      `).join('');
    }
  }
  
  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.textContent = `${total.toFixed(2)} RON`;
}

function removeCartItem(index) { cart.splice(index, 1); localStorage.setItem('silkisland_cart', JSON.stringify(cart)); updateCartDisplay(); }
function toggleCart() { document.getElementById('cart-modal')?.classList.toggle('active'); }
function goToCheckout() { if (cart.length === 0) { alert(translations[currentLang].cart_empty); return; } window.location.href = '/checkout.html'; }

// ========== FAVORITES ==========
function addToFavorites(productId) {
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    localStorage.setItem('silkisland_favorites', JSON.stringify(favorites));
    alert('Added to favorites!');
  }
}

// ========== SEARCH ==========
function toggleSearch() {
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  if (!modal) return;
  modal.classList.toggle('active');
  if (modal.classList.contains('active') && input) { input.focus(); input.value = ''; document.getElementById('search-results').innerHTML = ''; }
}

function performSearch(query) {
  const results = document.getElementById('search-results');
  const t = translations[currentLang];
  if (!results) return;
  if (query.length < 2) { results.innerHTML = query.length === 0 ? '' : `<p class="no-results">${t.type_min_2}</p>`; return; }
  const filtered = products.filter(p => p.name.toLowerCase().includes(query) || (p.category || '').toLowerCase().includes(query));
  if (filtered.length === 0) { results.innerHTML = `<p class="no-results">${t.no_results}</p>`; return; }
  results.innerHTML = filtered.map(p => `
    <div class="search-result-card" onclick="selectSearchResult(${p.id})">
      <img src="${p.images?.[0] || p.image}"><h3>${p.name}</h3><div class="price">${p.price} RON</div><small>${p.category || ''}</small>
    </div>
  `).join('');
}

function selectSearchResult(productId) {
  toggleSearch();
  showAllProducts();
  setTimeout(() => { const el = document.getElementById(`product-${productId}`); if (el) { el.scrollIntoView({ behavior: 'smooth' }); el.style.boxShadow = '0 0 30px #FFD700'; setTimeout(() => el.style.boxShadow = '', 2000); } }, 100);
}

// ========== CATEGORIES ==========
function filterProducts(category) { currentCategory = category; document.getElementById('active-category').textContent = category; renderProducts(); }
function showAllProducts() { currentCategory = 'All'; document.getElementById('active-category').textContent = translations[currentLang].all_products; renderProducts(); }
function scrollToProducts() { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }

// ========== GALLERY ==========
function addVariantRow(productId) { /* ... keeps existing functionality ... */ }
window.nextImage = function(productId) { /* ... */ };
window.prevImage = function(productId) { /* ... */ };
window.setImage = function(productId, index) { /* ... */ };
window.openLightbox = function(productId, index) { /* ... */ };