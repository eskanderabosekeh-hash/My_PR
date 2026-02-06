
		// ============================================
		// إعدادات API
		// ============================================
		const API_BASE_URL = '';
		let currentUser = null;
		let userOrders = [];
		let userAddresses = [];
		let userWishlist = [];
		
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
		
		function formatDate(dateString) {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		}
		
		function showLoading(show) {
			document.getElementById('loading-account').style.display = show ? 'block' : 'none';
			document.getElementById('account-section').style.display = show ? 'none' : 'block';
		}
		
		// ============================================
		// تحميل بيانات المستخدم
		// ============================================
		async function loadUserData() {
			showLoading(true);
			
			try {
				// في الواقع، هذا يجب أن يتضمن token مصادقة
				const response = await fetch(`${API_BASE_URL}/users/me`, {
					headers: {
						// 'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				});
				
				if (!response.ok) {
					if (response.status === 401) {
						// غير مسجل دخول - توجيه لصفحة تسجيل الدخول
						window.location.href = 'login.html';
						return;
					}
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				
				const data = await response.json();
				currentUser = data.user;
				
				// تحميل البيانات الأخرى
				await Promise.all([
					loadUserOrders(),
					loadUserAddresses(),
					loadUserWishlist(),
					loadCart()
				]);
				
				// عرض بيانات المستخدم
				displayUserInfo();
				showDashboard();
				
			} catch (error) {
				console.error('Error loading user data:', error);
				showAlert('error', 'Failed to load account information. Please try again.');
				// عرض بيانات وهمية للاختبار
				loadSampleData();
			} finally {
				showLoading(false);
			}
		}
		
		function displayUserInfo() {
			if (!currentUser) return;
			
			// الاسم
			const fullName = `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim();
			document.getElementById('user-name').textContent = fullName || 'User';
			document.getElementById('dashboard-name').textContent = currentUser.firstName || 'User';
			
			// الإيميل
			document.getElementById('user-email').textContent = currentUser.email || '';
			document.getElementById('profile-email').value = currentUser.email || '';
			
			// معلومات الملف الشخصي
			document.getElementById('first-name').value = currentUser.firstName || '';
			document.getElementById('last-name').value = currentUser.lastName || '';
			document.getElementById('profile-phone').value = currentUser.phone || '';
			document.getElementById('profile-dob').value = currentUser.dateOfBirth || '';
			document.getElementById('profile-gender').value = currentUser.gender || '';
			
			// حساب مدة العضوية
			if (currentUser.createdAt) {
				const joinDate = new Date(currentUser.createdAt);
				document.getElementById('member-since').textContent = joinDate.getFullYear();
			}
		}
		
		// ============================================
		// تحميل طلبات المستخدم
		// ============================================
		async function loadUserOrders() {
			try {
				const response = await fetch(`${API_BASE_URL}/users/me/orders`);
				const data = await response.json();
				userOrders = data.orders || [];
				
				// تحديث العداد
				document.getElementById('total-orders').textContent = userOrders.length;
				
				// عرض الطلبات الأخيرة في الداشبورد
				displayRecentOrders();
				
			} catch (error) {
				console.error('Error loading user orders:', error);
				userOrders = [];
			}
		}
		
		function displayRecentOrders() {
			const container = document.getElementById('recent-orders');
			const recentOrders = userOrders.slice(0, 3); // آخر 3 طلبات
			
			if (recentOrders.length === 0) {
				container.innerHTML = '<p>No orders yet. <a href="products.html">Start shopping!</a></p>';
				return;
			}
			
			const ordersHTML = recentOrders.map(order => `
				<div class="order-card">
					<div style="display: flex; justify-content: space-between; align-items: center;">
						<div>
							<h6>Order #${order.orderId || order.id}</h6>
							<p>Placed on ${formatDate(order.orderDate || order.createdAt)}</p>
						</div>
						<div>
							<span class="order-status ${getStatusClass(order.status)}">${order.status}</span>
							<span style="font-weight: bold; color: #D10024;">${formatPrice(order.total)}</span>
						</div>
					</div>
					<div style="margin-top: 10px;">
						<a href="order-details.html?id=${order.id}" class="primary-btn" style="padding: 5px 15px;">View Details</a>
					</div>
				</div>
			`).join('');
			
			container.innerHTML = ordersHTML;
		}
		
		function displayAllOrders() {
			const container = document.getElementById('orders-container');
			
			if (userOrders.length === 0) {
				container.innerHTML = `
					<div style="text-align: center; padding: 50px;">
						<i class="fa fa-shopping-bag fa-3x" style="color: #ddd; margin-bottom: 20px;"></i>
						<h4>No Orders Yet</h4>
						<p>You haven't placed any orders yet.</p>
						<a href="products.html" class="primary-btn">Start Shopping</a>
					</div>
				`;
				return;
			}
			
			const ordersHTML = userOrders.map(order => `
				<div class="order-card">
					<div style="display: flex; justify-content: space-between
					<div style="display: flex; justify-content: space-between; align-items: flex-start;">
						<div>
							<h6>Order #${order.orderId || order.id}</h6>
							<p><strong>Date:</strong> ${formatDate(order.orderDate || order.createdAt)}</p>
							<p><strong>Items:</strong> ${order.items ? order.items.length : 1} item(s)</p>
						</div>
						<div style="text-align: right;">
							<span class="order-status ${getStatusClass(order.status)}">${order.status}</span>
							<h5 style="color: #D10024; margin-top: 10px;">${formatPrice(order.total)}</h5>
						</div>
					</div>
					<div style="display: flex; justify-content: space-between; margin-top: 15px;">
						<div>
							<a href="order-details.html?id=${order.id}" class="primary-btn" style="padding: 8px 20px;">
								<i class="fa fa-eye"></i> View Details
							</a>
						</div>
						<div>
							${order.status === 'processing' ? 
								`<button class="primary-btn" style="background: #e74c3c; padding: 8px 20px;" 
									onclick="cancelOrder('${order.id}')">
									<i class="fa fa-times"></i> Cancel Order
								</button>` : 
								''
							}
							${order.status === 'delivered' ? 
								`<button class="primary-btn" style="background: #27ae60; padding: 8px 20px;" 
									onclick="reorder('${order.id}')">
									<i class="fa fa-refresh"></i> Reorder
								</button>` : 
								''
							}
						</div>
					</div>
				</div>
			`).join('');
			
			container.innerHTML = ordersHTML;
		}
		
		// ============================================
		// تحميل عناوين المستخدم
		// ============================================
		async function loadUserAddresses() {
			try {
				const response = await fetch(`${API_BASE_URL}/users/me/addresses`);
				const data = await response.json();
				userAddresses = data.addresses || [];
				
				displayAddresses();
				
			} catch (error) {
				console.error('Error loading user addresses:', error);
				userAddresses = [];
			}
		}
		
		function displayAddresses() {
			const container = document.getElementById('addresses-container');
			
			if (userAddresses.length === 0) {
				container.innerHTML = `
					<div style="text-align: center; padding: 30px; background: #f9f9f9; border-radius: 10px;">
						<i class="fa fa-map-marker fa-3x" style="color: #ddd; margin-bottom: 15px;"></i>
						<h4>No Addresses Saved</h4>
						<p>Add your first delivery address</p>
					</div>
				`;
				return;
			}
			
			const addressesHTML = userAddresses.map(address => `
				<div class="address-card" id="address-${address.id}">
					${address.isDefault ? '<span class="default-badge">Default</span>' : ''}
					<h5>${address.fullName}</h5>
					<p>${address.phone}</p>
					<p>${address.line1}</p>
					${address.line2 ? `<p>${address.line2}</p>` : ''}
					<p>${address.city}, ${address.state} ${address.zip}</p>
					<p>${address.country}</p>
					
					<div style="margin-top: 15px;">
						<button class="primary-btn" style="padding: 5px 15px; margin-right: 10px;" 
							onclick="editAddress('${address.id}')">
							<i class="fa fa-edit"></i> Edit
						</button>
						${!address.isDefault ? 
							`<button class="primary-btn" style="background: #27ae60; padding: 5px 15px; margin-right: 10px;" 
								onclick="setDefaultAddress('${address.id}')">
								<i class="fa fa-check"></i> Set as Default
							</button>` : 
							''
						}
						${!address.isDefault ? 
							`<button class="primary-btn" style="background: #e74c3c; padding: 5px 15px;" 
								onclick="deleteAddress('${address.id}')">
								<i class="fa fa-trash"></i> Delete
							</button>` : 
							''
						}
					</div>
				</div>
			`).join('');
			
			container.innerHTML = addressesHTML;
		}
		
		// ============================================
		// تحميل قائمة الرغبات
		// ============================================
		async function loadUserWishlist() {
			try {
				const response = await fetch(`${API_BASE_URL}/users/me/wishlist`);
				const data = await response.json();
				userWishlist = data.wishlist || [];
				
				// تحديث العداد
				document.getElementById('wishlist-total').textContent = userWishlist.length;
				document.getElementById('wishlist-count').textContent = userWishlist.length;
				
				displayWishlist();
				
			} catch (error) {
				console.error('Error loading user wishlist:', error);
				userWishlist = [];
			}
		}
		
		function displayWishlist() {
			const container = document.getElementById('wishlist-container');
			
			if (userWishlist.length === 0) {
				container.innerHTML = `
					<div style="text-align: center; padding: 50px;">
						<i class="fa fa-heart fa-3x" style="color: #ddd; margin-bottom: 20px;"></i>
						<h4>Your Wishlist is Empty</h4>
						<p>Save items you like to your wishlist</p>
						<a href="products.html" class="primary-btn">Browse Products</a>
					</div>
				`;
				return;
			}
			
			const wishlistHTML = userWishlist.map(item => `
				<div class="order-card" style="display: flex; align-items: center;">
					<div style="width: 80px; margin-right: 20px;">
						<img src="${item.image || 'img/product01.png'}" alt="${item.name}" style="width: 100%; border-radius: 5px;">
					</div>
					<div style="flex: 1;">
						<h5 style="margin-bottom: 5px;">${item.name}</h5>
						<p style="color: #666; margin-bottom: 5px;">${item.category || 'Electronics'}</p>
						<h4 style="color: #D10024; margin-bottom: 5px;">${formatPrice(item.price)}</h4>
						${item.inStock ? 
							`<span style="color: #27ae60;"><i class="fa fa-check"></i> In Stock</span>` : 
							`<span style="color: #e74c3c;"><i class="fa fa-times"></i> Out of Stock</span>`
						}
					</div>
					<div>
						<button class="primary-btn" style="margin-right: 10px;" onclick="addToCartFromWishlist('${item.id}')">
							<i class="fa fa-shopping-cart"></i> Add to Cart
						</button>
						<button class="primary-btn" style="background: #e74c3c;" onclick="removeFromWishlist('${item.id}')">
							<i class="fa fa-trash"></i> Remove
						</button>
					</div>
				</div>
			`).join('');
			
			container.innerHTML = wishlistHTML;
		}
		
		// ============================================
		// تحميل السلة
		// ============================================
		async function loadCart() {
			try {
				const response = await fetch(`${API_BASE_URL}/cart`);
				const data = await response.json();
				
				// تحديث عداد السلة
				const cartCount = data.items ? data.items.length : 0;
				const cartTotal = data.total || 0;
				
				document.getElementById('cart-count').textContent = cartCount;
				document.getElementById('cart-summary-count').textContent = `${cartCount} Item(s)`;
				document.getElementById('cart-summary-total').textContent = `SUBTOTAL: ${formatPrice(cartTotal)}`;
				
				// تحديث عناصر السلة في القائمة المنسدلة
				updateCartDropdown(data.items || []);
				
			} catch (error) {
				console.error('Error loading cart:', error);
			}
		}
		
		function updateCartDropdown(items) {
			const container = document.getElementById('cart-dropdown-items');
			
			if (items.length === 0) {
				container.innerHTML = '<div class="empty-cart-message" style="padding: 20px; text-align: center;">Your cart is empty</div>';
				return;
			}
			
			const itemsHTML = items.slice(0, 3).map(item => `
				<div class="product-widget" style="display: flex; padding: 10px; border-bottom: 1px solid #eee;">
					<div class="product-img" style="width: 60px; margin-right: 10px;">
						<img src="${item.image || 'img/product01.png'}" alt="${item.name}" style="width: 100%;">
					</div>
					<div class="product-body" style="flex: 1;">
						<h5 class="product-name" style="margin: 0; font-size: 14px;">${item.name}</h5>
						<h6 class="product-price" style="margin: 5px 0;">
							<span class="qty">${item.quantity}x</span>${formatPrice(item.price)}
						</h6>
					</div>
					<button class="delete" onclick="removeFromCart('${item.id}')" style="background: none; border: none; color: #e74c3c;">
						<i class="fa fa-close"></i>
					</button>
				</div>
			`).join('');
			
			if (items.length > 3) {
				container.innerHTML = itemsHTML + `
					<div style="text-align: center; padding: 10px;">
						<small>And ${items.length - 3} more item(s)</small>
					</div>
				`;
			} else {
				container.innerHTML = itemsHTML;
			}
		}
		
		// ============================================
		// دوال إضافية
		// ============================================
		function getStatusClass(status) {
			const statusMap = {
				'processing': 'status-processing',
				'shipped': 'status-shipped',
				'delivered': 'status-delivered',
				'cancelled': 'status-cancelled',
				'pending': 'status-processing',
				'completed': 'status-delivered'
			};
			return statusMap[status.toLowerCase()] || 'status-processing';
		}
		
		// ============================================
		// دوال إظهار الأقسام
		// ============================================
		function showSection(sectionId) {
			// إخفاء جميع الأقسام
			const sections = document.querySelectorAll('.account-section');
			sections.forEach(section => {
				section.classList.remove('active');
			});
			
			// تحديث الروابط الجانبية
			const links = document.querySelectorAll('.account-sidebar a');
			links.forEach(link => {
				link.classList.remove('active');
			});
			
			// إظهار القسم المطلوب
			document.getElementById(`${sectionId}-section`).classList.add('active');
			
			// تحديث الرابط النشط
			event.target.classList.add('active');
			
			// تحميل البيانات الخاصة بالقسم إذا لزم
			if (sectionId === 'orders') {
				displayAllOrders();
			} else if (sectionId === 'addresses') {
				displayAddresses();
			} else if (sectionId === 'wishlist') {
				displayWishlist();
			}
		}
		
		function showDashboard() {
			showSection('dashboard');
		}
		
		// ============================================
		// دوال العناوين
		// ============================================
		function showAddAddressForm() {
			document.getElementById('add-address-form').style.display = 'block';
			// تمرير إلى الأعلى
			document.getElementById('add-address-form').scrollIntoView({ behavior: 'smooth' });
		}
		
		function hideAddAddressForm() {
			document.getElementById('add-address-form').style.display = 'none';
			document.getElementById('new-address-form').reset();
		}
		
		async function saveAddress(event) {
			event.preventDefault();
			
			const addressData = {
				fullName: document.getElementById('address-name').value,
				phone: document.getElementById('address-phone').value,
				line1: document.getElementById('address-line1').value,
				line2: document.getElementById('address-line2').value,
				city: document.getElementById('address-city').value,
				state: document.getElementById('address-state').value,
				zip: document.getElementById('address-zip').value,
				country: document.getElementById('address-country').value,
				isDefault: document.getElementById('address-default').checked
			};
			
			try {
				const response = await fetch(`${API_BASE_URL}/users/me/addresses`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(addressData)
				});
				
				if (response.ok) {
					showAlert('success', 'Address added successfully!');
					hideAddAddressForm();
					await loadUserAddresses();
				} else {
					throw new Error('Failed to save address');
				}
			} catch (error) {
				console.error('Error saving address:', error);
				showAlert('error', 'Failed to save address. Please try again.');
			}
		}
		
		async function setDefaultAddress(addressId) {
			try {
				const response = await fetch(`${API_BASE_URL}/users/me/addresses/${addressId}/set-default`, {
					method: 'PUT'
				});
				
				if (response.ok) {
					showAlert('success', 'Default address updated!');
					await loadUserAddresses();
				}
			} catch (error) {
				console.error('Error setting default address:', error);
				showAlert('error', 'Failed to update default address.');
			}
		}
		
		async function deleteAddress(addressId) {
			if (!confirm('Are you sure you want to delete this address?')) return;
			
			try {
				const response = await fetch(`${API_BASE_URL}/users/me/addresses/${addressId}`, {
					method: 'DELETE'
				});
				
				if (response.ok) {
					showAlert('success', 'Address deleted successfully!');
					await loadUserAddresses();
				}
			} catch (error) {
				console.error('Error deleting address:', error);
				showAlert('error', 'Failed to delete address.');
			}
		}
		
		// ============================================
		// تحديث الملف الشخصي
		// ============================================
		async function updateProfile(event) {
			event.preventDefault();
			
			const profileData = {
				firstName: document.getElementById('first-name').value,
				lastName: document.getElementById('last-name').value,
				email: document.getElementById('profile-email').value,
				phone: document.getElementById('profile-phone').value,
				dateOfBirth: document.getElementById('profile-dob').value,
				gender: document.getElementById('profile-gender').value
			};
			
			try {
				const response = await fetch(`${API_BASE_URL}/users/me`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(profileData)
				});
				
				if (response.ok) {
					const data = await response.json();
					currentUser = data.user;
					displayUserInfo();
					showAlert('success', 'Profile updated successfully!');
				} else {
					throw new Error('Failed to update profile');
				}
			} catch (error) {
				console.error('Error updating profile:', error);
				showAlert('error', 'Failed to update profile. Please try again.');
			}
		}
		
		// ============================================
		// تغيير كلمة المرور
		// ============================================
		async function changePassword(event) {
			event.preventDefault();
			
			const currentPassword = document.getElementById('current-password').value;
			const newPassword = document.getElementById('new-password').value;
			const confirmPassword = document.getElementById('confirm-password').value;
			
			// التحقق من صحة المدخلات
			if (newPassword !== confirmPassword) {
				showAlert('error', 'New passwords do not match!');
				return;
			}
			
			if (newPassword.length < 8) {
				showAlert('error', 'Password must be at least 8 characters long!');
				return;
			}
			
			const passwordData = {
				currentPassword,
				newPassword
			};
			
			try {
				const response = await fetch(`${API_BASE_URL}/users/me/change-password`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(passwordData)
				});
				
				if (response.ok) {
					showAlert('success', 'Password changed successfully!');
					document.getElementById('password-form').reset();
				} else {
					const error = await response.json();
					throw new Error(error.message || 'Failed to change password');
				}
			} catch (error) {
				console.error('Error changing password:', error);
				showAlert('error', error.message || 'Failed to change password. Please try again.');
			}
		}
		
		// ============================================
		// دوال قائمة الرغبات
		// ============================================
		async function addToCartFromWishlist(productId) {
			try {
				const response = await fetch(`${API_BASE_URL}/cart/add/${productId}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					}
				});
				
				if (response.ok) {
					showAlert('success', 'Product added to cart!');
					await loadCart();
				}
			} catch (error) {
				console.error('Error adding to cart:', error);
				showAlert('error', 'Failed to add product to cart.');
			}
		}
		
		async function removeFromWishlist(productId) {
			try {
				const response = await fetch(`${API_BASE_URL}/users/me/wishlist/${productId}`, {
					method: 'DELETE'
				});
				
				if (response.ok) {
					showAlert('success', 'Product removed from wishlist!');
					await loadUserWishlist();
				}
			} catch (error) {
				console.error('Error removing from wishlist:', error);
				showAlert('error', 'Failed to remove product from wishlist.');
			}
		}
		
		// ============================================
		// دوال الطلبات
		// ============================================
		async function cancelOrder(orderId) {
			if (!confirm('Are you sure you want to cancel this order?')) return;
			
			try {
				const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
					method: 'PUT'
				});
				
				if (response.ok) {
					showAlert('success', 'Order cancelled successfully!');
					await loadUserOrders();
				}
			} catch (error) {
				console.error('Error cancelling order:', error);
				showAlert('error', 'Failed to cancel order.');
			}
		}
		
		async function reorder(orderId) {
			try {
				const response = await fetch(`${API_BASE_URL}/orders/${orderId}/reorder`, {
					method: 'POST'
				});
				
				if (response.ok) {
					showAlert('success', 'Order items added to cart!');
					await loadCart();
					// توجيه إلى السلة
					setTimeout(() => {
						window.location.href = 'cart.html';
					}, 1500);
				}
			} catch (error) {
				console.error('Error reordering:', error);
				showAlert('error', 'Failed to reorder.');
			}
		}
		
		// ============================================
		// تسجيل الخروج
		// ============================================
		async function logout() {
			try {
				const response = await fetch(`${API_BASE_URL}/auth/logout`, {
					method: 'POST'
				});
				
				// مسح بيانات المستخدم المحلية
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				
				// توجيه لصفحة تسجيل الدخول
				window.location.href = 'login.html';
				
			} catch (error) {
				console.error('Error logging out:', error);
				// رغم الخطأ، توجيه المستخدم
				window.location.href = 'login.html';
			}
		}
		
		// ============================================
		// بيانات وهمية للاختبار
		// ============================================
		function loadSampleData() {
			// بيانات مستخدم وهمية
			currentUser = {
				id: 1,
				firstName: "ahmed",
				lastName: "ahmed",
				email: "ahmed132@example.com",
				phone: "+963984267941",
				dateOfBirth: "1990-01-01",
				gender: "male",
				createdAt: "2023-01-15T00:00:00.000Z"
			};
			
			// طلبات وهمية
			userOrders = [
				{
					id: "ORD-001",
					orderId: "ORD-001",
					orderDate: "2024-03-15",
					status: "delivered",
					total: 1299.99,
					items: [
						{ name: "MacBook Pro 14", quantity: 1, price: 1299.99 }
					]
				},
				{
					id: "ORD-002",
					orderId: "ORD-002",
					orderDate: "2024-03-10",
					status: "processing",
					total: 799.99,
					items: [
						{ name: "iPhone 15 Pro", quantity: 1, price: 799.99 }
					]
				},
				{
					id: "ORD-003",
					orderId: "ORD-003",
					orderDate: "2024-02-28",
					status: "shipped",
					total: 459.99,
					items: [
						{ name: "Sony Headphones", quantity: 1, price: 199.99 },
						{ name: "Smart Watch", quantity: 1, price: 260.00 }
					]
				}
			];
			
			// عناوين وهمية
			userAddresses = [
				{
					id: "1",
					fullName: "ahmed ahmed",
					phone: "+963984267941",
					line1: "altaweel Street",
					city: "damascus",
					state: "",
					zip: "",
					country: "syria",
					isDefault: true
				},
				{
					id: "2",
					fullName: "ahmed ahmed",
					phone: "+963936715964",
					line1: "baghdad Avenue",
					city: "damascus",
					state: "",
					zip: "",
					country: "syria",
					isDefault: false
				}
			];
			
			// قائمة رغبات وهمية
			userWishlist = [
				{
					id: "1",
					name: "Samsung Galaxy S24",
					category: "Smartphones",
					price: 899.99,
					image: "img/product02.png",
					inStock: true
				},
				{
					id: "2",
					name: "iPad Pro 12.9",
					category: "Tablets",
					price: 1099.99,
					image: "img/product04.png",
					inStock: true
				}
			];
			
			// عرض البيانات
			displayUserInfo();
			document.getElementById('total-orders').textContent = userOrders.length;
			document.getElementById('wishlist-total').textContent = userWishlist.length;
			document.getElementById('wishlist-count').textContent = userWishlist.length;
			document.getElementById('member-since').textContent = "2023";
			document.getElementById('cart-count').textContent = 2;
			document.getElementById('cart-summary-count').textContent = "2 Item(s)";
			document.getElementById('cart-summary-total').textContent = "SUBTOTAL: $129.98";
			
			displayRecentOrders();
		}
		
		// ============================================
		// إضافة مستمعي الأحداث
		// ============================================
		document.addEventListener('DOMContentLoaded', function() {
			// تحميل بيانات المستخدم عند تحميل الصفحة
			loadUserData();
			
			// ربط نماذج الإرسال
			document.getElementById('new-address-form')?.addEventListener('submit', saveAddress);
			document.getElementById('profile-form')?.addEventListener('submit', updateProfile);
			document.getElementById('password-form')?.addEventListener('submit', changePassword);
			
			// البحث
			document.getElementById('searchForm')?.addEventListener('submit', function(e) {
				e.preventDefault();
				const query = document.getElementById('searchInput').value;
				const category = document.getElementById('categorySelect').value;
				
				if (query.trim()) {
					window.location.href = `products.html?search=${encodeURIComponent(query)}&category=${category}`;
				}
			});
		});
		
		// ============================================
		// نافذة JavaScript الرئيسية
		// ============================================
		window.showSection = showSection;
		window.showAddAddressForm = showAddAddressForm;
		window.hideAddAddressForm = hideAddAddressForm;
		window.logout = logout;
		window.cancelOrder = cancelOrder;
		window.reorder = reorder;
		window.setDefaultAddress = setDefaultAddress;
		window.deleteAddress = deleteAddress;
		window.addToCartFromWishlist = addToCartFromWishlist;
		window.removeFromWishlist = removeFromWishlist;
		window.removeFromCart = async function(productId) {
			try {
				const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
					method: 'DELETE'
				});
				
				if (response.ok) {
					await loadCart();
				}
			} catch (error) {
				console.error('Error removing from cart:', error);
			}
		};