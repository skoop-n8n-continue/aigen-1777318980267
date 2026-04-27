const brandsData = [
    {
        id: 'skyy',
        name: 'Skyy',
        logo: 'assets/skyy_logo_white.png',
        promo: 'assets/website_sky_product_promo.png',
        desc: 'Elevate your senses with our premium Skyy collection. Light, airy, and pure.',
        tags: ['Uplifting', 'Sativa', 'Focus', 'Energy']
    },
    {
        id: 'fyre',
        name: 'Fyre',
        logo: 'assets/fyre_logo_white.png',
        promo: 'assets/website_fyre_product_promo.png',
        desc: 'Ignite your passion with the Fyre collection. Bold, intense, and revitalizing.',
        tags: ['Intense', 'Energy', 'Sativa', 'Creative']
    },
    {
        id: 'rayne',
        name: 'Rayne',
        logo: 'assets/rayne_logo_white.png',
        promo: 'assets/website_rayne_product_promo.png',
        desc: 'Wash away the stress. Rayne brings pure relaxation and a calming wave of relief.',
        tags: ['Calm', 'Indica', 'Sleep', 'Relax']
    },
    {
        id: 'foryst',
        name: 'Foryst',
        logo: 'assets/foryst_logo_white.png',
        promo: 'assets/website_foryst_product_promo.png',
        desc: 'Ground yourself in nature. The Foryst collection offers deep, earthy wellness.',
        tags: ['Grounded', 'Hybrid', 'Balance', 'Relief']
    }
];

// Generate mock products based on the brand
const generateProducts = (brandId, brandTags) => {
    const products = [];
    const types = ['Flower', 'Vape', 'Edible', 'Extract', 'Tincture', 'Topical'];
    
    for (let i = 1; i <= 8; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const tag1 = brandTags[Math.floor(Math.random() * brandTags.length)];
        const tag2 = brandTags[Math.floor(Math.random() * brandTags.length)];
        const uniqueTags = [...new Set([type, tag1, tag2])];
        
        products.push({
            id: `${brandId}-prod-${i}`,
            brandId: brandId,
            name: `${brandId.charAt(0).toUpperCase() + brandId.slice(1)} ${type} ${i}`,
            subtitle: `Premium ${tag1} Blend`,
            price: `$${(Math.random() * 40 + 20).toFixed(2)}`,
            image: `https://picsum.photos/seed/${brandId}${i}/400/400`,
            desc: `Experience the pure essence of ${brandId} with this premium ${type.toLowerCase()}. Carefully cultivated and processed to ensure the highest quality and maximum potency. Perfect for those seeking a ${tag1.toLowerCase()} experience.`,
            tags: uniqueTags,
            size: type === 'Flower' ? '3.5g (1/8 oz)' : type === 'Vape' ? '1.0g Cartridge' : '100mg Total',
            potency: type === 'Flower' ? '24% - 28% THC' : type === 'Vape' ? '85% - 90% THC' : '10mg per serving'
        });
    }
    return products;
};

// Store all products
let allProducts = {};
brandsData.forEach(brand => {
    allProducts[brand.id] = generateProducts(brand.id, brand.tags);
});

// DOM Elements
const homeBtn = document.getElementById('home-btn');
const backBtn = document.getElementById('back-btn');
const headerNav = document.getElementById('header-nav');
const brandsScreen = document.getElementById('brands-screen');
const productsScreen = document.getElementById('products-screen');
const brandsGrid = document.querySelector('.brands-grid');
const productsGrid = document.getElementById('products-grid');

// Brand Hero Elements
const brandPromoImg = document.getElementById('brand-promo-img');
const brandHeroLogo = document.getElementById('brand-hero-logo');
const brandHeroDesc = document.getElementById('brand-hero-desc');

// Filters
const filtersContainer = document.querySelector('.filters');

// Modal Elements
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalBackdrop = document.querySelector('.modal-backdrop');
const actionBtn = document.querySelector('.action-btn');

// State
let currentBrand = null;
let currentProducts = [];
let currentFilter = 'all';

