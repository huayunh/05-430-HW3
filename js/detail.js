// this js handles the "add to cart" animation and controller change.
// should be placed below updateCart.js

// construct an object of a new item
function Item(type, shape, quantity, info) {
	this.type     = type;
	this.shape    = shape;
	this.quantity = quantity;
	this.info     = info;
}

$(function() {

	placeJumpingCircle();
	$('#more').hide();
	$('#quote').click(function(){
		addNewItem(parseInt($('#quantity').val()),
			       $('#info').val());
		$('#quote').text('add to my shopping cart again');
		$('#quote').disabled = true;
		$('#quote').addClass('disabled-bordered-button');
		$('#jumpingCircle').text($('#quantity').val());
		$('.button-holder a').addClass('functionally-disabled')
							 .addClass('disabled-bordered-button')
		$('#jumpingCircle').animate({
			opacity: 1,
			top: $('#cart').offset().top,
			left: $('#cart').offset().left,
			fontSize: '20%',
		}, {
			duration: 600,
			complete: function() {
				updateCart();
				$('#quote').disabled = false;
				$('#more').show(300);
				$('#cart').toggleClass('shake');
				$('#jumpingCircle').animate({
					opacity: 0
				}, {
					duration: 300,
					complete: function () {
						placeJumpingCircle();
						$('#cart').toggleClass('shake');
					}
				});
		    }
		});
	});

});

function placeJumpingCircle() {

	if ($('#jumpingCircle')) {
		$('#jumpingCircle').remove();
	}
	var $myItem = $('<span id="jumpingCircle">1</span>');
	$('body').append($myItem);

	var start = $( document ).width()/2;
	$myItem.css('left', start+"px")
}

function addNewItem(quantity, info){
	if (info == ""){
		info = "None.";
	}
	var purchase = JSON.parse(localStorage.myPurchase);
	var newItem = new Item(purchase.currentType, 
						   purchase.currentShape, 
						   quantity, 
						   info);
	purchase.currentType = undefined;
	purchase.currentShape = undefined;
	purchase.itemList.push(newItem);
	console.log(newItem);
	localStorage.setItem('myPurchase', JSON.stringify(purchase));
}

function clearItem(){
	localStorage.setItem('myPurchase', '{"itemList":[]}');
}
