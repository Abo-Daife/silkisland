window.API_URL = 'https://silkisland-api.amr-mokhtar301.workers.dev';
window.translationCache = {};

// ========== STATE ==========
let products = [];
let cart = [];
let favorites = JSON.parse(localStorage.getItem('silkisland_favorites') || '[]');
let currentCategory = 'All';
let currentLang = localStorage.getItem('language') || 'en';
let currentLightboxProduct = null;
let currentLightboxIndex = 0;

// ========== TRANSLATIONS ==========
const translations = {
  en: {
    brand: 'SILKISLAND', home: 'Home', Categories: 'Categories', legacy: 'Our Legacy',
    hero_tagline: 'Where Ancient Elegance Meets Modern Desire', enter_atrium: 'Enter the Atrium',
    private_collection: 'The Private Collection', all_products: 'All Products', sanctuary_whispers: 'Sanctuary Whispers',
    your_selection: 'Your Selection', total: 'Total', proceed_checkout: 'Proceed to Checkout', explore: 'Explore',
    support: 'Support', follow: 'Follow', track_order: 'Track Order', size_guide: 'Size Guide', favorites: 'Favorites',
    empty_favorites: 'Your collection awaits', add_to_cart: 'Add to Cart', size: 'Size', color: 'Color', quantity: 'Quantity',
    add_variant: '+ Add Another Color/Size', cart_empty: 'Your selection is empty', about_text: 'SilkIsland blends the mystique of ancient elegance with modern desire.',
    search_placeholder: 'Find your essence...', type_min_2: 'Type at least 2 characters...', no_results: 'No products found',
    login: 'Sign In', register: 'Create Account', email: 'Email', password: 'Password', name: 'Full Name', phone: 'Phone', address: 'Address',
    logout: 'Leave Sanctuary', my_atrium: 'My Atrium', order_history: 'Order History', admin_panel: 'Admin Panel',
    cash_delivery: 'Cash on Delivery', card_payment: 'Card / Google Pay', complete_purchase: 'Complete Purchase',
    shipping_details: 'Shipping Details', order_summary: 'Order Summary', subtotal: 'Subtotal', shipping: 'Private Courier',
    free_shipping: 'FREE', delivery_fee_notice: '* delivery fee is not included', encrypted_protocol: 'Encrypted through the Aurelian Security Protocol',
    collections_title: 'Curated Collections — SilkIsland', private_viewing: 'Private Viewing', curated: 'Curated',
    find_sanctuary: 'Find your sanctuary...', vault_no: 'Vault No. 01', lingerie_vault: 'The Lingerie Vault',
    lingerie_desc: 'Exquisite lace and architectural silhouettes designed for the private self.', sanctuary: 'Sanctuary',
    bathing_sanctuary: 'The Bathing Sanctuary', bathing_desc: 'Ritualistic bath essentials infused with ancient botanicals.',
    threads: 'Threads', silk_loungewear: 'Silk Loungewear', loungewear_desc: 'Effortless elegance for the quiet moments between.',
    ornaments: 'Ornaments', sacred_accessories: 'Sacred Accessories', accessories_desc: 'The final touch of ritual: silk scarves and bespoke ornaments.',
    archive_collection: 'The Archive Collection', archive_desc: 'Discover rare, hand-woven pieces from our historical vault. Limited editions only.',
    explore_archive: 'Explore Archive', product_title: 'Product — SilkIsland', collection_i: 'Collection I / Limited Edition',
    material_tone: 'Material Tone', architectural_scale: 'Architectural Scale', technical_architecture: 'Technical Architecture',
    our_legacy_title: 'Our Legacy — SilkIsland', the_chronicle: 'The Chronicle',
    legacy_text_1: 'In the heart of an ancient archipelago, where the mists of the midnight sea meet the golden sands of the forgotten coast,',
    legacy_text_2: 'was born. Our story is not written in ink, but woven in the finest threads of history—a testament to the enduring beauty of Roman architectural precision and the ethereal fluidity of silk.',
    legacy_text_3: 'We curate private atriums for the modern soul. Each piece in our collection is a fragment of a larger narrative, echoing the hushed whispers of temple corridors and the quiet power of an obsidian blade. We do not follow trends; we honor the timeless dialogue between stone and spirit.',
    foundation_year: 'Foundation Year', global_atriums: 'Global Atriums', sacred_craft: 'Sacred Craft',
    sacred_craft_desc: 'Every garment is blessed by the masters of the Loom before departure.', obsidian_vow: 'The Obsidian Vow',
    obsidian_vow_desc: 'Our materials are sourced with ethical reverence. From the high mountain mulberry groves to the volcanic glass workshops, we ensure that every element reflects our commitment to the Earth and its guardians.',
    architectural_soul: 'Architectural Soul', architectural_soul_desc: 'We believe that fashion is wearable architecture. Our silhouettes are designed to frame the body like the arches of an atrium—providing structure, sanctuary, and timeless elegance.',
    contact_us: 'Contact Us', shipping_returns: 'Shipping & Returns', privacy_policy: 'Privacy Policy',
    account_title: 'The Private Atrium — SilkIsland', private_atrium: 'The Private Atrium', welcome_back: 'Welcome Back',
    identity_email: 'Identity (Email)', passage_code: 'Passage Code', forgot: 'Forgot?', new_sanctuary: 'New to the sanctuary?',
    create_account: 'Create an Account', join_sanctuary: 'Join the Sanctuary', create_account_title: 'Create Account',
    full_name: 'Full Name', phone_optional: 'Phone (Optional)', join_atrium: 'Join the Atrium', already_account: 'Already have an account?',
    sign_in: 'Sign In', identity: 'Identity', orders: 'Orders', member_since: 'Member Since', view_order_history: 'View Order History',
    leave_sanctuary: 'Leave Sanctuary', checkout_title: 'Complete Purchase — SilkIsland', payment: 'Payment',
    ensure_sanctuary: 'Ensure your sanctuary receives its new addition.', first_name: 'First Name', last_name: 'Last Name',
    city: 'City', postal_code: 'Postal Code', card_google_pay: 'CARD / GOOGLE PAY', order_archive: 'Order Archive',
    size_guide_title: 'Size Sanctuary — SilkIsland', art_of_fit: 'The Art of Fit',
    size_sanctuary: 'Size Sanctuary', size_intro: 'True luxury begins with the perfect silhouette. Navigate our precise EU sizing to find the garment that feels like a second skin.',
    how_to_measure: 'How to Measure', chest: '01. CHEST', chest_desc: 'Measure around the fullest part of your bust while wearing a non-padded bra.',
    waist: '02. WAIST', waist_desc: 'Measure the narrowest part of your waistline, usually above the belly button.',
    hips: '03. HIPS', hips_desc: 'Stand with feet together and measure around the fullest part of your hips.',
    bra_sizes: 'Lingerie: Bra Sizes', eu_standards: 'EU Standards', underbust: 'Underbust (cm)', band_size: 'Band Size',
    briefs_knickers: 'Briefs & Knickers', hip_measurement: 'Hip Measurement', loungewear_robes: 'Loungewear & Robes',
    relaxed_fit: 'Relaxed Fit', eu_size: 'EU Size', chest_cm: 'Chest (cm)', track_order_title: 'Track Your Journey — SilkIsland',
    order_inquiry: 'Order Inquiry', track_your_journey: 'Track Your Journey', order_id_email: 'Order ID or Email Address',
    placed: 'Placed', processing: 'Processing', shipped_status: 'Shipped', delivered: 'Delivered', manifest: 'Manifest',
    insurance_courier: 'Insurance & Courier', dispatch_note: 'Orders are dispatched via private courier. Expect a signature request upon arrival.',
    help_support: 'Help & Support', order_not_found: 'Order Not Found', check_details: 'Please check your Order ID or Email and try again.',
    favorites_title: 'Your Private Collection — SilkIsland', your_private_selection: 'Your Private Selection',
    collection_awaits: 'Your Collection Awaits', begin_curating: 'Begin curating your private sanctuary by adding pieces to your favorites.',
    explore_collections: 'Explore Collections', continue_curating: 'Continue Curating', explore_new_arrivals: 'Explore the new arrivals from the Private Collection',
    browse_all: 'Browse All Collections'
  },
  ro: {
    brand: 'SILKISLAND', home: 'Acasă', collections: 'Colecții', legacy: 'Moștenirea',
    hero_tagline: 'Unde Eleganța Antică Întâlnește Dorința Modernă', enter_atrium: 'Intră în Atrium',
    private_collection: 'Colecția Privată', all_products: 'Toate Produsele', sanctuary_whispers: 'Șoaptele Sanctuarului',
    your_selection: 'Selecția Ta', total: 'Total', proceed_checkout: 'Finalizează Comanda', explore: 'Explorează',
    support: 'Suport', follow: 'Urmărește', track_order: 'Urmărește Comanda', size_guide: 'Ghid Mărimi', favorites: 'Favorite',
    empty_favorites: 'Colecția ta te așteaptă', add_to_cart: 'Adaugă în Coș', size: 'Mărime', color: 'Culoare', quantity: 'Cantitate',
    add_variant: '+ Adaugă Altă Culoare/Mărime', cart_empty: 'Selecția ta este goală', about_text: 'SilkIsland îmbină mistica eleganței antice cu dorința modernă.',
    search_placeholder: 'Găsește-ți esența...', type_min_2: 'Tastează minim 2 caractere...', no_results: 'Niciun produs găsit',
    login: 'Autentificare', register: 'Creează Cont', email: 'Email', password: 'Parolă', name: 'Nume Complet', phone: 'Telefon', address: 'Adresă',
    logout: 'Părăsește Sanctuarul', my_atrium: 'Atriumul Meu', order_history: 'Istoric Comenzi', admin_panel: 'Panou Administrator',
    cash_delivery: 'Plată Ramburs', card_payment: 'Card / Google Pay', complete_purchase: 'Finalizează Achiziția',
    shipping_details: 'Detalii Livrare', order_summary: 'Sumar Comandă', subtotal: 'Subtotal', shipping: 'Curier Privat',
    free_shipping: 'GRATUIT', delivery_fee_notice: '* taxa de livrare nu este inclusă', encrypted_protocol: 'Criptat prin Protocolul de Securitate Aurelian',
    collections_title: 'Colecții Curate — SilkIsland', private_viewing: 'Vizionare Privată', curated: 'Curate',
    find_sanctuary: 'Găsește-ți sanctuarul...', vault_no: 'Seiful Nr. 01', lingerie_vault: 'Seiful de Lingerie',
    lingerie_desc: 'Dantelă rafinată și siluete arhitecturale concepute pentru sinele privat.', sanctuary: 'Sanctuar',
    bathing_sanctuary: 'Sanctuarul Băilor', bathing_desc: 'Esențiale ritualice de baie infuzate cu botanice antice.',
    threads: 'Fire', silk_loungewear: 'Haine de Casă din Mătase', loungewear_desc: 'Eleganță fără efort pentru momentele liniștite.',
    ornaments: 'Ornamente', sacred_accessories: 'Accesorii Sacre', accessories_desc: 'Ultima atingere a ritualului: eșarfe de mătase și ornamente personalizate.',
    archive_collection: 'Colecția Arhivă', archive_desc: 'Descoperiți piese rare, țesute manual, din seiful nostru istoric. Doar ediții limitate.',
    explore_archive: 'Explorează Arhiva', product_title: 'Produs — SilkIsland', collection_i: 'Colecția I / Ediție Limitată',
    material_tone: 'Ton Material', architectural_scale: 'Scară Arhitecturală', technical_architecture: 'Arhitectură Tehnică',
    our_legacy_title: 'Moștenirea Noastră — SilkIsland', the_chronicle: 'Cronica',
    legacy_text_1: 'În inima unui arhipelag străvechi, unde ceața mării de la miezul nopții întâlnește nisipurile aurii ale coastei uitate,',
    legacy_text_2: 's-a născut. Povestea noastră nu este scrisă cu cerneală, ci țesută în cele mai fine fire ale istoriei—o mărturie a frumuseții durabile a preciziei arhitecturale romane și a fluidității eterice a mătăsii.',
    legacy_text_3: 'Curăm atrii private pentru sufletul modern. Fiecare piesă din colecția noastră este un fragment al unei narațiuni mai ample, ecou al șoaptelor coridoarelor templelor și al puterii liniștite a unei lame de obsidian. Nu urmăm tendințe; onorăm dialogul atemporal dintre piatră și spirit.',
    foundation_year: 'Anul Fondării', global_atriums: 'Atrii Globale', sacred_craft: 'Meșteșug Sacru',
    sacred_craft_desc: 'Fiecare articol este binecuvântat de maeștrii Războiului de Țesut înainte de plecare.', obsidian_vow: 'Legământul de Obsidian',
    obsidian_vow_desc: 'Materialele noastre sunt obținute cu venerație etică. De la plantațiile de dud de munte până la atelierele de sticlă vulcanică, asigurăm că fiecare element reflectă angajamentul nostru față de Pământ și gardienii săi.',
    architectural_soul: 'Suflet Arhitectural', architectural_soul_desc: 'Credem că moda este arhitectură purtabilă. Siluetele noastre sunt concepute pentru a încadra corpul ca arcadele unui atrium—oferind structură, sanctuar și eleganță atemporală.',
    contact_us: 'Contactează-ne', shipping_returns: 'Livrare & Retururi', privacy_policy: 'Politica de Confidențialitate',
    account_title: 'Atriumul Privat — SilkIsland', private_atrium: 'Atriumul Privat', welcome_back: 'Bine ai Revenit',
    identity_email: 'Identitate (Email)', passage_code: 'Cod de Acces', forgot: 'Ai Uitat?', new_sanctuary: 'Nou în sanctuar?',
    create_account: 'Creează un Cont', join_sanctuary: 'Alătură-te Sanctuarului', create_account_title: 'Creează Cont',
    full_name: 'Nume Complet', phone_optional: 'Telefon (Opțional)', join_atrium: 'Alătură-te Atriumului', already_account: 'Ai deja un cont?',
    sign_in: 'Autentifică-te', identity: 'Identitate', orders: 'Comenzi', member_since: 'Membru Din', view_order_history: 'Vezi Istoricul Comenzilor',
    leave_sanctuary: 'Părăsește Sanctuarul', checkout_title: 'Finalizează Achiziția — SilkIsland', payment: 'Plată',
    ensure_sanctuary: 'Asigură-te că sanctuarul tău primește noua achiziție.', first_name: 'Prenume', last_name: 'Nume',
    city: 'Oraș', postal_code: 'Cod Poștal', card_google_pay: 'CARD / GOOGLE PAY', order_archive: 'Arhiva Comenzii',
    private_courier: 'Curier Privat', size_guide_title: 'Sanctuarul Mărimilor — SilkIsland', art_of_fit: 'Arta Potrivirii',
    size_sanctuary: 'Sanctuarul Mărimilor', size_intro: 'Adevăratul lux începe cu silueta perfectă. Navighează prin mărimile noastre precise UE pentru a găsi articolul care se simte ca o a doua piele.',
    how_to_measure: 'Cum să Măsori', chest: '01. PIEPT', chest_desc: 'Măsoară în jurul celei mai pline părți a bustului, purtând un sutien fără burete.',
    waist: '02. TALIE', waist_desc: 'Măsoară cea mai îngustă parte a taliei, de obicei deasupra buricului.',
    hips: '03. ȘOLDURI', hips_desc: 'Stai cu picioarele împreună și măsoară în jurul celei mai pline părți a șoldurilor.',
    bra_sizes: 'Lingerie: Mărimi Sutien', eu_standards: 'Standarde UE', underbust: 'Sub bust (cm)', band_size: 'Bandă',
    briefs_knickers: 'Chiloți & Tanga', hip_measurement: 'Măsura Șoldului', loungewear_robes: 'Haine de Casă & Halate',
    relaxed_fit: 'Potrivire Relaxată', eu_size: 'Mărime UE', chest_cm: 'Piept (cm)', track_order_title: 'Urmărește-ți Călătoria — SilkIsland',
    order_inquiry: 'Interogare Comandă', track_your_journey: 'Urmărește-ți Călătoria', order_id_email: 'ID Comandă sau Email',
    placed: 'Plasată', processing: 'În Procesare', shipped_status: 'Expediată', delivered: 'Livrată', manifest: 'Manifest',
    insurance_courier: 'Asigurare & Curier', dispatch_note: 'Comenzile sunt expediate prin curier privat. Așteptați o solicitare de semnătură la sosire.',
    help_support: 'Ajutor & Suport', order_not_found: 'Comanda Nu a Fost Găsită', check_details: 'Verifică ID-ul Comenzii sau Emailul și încearcă din nou.',
    favorites_title: 'Colecția Ta Privată — SilkIsland', your_private_selection: 'Selecția Ta Privată',
    collection_awaits: 'Colecția Ta Așteaptă', begin_curating: 'Începe să-ți curatezi sanctuarul privat adăugând piese la favorite.',
    explore_collections: 'Explorează Colecțiile', continue_curating: 'Continuă Curatarea', explore_new_arrivals: 'Explorează noile sosiri din Colecția Privată',
    browse_all: 'Răsfoiește Toate Colecțiile'
  },
  tr: {
    brand: 'SILKISLAND', home: 'Ana Sayfa', Categories: 'Kategoriler', legacy: 'Mirasımız',
    hero_tagline: 'Antik Zarafet Modern Arzuyla Buluşuyor', enter_atrium: 'Atriuma Gir',
    private_collection: 'Özel Koleksiyon', all_products: 'Tüm Ürünler', sanctuary_whispers: 'Tapınak Fısıltıları',
    your_selection: 'Seçiminiz', total: 'Toplam', proceed_checkout: 'Ödemeye Geç', explore: 'Keşfet',
    support: 'Destek', follow: 'Takip Et', track_order: 'Sipariş Takibi', size_guide: 'Beden Rehberi', favorites: 'Favoriler',
    empty_favorites: 'Koleksiyonunuz sizi bekliyor', add_to_cart: 'Sepete Ekle', size: 'Beden', color: 'Renk', quantity: 'Adet',
    add_variant: '+ Başka Renk/Beden Ekle', cart_empty: 'Sepetiniz boş', about_text: 'SilkIsland, antik zarafetin gizemini modern arzuyla harmanlıyor.',
    search_placeholder: 'Özünüzü bulun...', type_min_2: 'En az 2 karakter yazın...', no_results: 'Ürün bulunamadı',
    login: 'Giriş Yap', register: 'Hesap Oluştur', email: 'E-posta', password: 'Şifre', name: 'Ad Soyad', phone: 'Telefon', address: 'Adres',
    logout: 'Tapınaktan Ayrıl', my_atrium: 'Atriumum', order_history: 'Sipariş Geçmişi', admin_panel: 'Yönetici Paneli',
    cash_delivery: 'Kapıda Ödeme', card_payment: 'Kart / Google Pay', complete_purchase: 'Satın Alımı Tamamla',
    shipping_details: 'Teslimat Detayları', order_summary: 'Sipariş Özeti', subtotal: 'Ara Toplam', shipping: 'Özel Kurye',
    free_shipping: 'ÜCRETSİZ', delivery_fee_notice: '* teslimat ücreti dahil değildir', encrypted_protocol: 'Aurelian Güvenlik Protokolü ile Şifrelenmiştir',
    collections_title: 'Özel Koleksiyonlar — SilkIsland', private_viewing: 'Özel Gösterim', curated: 'Küratörlü',
    find_sanctuary: 'Tapınağını bul...', vault_no: 'Kasa No. 01', lingerie_vault: 'İç Giyim Kasası',
    lingerie_desc: 'Özel benlik için tasarlanmış zarif dantel ve mimari silüetler.', sanctuary: 'Tapınak',
    bathing_sanctuary: 'Banyu Tapınağı', bathing_desc: 'Antik botaniklerle zenginleştirilmiş ritüel banyo esansları.',
    threads: 'İplikler', silk_loungewear: 'İpek Ev Giyimi', loungewear_desc: 'Aradaki sessiz anlar için zahmetsiz zarafet.',
    ornaments: 'Süsler', sacred_accessories: 'Kutsal Aksesuarlar', accessories_desc: 'Ritüelin son dokunuşu: ipek eşarplar ve özel süsler.',
    archive_collection: 'Arşiv Koleksiyonu', archive_desc: 'Tarihi kasamızdan nadir, el dokuması parçaları keşfedin. Sadece sınırlı sayıda.',
    explore_archive: 'Arşivi Keşfet', product_title: 'Ürün — SilkIsland', collection_i: 'Koleksiyon I / Sınırlı Sayıda',
    material_tone: 'Malzeme Tonu', architectural_scale: 'Mimari Ölçek', technical_architecture: 'Teknik Mimari',
    our_legacy_title: 'Mirasımız — SilkIsland', the_chronicle: 'Vakayiname',
    legacy_text_1: 'Kadim bir takımadanın kalbinde, gece yarısı denizinin sislerinin unutulmuş kıyının altın kumlarıyla buluştuğu yerde,',
    legacy_text_2: 'doğdu. Hikayemiz mürekkeple değil, tarihin en ince iplikleriyle—Roma mimari hassasiyetinin kalıcı güzelliğinin ve ipeğin ruhani akışkanlığının bir kanıtı olarak dokunmuştur.',
    legacy_text_3: 'Modern ruh için özel atriumlar küratörlüğünü yapıyoruz. Koleksiyonumuzdaki her parça, tapınak koridorlarının fısıltılarını ve bir obsidyen bıçağın sessiz gücünü yankılayan daha büyük bir anlatının parçasıdır. Trendleri takip etmiyoruz; taş ve ruh arasındaki zamansız diyaloğu onurlandırıyoruz.',
    foundation_year: 'Kuruluş Yılı', global_atriums: 'Küresel Atriumlar', sacred_craft: 'Kutsal Zanaat',
    sacred_craft_desc: 'Her giysi, ayrılmadan önce Dokuma Tezgahının ustaları tarafından kutsanır.', obsidian_vow: 'Obsidyen Yemini',
    obsidian_vow_desc: 'Malzemelerimiz etik bir saygıyla tedarik edilir. Yüksek dağ dut bahçelerinden volkanik cam atölyelerine kadar, her unsurun Dünya\'ya ve koruyucularına olan bağlılığımızı yansıtmasını sağlıyoruz.',
    architectural_soul: 'Mimari Ruh', architectural_soul_desc: 'Modanın giyilebilir mimari olduğuna inanıyoruz. Silüetlerimiz, vücudu bir atriumun kemerleri gibi çerçevelemek—yapı, sığınak ve zamansız zarafet sağlamak için tasarlanmıştır.',
    contact_us: 'Bize Ulaşın', shipping_returns: 'Kargo & İadeler', privacy_policy: 'Gizlilik Politikası',
    account_title: 'Özel Atrium — SilkIsland', private_atrium: 'Özel Atrium', welcome_back: 'Tekrar Hoş Geldiniz',
    identity_email: 'Kimlik (E-posta)', passage_code: 'Geçiş Kodu', forgot: 'Unuttunuz mu?', new_sanctuary: 'Tapınakta yeni misiniz?',
    create_account: 'Hesap Oluştur', join_sanctuary: 'Tapınağa Katıl', create_account_title: 'Hesap Oluştur',
    full_name: 'Tam Ad', phone_optional: 'Telefon (İsteğe Bağlı)', join_atrium: 'Atriuma Katıl', already_account: 'Zaten hesabınız var mı?',
    sign_in: 'Giriş Yap', identity: 'Kimlik', orders: 'Siparişler', member_since: 'Üyelik Tarihi', view_order_history: 'Sipariş Geçmişini Görüntüle',
    leave_sanctuary: 'Tapınaktan Ayrıl', checkout_title: 'Satın Alımı Tamamla — SilkIsland', payment: 'Ödeme',
    ensure_sanctuary: 'Tapınağınızın yeni eklemesini aldığından emin olun.', first_name: 'Ad', last_name: 'Soyad',
    city: 'Şehir', postal_code: 'Posta Kodu', card_google_pay: 'KART / GOOGLE PAY', order_archive: 'Sipariş Arşivi',
    private_courier: 'Özel Kurye', size_guide_title: 'Beden Tapınağı — SilkIsland', art_of_fit: 'Uyum Sanatı',
    size_sanctuary: 'Beden Tapınağı', size_intro: 'Gerçek lüks, mükemmel silüetle başlar. İkinci bir ten gibi hissettiren giysiyi bulmak için hassas AB beden ölçülerimizde gezinin.',
    how_to_measure: 'Nasıl Ölçülür', chest: '01. GÖĞÜS', chest_desc: 'Dolgusuz bir sütyen takarken göğsünüzün en dolgun kısmını ölçün.',
    waist: '02. BEL', waist_desc: 'Genellikle göbek deliğinin üzerindeki en dar bel hattını ölçün.',
    hips: '03. KALÇA', hips_desc: 'Ayaklarınız bitişik durun ve kalçanızın en dolgun kısmını ölçün.',
    bra_sizes: 'İç Giyim: Sütyen Bedenleri', eu_standards: 'AB Standartları', underbust: 'Göğüs Altı (cm)', band_size: 'Bant Bedeni',
    briefs_knickers: 'Külotlar', hip_measurement: 'Kalça Ölçüsü', loungewear_robes: 'Ev Giyimi & Bornozlar',
    relaxed_fit: 'Rahat Kesim', eu_size: 'AB Bedeni', chest_cm: 'Göğüs (cm)', track_order_title: 'Yolculuğunuzu Takip Edin — SilkIsland',
    order_inquiry: 'Sipariş Sorgulama', track_your_journey: 'Yolculuğunuzu Takip Edin', order_id_email: 'Sipariş No veya E-posta',
    placed: 'Alındı', processing: 'İşleniyor', shipped_status: 'Kargoya Verildi', delivered: 'Teslim Edildi', manifest: 'Manifesto',
    insurance_courier: 'Sigorta & Kurye', dispatch_note: 'Siparişler özel kurye ile gönderilir. Varışta imza talep edilmesini bekleyin.',
    help_support: 'Yardım & Destek', order_not_found: 'Sipariş Bulunamadı', check_details: 'Lütfen Sipariş Numaranızı veya E-postanızı kontrol edip tekrar deneyin.',
    favorites_title: 'Özel Koleksiyonunuz — SilkIsland', your_private_selection: 'Özel Seçiminiz',
    collection_awaits: 'Koleksiyonunuz Sizi Bekliyor', begin_curating: 'Favorilerinize parçalar ekleyerek özel tapınağınızı oluşturmaya başlayın.',
    explore_collections: 'Koleksiyonları Keşfet', continue_curating: 'Küratörlüğe Devam Et', explore_new_arrivals: 'Özel Koleksiyondaki yeni gelenleri keşfedin',
    browse_all: 'Tüm Koleksiyonlara Göz At'
  }
};

