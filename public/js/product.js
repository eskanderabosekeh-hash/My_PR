
		// ============================================
		// إعدادات API
		// ============================================
		console.log('PRODUCTS JS LOADED');

		const API_BASE_URL = window.API_BASE_URL || '/api';

		let currentProduct = null;
		let cart = [];
		
		// ============================================
		// جلب معرف المنتج من URL
		// ============================================
		function getProductIdFromURL() {
			const urlParams = new URLSearchParams(window.location.search);
			return urlParams.get('id');
		}
		
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
		// تحميل بيانات المنتج من الباك إند
		// ============================================
		async function loadProductDetails() {
			const productId = getProductIdFromURL();
			
			if (!productId) {
				showErrorState('Product ID not found in URL');
				return;
			}
			
			showLoading(true);
			
			try {
				const response = await fetch(`${API_BASE_URL}/products/${productId}`);
				
				if (!response.ok) {
					if (response.status === 404) {
						throw new Error('Product not found');
					} else {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
				}
				
				currentProduct = await response.json();
				displayProductDetails();
				loadRelatedProducts();
				loadProductReviews();
				
			} catch (error) {
				console.error('Error loading product:', error);
				showErrorState(error.message);
				// عرض بيانات وهمية للاختبار
				loadSampleProduct();
			} finally {
				showLoading(false);
			}
		}
		
		function showLoading(show) {
			document.getElementById('loading-product').style.display = show ? 'block' : 'none';
			document.getElementById('product-details-section').style.display = show ? 'none' : 'block';
		}
		
		function showErrorState(message) {
			document.getElementById('loading-product').style.display = 'none';
			document.getElementById('product-details-section').style.display = 'none';
			document.getElementById('product-not-found').style.display = 'block';
			document.getElementById('product-not-found').innerHTML = `
				<h2>Product Not Found</h2>
				<p>${message}</p>
				<a href="products.html" class="primary-btn">Browse Products</a>
			`;
		}
		
		// ============================================
		// عرض تفاصيل المنتج
		// ============================================
		function displayProductDetails() {
			if (!currentProduct) return;
			
			// معلومات أساسية
			document.getElementById('product-name').textContent = currentProduct.name;
			document.getElementById('product-price').innerHTML = `
				${formatPrice(currentProduct.price)}
				${currentProduct.oldPrice ? `<del class="product-old-price">${formatPrice(currentProduct.oldPrice)}</del>` : ''}
			`;
			
			// التقييم
			document.getElementById('product-rating').innerHTML = getStarRating(currentProduct.rating || 0);
			
			// المخزون
			const stockStatus = document.getElementById('stock-status');
			if (currentProduct.stock > 0) {
				stockStatus.textContent = `In Stock (${currentProduct.stock} available)`;
				stockStatus.className = 'product-available in-stock';
			} else {
				stockStatus.textContent = 'Out of Stock';
				stockStatus.className = 'product-available out-of-stock';
				document.getElementById('add-to-cart-btn').disabled = true;
				document.getElementById('buy-now-btn').disabled = true;
			}
			
			// الوصف المختصر
			document.getElementById('product-short-description').textContent = currentProduct.shortDescription || currentProduct.description?.substring(0, 200) + '...' || 'No description available.';
			
			// الصور
			displayProductImages();
			
			// التصنيفات
			updateBreadcrumb();
			
			// الخيارات (مقاس، لون، إلخ)
			displayProductOptions();
			
			// علامات التبويب
			displayProductDescription();
			displayProductSpecifications();
		}
		
		function displayProductImages() {
			const mainImage = document.getElementById('main-product-image');
			const thumbnailsContainer = document.getElementById('product-images');
			
			if (currentProduct.images && currentProduct.images.length > 0) {
				// الصورة الرئيسية
				mainImage.src = currentProduct.images[0];
				mainImage.alt = currentProduct.name;
				
				// الصور المصغرة
				thumbnailsContainer.innerHTML = currentProduct.images.map((image, index) => `
					<div class="product-thumb">
						<div class="product-preview">
							<img src="${image}" alt="${currentProduct.name} - Image ${index + 1}"
								 onclick="changeMainImage('${image}')"
								 style="cursor: pointer;">
						</div>
					</div>
				`).join('');
			} else {
				// صورة افتراضية
				mainImage.src = './img/product01.png';
				mainImage.alt = currentProduct.name;
				thumbnailsContainer.innerHTML = `
					<div class="product-thumb">
						<div class="product-preview">
							<img src="./img/product01.png" alt="${currentProduct.name}"
								 onclick="changeMainImage('./img/product01.png')"
								 style="cursor: pointer;">
						</div>
					</div>
				`;
			}
		}
		
		function changeMainImage(imageUrl) {
			document.getElementById('main-product-image').src = imageUrl;
		}
		
		function updateBreadcrumb() {
			const breadcrumb = document.getElementById('breadcrumb-nav');
			breadcrumb.innerHTML = `
				<li><a href="index.html">Home</a></li>
				<li><a href="products.html">All Categories</a></li>
				<li><a href="${currentProduct.category?.toLowerCase() || 'products'}.html">${currentProduct.category || 'Category'}</a></li>
				<li class="active">${currentProduct.name}</li>
			`;
			
			// تحديث روابط التصنيفات
			document.getElementById('product-category').textContent = currentProduct.category || 'Category';
			document.getElementById('product-category').href = `${currentProduct.category?.toLowerCase() || 'products'}.html`;
			document.getElementById('product-subcategory').textContent = currentProduct.subCategory || 'Subcategory';
			document.getElementById('product-subcategory').href = `${currentProduct.subCategory?.toLowerCase() || 'products'}.html`;
		}
		
		function displayProductOptions() {
			const optionsContainer = document.getElementById('product-options');
			
			if (currentProduct.options && currentProduct.options.length > 0) {
				const optionsHTML = currentProduct.options.map(option => `
					<label>
						${option.name}
						<select class="input-select" id="option-${option.name.toLowerCase()}">
							${option.values.map(value => `
								<option value="${value}">${value}</option>
							`).join('')}
						</select>
					</label>
				`).join('');
				
				optionsContainer.innerHTML = optionsHTML;
			} else {
				optionsContainer.style.display = 'none';
			}
		}
		
		function displayProductDescription() {
			const descriptionContainer = document.getElementById('product-description');
			
			if (currentProduct.description) {
				descriptionContainer.innerHTML = `
					<h4>About This Product</h4>
					<p>${currentProduct.description}</p>
					${currentProduct.features ? `
						<h4 style="margin-top: 20px;">Key Features</h4>
						<ul>
							${currentProduct.features.map(feature => `<li>${feature}</li>`).join('')}
						</ul>
					` : ''}
				`;
			} else {
				descriptionContainer.innerHTML = '<p>No description available for this product.</p>';
			}
		}
		
		function displayProductSpecifications() {
			const specsContainer = document.getElementById('product-specifications');
			
			if (currentProduct.specifications && Object.keys(currentProduct.specifications).length > 0) {
				const specsHTML = Object.entries(currentProduct.specifications).map(([key, value]) => `
					<tr>
						<td style="width: 30%; font-weight: bold;">${key}</td>
						<td>${value}</td>
					</tr>
				`).join('');
				
				specsContainer.innerHTML = `
					<thead>
						<tr>
							<th>Specification</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						${specsHTML}
					</tbody>
				`;
			} else {
				specsContainer.innerHTML = '<tr><td colspan="2" class="text-center">No specifications available for this product.</td></tr>';
			}
		}
		
		// ============================================
		// تحميل المنتجات ذات الصلة
		// ============================================
		async function loadRelatedProducts() {
			try {
				const response = await fetch(`${API_BASE_URL}/products/related/${currentProduct.id}`);
				const relatedProducts = await response.json();
				displayRelatedProducts(relatedProducts);
			} catch (error) {
				console.error('Error loading related products:', error);
				// عرض منتجات وهمية ذات صلة
				displaySampleRelatedProducts();
			}
		}
		
		function displayRelatedProducts(products) {
			const container = document.getElementById('related-products-container');
			
			if (!products || products.length === 0) {
				container.innerHTML = '<div class="col-12 text-center"><p>No related products found.</p></div>';
				return;
			}
			
			const productsHTML = products.map(product => `
				<div class="col-md-3 col-xs-6">
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
								<button class="quick-view" onclick="window.location.href='product-details.html?id=${product.id}'">
									<i class="fa fa-eye"></i><span class="tooltipp">quick view</span>
								</button>
							</div>
						</div>
						<div class="add-to-cart">
							<button class="add-to-cart-btn" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image || './img/product01.png'}')">
								<i class="fa fa-shopping-cart"></i> Add to Cart
							</button>
						</div>
					</div>
				</div>
			`).join('');
			
			container.innerHTML = productsHTML;
		}
		
		// ============================================
		// تحميل التقييمات
		// ============================================
		async function loadProductReviews() {
			try {
				const response = await fetch(`${API_BASE_URL}/products/${currentProduct.id}/reviews`);
				const reviews = await response.json();
				displayProductReviews(reviews);
			} catch (error) {
				console.error('Error loading reviews:', error);
				// عرض تقييمات وهمية
				displaySampleReviews();
			}
		}
		
		function displayProductReviews(reviews) {
			const reviewCount = reviews.length;
			
			// تحديث العداد
			document.getElementById('review-count').textContent = reviewCount;
			document.getElementById('tab-review-count').textContent = reviewCount;
			
			if (reviewCount === 0) {
				document.getElementById('reviews-list').innerHTML = `
					<li id="no-reviews-message">
						<div class="review-body">
							<p>No reviews yet. Be the first to review this product!</p>
						</div>
					</li>
				`;
				document.getElementById('average-rating').textContent = '0.0';
				document.getElementById('average-stars').innerHTML = getStarRating(0);
				document.getElementById('rating-distribution').innerHTML = '';
				return;
			}
			
			// حساب المعدل
			const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount;
			document.getElementById('average-rating').textContent = averageRating.toFixed(1);
			document.getElementById('average-stars').innerHTML = getStarRating(averageRating);
			
			// توزيع التقييمات
			displayRatingDistribution(reviews);
			
			// عرض التقييمات
			displayReviewsList(reviews);
		}
		
		function displayRatingDistribution(reviews) {
			const ratingCounts = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
			reviews.forEach(review => {
				ratingCounts[review.rating]++;
			});
			
			const totalReviews = reviews.length;
			const distributionHTML = [5, 4, 3, 2, 1].map(rating => {
				const count = ratingCounts[rating];
				const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
				
				return `
					<li>
						<div class="rating-stars">
							${getStarRating(rating)}
						</div>
						<div class="rating-progress">
							<div style="width: ${percentage}%;"></div>
						</div>
						<span class="sum">${count}</span>
					</li>
				`;
			}).join('');
			
			document.getElementById('rating-distribution').innerHTML = distributionHTML;
		}
		
		function displayReviewsList(reviews) {
			const reviewsList = document.getElementById('reviews-list');
			const reviewsHTML = reviews.map(review => `
				<li class="review-item">
					<div class="review-heading">
						<h5 class="name">${review.name}</h5>
						<p class="date">${new Date(review.date).toLocaleDateString()}</p>
						<div class="review-rating star-rating">
							${getStarRating(review.rating)}
						</div>
					</div>
					<div class="review-body">
						<p>${review.comment}</p>
					</div>
				</li>
			`).join('');
			
			reviewsList.innerHTML = reviewsHTML;
			
			// إضافة ترقيم الصفحات إذا لزم الأمر
			if (reviews.length > 5) {
				displayReviewsPagination(reviews.length);
			}
		}
		
		function displayReviewsPagination(totalReviews) {
			const totalPages = Math.ceil(totalReviews / 5);
			let paginationHTML = '<li class="active">1</li>';
			
			for (let i = 2; i <= totalPages; i++) {
				paginationHTML += `<li><a href="#" onclick="loadReviewPage(${i})">${i}</a></li>`;
			}
			
			document.getElementById('reviews-pagination').innerHTML = paginationHTML;
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
				cart = JSON.parse(localStorage.getItem('cart')) || [];
				updateCartUI();
			}
		}
		
		function updateCartUI() {
			const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
			document.getElementById('cart-count').textContent = cartCount;
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
			
			const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
			const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
			
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
			const quantity = parseInt(document.getElementById('quantity-input').value) || 1;
			
			try {
				// البحث إذا كان المنتج موجوداً في السلة
				const existingItem = cart.find(item => item.id === productId);
				
				if (existingItem) {
					// زيادة الكمية
					existingItem.quantity += quantity;
				} else {
					// إضافة منتج جديد
					cart.push({
						id: productId,
						name: productName,
						price: parseFloat(productPrice),
						quantity: quantity,
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
						quantity: quantity,
						image: productImage
					})
				});
				
				// حفظ محلي
				localStorage.setItem('cart', JSON.stringify(cart));
				
				// تحديث الواجهة
				updateCartUI();
				
				// عرض رسالة نجاح
				showAlert('success', `${productName} added to cart!`);
				
				// تغيير لون الزر
				const btn = document.getElementById('add-to-cart-btn');
				btn.classList.add('added');
				setTimeout(() => btn.classList.remove('added'), 2000);
				
				return true;
				
			} catch (error) {
				console.error('Error adding to cart:', error);
				// حفظ محلي فقط
				localStorage.setItem('cart', JSON.stringify(cart));
				updateCartUI();
				showAlert('error', 'Failed to add to cart. Please try again.');
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
				
				showAlert('success', 'Item removed from cart');
				
			} catch (error) {
				console.error('Error removing from cart:', error);
				// حفظ محلي فقط
				localStorage.setItem('cart', JSON.stringify(cart));
				updateCartUI();
				updateMiniCart();
			}
		}
		
		// ============================================
		// إدارة الأمنيات
		// ============================================
		async function addToWishlist(productId) {
			try {
				const response = await fetch(`${API_BASE_URL}/wishlist`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ productId })
				});
				
				const wishlist = await response.json();
				document.getElementById('wishlist-count').textContent = wishlist.length;
				showAlert('success', 'Added to wishlist!');
				
			} catch (error) {
				console.error('Error adding to wishlist:', error);
				showAlert('error', 'Failed to add to wishlist');
			}
		}
		
		// ============================================
		// إرسال تقييم جديد
		// ============================================
		document.getElementById('submit-review-form').addEventListener('submit', async function(e) {
			e.preventDefault();
			
			const name = document.getElementById('reviewer-name').value;
			const email = document.getElementById('reviewer-email').value;
			const comment = document.getElementById('review-text').value;
			const rating = document.querySelector('input[name="rating"]:checked');
			
			if (!rating) {
				showAlert('error', 'Please select a rating');
				return;
			}
			
			try {
				const response = await fetch(`${API_BASE_URL}/products/${currentProduct.id}/reviews`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name,
						email,
						comment,
						rating: parseInt(rating.value),
						date: new Date().toISOString()
					})
				});
				
				if (response.ok) {
					showAlert('success', 'Thank you for your review!');
					document.getElementById('submit-review-form').reset();
					// إعادة تحميل التقييمات
					loadProductReviews();
				} else {
					throw new Error('Failed to submit review');
				}
				
			} catch (error) {
				console.error('Error submitting review:', error);
				showAlert('error', 'Failed to submit review. Please try again.');
			}
		});
		
		// ============================================
		// بيانات وهمية للاختبار
		// ============================================
		function loadSampleProduct() {
			currentProduct = {
				id: getProductIdFromURL() || '1',
				name: 'Premium Wireless Headphones',
				category: 'Accessories',
				subCategory: 'Headphones',
				price: 299.99,
				oldPrice: 399.99,
				description: 'Experience premium sound quality with our wireless headphones. Features noise cancellation, 30-hour battery life, and comfortable ear cushions.',
				shortDescription: 'Premium wireless headphones with noise cancellation',
				rating: 4.5,
				stock: 25,
				discount: 25,
				images: [
					'./img/product01.png',
					'./img/product03.png',
					'./img/product06.png',
					'./img/product08.png'
				],
				options: [
					{
						name: 'Color',
						values: ['Black', 'White', 'Blue', 'Red']
					},
					{
						name: 'Size',
						values: ['Standard', 'Large']
					}
				],
				features: [
					'Active Noise Cancellation',
					'30-hour battery life',
					'Quick charge (5 hours in 15 minutes)',
					'Comfortable memory foam ear cushions',
					'Built-in microphone for calls'
				],
				specifications: {
					'Driver Size': '40mm',
					'Frequency Response': '20Hz - 20kHz',
					'Impedance': '32Ω',
					'Battery': '1000mAh',
					'Charging Time': '2.5 hours',
					'Bluetooth Version': '5.0',
					'Weight': '265g'
				}
			};
			
			displayProductDetails();
			displaySampleRelatedProducts();
			displaySampleReviews();
			showLoading(false);
		}
		
		function displaySampleRelatedProducts() {
			const sampleProducts = [
				{
					id: '2',
					name: 'Wireless Earbuds Pro',
					category: 'Accessories',
					price: 199.99,
					oldPrice: 249.99,
					image: './img/product02.png',
					rating: 4.3,
					discount: 20
				},
				{
					id: '3',
					name: 'Gaming Headset',
					category: 'Accessories',
					price: 149.99,
					image: './img/product03.png',
					rating: 4.7
				},
				{
					id: '4',
					name: 'Bluetooth Speaker',
					category: 'Accessories',
					price: 129.99,
					oldPrice: 159.99,
					image: './img/product04.png',
					rating: 4.2,
					discount: 19
				},
				{
					id: '5',
					name: 'Studio Monitor Headphones',
					category: 'Accessories',
					price: 349.99,
					image: './img/product05.png',
					rating: 4.8
				}
			];
			
			displayRelatedProducts(sampleProducts);
		}
		
		function displaySampleReviews() {
			const sampleReviews = [
				{
					name: 'John Doe',
					date: '2024-01-15T10:30:00Z',
					rating: 5,
					comment: 'Excellent sound quality and very comfortable!'
				},
				{
					name: 'Jane Smith',
					date: '2024-01-10T14:20:00Z',
					rating: 4,
					comment: 'Great headphones, battery life is amazing!'
				},
				{
					name: 'Mike Johnson',
					date: '2024-01-05T09:15:00Z',
					rating: 5,
					comment: 'Best headphones I\'ve ever owned. Worth every penny!'
				}
			];
			
			displayProductReviews(sampleReviews);
		}
		
		// ============================================
		// إعداد مستمعات الأحداث
		// ============================================
		function setupEventListeners() {
			// زر إضافة للسلة
			document.getElementById('add-to-cart-btn').addEventListener('click', function() {
				if (currentProduct) {
					addToCart(
						currentProduct.id,
						currentProduct.name,
						currentProduct.price,
						currentProduct.images?.[0] || './img/product01.png'
					);
				}
			});
			
			// زر الشراء الآن
			document.getElementById('buy-now-btn').addEventListener('click', async function() {
				if (currentProduct) {
					const success = await addToCart(
						currentProduct.id,
						currentProduct.name,
						currentProduct.price,
						currentProduct.images?.[0] || './img/product01.png'
					);
					
					if (success) {
						window.location.href = 'checkout.html';
					}
				}
			});
			
			// زر إضافة للأمنيات
			document.getElementById('add-to-wishlist-btn').addEventListener('click', function() {
				if (currentProduct) {
					addToWishlist(currentProduct.id);
				}
			});
			
			// تحكم الكمية
			document.getElementById('increase-qty').addEventListener('click', function() {
				const input = document.getElementById('quantity-input');
				let value = parseInt(input.value) || 1;
				if (value < 99) {
					input.value = value + 1;
				}
			});
			
			document.getElementById('decrease-qty').addEventListener('click', function() {
				const input = document.getElementById('quantity-input');
				let value = parseInt(input.value) || 1;
				if (value > 1) {
					input.value = value - 1;
				}
			});
			
			// منع القيم غير الصحيحة في حقل الكمية
			document.getElementById('quantity-input').addEventListener('change', function() {
				let value = parseInt(this.value) || 1;
				if (value < 1) value = 1;
				if (value > 99) value = 99;
				this.value = value;
			});
			
			// إعداد البحث
			document.getElementById('searchForm').addEventListener('submit', function(e) {
				e.preventDefault();
				const category = document.getElementById('categorySelect').value;
				const query = document.getElementById('searchInput').value;
				
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
		
		// ============================================
		// تهيئة الصفحة
		// ============================================
		document.addEventListener('DOMContentLoaded', function() {
			// تحميل السلة
			loadCart();
			
			// تحميل تفاصيل المنتج
			loadProductDetails();
			
			// إعداد مستمعات الأحداث
			setupEventListeners();
			
			// تحميل قائمة الأمنيات
			loadWishlist();
		});
		
		async function loadWishlist() {
			try {
				const response = await fetch(`${API_BASE_URL}/wishlist`);
				const wishlist = await response.json();
				document.getElementById('wishlist-count').textContent = wishlist.length;
			} catch (error) {
				console.error('Error loading wishlist:', error);
			}
		}