// Initialize
function init() {
    renderBrands();
    setupEventListeners();
}

// Render Brands Grid
function renderBrands() {
    brandsGrid.innerHTML = '';
    brandsData.forEach(brand => {
        const card = document.createElement('div');
        card.className = 'brand-card';
        card.innerHTML = `
            <img src="${brand.logo}" alt="${brand.name}">
            <p>Explore Collection</p>
        `;
        card.addEventListener('click', () => showBrandProducts(brand.id));
        brandsGrid.appendChild(card);
    });
}

// Show Brand Products Screen
function showBrandProducts(brandId) {
    currentBrand = brandsData.find(b => b.id === brandId);
    currentProducts = allProducts[brandId];
    currentFilter = 'all';
    
    // Update Hero
    brandPromoImg.src = currentBrand.promo;
    brandHeroLogo.src = currentBrand.logo;
    brandHeroDesc.textContent = currentBrand.desc;
    
    // Setup Filters
    setupFilters();
    
    // Render Products
    renderProducts();
    
    // Toggle Screens
    brandsScreen.classList.remove('active');
    productsScreen.classList.add('active');
    headerNav.style.display = 'block';
    
    window.scrollTo(0, 0);
}

// Setup Filters
function setupFilters() {
    // Get unique tags from all products of this brand
    const allTags = new Set();
    currentProducts.forEach(p => p.tags.forEach(t => allTags.add(t)));
    
    let filtersHTML = `<button class="filter-btn active" data-tag="all">All</button>`;
    Array.from(allTags).sort().forEach(tag => {
        filtersHTML += `<button class="filter-btn" data-tag="${tag}">${tag}</button>`;
    });
    
    filtersContainer.innerHTML = filtersHTML;
    
    // Add event listeners to filter buttons
    const filterBtns = filtersContainer.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.tag;
            renderProducts();
        });
    });
}

// Render Products Grid
function renderProducts() {
    productsGrid.innerHTML = '';
    
    const filteredProducts = currentFilter === 'all' 
        ? currentProducts 
        : currentProducts.filter(p => p.tags.includes(currentFilter));
        
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products found for this filter.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const tagsHTML = product.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('');
        
        card.innerHTML = `
            <div class="product-img-wrap">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-tags-small">${tagsHTML}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-subtitle">${product.subtitle}</p>
                <div class="product-price">${product.price}</div>
            </div>
        `;
        
        card.addEventListener('click', () => openProductModal(product));
        productsGrid.appendChild(card);
    });
}

// Open Product Modal
function openProductModal(product) {
    document.getElementById('modal-product-img').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-subtitle').textContent = product.subtitle;
    document.getElementById('modal-product-price').textContent = product.price;
    document.getElementById('modal-product-desc').textContent = product.desc;
    document.getElementById('modal-product-size').textContent = product.size;
    document.getElementById('modal-product-potency').textContent = product.potency;
    
    const tagsHTML = product.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    document.getElementById('modal-product-tags').innerHTML = tagsHTML;
    
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close Product Modal
function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    const goHome = () => {
        productsScreen.classList.remove('active');
        brandsScreen.classList.add('active');
        headerNav.style.display = 'none';
        window.scrollTo(0, 0);
    };
    
    homeBtn.addEventListener('click', goHome);
    backBtn.addEventListener('click', goHome);
    
    // Modal closing
    closeModalBtn.addEventListener('click', closeProductModal);
    modalBackdrop.addEventListener('click', closeProductModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal.classList.contains('active')) {
            closeProductModal();
        }
    });
    
    // Prevent interaction timeout (Digital Signage specific)
    // If no interaction for 2 minutes, return to home screen
    let timeoutId;
    const resetTimeout = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (productsScreen.classList.contains('active') || productModal.classList.contains('active')) {
                closeProductModal();
                goHome();
            }
        }, 120000); // 2 minutes
    };
    
    ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(evt => 
        document.addEventListener(evt, resetTimeout, true)
    );
    
    resetTimeout();
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
