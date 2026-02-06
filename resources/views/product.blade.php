<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>OPTIMA - Product Details</title>
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
		<!-- Shop Page (Fixed) -->

	@extends('layouts.app')

	@section('content')

	<div class="container">
		<div class="row">
			<!-- Filters -->
			<div class="col-md-3">
				<h4>Brands</h4>
				<div id="brands-filter"></div>
			</div>

	```
		<!-- Products -->
		<div class="col-md-9">
			<div class="store-top-filter clearfix">
				<div class="store-sort">
					<label>
						Sort By:
						<select id="sort-by" class="input-select">
							<option value="latest">Latest</option>
							<option value="price_asc">Price Low → High</option>
							<option value="price_desc">Price High → Low</option>
						</select>
					</label>
				</div>
				<span id="products-count"></span>
			</div>

			<div id="loading-products" style="display:none">Loading...</div>
			<div id="no-products-found" style="display:none">No products found</div>

			<div class="row" id="products-container"></div>

			<ul class="store-pagination" id="pagination"></ul>
		</div>
	</div>
	```

	</div>
	@endsection

	@section('scripts')

	<script src="{{ asset('js/products.js') }}"></script>

	@endsection

		
		<!-- jQuery Plugins -->
		<script src="js/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/slick.min.js"></script>
		<script src="js/nouislider.min.js"></script>
		<script src="js/jquery.zoom.min.js"></script>
		<script src="js/main.js"></script>
		<script src="js/product.js"></script>
	</body>
</html>