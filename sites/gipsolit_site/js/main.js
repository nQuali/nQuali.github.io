$(document).ready(function(){

	$('.popup-btn').on('click', function(e) {
		e.preventDefault()
		$('.popup').fadeIn()
	})

	$('.popup-close').on('click', function(e) {
		e.preventDefault()
		$('.popup').fadeOut()
	})

	$('.features-slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				prevArrow: '<button class="prev arrow"></button>',
				nextArrow: '<button class="next arrow"></button>',
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				prevArrow: '<button class="prev arrow"></button>',
				nextArrow: '<button class="next arrow"></button>'
			}
		}
		]
	})
})