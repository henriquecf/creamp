/*	------------------------------------ 	
	Civi Template Script

	Version		: 2.0
	Author		: Hendri Juhanda
	Author URL	: http://juhanda.net
	
	Copyright © 2014
	
	------------------------------------  */
	
/* CENTER HERO CONTENT VERTICALY */
function heroContent() {	
	var winHeight = $(window).innerHeight();
	
	// @ screen width => 992px
	if ($(window).width() >= 992) {
		var heroContentMargin = -($('.hero-content').height() / 2);
			
		$('.hero-content').css('margin-top', heroContentMargin);
	}
	
	// @ screen width => 768px and <= 991px
	else if ($(window).width() >= 768 && $(window).width() <= 991) {
		$('.hero-content').css('margin-top', '0');
		
		var heroContentHeight = $('.hero-content-wrap').height(); 
		
		if ((winHeight - 100) <= heroContentHeight) {
			$('.hero-content-wrap').css('margin', '110px 0 60px');
		}
		
		else {
			var heroContentMargin = (50 + ((winHeight - 100) - heroContentHeight)) / 2;
		
			$('.hero-content-wrap').css('margin-top', heroContentMargin);
		}
	}
	
	// @ screen width <= 767px
	else {
		$('.hero-content').css('margin-top', '0');
		
		var heroContentHeight = $('.hero-content-wrap').height(); 
		
		if ((winHeight - 50) <= heroContentHeight) {
			$('.hero-content-wrap').css('margin', '110px 0 60px');
		}
		
		else {
			var heroContentMargin = (50 + (winHeight - heroContentHeight)) / 2;
		
			$('.hero-content-wrap').css('margin-top', heroContentMargin);
		}
	};
};

/* CLOSE NAVBAR TOGGLE WHEN NAVBAR LINK CLICKED */
function navbarToggle() {
	if ($(window).width() <= 767) { 
		$('.nav-style > li > a').on('click', function(){
			$('.navbar-toggle').click();
		});
	}
};

/* INITIALIZE GOOGLE MAP FEATURE */
function googleMap() {
	
	// google maps custom style
	var styles = [ 
		{ featureType: 'water', elementType: 'geometry', 
			stylers: [ { hue: '#bbbbbb' }, { saturation: -100 }, { lightness: -4 }, { visibility: 'on' } ] },
		
		{ featureType: 'landscape', elementType: 'geometry', 
			stylers: [ { hue: '#eeeeee' }, { saturation: -100 }, { lightness: 39 }, { visibility: 'on' } ] },
		
		{ featureType: 'road', elementType: 'geometry', 
			stylers: [ { hue: '#ffffff' }, { saturation: -100 }, { lightness: 100 }, { visibility: 'on' } ] },
		
		{ featureType: 'poi', elementType: 'geometry', 
			stylers: [ { hue: '#dddddd' }, { saturation: -100 }, { lightness: 39 }, { visibility: 'on' } ] } 
		];

	// define variables
	var lat = $('#map').data("map-lat"), 	
		lng = $('#map').data("map-lng"),	
		title = $('#map').data("map-mark"),
		zoom = $('#map').data("map-zoom");

	// init map with GMaps jquery plugin
	var map = new GMaps ({
		el: '#map', 
		lat: lat, 
		lng: lng,
		zoom: zoom,
		zoomControlOpt: {style : 'SMALL', position: 'TOP_LEFT'},
		panControl : false,
		styles: styles,
	});

	// add map marker
	map.addMarker({
		lat: lat,
		lng: lng,
		title: title,
	});
};

/* ALIGN MAP TO BOTTOM AT HIGHER SCREEN */
function fixMap() {
	if ($(window).innerHeight() >= 817) { 
		$('.contact').css('position', 'relative');
		$('#map').css({'position': 'absolute', 'bottom': '0'});
	}
	
	else {
		$('.contact').css('position', 'static');
		$('#map').css({'position': 'relative'});
	};
};

/* TWITTER WIDGET IMPLEMENTATION */
var tweetsLength = $('.twitter-widget').data('widget-length'), // number of tweets to be displayed
	widgetId = $('.twitter-widget').data('widget-id'), // twitter widget id
	tweetsId = widgetId,
	htmlId	= 'twitter-widget', // DOM element where the widget will be
	tweetsNumber = tweetsLength, 
	hyperLink = true, // hyperlink the links and hashtags
	userPhoto = true, // display the user image and name
	tweetsDate = true, // display the date of posted tweets
	reTweets = false, // show retweet 
	tweetsLink = true; // show links for reply, retweet and favourite
	
// function to process twitter feeds data	
function handleTweets(tweets) {
	var x = tweets.length;
		n = 0,
		element = document.getElementById(htmlId),
		html = '<ul>';
	
	while(n < x) {
		html += '<li>' + tweets[n] + '</li>';
		n++;
	}

	html += '</ul>';
	element.innerHTML = html;
	
	$('.twitter-widget ul > li').each(function() {
		$(this).find('.timePosted, .interact').wrapAll('<div class="twitter-meta" />');
	});
	
	// remove the 'posted on' word
	$('.timePosted').each(function() {
		$(this).html($(this).html().replace('Posted on', '').replace('Posted', ''));
	});
	
	// replace tweet links with icons
	$('.twitter_reply_icon').html('<i class="fa fa-reply"></i>').attr('title', 'Reply');
	$('.twitter_retweet_icon').html('<i class="fa fa-retweet"></i>').attr('title', 'Retweet');
	$('.twitter_fav_icon').html('<i class="fa fa-star"></i>').attr('title', 'Favorite');
};

