
		// ========== Sitting==========
		const API_BASE_URL = ''; 
		let cartItems = [];
		let orderData = {};
		
		// ========== load cart ==========
		async function loadCartFromBackend() {
			try {
				showLoading(true);
				const response = await fetch(`${API_BASE_URL}/cart`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
						// 'Authorization': 'Bearer ' + localStorage.getItem('token') // إذا كان عندك مصادقة
					}
				});
				
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				
				const data = await response.json();
				cartItems = data.items || data; 
				
				if (cartItems.length > 0) {
					displayCartItems(cartItems);
					calculateTotals(cartItems);
					updateCartCount(cartItems);
				} else {
					showEmptyCartMessage();
				}
				
				return cartItems;
				
			} catch (error) {
				console.error('Error loading cart:', error);
				showAlert('error', 'Failed to load cart. Please try again.');
				
				
				const localCart = JSON.parse(localStorage.getItem('cart')) || [];
				if (localCart.length > 0) {
					showAlert('warning', 'Using local cart data (offline mode)');
					cartItems = localCart;
					displayCartItems(cartItems);
					calculateTotals(cartItems);
					updateCartCount(cartItems);
				} else {
					showEmptyCartMessage();
				}
				
				return localCart;
			} finally {
				showLoading(false);
			}
		}
		
		// ========== show cart ==========
		function displayCartItems(items) {
			const container = document.getElementById('order-items-container');
			if (!container) return;
			
			document.getElementById('empty-cart-message').style.display = 'none';
			
			const itemsHTML = items.map(item => `
				<div class="order-item">
					<div class="order-item-details">
						<h5>${item.name || item.productName}</h5>
						<p>Quantity: ${item.quantity}</p>
					</div>
					<div class="order-item-price">
						$${(item.price * item.quantity).toFixed(2)}
					</div>
				</div>
			`).join('');
			
			container.innerHTML = itemsHTML;
		}
		
		// ========== calcu total==========
		function calculateTotals(items) {
			if (!items || items.length === 0) {
				updateTotalsDisplay(0, 0, 0, 0);
				return;
			}
			
			const subtotal = items.reduce((sum, item) => {
				return sum + (item.price * item.quantity);
			}, 0);
			
			const shipping = 0; 
			const taxRate = 0.1; 
			const tax = subtotal * taxRate;
			const total = subtotal + shipping + tax;
			
			updateTotalsDisplay(subtotal, shipping, tax, total);
		}
		
		function updateTotalsDisplay(subtotal, shipping, tax, total) {
			document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
			document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
			document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
			document.getElementById('total').textContent = `$${total.toFixed(2)}`;
		}
		
		function setupEventListeners() {
			// chang address
			document.getElementById('differentBilling').addEventListener('change', function() {
				const billingFields = document.getElementById('billing-fields');
				billingFields.style.display = this.checked ? 'block' : 'none';
				
				if (this.checked) {
					// auto fill shipping
					copyShippingToBilling();
				}
			});
			
			// change payment method
			document.querySelectorAll('input[name="payment"]').forEach(radio => {
				radio.addEventListener('change', function() {
					const cardDetails = document.getElementById('card-details');
					cardDetails.style.display = this.value === 'card' ? 'block' : 'none';
				});
			});
			
			// submit order
			document.getElementById('submit-order-btn').addEventListener('click', submitOrder);
			
			document.querySelectorAll('#firstName, #lastName, #email, #address, #city, #country, #phone').forEach(input => {
				input.addEventListener('blur', validateField);
			});
			
			// terms
			document.getElementById('terms').addEventListener('change', function() {
				document.getElementById('terms-error').style.display = this.checked ? 'none' : 'block';
			});
		}
		
		// ========== validate==========
		function validateField(e) {
			const field = e.target;
			const errorId = field.id + '-error';
			const errorElement = document.getElementById(errorId);
			
			if (!field.value.trim()) {
				field.classList.add('error');
				if (errorElement) errorElement.style.display = 'block';
				return false;
			}
			
			// validate email
			if (field.type === 'email') {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(field.value)) {
					field.classList.add('error');
					if (errorElement) errorElement.textContent = 'Please enter a valid email address';
					if (errorElement) errorElement.style.display = 'block';
					return false;
				}
			}
			
			field.classList.remove('error');
			if (errorElement) errorElement.style.display = 'none';
			return true;
		}
		
		function validateForm() {
			let isValid = true;
			const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'country', 'phone'];
			
			requiredFields.forEach(fieldId => {
				const field = document.getElementById(fieldId);
				if (!field || !field.value.trim()) {
					field.classList.add('error');
					document.getElementById(fieldId + '-error').style.display = 'block';
					isValid = false;
				} else {
					field.classList.remove('error');
					document.getElementById(fieldId + '-error').style.display = 'none';
				}
			});
			
			// validate email
			const emailField = document.getElementById('email');
			if (emailField && emailField.value.trim()) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(emailField.value)) {
					emailField.classList.add('error');
					document.getElementById('email-error').textContent = 'Please enter a valid email address';
					document.getElementById('email-error').style.display = 'block';
					isValid = false;
				}
			}
			
			//// validate cart
			if (cartItems.length === 0) {
				showAlert('error', 'Your cart is empty!');
				isValid = false;
			}
			
			// // validate terms
			if (!document.getElementById('terms').checked) {
				document.getElementById('terms-error').style.display = 'block';
				isValid = false;
			} else {
				document.getElementById('terms-error').style.display = 'none';
			}
			
			return isValid;
		}
		
		// ========== send to backend ==========
		async function submitOrder() {
			// validate form
			if (!validateForm()) {
				showAlert('error', 'Please fill all required fields correctly.');
				return;
			}
			
			// order data
			orderData = {
				customer: {
					firstName: document.getElementById('firstName').value,
					lastName: document.getElementById('lastName').value,
					email: document.getElementById('email').value,
					phone: document.getElementById('phone').value
				},
				shipping: {
					address: document.getElementById('address').value,
					city: document.getElementById('city').value,
					country: document.getElementById('country').value,
					notes: document.getElementById('orderNotes').value || ''
				},
				billing: {},
				items: cartItems,
				payment: {
					method: document.querySelector('input[name="payment"]:checked').value,
					details: {}
				},
				totals: {
					subtotal: parseFloat(document.getElementById('subtotal').textContent.replace('$', '')),
					shipping: 0,
					tax: parseFloat(document.getElementById('tax').textContent.replace('$', '')),
					total: parseFloat(document.getElementById('total').textContent.replace('$', ''))
				}
			};
			
			// add diffrent billing data
			if (document.getElementById('differentBilling').checked) {
				orderData.billing = {
					firstName: document.getElementById('billingFirstName').value || orderData.customer.firstName,
					lastName: document.getElementById('billingLastName').value || orderData.customer.lastName,
					email: document.getElementById('billingEmail').value || orderData.customer.email,
					address: document.getElementById('billingAddress').value || orderData.shipping.address,
					city: document.getElementById('billingCity').value || orderData.shipping.city,
					country: document.getElementById('billingCountry').value || orderData.shipping.country,
					phone: document.getElementById('billingPhone').value || orderData.customer.phone
				};
			} else {
				orderData.billing = { ...orderData.shipping, ...orderData.customer };
			}
			
			// add card detail
			if (orderData.payment.method === 'card') {
				orderData.payment.details = {
					cardNumber: document.getElementById('cardNumber').value,
					cardExpiry: document.getElementById('cardExpiry').value,
					cardCVC: document.getElementById('cardCVC').value,
					cardName: document.getElementById('cardName').value
				};
			}
			
			// submit order
			try {
				showSubmitLoading(true);
				
				const response = await fetch(`${API_BASE_URL}/orders`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						// 'Authorization': 'Bearer ' + localStorage.getItem('token') // إذا كان عندك مصادقة
					},
					body: JSON.stringify(orderData)
				});
				
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				
				const result = await response.json();
				
				// success
				showAlert('success', `Order #${result.orderId || result.id} placed successfully!`);
				
				// clear cart
				await clearCart();
				
				// back to validate 
				setTimeout(() => {
					window.location.href = `order-confirmation.html?orderId=${result.orderId || result.id}`;
				}, 2000);
				
			} catch (error) {
				console.error('Error submitting order:', error);
				showAlert('error', 'Failed to place order. Please try again.');
				
				// save order when there are no connection
				saveOrderLocally(orderData);
				
			} finally {
				showSubmitLoading(false);
			}
		}
		
		function copyShippingToBilling() {
			document.getElementById('billingFirstName').value = document.getElementById('firstName').value;
			document.getElementById('billingLastName').value = document.getElementById('lastName').value;
			document.getElementById('billingEmail').value = document.getElementById('email').value;
			document.getElementById('billingAddress').value = document.getElementById('address').value;
			document.getElementById('billingCity').value = document.getElementById('city').value;
			document.getElementById('billingCountry').value = document.getElementById('country').value;
			document.getElementById('billingPhone').value = document.getElementById('phone').value;
		}
		
		async function clearCart() {
			try {
				await fetch(`${API_BASE_URL}/cart/clear`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				});
			} catch (error) {
				console.error('Error clearing cart:', error);
			}
			
			// clear cart
			localStorage.removeItem('cart');
			cartItems = [];
		}
		
		function saveOrderLocally(order) {
			const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
			order.localId = 'LOCAL_' + Date.now();
			order.status = 'pending';
			order.createdAt = new Date().toISOString();
			localOrders.push(order);
			localStorage.setItem('orders', JSON.stringify(localOrders));
			
			showAlert('warning', 'Order saved locally. Will sync when online.');
		}
		
		function updateCartCount(items) {
			const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
			document.getElementById('cart-count').textContent = totalItems;
			
			// minicart
			if (items.length > 0) {
				const miniCart = document.getElementById('mini-cart');
				const firstItem = items[0];
				miniCart.innerHTML = `
					<div class="product-widget">
						<div class="product-img">
							<img src="${firstItem.image || './img/product01.png'}" alt="${firstItem.name}">
						</div>
						<div class="product-body">
							<h3 class="product-name"><a href="#">${firstItem.name}</a></h3>
							<h4 class="product-price"><span class="qty">${firstItem.quantity}x</span>$${firstItem.price}</h4>
						</div>
					</div>
				`;
				document.getElementById('mini-cart-count').textContent = `${totalItems} Item(s) selected`;
				
				const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
				document.getElementById('mini-cart-total').textContent = `SUBTOTAL: $${total.toFixed(2)}`;
			}
		}
		
		function showEmptyCartMessage() {
			const container = document.getElementById('order-items-container');
			if (container) {
				container.innerHTML = `
					<div id="empty-cart-message">
						<i class="fa fa-shopping-cart" style="font-size: 48px; margin-bottom: 20px;"></i>
						<h4>Your cart is empty</h4>
						<p>Add products to your cart first</p>
						<a href="products.html" class="primary-btn">Continue Shopping</a>
					</div>
				`;
			}
		}
		
		function showLoading(isLoading) {
			const container = document.querySelector('.order-summary');
			if (container) {
				if (isLoading) {
					container.classList.add('loading');
				} else {
					container.classList.remove('loading');
				}
			}
		}
		
		function showSubmitLoading(isLoading) {
			const btn = document.getElementById('submit-order-btn');
			const btnText = document.getElementById('submit-btn-text');
			const btnLoading = document.getElementById('submit-btn-loading');
			
			if (isLoading) {
				btn.disabled = true;
				btnText.style.display = 'none';
				btnLoading.style.display = 'inline';
				btn.classList.add('loading');
			} else {
				btn.disabled = false;
				btnText.style.display = 'inline';
				btnLoading.style.display = 'none';
				btn.classList.remove('loading');
			}
		}
		
		function showAlert(type, message) {
			const alertElement = document.getElementById(`${type}-alert`);
			if (alertElement) {
				alertElement.textContent = message;
				alertElement.style.display = 'block';
				
				setTimeout(() => {
					alertElement.style.display = 'none';
				}, 5000);
			}
			console.log(`[${type.toUpperCase()}] ${message}`);
		}
		document.addEventListener('DOMContentLoaded', async function() {
			await loadCartFromBackend();
			setupEventListeners();
		});