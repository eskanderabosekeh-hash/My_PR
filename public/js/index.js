
		// ========== Sitting==========
		const API_BASE_URL = '';
		let cart = [];
		let wishlist = [];
		
		// ============================================
		// دوال المساعدة
		// ============================================
		function showLoading(show) {
			const loader = document.getElementById('loading-products');
			if (loader) {
				loader.style.display = show ? 'block' : 'none';
			}
		}
		
		function showNotification(message, type = 'success') {
			console.log(`[${type}] ${message}`);
		}
		
		function formatPrice(price) {
			return `$${parseFloat(price).toFixed(2)}`;
		}
		
		// ============================================
		// إدارة السلة
		// ============================================
		async function loadCart() {
			try {
				const response = await fetch(`${API_BASE_URL}/cart`);
				const data = await response.json();
				cart = data.items || [];
				updateCartUI();
			} catch (error) {
				console.error('Error loading cart:', error);
				// استخدم البيانات المحلية
				cart = JSON.parse(localStorage.getItem('cart')) || [];
				updateCartUI();
			}
		}
		
		function updateCartUI() {
			// تحديث عداد السلة
			const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
			document.getElementById('cart-count').textContent = cartCount;
			
			// تحديث السلة المصغرة
			updateMiniCart();
		}
		
		function updateMiniCart() {
			const container = document.getElementById('cart-dropdown-items');
			const summaryCount = document.getElementById('cart-summary-count');
			const summaryTotal = document.getElementById('cart-summary-total');
			
			if (cart.length === 0) {
				container.innerHTML = '<div class="empty-cart-message" style="padding: 20px; text-align: center;">Your cart is empty</div>';
				summaryCount.textContent = '0 Item(s)';
				summaryTotal.textContent = 'SUBTOTAL: $0.00';
				return;
			}
			
			// حساب المجموع
			const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
			const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
			
			// تحديث المحتوى
			container.innerHTML = cart.slice(0, 3).map(item => `
				<div class="product-widget">
					<div class="product-img">
						<img src="${item.image || './img/product01.png'}" alt="${item.name}">
					</div>
					<div class="product-body">
						<h3 class="product-name"><a href="product-details.html?id=${item.id}">${item.name}</a></h3>
						<h4 class="product-price"><span class="qty">${item.quantity}x</span>${formatPrice(item.price)}</h4>
					</div>
					<button class="delete" onclick="removeFromCart('${item.id}')"><i class="fa fa-close"></i></button>
				</div>
			`).join('');
			
			summaryCount.textContent = `${totalItems} Item(s)`;
			summaryTotal.textContent = `SUBTOTAL: ${formatPrice(subtotal)}`;
		}
		
		async function addToCart(productId, productName, productPrice, productImage = './img/product01.png') {
			try {
				// البحث إذا كان المنتج موجوداً في السلة
				const existingItem = cart.find(item => item.id === productId);
				
				if (existingItem) {
					// زيادة الكمية
					existingItem.quantity += 1;
				} else {
					// إضافة منتج جديد
					cart.push({
						id: productId,
						name: productName,
						price: parseFloat(productPrice),
						quantity: 1,
						image: productImage
					});
				}
				
				// إرسال للباك إند
				const response = await fetch(`${API_BASE_URL}/cart`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						productId,
						name: productName,
						price: productPrice,
						quantity: 1,
						image: productImage
					})
				});
				
				// حفظ محلي
				localStorage.setItem('cart', JSON.stringify(cart));
				
				// تحديث الواجهة
				updateCartUI();
				
				// عرض رسالة نجاح
				showNotification(`${productName} added to cart!`);
				
				// تغيير لون الزر
				const btn = event.target.closest('.add-to-cart-btn');
				if (btn) {
					btn.classList.add('added');
					setTimeout(() => btn.classList.remove('added'), 2000);
				}
				
				return true;
				
			} catch (error) {
				console.error('Error adding to cart:', error);
				// حفظ محلي فقط
				localStorage.setItem('cart', JSON.stringify(cart));
				updateCartUI();
				showNotification('Added to cart (offline)', 'warning');
				return false;
			}
		}
		
		async function removeFromCart(productId) {
			try {
				// إزالة من السلة
				cart = cart.filter(item => item.id !== productId);
				
				// إرسال للباك إند
				await fetch(`${API_BASE_URL}/cart/${productId}`, {
					method: 'DELETE'
				});
				
				// حفظ محلي
				localStorage.setItem('cart', JSON.stringify(cart));
				
				// تحديث الواجهة
				updateCartUI();
				updateMiniCart();
				
				showNotification('Item removed from cart');
				
			} catch (error) {
				console.error('Error removing from cart:', error);
				// حفظ محلي فقط
				localStorage.setItem('cart', JSON.stringify(cart));
				updateCartUI();
				updateMiniCart();
			}
		}
		
		// ============================================
		// جلب المنتجات من الباك إند
		// ============================================
		async function loadNewProducts(category = 'all') {
			try {
				showLoading(true);
				
				let url = `${API_BASE_URL}/products/new`;
				if (category !== 'all') {
					url += `?category=${category}`;
				}
				
				const response = await fetch(url);
				const products = await response.json();
				
				displayNewProducts(products);
				
			} catch (error) {
				console.error('Error loading new products:', error);
				// عرض بيانات وهمية في حالة فشل الاتصال
				displaySampleProducts('new');
			} finally {
				showLoading(false);
			}
		}
		
		async function loadTopProducts(category = 'all') {
			try {
				showLoading(true);
				
				let url = `${API_BASE_URL}/products/top`;
				if (category !== 'all') {
					url += `?category=${category}`;
				}
				
				const response = await fetch(url);
				const products = await response.json();
				
				displayTopProducts(products);
				
			} catch (error) {
				console.error('Error loading top products:', error);
				// عرض بيانات وهمية في حالة فشل الاتصال
				displaySampleProducts('top');
			} finally {
				showLoading(false);
			}
		}
		
		async function loadTrendingProducts() {
			try {
				const response = await fetch(`${API_BASE_URL}/products/trending`);
				const products = await response.json();
				
				// تقسيم المنتجات لثلاث مجموعات
				const group1 = products.slice(0, 3);
				const group2 = products.slice(3, 6);
				const group3 = products.slice(6, 9);
				
				displayTrendingProducts(group1, 'trending-container-1');
				displayTrendingProducts(group2, 'trending-container-2');
				displayTrendingProducts(group3, 'trending-container-3');
				
			} catch (error) {
				console.error('Error loading trending products:', error);
				// عرض بيانات وهمية
				displaySampleTrendingProducts();
			}
		}
		
		// ============================================
		// عرض المنتجات
		// ============================================
		function displayNewProducts(products) {
			const container = document.getElementById('new-products-container');
			if (!container) return;
			
			if (products.length === 0) {
				container.innerHTML = '<div class="col-12 text-center py-5"><h4>No new products found</h4></div>';
				return;
			}
			
			const productsHTML = products.map(product => `
				<div class="product">
					<div class="product-img">
						<img src="${product.image || './img/product01.png'}" alt="${product.name}">
						${product.discount ? `<div class="product-label"><span class="sale">-${product.discount}%</span></div>` : ''}
						${product.isNew ? `<div class="product-label"><span class="new">NEW</span></div>` : ''}
					</div>
					<div class="product-body">
						<p class="product-category">${product.category || 'Category'}</p>
						<h3 class="product-name"><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
						<h4 class="product-price">
							${formatPrice(product.price)}
							${product.oldPrice ? `<del class="product-old-price">${formatPrice(product.oldPrice)}</del>` : ''}
						</h4>
						<div class="product-rating">
							${getStarRating(product.rating || 0)}
						</div>
						<div class="product-btns">
							<button class="add-to-wishlist" onclick="addToWishlist('${product.id}')">
								<i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span>
							</button>
							<button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
							<button class="quick-view" onclick="quickView('${product.id}')">
								<i class="fa fa-eye"></i><span class="tooltipp">quick view</span>
							</button>
						</div>
					</div>
					<div class="add-to-cart">
						<button class="add-to-cart-btn" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image || './img/product01.png'}')">
							<i class="fa fa-shopping-cart"></i> add to cart
						</button>
					</div>
				</div>
			`).join('');
			
			container.innerHTML = productsHTML;
			
			// إعادة تهيئة Slick slider
			if (typeof $ !== 'undefined' && $.fn.slick) {
				$('.products-slick').slick('destroy');
				$('.products-slick').slick({
					slidesToShow: 4,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 3000,
					dots: false,
					arrows: true,
					responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 3
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2
							}
						},
						{
							breakpoint: 576,
							settings: {
								slidesToShow: 1
							}
						}
					]
				});
			}
		}
		
		function displayTopProducts(products) {
			const container = document.getElementById('top-products-container');
			if (!container) return;
			
			if (products.length === 0) {
				container.innerHTML = '<div class="col-12 text-center py-5"><h4>No top products found</h4></div>';
				return;
			}
			
			const productsHTML = products.map(product => `
				<div class="product">
					<div class="product-img">
						<img src="${product.image || './img/product01.png'}" alt="${product.name}">
						${product.discount ? `<div class="product-label"><span class="sale">-${product.discount}%</span></div>` : ''}
					</div>
					<div class="product-body">
						<p class="product-category">${product.category || 'Category'}</p>
						<h3 class="product-name"><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
						<h4 class="product-price">
							${formatPrice(product.price)}
							${product.oldPrice ? `<del class="product-old-price">${formatPrice(product.oldPrice)}</del>` : ''}
						</h4>
						<div class="product-rating">
							${getStarRating(product.rating || 0)}
						</div>
						<div class="product-btns">
							<button class="add-to-wishlist" onclick="addToWishlist('${product.id}')">
								<i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span>
							</button>
							<button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
							<button class="quick-view" onclick="quickView('${product.id}')">
								<i class="fa fa-eye"></i><span class="tooltipp">quick view</span>
							</button>
						</div>
					</div>
					<div class="add-to-cart">
						<button class="add-to-cart-btn" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image || './img/product01.png'}')">
							<i class="fa fa-shopping-cart"></i> add to cart
						</button>
					</div>
				</div>
			`).join('');
			
			container.innerHTML = productsHTML;
		}
		
		function displayTrendingProducts(products, containerId) {
			const container = document.getElementById(containerId);
			if (!container) return;
			
			if (!products || products.length === 0) {
				container.innerHTML = '<div>No products available</div>';
				return;
			}
			
			const productsHTML = products.map(product => `
				<div>
					<div class="product-widget">
						<div class="product-img">
							<img src="${product.image || './img/product01.png'}" alt="${product.name}">
						</div>
						<div class="product-body">
							<p class="product-category">${product.category || 'Category'}</p>
							<h3 class="product-name"><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
							<h4 class="product-price">
								${formatPrice(product.price)}
								${product.oldPrice ? `<del class="product-old-price">${formatPrice(product.oldPrice)}</del>` : ''}
							</h4>
						</div>
					</div>
				</div>
			`).join('');
			
			container.innerHTML = productsHTML;
		}
		
		function getStarRating(rating) {
			const fullStars = Math.floor(rating);
			const halfStar = rating % 1 >= 0.5;
			const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
			
			let stars = '';
			for (let i = 0; i < fullStars; i++) {
				stars += '<i class="fa fa-star"></i>';
			}
			if (halfStar) {
				stars += '<i class="fa fa-star-half-o"></i>';
			}
			for (let i = 0; i < emptyStars; i++) {
				stars += '<i class="fa fa-star-o"></i>';
			}
			return stars;
		}
		
		// ============================================
		// دوال إضافية
		// ============================================
		function setupCountdown() {
			// عداد تنازلي لمدة 7 أيام من الآن
			const countDownDate = new Date();
			countDownDate.setDate(countDownDate.getDate() + 7);
			
			function updateCountdown() {
				const now = new Date().getTime();
				const distance = countDownDate - now;
				
				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);
				
				document.getElementById('days').textContent = days.toString().padStart(2, '0');
				document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
				document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
				document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
				
				if (distance < 0) {
					clearInterval(countdownInterval);
					document.getElementById('deal-countdown').innerHTML = '<li><div><h3>DEAL ENDED</h3></div></li>';
				}
			}
			
			updateCountdown();
			const countdownInterval = setInterval(updateCountdown, 1000);
		}
		
		async function addToWishlist(productId) {
			try {
				const response = await fetch(`${API_BASE_URL}/wishlist`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ productId })
				});
				
				wishlist = await response.json();
				document.getElementById('wishlist-count').textContent = wishlist.length;
				showNotification('Added to wishlist!');
				
			} catch (error) {
				console.error('Error adding to wishlist:', error);
				showNotification('Failed to add to wishlist', 'error');
			}
		}
		
		function quickView(productId) {
			// يمكنك فتح modal أو توجيه لصفحة المنتج
			window.location.href = `product-details.html?id=${productId}`;
		}
		
		// ============================================
		// بيانات وهمية للاختبار
		// ============================================
		function displaySampleProducts(type) {
			const sampleProducts = [
				{
					id: '1',
					name: 'Dell XPS 13 Laptop',
					category: 'Laptops',
					price: 1299.99,
					oldPrice: 1499.99,
					image: './img/product01.png',
					rating: 4.5,
					discount: 15,
					isNew: type === 'new'
				},
				{
					id: '2',
					name: 'iPhone 14 Pro',
					category: 'Smartphones',
					price: 999.99,
					oldPrice: 1099.99,
					image: './img/product02.png',
					rating: 4.8,
					discount: 10,
					isNew: type === 'new'
				},
				{
					id: '3',
					name: 'Canon EOS R5',
					category: 'Cameras',
					price: 3899.99,
					image: './img/product03.png',
					rating: 4.7,
					isNew: type === 'new'
				},
				{
					id: '4',
					name: 'Sony WH-1000XM5',
					category: 'Accessories',
					price: 399.99,
					oldPrice: 449.99,
					image: './img/product04.png',
					rating: 4.9,
					discount: 12,
					isNew: type === 'new'
				},
				{
					id: '5',
					name: 'MacBook Pro 16"',
					category: 'Laptops',
					price: 2499.99,
					image: './img/product05.png',
					rating: 4.6,
					isNew: type === 'new'
				}
			];
			
			if (type === 'new') {
				displayNewProducts(sampleProducts);
			} else {
				displayTopProducts(sampleProducts);
			}
		}
		
		function displaySampleTrendingProducts() {
			const sampleProducts = [
				{ id: '1', name: 'Gaming Laptop', category: 'Laptops', price: 1599.99, image: './img/product06.png' },
				{ id: '2', name: 'Samsung Galaxy S23', category: 'Smartphones', price: 899.99, image: './img/product07.png' },
				{ id: '3', name: 'Nikon Z7 II', category: 'Cameras', price: 2999.99, image: './img/product08.png' },
				{ id: '4', name: 'Apple Watch Series 8', category: 'Accessories', price: 399.99, image: './img/product09.png' },
				{ id: '5', name: 'iPad Pro 12.9"', category: 'Tablets', price: 1099.99, image: './img/product01.png' },
				{ id: '6', name: 'Bose QuietComfort 45', category: 'Accessories', price: 329.99, image: './img/product02.png' },
				{ id: '7', name: 'Microsoft Surface Pro 9', category: 'Laptops', price: 1299.99, image: './img/product03.png' },
				{ id: '8', name: 'Google Pixel 7 Pro', category: 'Smartphones', price: 899.99, image: './img/product04.png' },
				{ id: '9', name: 'DJI Mavic 3 Drone', category: 'Cameras', price: 2199.99, image: './img/product05.png' }
			];
			
			displayTrendingProducts(sampleProducts.slice(0, 3), 'trending-container-1');
			displayTrendingProducts(sampleProducts.slice(3, 6), 'trending-container-2');
			displayTrendingProducts(sampleProducts.slice(6, 9), 'trending-container-3');
		}
		
		// ============================================
		// إعداد البحث
		// ============================================
		function setupSearch() {
			document.getElementById('searchForm').addEventListener('submit', function(e) {
				e.preventDefault();
				
				const category = document.getElementById('categorySelect').value;
				const query = document.getElementById('searchInput').value;
				
				if (query.trim() === '' && category === '0') {
					return;
				}
				
				// توجيه لصفحة البحث مع المعايير
				let url = 'products.html?';
				if (query.trim() !== '') {
					url += `search=${encodeURIComponent(query)}`;
				}
				if (category !== '0') {
					url += `${query.trim() !== '' ? '&' : ''}category=${category}`;
				}
				
				window.location.href = url;
			});
		}
		
		// تهيئة الصفحة
		document.addEventListener('DOMContentLoaded', function() {
			loadCart();
			loadNewProducts();
			loadTopProducts();
			loadTrendingProducts();
			setupCountdown();
			setupSearch();
			loadWishlist();
		});
		
		async function loadWishlist() {
			try {
				const response = await fetch(`${API_BASE_URL}/wishlist`);
				wishlist = await response.json();
				document.getElementById('wishlist-count').textContent = wishlist.length;
			} catch (error) {
				console.error('Error loading wishlist:', error);
			}
		}