// ========== GLOBAL FUNCTIONS FOR PRODUCT PAGE ==========
window.addToCartFromProduct = function(productId, selectedSize, selectedColor, productQuantity) {
  // If called from product page with parameters
  if (productId && selectedSize && selectedColor) {
    const product = products.find(p => p.id === productId) || {};
    const existing = cart.find(item => item.id === productId && item.size === selectedSize && item.color === selectedColor);
    if (existing) { existing.quantity += productQuantity || 1; }
    else { cart.push({ id: productId, name: product.name || 'Product', price: product.price || 0, size: selectedSize, color: selectedColor, quantity: productQuantity || 1, image: product.images?.[0] || product.image }); }
    localStorage.setItem('silkisland_cart', JSON.stringify(cart));
    updateCartDisplay();
    alert('Added to cart!');
  }
};

window.addToFavorites = function(productId) { 
  if (!favorites.includes(productId)) { 
    favorites.push(productId); 
    localStorage.setItem('silkisland_favorites', JSON.stringify(favorites)); 
    alert('Added to favorites!'); 
  }
};

window.updateCartDisplay = function() {
  const cart = JSON.parse(localStorage.getItem('silkisland_cart') || '[]');
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = count;
  
  const itemsDiv = document.getElementById('cart-items');
  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  
  if (itemsDiv) {
    if (cart.length === 0) {
      itemsDiv.innerHTML = '<p class="text-tertiary-fixed-dim text-center py-8">Your selection is empty</p>';
    } else {
      itemsDiv.innerHTML = cart.map((item, i) => `
        <div class="flex gap-4 items-center border-b border-white/5 pb-4">
          <div class="w-16 h-20 bg-surface-container-high flex-shrink-0 overflow-hidden rounded">
            <img src="${item.image || '/images/placeholder.jpg'}" class="w-full h-full object-cover">
          </div>
          <div class="flex-grow">
            <p class="text-xs font-bold uppercase">${item.name}</p>
            <p class="text-[10px] text-tertiary-fixed-dim">${item.size} / ${item.color} x${item.quantity}</p>
          </div>
          <div class="text-right">
            <p class="text-primary-container">${(item.price * item.quantity).toFixed(2)} RON</p>
            <button onclick="window.removeCartItem(${i})" class="text-[10px] text-error">Remove</button>
          </div>
        </div>
      `).join('');
    }
  }
  
  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.textContent = `${total.toFixed(2)} RON`;
};

