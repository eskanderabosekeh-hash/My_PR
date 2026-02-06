<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>OPTIMA - Store</title>
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
		@extends('../Const_Layouts.master')

		@section('content')
		<div class="section">
			<div class="container">
				<div class="row">

					<!-- SIDEBAR -->
					<div class="col-md-3">
						<h4>Brands</h4>
						<div id="brands-filter"></div>
					</div>

					<!-- PRODUCTS -->
					<div class="col-md-9">
						<div class="store-filter clearfix">
							<div class="store-sort">
								<label>
									Sort By:
									<select id="sort-by" class="input-select">
										<option value="latest">Latest</option>
										<option value="price_low">Price Low</option>
										<option value="price_high">Price High</option>
									</select>
								</label>
							</div>

							<div class="store-search">
								<input type="text" id="search-input" class="input" placeholder="Search laptops...">
							</div>
						</div>

						<div id="loading-products" style="display:none;text-align:center">
							<i class="fa fa-spinner fa-spin fa-2x"></i>
						</div>

						<div id="no-products-found" style="display:none">
							No products found
						</div>

						<div class="row" id="products-container"></div>

						<div class="store-pagination">
							<ul class="store-pagination" id="pagination"></ul>
						</div>

						<p id="products-count"></p>
					</div>

				</div>
			</div>
		</div>

		<!-- JS -->
		{{-- <script src="{{ asset('js/products.js') }}"></script> --}}
		<script src="{{ asset('js/products.js') }}"></script>

		@endsection

		

</html>