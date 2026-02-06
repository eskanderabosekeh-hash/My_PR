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
										<option value="0">All Categories</option>
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
											<!-- محتويات السلة تظهر هنا -->
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
						<li class="active"><a href="index.html">Home</a></li>
						<li><a href="hot-deals.html">Hot Deals</a></li>
						<li><a href="laptops.html">Laptops</a></li>
						<li><a href="smartphones.html">Smartphones</a></li>
						<li><a href="cameras.html">Cameras</a></li>
						<li><a href="accessories.html">Accessories</a></li>
					</ul>
				</div>
			</div>
		</nav>
<!-- Page script -->
    @yield('content')

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
        <script src="js/slick.min.js"></script>
        <script src="js/nouislider.min.js"></script>
        <script src="js/jquery.zoom.min.js"></script>
        <script src="js/main.js"></script>
        <script src="js/index.js"></script>
		<script src="js/store.js"></script>