// ============================================
// إعدادات API
// ============================================
// const API_BASE_URL = '/api';
window.API_BASE_URL = '/api';

// ============================================
// الحالة العامة
// ============================================
let currentProducts = [];
let currentFilters = {
    brands: [],
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'latest',
    searchQuery: '',
    page: 1,
    limit: 12
};

let totalProducts = 0;
let totalPages = 1;

// ============================================
// عرض المنتجات (Grid View)
// ============================================
function displayProductsGridView() {
    const container = document.getElementById('products-container');
    if (!container) return;

    const html = currentProducts.map(product => `
        <div class="col-md-4 col-xs-6">
            <div class="product">
                <div class="product-img">
                    <img src="${product.image_url}" alt="${product.name}">
                </div>

                <div class="product-body">
                    <p class="product-category">${product.category}</p>

                    <h3 class="product-name">
                        <a href="/product/${product.id}">
                            ${product.name}
                        </a>
                    </h3>

                    <ul style="font-size:13px; color:#555; padding-left:15px;">
                        <li>CPU: ${product.processor}</li>
                        <li>RAM: ${product.ram} GB</li>
                        <li>Storage: ${product.storage} GB</li>
                    </ul>

                    <h4 class="product-price">
                        ${product.price > 0 ? `$${product.price}` : 'Contact for price'}
                    </h4>

                    <div class="product-rating">
                        ${getStarRating(product.rating)}
                        <span style="font-size:11px;">(${product.reviews})</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

// ============================================
// تحميل المنتجات من Laravel API
// ============================================
async function loadProducts() {
    showLoading(true);

    try {
        const params = new URLSearchParams({
            page: currentFilters.page,
            limit: currentFilters.limit,
            sort: currentFilters.sortBy,
            minPrice: currentFilters.minPrice,
            maxPrice: currentFilters.maxPrice
        });

        if (currentFilters.brands.length) {
            params.append('brands', currentFilters.brands.join(','));
        }

        if (currentFilters.searchQuery) {
            params.append('search', currentFilters.searchQuery);
        }

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
            displayProductsGridView();
            updatePagination();
            updateProductsCount();
        }
    } catch (e) {
        console.error(e);
        alert('حدث خطأ أثناء تحميل المنتجات');
    } finally {
        showLoading(false);
    }
}

// ============================================
// تحميل الفلاتر (Brands)
// ============================================
async function loadFilters() {
    try {
        const response = await fetch(`${API_BASE_URL}/filters`);
        const data = await response.json();

        const brandContainer = document.getElementById('brands-filter');
        if (!brandContainer) return;

        brandContainer.innerHTML = data.brands.map(b => `
            <div class="input-checkbox">
                <input type="checkbox" id="brand-${b.name}"
                    onchange="toggleBrand('${b.name}', this.checked)">
                <label for="brand-${b.name}">
                    <span></span>${b.name} <small>(${b.count})</small>
                </label>
            </div>
        `).join('');

    } catch (e) {
        console.error('Filter error', e);
    }
}

// ============================================
// فلترة الماركات
// ============================================
function toggleBrand(brand, checked) {
    if (checked) {
        currentFilters.brands.push(brand);
    } else {
        currentFilters.brands = currentFilters.brands.filter(b => b !== brand);
    }

    currentFilters.page = 1;
    loadProducts();
}

// ============================================
// Pagination
// ============================================
function updatePagination() {
    const container = document.getElementById('pagination');
    if (!container) return;

    let html = '';

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <li class="${i === currentFilters.page ? 'active' : ''}">
                <a href="#" onclick="goToPage(${i}); return false;">
                    ${i}
                </a>
            </li>
        `;
    }

    container.innerHTML = html;
}

function goToPage(page) {
    currentFilters.page = page;
    loadProducts();
}

// ============================================
// عدد المنتجات
// ============================================
function updateProductsCount() {
    const el = document.getElementById('products-count');
    if (el) {
        el.innerText = `${totalProducts} Products`;
    }
}

// ============================================
// أدوات مساعدة
// ============================================
function getStarRating(rating = 4) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fa fa-star${i <= rating ? '' : '-o'}"></i>`;
    }
    return stars;
}

function showLoading(show) {
    const el = document.getElementById('loading-products');
    if (el) el.style.display = show ? 'block' : 'none';
}

function showNoProducts(show) {
    const el = document.getElementById('no-products-found');
    if (el) el.style.display = show ? 'block' : 'none';
}

// ============================================
// تشغيل الصفحة
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadFilters();
    loadProducts();

    const sort = document.getElementById('sort-by');
    if (sort) {
        sort.addEventListener('change', e => {
            currentFilters.sortBy = e.target.value;
            loadProducts();
        });
    }

    const search = document.getElementById('search-input');
    if (search) {
        search.addEventListener('keyup', e => {
            currentFilters.searchQuery = e.target.value;
            currentFilters.page = 1;
            loadProducts();
        });
    }
});
