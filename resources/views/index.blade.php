<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>OPTIMA - Home Page</title>
 		<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700" rel="stylesheet">
 		<link type="text/css" rel="stylesheet" href="css/bootstrap.min.css"/>
 		<!-- Slick -->
 		<link type="text/css" rel="stylesheet" href="css/slick.css"/>
 		<link type="text/css" rel="stylesheet" href="css/slick-theme.css"/>
 		<!-- nouislider -->
 		<link type="text/css" rel="stylesheet" href="css/nouislider.min.css"/>
 		<link rel="stylesheet" href="css/font-awesome.min.css">
 		<link type="text/css" rel="stylesheet" href="css/style.css"/>
    </head>
	<body>
		@extends( '../Const_Layouts.master')
		@section('content')
		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<!-- shop -->
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="./img/shop01.png" alt="">
							</div>
							<div class="shop-body">
								<h3>Laptop<br>Collection</h3>
								<a href="laptops.html" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
					<!-- shop -->
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="./img/shop03.png" alt="">
							</div>
							<div class="shop-body">
								<h3>Accessories<br>Collection</h3>
								<a href="accessories.html" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
					<!-- shop -->
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="./img/shop02.png" alt="">
							</div>
							<div class="shop-body">
								<h3>Cameras<br>Collection</h3>
								<a href="cameras.html" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<!-- section title -->
					<div class="col-md-12">
						<div class="section-title">
							<h3 class="title">New Products</h3>
							<div class="section-nav">
								<ul class="section-tab-nav tab-nav">
									<li class="active"><a data-toggle="tab" href="#tab-new" onclick="loadNewProducts('all')">All</a></li>
									<li><a data-toggle="tab" href="#tab-new" onclick="loadNewProducts('laptops')">Laptops</a></li>
									<li><a data-toggle="tab" href="#tab-new" onclick="loadNewProducts('smartphones')">Smartphones</a></li>
									<li><a data-toggle="tab" href="#tab-new" onclick="loadNewProducts('cameras')">Cameras</a></li>
									<li><a data-toggle="tab" href="#tab-new" onclick="loadNewProducts('accessories')">Accessories</a></li>
								</ul>
							</div>
						</div>
					</div>
					
					<!-- Products tab & slick -->
					<div class="col-md-12">
						<div class="row">
							<div class="products-tabs">
								<!-- tab -->
								<div id="tab-new" class="tab-pane active">
									<div id="loading-products">
										<i class="fa fa-spinner fa-spin fa-3x"></i>
										<p>Loading products...</p>
									</div>
									<div class="products-slick" data-nav="#slick-nav-1" id="new-products-container">
										<!-- المنتجات الجديدة تظهر هنا من الباك إند -->
									</div>
									<div id="slick-nav-1" class="products-slick-nav"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- HOT DEAL SECTION -->
		<div id="hot-deal" class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<div class="hot-deal">
							<ul class="hot-deal-countdown" id="deal-countdown">
								<li>
									<div>
										<h3 id="days">02</h3>
										<span>Days</span>
									</div>
								</li>
								<li>
									<div>
										<h3 id="hours">10</h3>
										<span>Hours</span>
									</div>
								</li>
								<li>
									<div>
										<h3 id="minutes">34</h3>
										<span>Mins</span>
									</div>
								</li>
								<li>
									<div>
										<h3 id="seconds">60</h3>
										<span>Secs</span>
									</div>
								</li>
							</ul>
							<h2 class="text-uppercase">hot deal this week</h2>
							<p>New Collection Up to 50% OFF</p>
							<a class="primary-btn cta-btn" href="hot-deals.html">Shop now</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<!-- section title -->
					<div class="col-md-12">
						<div class="section-title">
							<h3 class="title">Top selling</h3>
							<div class="section-nav">
								<ul class="section-tab-nav tab-nav">
									<li class="active"><a data-toggle="tab" href="#tab-top" onclick="loadTopProducts('all')">All</a></li>
									<li><a data-toggle="tab" href="#tab-top" onclick="loadTopProducts('laptops')">Laptops</a></li>
									<li><a data-toggle="tab" href="#tab-top" onclick="loadTopProducts('smartphones')">Smartphones</a></li>
									<li><a data-toggle="tab" href="#tab-top" onclick="loadTopProducts('cameras')">Cameras</a></li>
									<li><a data-toggle="tab" href="#tab-top" onclick="loadTopProducts('accessories')">Accessories</a></li>
								</ul>
							</div>
						</div>
					</div><!-- Products tab & slick -->
					<div class="col-md-12">
						<div class="row">
							<div class="products-tabs">
								<!-- tab -->
								<div id="tab-top" class="tab-pane fade in active">
									<div class="products-slick" data-nav="#slick-nav-2" id="top-products-container">
										<!-- المنتجات الأكثر مبيعاً تظهر هنا من الباك إند -->
									</div>
									<div id="slick-nav-2" class="products-slick-nav"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-4 col-xs-6">
						<div class="section-title">
							<h4 class="title">Trending Now</h4>
							<div class="section-nav">
								<div id="slick-nav-3" class="products-slick-nav"></div>
							</div>
						</div>

						<div class="products-widget-slick" data-nav="#slick-nav-3" id="trending-container-1">
							<!-- المنتجات الرائجة تظهر هنا من الباك إند -->
						</div>
					</div>

					<div class="col-md-4 col-xs-6">
						<div class="section-title">
							<h4 class="title">Best Sellers</h4>
							<div class="section-nav">
								<div id="slick-nav-4" class="products-slick-nav"></div>
							</div>
						</div>

						<div class="products-widget-slick" data-nav="#slick-nav-4" id="trending-container-2">
							<!-- المنتجات الرائجة تظهر هنا من الباك إند -->
						</div>
					</div>

					<div class="clearfix visible-sm visible-xs"></div>

					<div class="col-md-4 col-xs-6">
						<div class="section-title">
							<h4 class="title">New Arrivals</h4>
							<div class="section-nav">
								<div id="slick-nav-5" class="products-slick-nav"></div>
							</div>
						</div>

						<div class="products-widget-slick" data-nav="#slick-nav-5" id="trending-container-3">
							<!-- المنتجات الرائجة تظهر هنا من الباك إند -->
						</div>
					</div>
				</div>
			</div>
		</div>
		@endsection
	</body>
</html>