window.removeCartItem = function(index) {
  cart.splice(index, 1);
  localStorage.setItem('silkisland_cart', JSON.stringify(cart));
  window.updateCartDisplay();
};

// ========== CART & UI FUNCTIONS ==========
window.toggleCart = function() {
  const modal = document.getElementById('cart-modal');
  if (modal) {
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
      window.updateCartDisplay();
    }
  }
};

window.toggleSearch = function() {
  const modal = document.getElementById('search-modal');
  if (modal) modal.classList.toggle('active');
};

window.scrollToProducts = function() {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
};

window.goToCheckout = function() {
  const cart = JSON.parse(localStorage.getItem('silkisland_cart') || '[]');
  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }
  
  // TikTok Initiate Checkout event
  if (typeof ttq !== 'undefined' && ttq.track) {
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    ttq.track('InitiateCheckout', {
        value: total,
        currency: 'RON',
        content_type: 'product'
    });
  }
  
  window.location.href = '/checkout.html';
};

// ========== MOBILE MENU ==========
window.toggleMobileMenu = function() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  
  if (menu) {
    menu.classList.toggle('active');
  }
  if (overlay) {
    overlay.classList.toggle('active');
  }
  if (menu) {
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  }
};

// ========== CATEGORY FILTER ==========
window.filterProducts = function(category) {
  currentCategory = category;
  const activeEl = document.getElementById('active-category');
  if (activeEl) activeEl.textContent = category;
  renderProducts();
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
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
      if (typeof updateDescriptionTranslation === 'function') {
        updateDescriptionTranslation();
      }
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

function applyTranslations() {
  const t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.getAttribute('data-i18n'); if (t[key]) el.textContent = t[key]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const key = el.getAttribute('data-i18n-placeholder'); if (t[key]) el.placeholder = t[key]; });
}

