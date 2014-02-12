function isMobileTest() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	return true;
    }
    else {
	return false;
    }
}

$(window).load(function() {
    $("#overlay").delay(200).fadeOut(600);
    $('#down-arrow-container').fadeIn(900).animate({bottom: "20%",}, 100, function() {});

    $(window).stellar({
	verticalScrolling: true,
	horizontalScrolling: false,
	responsive: true
    });
});


$(document).ready(function() {
    // Disable links with pound class
    $("a.pound").click(function(event) {
	event.preventDefault();
    });

    // Config
    var fullNavOffset = 86;
    var navOffset = fullNavOffset; // Sticky Navigation Height
    var mobileNavOffset = 0;
    var fullScreenImg = true; // First Slide Full Screen
    var fullScreenSlideId = '#wd1';
    var logoScrollToTop = true;
    var mobileMenuWidth = 730;
    var isMobile = isMobileTest();
    var isMobileMenu = isMobileMenuTest();

    // Add mobile class
    if (isMobile) {
	$('body').addClass('ismobile');
    }

    var wdMobileMenu = $('.menu-mobile');
    var wdMenu = $('.menu');
    var linksNav = $('.navigation').find('li:not(.blog-link)');
    var links = $('.slide-link');
    var destination = $('.destination'); // Determine next slide point (top-content)
    var destinationUp = $('.destination-up'); // Determine previous slide point (mid-content)
    var mywindow = $(window);
    var htmlbody = $('html,body');
    jQuery.fn.exists = function(){ return this.length > 0; }

    var navOffsetUp = navOffset * -1;

    function getStickyHeight() {
	if (isMobileMenu) {
	    return wdMobileMenu.height();
	}
	else {
	    return wdMenu.height();
	}
    }

    function isMobileMenuTest() {
	if ($(window).width() < mobileMenuWidth) {
	    return true;
	}
	else {
	    return false;
	}
    }

    mywindow.scroll(function () {
	if (mywindow.scrollTop() == 0) {
	    $('.navigation li[page-slide="1"]').addClass('active');
	    $('.navigation li[page-slide="2"]').removeClass('active');
	}
    });

    // Link Scroll Functions
    function goToByScroll(dataslide) {
	var dataOffset = ($('.destination[page-slide="' + dataslide + '"]').offset().top);
	var stickyHeight = navOffset;
	var scrollHeight = dataOffset - stickyHeight + 5;
	htmlbody.stop().animate({scrollTop: scrollHeight}, 1400, 'easeInOutQuint');

    }

    linksNav.click(function (e) {
	e.preventDefault();
	dataslide = $(this).attr('page-slide');
	goToByScroll(dataslide);
    });

    links.click(function (e) {
	e.preventDefault();
	dataslide = $(this).attr('page-slide');
	goToByScroll(dataslide);
    });

    // Full Size Image
    function resizeFold() {
	var windowHeight = $(window).height();
	var stickyHeight = getStickyHeight();
	var newHeight = windowHeight - stickyHeight;

	if (newHeight < 350) {
	    newHeight = 350;
	    $('#down-arrow-container').fadeOut(300);
	}
	else {
	    $('#down-arrow-container').fadeIn(300);
	}

	$(fullScreenSlideId).css({ height: newHeight });

	// Compatibility with sliding line (delay of slide 1 load)
	$('.navigation li').removeClass('active');
    }

    if (fullScreenImg) {
	resizeFold();
    }
    else {
	$('#down-arrow-container').hide();
    }

    $(window).resize(function() {
	if (fullScreenImg) {
	    resizeFold();
	}
    });

    // Video
    $('#play-button').click(function(e) {
	e.preventDefault();
	var videoContainer = $('#video-container');
	videoContainer.prepend('<iframe src="//www.youtube.com/embed/UpUWtMYqikc?list=PLHsErFFuTfjaEFGGiLBQQ5CFPuj7YZaYj&autoplay=1&autohide=1&modestbranding=1&rel=0" width="560" height="316" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
	resizeToCover();
	videoContainer.css({'z-index':'9999','background':'#101010'}).fadeIn(300);
	$('#video-controls').fadeIn(900);
	$('#center-control').fadeOut(700);
	$('#down-arrow-container').css('z-index','999');
    });

    function bringCanvas() {
	$('#video-controls').fadeOut(300);
	$('#video-container').fadeOut(400, function() {
	    $(this).html('').css({'z-index':-9999,'display':'none','background':'transparent'});
	});

	var windowWidth = $(window).width();

	$('#down-arrow-container').css('z-index','99999');
    }

    $('#close-video').click(function(e) {
	e.preventDefault();
	bringCanvas();
	$('#center-control').fadeIn(200);
    });

    jQuery(function() { // runs after DOM has loaded
	jQuery(window).resize(function () { resizeToCover(); });
	jQuery(window).trigger('resize');
    });

    function resizeToCover() {
	// Window Height - Nav
	if ($('.menu').css('display')!='none') {
	    var menuHeight = $('.menu').height();
	}
	else {
	    var menuHeight = $('.menu-mobile').height();
	}

	var targetHeight = jQuery(window).height() - menuHeight;

	// set the video viewport to the window size
	jQuery('#video-container').width(jQuery(window).width());
	jQuery('#video-container').height(targetHeight);

	var videoContainer = $('#video-container');
	var videoEmbed = videoContainer.find('iframe');

	if (videoEmbed.exists()) {
	    videoEmbed.width(videoContainer.width())
	    videoEmbed.height(videoContainer.height());
	}
    }

    // Logo Function
    $('#logo').click(function (e) {
	e.preventDefault();
	if (logoScrollToTop && (mywindow.scrollTop() > 1)) {
	    htmlbody.animate({scrollTop: 0}, 900, 'easeInOutQuint');
	}
    });

    // Sticky Nav
    if ($('#about').exists()) {
	var menuOffset = $('#about')[0].offsetTop;

	$( window ).resize(function() {
	    menuOffset = $('#about')[0].offsetTop;
	});

	$(document).bind('ready scroll', function() {
	    var docScroll = $(document).scrollTop();

	    if (docScroll >= (menuOffset - navOffset)) {
		$('.menu').addClass('fixed');
		$('#about').addClass('sticky-nav');
		if (isMobileMenu) {
		    $('#about').addClass('mobile-sticky');
		}
	    } else {
		$('.menu').removeClass('fixed');            
		$('#about').removeClass('sticky-nav');    
		if (isMobileMenu) {
		    $('#about').removeClass('mobile-sticky');
		}			
	    }

	});
    }

    // Mobile Nav
    function displayMenu() {
	if (isMobileMenu) {
	    wdMobileMenu.show();
	    wdMenu.hide();
	    if (wdMobileMenu.hasClass('active')) {
		wdMobileMenu.css('height', $(window).height());
	    }
	    navOffset = mobileNavOffset;
	    $('#footer').css('margin-bottom', getStickyHeight() + 'px');
	} else {
	    wdMobileMenu.hide();
	    wdMenu.show();
	    navOffset = fullNavOffset;
	    $('#footer').css('margin-bottom','0px');
	}
    }

    $( window ).resize(function() {
	displayMenu();
    });

    displayMenu();

    $('#connect-bar').click(function() {
	var mobileSection = $(this).parent();
	if (mobileSection.hasClass('active')) {
	    closeConnectBar();
	}
	else {
	    openConnectBar();
	}
    });

    $('#connect-content a').click(function() {
	closeConnectBar();
    });

    function openConnectBar(connectBar, mobileSection, windowHeight) {
	var connectBar = $('#connect-bar');
	var mobileSection = connectBar.parent();
	var windowHeight = $(window).height() - 50;
	connectBar.hide().fadeIn(300); 
	mobileSection.addClass('active');
	mobileSection.animate({ 
	    height: "+=" + windowHeight}, 300, 'swing', function() {}
	    );
    }

    function closeConnectBar(connectBar, mobileSection, windowHeight) {
	var connectBar = $('#connect-bar');
	var mobileSection = connectBar.parent();
	var windowHeight = $(window).height() - 50;
	connectBar.hide().fadeIn(300);
	mobileSection.removeClass('active');
	mobileSection.animate({ 
	    height: "-="+windowHeight}, 300, 'swing', function() {}
	    );
    }

    // Gallery Mouseovers
    $('.gallery-item')
	.mouseenter(function() {
	    var gallery = $(this);
	    gallery.find('.gallery-info').stop().fadeIn(100);
	    gallery.find('img').stop().animate({
		opacity: 0.05,
		left: "+=50"
	    }, 500, function () {});
	})
	.mouseleave(function(){
	    var gallery = $(this);
	    gallery.find('.gallery-info').stop().fadeOut(0);
	    gallery.find('img').stop().animate({
		opacity: 1.00,
		left: "+=50"
	    }, 500, function () {});
	});

    // Beam Me Up
    $('#back-to-top').click(function(e) {
	e.preventDefault();
	htmlbody.animate({scrollTop: 0}, 900, 'easeInOutQuint');
    });

});

