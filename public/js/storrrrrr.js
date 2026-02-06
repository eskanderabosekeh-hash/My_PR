// ============================================
// إعدادات API (تأكد أن المسارات معرفة في api.php)
// ============================================
const API_BASE_URL = '/api'; 
let currentProducts = [];
let currentFilters = {
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'popular',
    searchQuery: '',
    page: 1,
    limit: 12
};
let totalProducts = 0;
let totalPages = 1;

// ============================================
// دالة عرض المنتجات (معدلة لتناسب أعمدة قاعدة بياناتك)
// ============================================
function displayProductsGridView() {
    const container = document.getElementById('products-container');
    
    // ملاحظة: تم استخدام image_url و reviews_count بناءً على الـ Migration الخاص بك
    const productsHTML = currentProducts.map(product => `
        <div class="col-md-4 col-xs-6">
            <div class="product">
                <div class="product-img">
                    <img src="${product.image_url || './img/product01.png'}" alt="${product.name}">
                    <div class="product-label">
                        ${product.is_new ? '<span class="new">NEW</span>' : ''}
                    </div>
                </div>
                <div class="product-body">
                    <p class="product-category">${product.category || 'Laptop'}</p>
                    <h3 class="product-name"><a href="/product/${product.id}">${product.name}</a></h3>
                    <h4 class="product-price">
                        ${product.price} 
                    </h4>
                    <div class="product-rating">
                        ${getStarRating(product.rating || 0)}
                        <span class="reviews-qty">(${product.reviews_count || 0})</span>
                    </div>
                    <div class="product-btns">
                        <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                        <button class="quick-view" onclick="window.location.href='/product/${product.id}'"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                    </div>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}', '${product.name}', '${product.price}', '${product.image_url}')">
                        <i class="fa fa-shopping-cart"></i> add to cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = productsHTML;
}

// ============================================
// جلب المنتجات من الباك إند (Laravel Controller)
// ============================================
async function loadProducts() {
    showLoading(true);
    try {
        let params = new URLSearchParams({
            page: currentFilters.page,
            limit: currentFilters.limit,
            sort: currentFilters.sortBy,
            minPrice: currentFilters.minPrice,
            maxPrice: currentFilters.maxPrice
        });

        if (currentFilters.categories.length > 0) params.append('categories', currentFilters.categories.join(','));
        if (currentFilters.brands.length > 0) params.append('brands', currentFilters.brands.join(','));
        if (currentFilters.searchQuery) params.append('search', currentFilters.searchQuery);

        const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
        const data = await response.json();

        currentProducts = data.products;
        totalProducts = data.total;
        totalPages = data.pages;

        if (currentProducts.length === 0) {
            showNoProducts(true);
            document.getElementById('products-container').innerHTML = '';
        } else {
            showNoProducts(false);
            displayProducts();
            updateProductsCount();
            updatePagination();
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('error', 'حدث خطأ أثناء تحميل البيانات');
    } finally {
        showLoading(false);
    }
}

// ============================================
// جلب الفلاتر ديناميكياً (التصنيفات والماركات)
// ============================================
async function loadFilters() {
    try {
        const response = await fetch(`${API_BASE_URL}/filters`);
        const data = await response.json();
        
        // عرض التصنيفات
        const catContainer = document.getElementById('categories-filter');
        catContainer.innerHTML = data.categories.map(cat => `
            <div class="input-checkbox">
                <input type="checkbox" id="cat-${cat.name}" onchange="updateCategoryFilter('${cat.name}', this.checked)">
                <label for="cat-${cat.name}"><span></span>${cat.name} <small>(${cat.count})</small></label>
            </div>
        `).join('');

        // عرض الماركات
        const brandContainer = document.getElementById('brands-filter');
        brandContainer.innerHTML = data.brands.map(brand => `
            <div class="input-checkbox">
                <input type="checkbox" id="brand-${brand.name}" onchange="updateBrandFilter('${brand.name}', this.checked)">
                <label for="brand-${brand.name}"><span></span>${brand.name} <small>(${brand.count})</small></label>
            </div>
        `).join('');

    } catch (error) {
        console.error('Filters Error:', error);
    }
}

// ============================================
// وظائف مساعدة
// ============================================
function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fa fa-star${i <= rating ? '' : '-o'}"></i>`;
    }
    return stars;
}

function showLoading(show) {
    document.getElementById('loading-products').style.display = show ? 'block' : 'none';
}

function showNoProducts(show) {
    document.getElementById('no-products-found').style.display = show ? 'block' : 'none';
}

// ============================================
// تشغيل الكود عند تحميل الصفحة
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadFilters();
    loadProducts();
    
    // ربط زر الفلترة اليدوي
    document.getElementById('apply-price-filter').addEventListener('click', () => {
        currentFilters.minPrice = document.getElementById('price-min').value;
        currentFilters.maxPrice = document.getElementById('price-max').value;
        currentFilters.page = 1;
        loadProducts();
    });

    // ربط خيارات الترتيب
    document.getElementById('sort-by').addEventListener('change', (e) => {
        currentFilters.sortBy = e.target.value;
        loadProducts();
    });
});