async function loadProducts() {
  try {
    const res = await fetch(API_URL + '/api/products');
    products = await res.json();
    console.log('Loaded', products.length, 'products');
    if (typeof renderProducts === 'function') renderProducts();
  } catch (e) { console.error('Failed to load products:', e); }
}

function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;
  const filteredProducts = currentCategory === 'All' ? products : products.filter(p => p.category === currentCategory);
  container.innerHTML = '';
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card group relative flex flex-col';
    card.id = `product-${product.id}`;
    const images = product.images || [product.image];
    const mainImage = images[0] || '/images/placeholder.jpg';
    card.innerHTML = `
      <a href="/product.html?id=${product.id}" class="block">
        <div class="overflow-hidden bg-neutral-900/50 backdrop-blur-sm relative border border-white/5 rounded-sm shadow-2xl">
          <img src="${mainImage}" alt="${product.name}" class="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700">
          <button onclick="event.preventDefault(); window.addToFavorites(${product.id});" class="absolute top-4 right-4 bg-surface/40 backdrop-blur-md p-2 rounded-lg">
            <span class="material-symbols-outlined text-primary-container">${favorites.includes(product.id) ? 'favorite' : 'favorite'}</span>
          </button>
        </div>
        <div class="flex justify-between items-start pt-2 border-t border-outline-variant/30">
          <h3 class="font-headline text-xl mb-1 text-on-surface">${product.name}</h3>
          <span class="font-headline text-lg text-primary-container">${product.price} RON</span>
        </div>
      </a>
    `;
    container.appendChild(card);
  });
}

