<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>OPTIMA - Shopping Cart</title>
 		<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700" rel="stylesheet">
 		<link type="text/css" rel="stylesheet" href="css/bootstrap.min.css"/>
 		<link rel="stylesheet" href="css/font-awesome.min.css">
 		<link type="text/css" rel="stylesheet" href="css/style.css"/>
    </head>
	<body>
		<!-- HEADER -->
		<header>
			<div id="header">
				<div class="container">
					<div class="row">
						<!-- LOGO -->
						<div class="col-md-3">
							<div class="header-logo">
								<a href="index.html" class="logo">
									<img src="./img/logo.png" alt="OPTIMA">
								</a>
							</div>
						</div>
						<!-- SEARCH BAR -->
						<div class="col-md-5">
							<div class="header-search">
								<form id="searchForm">
									<select class="input-select" id="categorySelect">
										<option value="all">All Categories</option>
										<option value="laptops">Laptops</option>
										<option value="smartphones">Smartphones</option>
										<option value="cameras">Cameras</option>
										<option value="accessories">Accessories</option>
									</select>
									<input class="input" id="searchInput" placeholder="Search products...">
									<button type="submit" class="search-btn">Search</button>
								</form>
							</div>
						</div>
						<div class="col-md-4 clearfix">
							<div class="header-ctn">
								<!-- Wishlist -->
								<div>
									<a href="wishlist.html" id="wishlist-link">
										<i class="fa fa-heart-o"></i>
										<span>My Wishlist</span>
										<div class="qty" id="wishlist-count">0</div>
									</a>
								</div>
								<!-- Account -->
								<div>
									<a href="account.html">
										<i class="fa fa-user-o"></i>
										<span>My Account</span>
									</a>
								</div>
								<!-- Cart -->
								<div class="dropdown">
									<a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" href="cart.html">
										<i class="fa fa-shopping-cart"></i>
										<span>My Cart</span>
										<div class="qty" id="cart-count">0</div>
									</a>
									<div class="cart-dropdown">
										<div class="cart-list" id="cart-dropdown-items">
											<div class="empty-cart-message" style="padding: 20px; text-align: center;">
												Your cart is empty
											</div>
										</div>
										<div class="cart-summary">
											<small id="cart-summary-count">0 Item(s)</small>
											<h5 id="cart-summary-total">SUBTOTAL: $0.00</h5>
										</div>
										<div class="cart-btns">
											<a href="cart.html">View Cart</a>
											<a href="checkout.html">Checkout  <i class="fa fa-arrow-circle-right"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		
		<!-- NAVIGATION -->
		<nav id="navigation">
			<div class="container">
				<div id="responsive-nav">
					<ul class="main-nav nav navbar-nav">
						<li><a href="index.html">Home</a></li>
						<li><a href="hot-deals.html">Hot Deals</a></li>
						<li><a href="laptops.html">Laptops</a></li>
						<li><a href="smartphones.html">Smartphones</a></li>
						<li><a href="cameras.html">Cameras</a></li>
						<li><a href="accessories.html">Accessories</a></li>
					</ul>
				</div>
			</div>
		</nav>
		
		<!-- BREADCRUMB -->
		<div id="breadcrumb" class="section">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<ul class="breadcrumb-tree">
							<li><a href="index.html">Home</a></li>
							<li class="active">Shopping Cart</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Alert Messages -->
		<div class="container">
			<div id="success-alert" class="alert alert-success"></div>
			<div id="error-alert" class="alert alert-error"></div>
		</div>

		<!-- Loading State -->
		<div id="loading-cart">
			<i class="fa fa-spinner fa-spin fa-3x"></i>
			<p>Loading your cart...</p>
		</div>

		<!-- Empty Cart -->
		<div id="empty-cart">
			<i class="fa fa-shopping-cart fa-5x" style="color: #ddd; margin-bottom: 30px;"></i>
			<h2>Your Shopping Cart is Empty</h2>
			<p>Looks like you haven't added any products to your cart yet.</p>
			<a href="products.html" class="primary-btn" style="margin-top: 20px;">Continue Shopping</a>
		</div>

		<!-- SECTION -->
		<div class="section" id="cart-section" style="display: none;">
			<div class="container">
				<div class="row">
					<!-- Cart Items -->
					<div class="col-md-8">
						<div class="cart-header">
							<h3>Shopping Cart (<span id="cart-items-count">0</span> items)</h3>
						</div>
						
						<div id="cart-items-container">
							<!-- Cart items will be loaded here -->
						</div>
						
						<!-- Coupon Code -->
						<div class="coupon-section">
							<input type="text" class="coupon-input" id="coupon-code" placeholder="Enter coupon code">
							<button class="primary-btn" id="apply-coupon">Apply Coupon</button>
						</div>
						
						<!-- Cart Actions -->
						<div class="cart-actions" style="margin-top: 30px;">
							<button class="update-cart-btn" id="update-cart">
								<i class="fa fa-refresh"></i> Update Cart
							</button>
							<a href="products.html" class="continue-shopping">
								<i class="fa fa-arrow-left"></i> Continue Shopping
							</a>
						</div>
					</div>
					
					<!-- Order Summary -->
					<div class="col-md-4">
						<div class="cart-summary">
							<h4>Order Summary</h4>
							
							<div class="summary-row">
								<span>Subtotal (<span id="summary-items-count">0</span> items)</span>
								<span id="subtotal">$0.00</span>
							</div>
							
							<div class="summary-row">
								<span>Shipping</span>
								<span id="shipping">FREE</span>
							</div>
							
							<div class="summary-row">
								<span>Tax</span>
								<span id="tax">$0.00</span>
							</div>
							
							<div class="summary-row" id="discount-row" style="display: none;">
								<span>Discount</span>
								<span id="discount">-$0.00</span>
							</div>
							
							<div class="summary-row" style="border-bottom: 2px solid #333;">
								<strong>Total</strong>
								<strong class="summary-total" id="total">$0.00</strong>
							</div>
							
							<div style="margin-top: 30px;">
								<a href="checkout.html" class="primary-btn" style="width: 100%; text-align: center; padding: 15px;">
									Proceed to Checkout
								</a>
							</div>
							
							<div style="margin-top: 20px; text-align: center;">
								<p>We accept:</p>
								<div style="font-size: 24px; color: #666;">
									<i class="fa fa-cc-visa"></i>
									<i class="fa fa-cc-mastercard"></i>
									<i class="fa fa-cc-paypal"></i>
									<i class="fa fa-cc-amex"></i>
								</div>
							</div>
						</div>
						
						<!-- Security Info -->
						<div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
							<p><i class="fa fa-lock" style="color: #27ae60;"></i> Secure checkout</p>
							<p><i class="fa fa-shield" style="color: #3498db;"></i> SSL encrypted</p>
							<p><i class="fa fa-undo" style="color: #9b59b6;"></i> 30-day return policy</p>
						</div>
					</div>
				</div>
				
				<!-- Recently Viewed -->
				<div class="row" style="margin-top: 50px;">
					<div class="col-md-12">
						<h4>Recently Viewed</h4>
						<div id="recently-viewed" style="display: flex; gap: 20px; overflow-x: auto; padding: 20px 0;">
							<!-- -->
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- FOOTER -->
		<footer id="footer">
			<div class="section">
				<div class="container">
					<div class="row">
						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">About Us</h3>
								<p>The leading technical destination connecting customers with lastest global electronic innovations, at affordable prices and exceptional service.</p>
								<ul class="footer-links">
									<li><a href="#"><i class="fa fa-map-marker"></i>Damascus - Syria</a></li>
									<li><a href="#"><i class="fa fa-phone"></i>+963912323455</a></li>
									<li><a href="#"><i class="fa fa-envelope-o"></i>OPTIMA@Email.com</a></li>
								</ul>
							</div>
						</div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Categories</h3>
								<ul class="footer-links">
									<li><a href="laptops.html">Laptops</a></li>
									<li><a href="smartphones.html">Smartphones</a></li>
									<li><a href="cameras.html">Cameras</a></li>
									<li><a href="accessories.html">Accessories</a></li>
								</ul>
							</div>
						</div>

						<div class="clearfix visible-xs"></div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Information</h3>
								<ul class="footer-links">
									<li><a href="about.html">About Us</a></li>
									<li><a href="contact.html">Contact Us</a></li>
									<li><a href="privacy.html">Privacy Policy</a></li>
									<li><a href="returns.html">Orders and Returns</a></li>
									<li><a href="terms.html">Terms & Conditions</a></li>
								</ul>
							</div>
						</div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Customer Services</h3>
								<ul class="footer-links">
									<li><a href="account.html">My Account</a></li>
									<li><a href="cart.html">View Cart</a></li>
									<li><a href="wishlist.html">Wishlist</a></li>
									<li><a href="track-order.html">Track My Order</a></li>
									<li><a href="help.html">Help</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="bottom-footer" class="section">
				<div class="container">
					<div class="row">
						<div class="col-md-12 text-center">
							<span class="copyright">
								Copyright &copy;<script>document.write(new Date().getFullYear());</script> OPTIMA Team . All rights reserved.
							</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
		<!-- jQuery Plugins -->
		<script src="js/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/main.js"></script>
        <script src="js/cart.js"></script>
	</body>
</html>