twitterFetcher.fetch(tweetsId, htmlId, tweetsNumber, hyperLink, userPhoto, tweetsDate, '', reTweets, handleTweets, tweetsLink);

/* REFRESH SCROLLSPY */
function scrollSpyRefresh() {
	$('[data-spy="scroll"]').each(function() {
		$(this).scrollspy('refresh')
	});
};

$(document).ready(function() {
	
	// launch the custom functions
	heroContent();
	navbarToggle();
	googleMap();
	fixMap();
	
	/* INIT GALLERY FEATURE WITH JQUERY MIXITUP PLUGIN */
	$('#grid').mixitup();
	
	
	/* INIT PAGE SCROLLING USING JQUERY SCROLLTO-LOCALSCROLL PLUGIN */
	$('html').localScroll();
	$('a[href="#"], .togglize-btn').unbind('click'); // fix localscroll effect

	
	/* INIT SKILL CIRCLE GRAPHIC WITH JQUERY KNOB PLUGIN */
	var dialColor = $('a').css('color'); // get color from link color
	
	$(".dial").knob({
		'fgColor': dialColor,
		'lineCap': 'round',
		'thickness': '.2', 
		'bgColor': '#fafafa', 
		'readOnly': 'readonly'
	});
	
	
	/* INIT ACCORDION STATUS STYLE */
	$('.togglize-btn').addClass('collapsed'); // add collapsed class to toggle button
	
	$('.togglize-btn').each(function() {
		var toggleBtn = $(this);
		
		// remove collapsed class if toggle initially active
		if (toggleBtn.siblings().hasClass('in')) {
			toggleBtn.removeClass('collapsed');
			toggleBtn.addClass('open');
		}
		
		else {
			toggleBtn.removeClass('open');
		};
		
		toggleBtn.on('click', function() {
			if ($(this).hasClass('collapsed') !== true){
				$(this).removeClass('open');
			}
			
			else {
				$(this).addClass('open');
			}
		});
	});
	
	
	/* IMAGE LIGHTBOX PRESENTATION USING JQUERY MAGNIFIC POPUP PLUGIN */
	$('.image-link').magnificPopup({
		type: 'image',
		mainClass: 'mfp-fade',
		removalDelay: 500,
		fixedContentPos: false,
	});
	
	
	/* CONTACT FORM STUFFS */
	$('#contact-form').parsley({ // bind parsley jquery plugin for client-side validation
		showErrors: false,
		listeners: {
			onFieldSuccess: function(elem) {
				elem.siblings('span.success-mark').css('opacity', '1');
				elem.siblings('span.error-mark').css('opacity', '0');
			},
			
			onFieldError: function(elem) {
				elem.siblings('span.success-mark').css('opacity', '0');
				elem.siblings('span.error-mark').css('opacity', '1');
				$('.contact-reset').fadeIn(250);
			}
		}
	});
	
	// write up validation marker on fly
	$('#contact-form').find('.parsley-validated').after('<span class="success-mark"><i class="fa fa-check-circle"></i></span><span class="error-mark"><i class="fa fa-times-circle"></i></span>');
	
	// show contact form reset button up upon input activity
	$('#contact-form input, #contact-form textarea').bind('input', function() {
		if($(this).val()) {
			$('.contact-reset').fadeIn(250);
		}
	});
	
	// reset button function
	$('.contact-reset').click(function(e) {
		e.preventDefault();
		
		$('#contact-form')[0].reset();
		$('.contact-reset').fadeOut(250);
		$('.success-mark, .error-mark').css('opacity', '0');
		$('#contact-sending-error, #contact-sending-success').fadeOut(250);
	});
	
	// fade out message sending notification on scroll
	$(window).bind('scroll', function() {
		$('#contact-sending-error, #contact-sending-success').fadeOut(250);
	});
	
	// message submit function
	$('#contact-form').submit(function(e) {
		var contactForm = $(this);
		
		// fade out error/success message
		$('#contact-sending-error, #contact-sending-success').fadeOut(250);
		
		// check if the data is valid
		if (!$(this).parsley('isValid')) {
			
			// if not valid, don't submit
			return false
		}
		
		else {		

			// if yes, do the following
			$('#contact-sending').fadeIn(250); 
			
			$.ajax({
				type: contactForm.attr('method'),
				url: contactForm.attr('action') + '?ajax=true',
				data: contactForm.serialize(),
				success: function(response) {
					response = $.trim(response);
					
					$('#contact-sending').delay(1000).fadeOut(250);
					
					if (response == "success") {
						
						$('#contact-sending-success').delay(1000).fadeIn(250);
						$('#contact-form')[0].reset();
						$('.contact-reset').fadeOut(250);
						$('.success-mark, .error-mark').css('opacity', '0');
					} 
	
					else {
						$('#contact-sending-error').delay(1000).fadeIn(250);
					}
				}
			});
		}
		
		// prevent default submit
		return false
	});
	
	/* FIRE SCROLLSPY REFRESH RIGHT AFTER USER STOPS SCROLLING */
	var timer;
	
	var refresh = function() { 
        scrollSpyRefresh();
    };
    
	$(window).bind('scroll', function() {
        clearTimeout(timer);
        timer = setTimeout(refresh , 250);
    });
    
});

// do the following function on window load
$(window).bind('load', function() {
	$('#contact-form')[0].reset(); // reset contact form
	scrollSpyRefresh();
});

// do the following function on window resize
$(window).on('resize', function() {
	heroContent();
	navbarToggle();
	fixMap();
	scrollSpyRefresh();
});