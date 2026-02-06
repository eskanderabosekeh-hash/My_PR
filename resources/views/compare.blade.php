<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>OPTIMA - Product Comparison</title>
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
                    <li><a href="compare.html" class="active">Compare Products</a></li>
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
                        <li class="active">Compare Products</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- COMPARISON SECTION -->
    <div class="comparison-section">
        <div class="container">
            <div class="comparison-header">
                <h2>Product Comparison</h2>
                <p>Compare up to 4 products side by side</p>
            </div>
            
            <!-- Product Selector -->
            <div class="product-selector">
                <div class="row">
                    <div class="col-md-6">
                        <div class="search-dropdown">
                            <label>Search for Product 1</label>
                            <input type="text" 
                                   class="input" 
                                   id="search-product-1" 
                                   placeholder="Type product name..."
                                   onfocus="searchProducts(1)"
                                   oninput="searchProducts(1)">
                            <div class="search-results" id="results-1"></div>
                        </div>
                        <div id="selected-product-1" class="selected-product" style="margin-top: 15px;"></div>
                    </div>
                    <div class="col-md-6">
                        <div class="search-dropdown">
                            <label>Search for Product 2</label>
                            <input type="text" 
                                   class="input" 
                                   id="search-product-2" 
                                   placeholder="Type product name..."
                                   onfocus="searchProducts(2)"
                                   oninput="searchProducts(2)">
                            <div class="search-results" id="results-2"></div>
                        </div>
                        <div id="selected-product-2" class="selected-product" style="margin-top: 15px;"></div>
                    </div>
                </div>
                <div class="row" style="margin-top: 20px;">
                    <div class="col-md-6">
                        <div class="search-dropdown">
                            <label>Search for Product 3 (Optional)</label>
                            <input type="text" 
                                   class="input" 
                                   id="search-product-3" 
                                   placeholder="Type product name..."
                                   onfocus="searchProducts(3)"
                                   oninput="searchProducts(3)">
                            <div class="search-results" id="results-3"></div>
                        </div>
                        <div id="selected-product-3" class="selected-product" style="margin-top: 15px;"></div>
                    </div>
                    <div class="col-md-6">
                        <div class="search-dropdown">
                            <label>Search for Product 4 (Optional)</label>
                            <input type="text" 
                                   class="input" 
                                   id="search-product-4" 
                                   placeholder="Type product name..."
                                   onfocus="searchProducts(4)"
                                   oninput="searchProducts(4)">
                            <div class="search-results" id="results-4"></div>
                        </div>
                        <div id="selected-product-4" class="selected-product" style="margin-top: 15px;"></div>
                    </div>
                </div>
                <div class="text-center" style="margin-top: 30px;">
                    <button class="btn-compare" onclick="compareProducts()">
                        <i class="fa fa-balance-scale"></i> Compare Products
                    </button>
                    <button class="btn-compare" onclick="clearComparison()" style="background: #95a5a6; margin-left: 10px;">
                        <i class="fa fa-refresh"></i> Clear All
                    </button>
                </div>
            </div>
            
            <!-- Loading Spinner -->
            <div class="loading-spinner" id="loading-spinner">
                <i class="fa fa-spinner fa-spin fa-3x"></i>
                <p>Loading comparison data...</p>
            </div>
            
            <!-- Comparison Table -->
            <div id="comparison-results" style="display: none;">
                <div class="comparison-container">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th class="spec-cell">Specification</th>
                                <th class="product-cell" id="product-header-1"></th>
                                <th class="product-cell" id="product-header-2"></th>
                                <th class="product-cell" id="product-header-3" style="display: none;"></th>
                                <th class="product-cell" id="product-header-4" style="display: none;"></th>
                            </tr>
                        </thead>
                        <tbody id="comparison-body">
                            <!-- Comparison data will be loaded here -->
                        </tbody>
                    </table>
                </div>
                
                <!-- Comparison Summary -->
                <div class="comparison-summary">
                    <h4>Comparison Summary</h4>
                    <div class="verdict-box">
                        <div class="recommendation" id="recommendation-text"></div>
                        <p id="summary-details"></p>
                        <div class="row" style="margin-top: 20px;">
                            <div class="col-md-6">
                                <h6>Key Differences:</h6>
                                <ul id="key-differences"></ul>
                            </div>
                            <div class="col-md-6">
                                <h6>Best For:</h6>
                                <ul id="best-for"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Empty State -->
            <div id="empty-state" class="empty-state">
                <i class="fa fa-balance-scale"></i>
                <h3>No Products Selected</h3>
                <p>Select at least 2 products to start comparing</p>
                <p>Try searching for products in the search boxes above</p>
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
    <script src="js/compare.js"></script>
</body>
</html>