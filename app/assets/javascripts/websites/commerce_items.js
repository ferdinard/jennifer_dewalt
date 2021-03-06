function commerce() {
	var products;

	$('#keyword').focus();

	$('form').on('submit', function (e) {
		e.preventDefault();

		var keyword = $('#keyword').val();

		$('#loading').css('opacity', '1');

		getProducts(keyword);
	});

	function getProducts(keyword) {
		$.ajax({
			type: 'POST',
			url: document.location.pathname,
			dataType: 'json',
			data: {keyword: keyword},
			success: function (data) {
				checkData(data);
			},
			error: function () {
				$('#loading').css('opacity', '0');
				alert('There was a problem with your request. Please try again.');
			}
		});
	}

	function checkData(data) {
		products = data;

		if (products[0].error != null) {
			$('#loading').css('opacity', '0');
			alert(products[0].error);
		} else if (products.length <= 1) {
			$('#loading').css('opacity', '0');
			alert('No results found.');
		} else {
			displayProducts();
		}
	}

	function displayProducts() {
		_.each(products, function (product) {
			if (product.image) {
				var available = product.availability == null ? 'unknown' :  product.availability;

				$('<div>', {
					class: 'product_container'
				}).html('<div class="info"><p>' + product.title + '</p><a href="' + product.url + '"></a></div><img class="product_img" src='+ product.image +'><div class="availability">Available '+ available +'</div>'). prependTo('#item_container');
			}
		});

		$('#loading').css('opacity', '0');
	}
}