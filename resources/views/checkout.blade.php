<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>OPTIMA - Checkout</title>
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
									<img src="" alt="OPTIMA">
								</a>
							</div>
						</div>
						<!-- SEARCH BAR -->
						<div class="col-md-5">
							<div class="header-search">
								<form>
									<select class="input-select">
										<option value="0">All Categories</option>
										<option value="1">Laptops</option>
										<option value="2">Smartphones</option>
										<option value="3">Cameras</option>
										<option value="4">Accessories</option>
									</select>
									<input class="input" placeholder="Search here">
									<button class="search-btn">Search</button>
								</form>
							</div>
						</div>
						<div class="col-md-4 clearfix">
							<div class="header-ctn">
								<!-- Wishlist -->
								<div>
									<a href="wishlist.html">
										<i class="fa fa-heart-o"></i>
										<span>My Wishlist</span>
										<div class="qty">2</div>
									</a>
								</div>
								<!-- Account -->
								<div>
									<a href="account.html">
										<i class="fa fa-user-o"></i>
										<span> My Account</span>
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
										<div class="cart-list" id="mini-cart">
											<!-- cart-->
										</div>
										<div class="cart-summary">
											<small id="mini-cart-count">0 Item(s) selected</small>
											<h5 id="mini-cart-total">SUBTOTAL: $0.00</h5>
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
						<h3 class="breadcrumb-header">Checkout</h3>
						<ul class="breadcrumb-tree">
							<li><a href="index.html">Home</a></li>
							<li><a href="cart.html">Cart</a></li>
							<li class="active">Checkout</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- SECTION -->
		<div class="section">
			<div class="container">
				<!-- Alert-->
				<div id="success-alert" class="alert alert-success"></div>
				<div id="error-alert" class="alert alert-error"></div>
				<div id="warning-alert" class="alert alert-warning"></div>
				
				<div class="row">
					<div class="col-md-7">
						<!-- Shipping Details -->
						<div class="Shipping-details">
							<div class="section-title">
								<h3 class="title">Shipping Information</h3>
							</div>
							<div class="form-group">
								<input class="input" type="text" id="firstName" placeholder="First Name" required>
								<div class="error-message" id="firstName-error">Please enter your first name</div>
							</div>
							<div class="form-group">
								<input class="input" type="text" id="lastName" placeholder="Last Name" required>
								<div class="error-message" id="lastName-error">Please enter your last name</div>
							</div>
							<div class="form-group">
								<input class="input" type="email" id="email" placeholder="Email" required>
								<div class="error-message" id="email-error">Please enter a valid email</div>
							</div>
							<div class="form-group">
								<input class="input" type="text" id="address" placeholder="Address" required>
								<div class="error-message" id="address-error">Please enter your address</div>
							</div>
							<div class="form-group">
								<input class="input" type="text" id="city" placeholder="City" required>
								<div class="error-message" id="city-error">Please enter your city</div>
							</div>
							<div class="form-group">
								<input class="input" type="text" id="country" placeholder="Country" required>
								<div class="error-message" id="country-error">Please enter your country</div>
							</div>
							<div class="form-group">
								<input class="input" type="tel" id="phone" placeholder="Phone Number" required>
								<div class="error-message" id="phone-error">Please enter your phone number</div>
							</div>
						</div>
						<!-- Order notes -->
						<div class="order-notes">
							<textarea class="input" id="orderNotes" placeholder="Order Notes (optional)"></textarea>
						</div>
						<!-- Billing Details -->
						<div class="Billing-details">
							<div class="section-title">
								<h3 class="title">Billing Information</h3>
							</div>
							<div class="input-checkbox">
								<input type="checkbox" id="differentBilling">
								<label for="differentBilling">
									<span></span>
									Not same as shipping address?
								</label>
								<div class="caption" id="billing-fields" style="display: none;">
									<div class="form-group">
										<input class="input" type="text" id="billingFirstName" placeholder="First Name">
									</div>
									<div class="form-group">
										<input class="input" type="text" id="billingLastName" placeholder="Last Name">
									</div>
									<div class="form-group">
										<input class="input" type="email" id="billingEmail" placeholder="Email">
									</div>
									<div class="form-group">
										<input class="input" type="text" id="billingAddress" placeholder="Address">
									</div>
									<div class="form-group">
										<input class="input" type="text" id="billingCity" placeholder="City">
									</div>
									<div class="form-group">
										<input class="input" type="text" id="billingCountry" placeholder="Country">
									</div>
									<div class="form-group">
										<input class="input" type="tel" id="billingPhone" placeholder="Phone Number">
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Order Details -->
					<div class="col-md-5 order-details">
						<div class="section-title text-center">
							<h3 class="title">Your Order</h3>
						</div>
						<div class="order-summary">
							<div class="order-col">
								<div><strong>PRODUCT</strong></div>
								<div><strong>TOTAL</strong></div>
							</div>
							<div id="order-items-container">
								<!-- -->
								<div id="empty-cart-message">
									<i class="fa fa-shopping-cart" style="font-size: 48px; margin-bottom: 20px;"></i>
									<h4>Your cart is empty</h4>
									<p>Add products to your cart first</p>
									<a href="products.html" class="primary-btn">Continue Shopping</a>
								</div>
							</div>
							<div class="order-col">
								<div>Subtotal</div>
								<div><strong id="subtotal">$0.00</strong></div>
							</div>
							<div class="order-col">
								<div>Shipping</div>
								<div><strong id="shipping">FREE</strong></div>
							</div>
							<div class="order-col">
								<div>Tax</div>
								<div><strong id="tax">$0.00</strong></div>
							</div>
							<div class="order-col">
								<div><strong>TOTAL</strong></div>
								<div><strong class="order-total" id="total">$0.00</strong></div>
							</div>
						</div>
						<div class="payment-method">
							<h5 class="title">Payment Method</h5>
							<div class="input-radio">
								<input type="radio" name="payment" id="payment-1" value="cod" checked>
								<label for="payment-1">
									<span></span>
									Cash on Delivery
								</label>
							</div>
							<div class="input-radio">
								<input type="radio" name="payment" id="payment-2" value="card">
								<label for="payment-2">
									<span></span>
									Credit/Debit Card
								</label>
							</div>
							<div class="input-radio">
								<input type="radio" name="payment" id="payment-3" value="bank">
								<label for="payment-3">
									<span></span>
									Bank Transfer
								</label>
							</div>
							<!-- (card) -->
							<div id="card-details" style="display: none; margin-top: 20px;">
								<div class="form-group">
									<input class="input" type="text" id="cardNumber" placeholder="Card Number">
								</div>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<input class="input" type="text" id="cardExpiry" placeholder="MM/YY">
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<input class="input" type="text" id="cardCVC" placeholder="CVC">
										</div>
									</div>
								</div>
								<div class="form-group">
									<input class="input" type="text" id="cardName" placeholder="Name on Card">
								</div>
							</div>
						</div>
						<div class="input-checkbox">
							<input type="checkbox" id="terms">
							<label for="terms">
								<span></span>
								I've read and accept the <a href="terms.html">terms & conditions</a>
							</label>
							<div class="error-message" id="terms-error">You must accept the terms & conditions</div>
						</div>
						<button id="submit-order-btn" class="primary-btn order-submit" style="width: 100%; padding: 15px;">
							<span id="submit-btn-text">Place Order</span>
							<span id="submit-btn-loading" style="display: none;">
								<i class="fa fa-spinner fa-spin"></i> Processing...
							</span>
						</button>
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
									<li><a href="#">Laptops</a></li>
									<li><a href="#">Smartphones</a></li>
									<li><a href="#">Cameras</a></li>
									<li><a href="#">Accessories</a></li>
								</ul>
							</div>
						</div>

						<div class="clearfix visible-xs"></div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Information</h3>
								<ul class="footer-links">
									<li><a href="#">About Us</a></li>
									<li><a href="#">Contact Us</a></li>
									<li><a href="#">Privacy Policy</a></li>
									<li><a href="#">Orders and Returns</a></li>
									<li><a href="#">Terms & Conditions</a></li>
								</ul>
							</div>
						</div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Customer Services</h3>
								<ul class="footer-links">
									<li><a href="#">My Account</a></li>
									<li><a href="#">View Cart</a></li>
									<li><a href="#">Wishlist</a></li>
									<li><a href="checkout.html">Track My Order</a></li>
									<li><a href="#">Help</a></li>
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
		<script src="js/checkout.js"></script>
	</body>
</html>