function updateCartDisplay() {
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = count;
}

function toggleSearch() { const modal = document.getElementById('search-modal'); const input = document.getElementById('search-input'); if (!modal) return; modal.classList.toggle('active'); if (modal.classList.contains('active') && input) { input.focus(); input.value = ''; document.getElementById('search-results').innerHTML = ''; } }
function performSearch(query) { /* ... keep existing ... */ }
function filterProducts(category) {
  currentCategory = category;
  if (document.getElementById('active-category')) {
    document.getElementById('active-category').textContent = category;
  }
  renderProducts();
}
function showAllProducts() { currentCategory = 'All'; if (document.getElementById('active-category')) document.getElementById('active-category').textContent = translations[currentLang].all_products; renderProducts(); }
function scrollToProducts() { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }

// Simple translation cache
const translationCache = {};

async function autoTranslate(text, targetLang) {
  if (!text || targetLang === 'en') return text;
  
  const cacheKey = `${text}_${targetLang}`;
  if (translationCache[cacheKey]) return translationCache[cacheKey];
  
  try {
    // Using Google Translate unofficial API (free)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    const translated = data[0][0][0];
    translationCache[cacheKey] = translated;
    return translated;
  } catch (e) {
    console.error('Translation error:', e);
    return text; // Fallback to original
  }
}

// Make it globally available
window.toggleMobileMenu = function() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  
  if (menu && overlay) {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  }
};

// TEMPORARY TEST FUNCTION
window.testFilter = function(category) {
  console.log('Testing filter for:', category);
  alert('Filtering: ' + category);
  
  if (category === 'All') {
    currentCategory = 'All';
    document.getElementById('active-category').textContent = 'All Products';
  } else {
    currentCategory = category;
    document.getElementById('active-category').textContent = category;
  }
  
  renderProducts();
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
};

// ========== COOKIE CONSENT ==========
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  document.getElementById('cookie-banner').style.display = 'none';
}

function rejectCookies() {
  localStorage.setItem('cookieConsent', 'rejected');
  document.getElementById('cookie-banner').style.display = 'none';
}

// Check if consent already given
window.addEventListener('DOMContentLoaded', () => {
  const consent = localStorage.getItem('cookieConsent');
  if (consent) {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';
  }
});