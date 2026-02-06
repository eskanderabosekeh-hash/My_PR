
		const API_BASE_URL = '';
		let cartItems = [];
		let couponApplied = false;
		let couponDiscount = 0;
		
		// ============================================
		// دوال المساعدة
		// ============================================
		function showAlert(type, message) {
			const alertElement = document.getElementById(`${type}-alert`);
			if (alertElement) {
				alertElement.textContent = message;
				alertElement.style.display = 'block';
				setTimeout(() => {
					alertElement.style.display = 'none';
				}, 5000);
			}
		}
		
		function formatPrice(price) {
			return `$${parseFloat(price).toFixed(2)}`;
		}
		
		function showLoading(show) {
			document.getElementById('loading-cart').style.display = show ? 'block' : 'none';
		}
		
		function showEmptyCart(show) {
			document.getElementById('empty-cart').style.display = show ? 'block' : 'none';
			document.getElementById('cart-section').style.display = show ? 'none' : 'block';
		}
		
		// ============================================
		// تحميل السلة من الباك إند
		// ============================================
		async function loadCart() {
			showLoading(true);
			
			try {
				const response = await fetch(`${API_BASE_URL}/cart`);
				
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				
				const data = await response.json();
				cartItems = data.items || [];
				
				if (cartItems.length === 0) {
					showEmptyCart(true);
				} else {
					showEmptyCart(false);
					displayCartItems();
					updateCartSummary();
					updateCartUI();
				}
				
				// تحميل المنتجات التي تم مشاهدتها مؤخراً
				loadRecentlyViewed();
				
			} catch (error) {
				console.error('Error loading cart:', error);
				showAlert('error', 'Failed to load cart. Please try again.');
				showEmptyCart(true);
				// محاولة استخدام البيانات المحلية
				loadCartFromLocalStorage();
			} finally {
				showLoading(false);
			}
		}
		
		function loadCartFromLocalStorage() {
			cartItems = JSON.parse(localStorage.getItem('cart')) || [];
			
			if (cartItems.length === 0) {
				showEmptyCart(true);
			} else {
				showEmptyCart(false);
				displayCartItems();
				updateCartSummary();
				updateCartUI();
				showAlert('warning', 'Using local cart data (offline mode)');
			}
		}
		
		// ============================================
		// عرض عناصر السلة
		// ============================================
		function displayCartItems() {
			const container = document.getElementById('cart-items-container');
			
			if (cartItems.length === 0) {
				container.innerHTML = '<p>No items in cart</p>';
				return;
			}
			
			const itemsHTML = cartItems.map((item, index) => `
				<div class="cart-item" data-index="${index}">
					<img src="${item.image || './img/product01.png'}" alt="${item.name}" class="cart-item-image">
					<div class="cart-item-details">
						<h5><a href="product-details.html?id=${item.id}">${item.name}</a></h5>
						<p>${item.category || 'Category'}</p>
						<div class="stock-status ${getStockClass(item.stock)}">
							${getStockText(item.stock)}
						</div>
						
						<div class="quantity-control">
							<button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
							<input type="number" class="quantity-input" value="${item.quantity}" 
								   min="1" max="${item.stock || 99}" 
								   onchange="updateQuantity(${index}, this.value)">
							<button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
							<span style="margin-left: 20px;">Each: ${formatPrice(item.price)}</span>
						</div>
					</div>
					<div style="text-align: right;">
						<div class="cart-item-price" id="item-total-${index}">
							${formatPrice(item.price * item.quantity)}
						</div>
						<button class="remove-btn" onclick="removeFromCart(${index})">
							<i class="fa fa-trash"></i> Remove
						</button>
					</div>
				</div>
			`).join('');
			
			container.innerHTML = itemsHTML;
			document.getElementById('cart-items-count').textContent = cartItems.length;
			document.getElementById('summary-items-count').textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
		}
		
		function getStockClass(stock) {
			if (!stock && stock !== 0) return 'in-stock';
			if (stock > 10) return 'in-stock';
			if (stock > 0) return 'low-stock';
			return 'out-of-stock';
		}
		
		function getStockText(stock) {
			if (!stock && stock !== 0) return 'In Stock';
			if (stock > 10) return 'In Stock';
			if (stock > 0) return `Only ${stock} left!`;
			return 'Out of Stock';
		}
		
		// ============================================
		// تحديث الكميات
		// ============================================
		function increaseQuantity(index) {
			const item = cartItems[index];
			const maxQty = item.stock || 99;
			
			if (item.quantity < maxQty) {
				item.quantity += 1;
				updateItemInCart(index);
			} else {
				showAlert('error', `Maximum quantity (${maxQty}) reached for this item`);
			}
		}
		
		function decreaseQuantity(index) {
			const item = cartItems[index];
			
			if (item.quantity > 1) {
				item.quantity -= 1;
				updateItemInCart(index);
			} else {
				removeFromCart(index);
			}
		}
		
		function updateQuantity(index, newQuantity) {
			const item = cartItems[index];
			const maxQty = item.stock || 99;
			const qty = parseInt(newQuantity) || 1;
			
			if (qty < 1) {
				removeFromCart(index);
				return;
			}
			
			if (qty > maxQty) {
				showAlert('error', `Maximum quantity (${maxQty}) for this item`);
				item.quantity = maxQty;
			} else {
				item.quantity = qty;
			}
			
			updateItemInCart(index);
		}
		
		async function updateItemInCart(index) {
			const item = cartItems[index];
			
			// تحديث الواجهة فوراً
			document.querySelector(`[data-index="${index}"] .quantity-input`).value = item.quantity;
			document.getElementById(`item-total-${index}`).textContent = formatPrice(item.price * item.quantity);
			
			// تحديث الملخص
			updateCartSummary();
			updateCartUI();
			
			try {
				// تحديث في الباك إند
				await fetch(`${API_BASE_URL}/cart/${item.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						quantity: item.quantity
					})
				});
				
				// حفظ محلي
				localStorage.setItem('cart', JSON.stringify(cartItems));
				
			} catch (error) {
				console.error('Error updating cart item:', error);
				// حفظ محلي فقط
				localStorage.setItem('cart', JSON.stringify(cartItems));
				showAlert('warning', 'Changes saved locally (offline mode)');
			}
		}
		
		// ============================================
		// إزالة عنصر من السلة
		// ============================================
		async function removeFromCart(index) {
			const item = cartItems[index];
			const itemName = item.name;
			
			// إزالة من المصفوفة
			cartItems.splice(index, 1);
			
			// إعادة عرض السلة
			displayCartItems();
			updateCartSummary();
			updateCartUI();
			
			if (cartItems.length === 0) {
				showEmptyCart(true);
			}
			
			try {
				// إزالة من الباك إند
				await fetch(`${API_BASE_URL}/cart/${item.id}`, {
					method: 'DELETE'
				});
				
				// حفظ محلي
				localStorage.setItem('cart', JSON.stringify(cartItems));
				
				showAlert('success', `${itemName} removed from cart`);
				
			} catch (error) {
				console.error('Error removing from cart:', error);
				// حفظ محلي فقط
				localStorage.setItem('cart', JSON.stringify(cartItems));
				showAlert('warning', 'Item removed locally (offline mode)');
			}
		}
		
		// ============================================
		// تحديث ملخص السلة
		// ============================================
		function updateCartSummary() {
			const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
			const tax = subtotal * 0.1; // 10% ضريبة
			const shipping = 0; // مجاني
			
			let discount = 0;
			if (couponApplied) {
				discount = subtotal * couponDiscount;
			}
			
			const total = subtotal + tax + shipping - discount;
			
			// تحديث العرض
			document.getElementById('subtotal').textContent = formatPrice(subtotal);
			document.getElementById('tax').textContent = formatPrice(tax);
			document.getElementById('total').textContent = formatPrice(total);
			
			// عرض أو إخفاء خصم الكوبون
			const discountRow = document.getElementById('discount-row');
			const discountAmount = document.getElementById('discount');
			
			if (couponApplied) {
				discountRow.style.display = 'flex';
				discountAmount.textContent = `-${formatPrice(discount)}`;
			} else {
				discountRow.style.display = 'none';
			}
		}
		
		// ============================================
		// تحديث واجهة السلة
		// ============================================
		function updateCartUI() {
			// تحديث العداد في الهيدر
			const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
			document.getElementById('cart-count').textContent = cartCount;
			
			// تحديث السلة المصغرة
			updateMiniCart();
		}
		
		function updateMiniCart() {
			const container = document.getElementById('cart-dropdown-items');
			const summaryCount = document.getElementById('cart-summary-count');
			const summaryTotal = document.getElementById('cart-summary-total');
			
			if (cartItems.length === 0) {
				container.innerHTML = '<div class="empty-cart-message" style="padding: 20px; text-align: center;">Your cart is empty</div>';
				summaryCount.textContent = '0 Item(s)';
				summaryTotal.textContent = 'SUBTOTAL: $0.00';
				return;
			}
			
			const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
			const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
			
			container.innerHTML = cartItems.slice(0, 3).map(item => `
				<div class="product-widget">
					<div class="product-img">
						<img src="${item.image || './img/product01.png'}" alt="${item.name}">
					</div>
					<div class="product-body">
						<h3 class="product-name"><a href="product-details.html?id=${item.id}">${item.name}</a></h3>
						<h4 class="product-price"><span class="qty">${item.quantity}x</span>${formatPrice(item.price)}</h4>
					</div>
					<button class="delete" onclick="removeFromCartFromDropdown('${item.id}')"><i class="fa fa-close"></i></button>
				</div>
			`).join('');
			
			summaryCount.textContent = `${totalItems} Item(s)`;
			summaryTotal.textContent = `SUBTOTAL: ${formatPrice(subtotal)}`;
		}
		
		async function removeFromCartFromDropdown(productId) {
			const index = cartItems.findIndex(item => item.id === productId);
			if (index !== -1) {
				await removeFromCart(index);
			}
		}
		
		// ============================================
		// تطبيق كوبون الخصم
		// ============================================
		async function applyCoupon() {
			const couponCode = document.getElementById('coupon-code').value.trim();
			
			if (!couponCode) {
				showAlert('error', 'Please enter a coupon code');
				return;
			}
			
			try {
				const response = await fetch(`${API_BASE_URL}/coupons/validate`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						code: couponCode,
						cartTotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
					})
				});
				
				const data = await response.json();
				
				if (data.valid) {
					couponApplied = true;
					couponDiscount = data.discount / 100; // تحويل النسبة المئوية إلى عشري
					updateCartSummary();
					showAlert('success', `Coupon applied! ${data.discount}% discount`);
				} else {
					showAlert('error', data.message || 'Invalid coupon code');
				}
				
			} catch (error) {
				console.error('Error applying coupon:', error);
				showAlert('error', 'Failed to apply coupon. Please try again.');
			}
		}
		
		// ============================================
		// تحديث السلة بالكامل
		// ============================================
		async function updateEntireCart() {
			try {
				// إرسال تحديثات الكمية للباك إند
				await Promise.all(cartItems.map(item => 
					fetch(`${API_BASE_URL}/cart/${item.id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							quantity: item.quantity
						})
					})
				));
				
				// حفظ محلي
				localStorage.setItem('cart', JSON.stringify(cartItems));
				
				showAlert('success', 'Cart updated successfully!');
				
			} catch (error) {
				console.error('Error updating cart:', error);
				// حفظ محلي فقط
				localStorage.setItem('cart', JSON.stringify(cartItems));
				showAlert('warning', 'Cart updated locally (offline mode)');
			}
		}
		
		// ============================================
		// تحميل المنتجات التي تم مشاهدتها مؤخراً
		// ============================================
		async function loadRecentlyViewed() {
			try {
				const response = await fetch(`${API_BASE_URL}/products/recent`);
				const products = await response.json();
				displayRecentlyViewed(products);
			} catch (error) {
				console.error('Error loading recently viewed:', error);
				// عرض منتجات وهمية
				displaySampleRecentlyViewed();
			}
		}
		
		function displayRecentlyViewed(products) {
			const container = document.getElementById('recently-viewed');
			
			if (!products || products.length === 0) {
				container.innerHTML = '<p>No recently viewed products</p>';
				return;
			}
			
			const productsHTML = products.slice(0, 5).map(product => `
				<div style="min-width: 200px; text-align: center;">
					<img src="${product.image || './img/product01.png'}" alt="${product.name}" 
						 style="width: 100px; height: 100px; object-fit: cover;">
					<h6><a href="product-details.html?id=${product.id}">${product.name}</a></h6>
					<p style="color: #D10024; font-weight: bold;">${formatPrice(product.price)}</p>
					<button class="primary-btn" onclick="addToCartFromRecent('${product.id}', '${product.name}', ${product.price})">
						Add to Cart
					</button>
				</div>
			`).join('');
			
			container.innerHTML = productsHTML;
		}
		
		async function addToCartFromRecent(productId, productName, productPrice) {
			try {
				// البحث إذا كان المنتج موجوداً في السلة
				const existingItem = cartItems.find(item => item.id === productId);
				
				if (existingItem) {
					// زيادة الكمية
					existingItem.quantity += 1;
				} else {
					// إضافة منتج جديد
					cartItems.push({
						id: productId,
						name: productName,
						price: parseFloat(productPrice),
						quantity: 1,
						image: './img/product01.png'
					});
				}
				
				// إرسال للباك إند
				await fetch(`${API_BASE_URL}/cart`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						productId,
						name: productName,
						price: productPrice,
						quantity: 1
					})
				});
				
				// حفظ محلي
				localStorage.setItem('cart', JSON.stringify(cartItems));
				
				// تحديث الواجهة
				displayCartItems();
				updateCartSummary();
				updateCartUI();
				
				showAlert('success', `${productName} added to cart!`);
				
			} catch (error) {
				console.error('Error adding to cart:', error);
				// حفظ محلي فقط
				localStorage.setItem('cart', JSON.stringify(cartItems));
				displayCartItems();
				updateCartSummary();
				updateCartUI();
				showAlert('error', 'Failed to add to cart. Please try again.');
			}
		}
		
		function displaySampleRecentlyViewed() {
			const sampleProducts = [
				{
					id: '1',
					name: 'Wireless Headphones',
					price: 299.99,
					image: './img/product01.png'
				},
				{
					id: '2',
					name: 'Smart Watch',
					price: 199.99,
					image: './img/product02.png'
				},
				{
					id: '3',
					name: 'Bluetooth Speaker',
					price: 129.99,
					image: './img/product03.png'
				},
				{
					id: '4',
					name: 'Gaming Mouse',
					price: 79.99,
					image: './img/product04.png'
				},
				{
					id: '5',
					name: 'USB-C Hub',
					price: 49.99,
					image: './img/product05.png'
				}
			];
			
			displayRecentlyViewed(sampleProducts);
		}
		
		// ============================================
		// إعداد البحث
		// ============================================
		function setupSearch() {
			document.getElementById('searchForm').addEventListener('submit', function(e) {
				e.preventDefault();
				const category = document.getElementById('categorySelect').value;
				const query = document.getElementById('searchInput').value;
				
				let url = 'products.html?';
				if (query.trim() !== '') {
					url += `search=${encodeURIComponent(query)}`;
				}
				if (category !== 'all') {
					url += `${query.trim() !== '' ? '&' : ''}category=${category}`;
				}
				
				window.location.href = url;
			});
		}
		
		// ============================================
		// إعداد مستمعات الأحداث
		// ============================================
		function setupEventListeners() {
			// تطبيق الكوبون
			document.getElementById('apply-coupon').addEventListener('click', applyCoupon);
			
			// تحديث السلة
			document.getElementById('update-cart').addEventListener('click', updateEntireCart);
			
			// إدخال الكوبون عند الضغط على Enter
			document.getElementById('coupon-code').addEventListener('keypress', function(e) {
				if (e.key === 'Enter') {
					e.preventDefault();
					applyCoupon();
				}
			});
			
			// تحميل قائمة الأمنيات
			loadWishlist();
		}
		
		async function loadWishlist() {
			try {
				const response = await fetch(`${API_BASE_URL}/wishlist`);
				const wishlist = await response.json();
				document.getElementById('wishlist-count').textContent = wishlist.length;
			} catch (error) {
				console.error('Error loading wishlist:', error);
			}
		}
		
		// ============================================
		// تهيئة الصفحة
		// ============================================
		document.addEventListener('DOMContentLoaded', function() {
			// تحميل السلة
			loadCart();
			
			// إعداد البحث
			setupSearch();
			
			// إعداد مستمعات الأحداث
			setupEventListeners();
		});
