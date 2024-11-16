var $ = jQuery.noConflict();

/* header paralax section controler - this script starts and stops the parralax effect in the hero section if the section is not on screen */
$.fn.isOnScreen = function(){
 
	var win = $(window);
	 
	var viewport = {
		top : win.scrollTop(),
		left : win.scrollLeft()
	};
	viewport.right = viewport.left + win.width();
	viewport.bottom = viewport.top + win.height();
	 
	var bounds = this.offset();
	bounds.right = bounds.left + this.outerWidth();
	bounds.bottom = bounds.top + this.outerHeight();
	 
	return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	 
};

$('#header-top .layer').addClass("run");
		
$(window).scroll(function() {
	clearTimeout($.data(this, 'scrollTimer'));
	$.data(this, 'scrollTimer', setTimeout(function() {
		if($('#header-top').isOnScreen()) {
			$('#header-top .layer').addClass("run");
		} else {
			$('#header-top .layer').removeClass("run");
		}
	}, 50));
});

/* loading bar */
function pageLoader() {
	var timer;
	//calling jPreLoader function with properties
	$('body').jpreLoader({
		splashID: "#jSplash",
		splashFunction: function() {  //passing Splash Screen script to jPreLoader
			var loaderFooterText = $('#loader-footer').html();
			$('#jpreOverlay').append("<p class='disclamer'>" + loaderFooterText +"</p>");
			$('#loader-footer').hide();
			
			timer = setInterval(function() {
				$('body').css('background-color','#000');
				$('.loadContent').removeClass('out').addClass('in');
				
			}, 2000);
		}
	}, function() {	//jPreLoader callback function
		clearInterval(timer);
		
		
			$('.loadContent').fadeIn(1000);
			$('.loadContent').removeClass('out').addClass('in');
		
		
		
		
		setTimeout(function(){
			$("#header-top .sides #bg2 .layer3").animate({'right': 427}, 1500);
			$("#header-top .sides #bg1 .layer3").animate({'left': -136}, 1500);
			
			$("#header-top .sides #bg2 .layer3 img").animate({'width': 100+"%"}, 1500);
			$("#header-top .sides #bg1 .layer3 img").animate({'width': 100+"%"}, 1500);
		},300);
	});
}



function skrollR() {
	if ($(window).width() > 1024) {
		skrollr.init({
			edgeStrategy: 'set',
			smoothScrolling: true,
			forceHeight: false,
			mobileDeceleration: 1,
			easing: {
	            WTF: Math.random,
	            inverted: function(p) {
	                return 1-p;
	            },
		        mobileCheck: function() {
		            //hack - forces mobile version to be off
		            return false;
		        },
	        }
		});
	}

	if ($(window).width() <= 1024) {
      skrollr.init().destroy(); // skrollr.init() returns the singleton created above
    }
}

function HeaderParallax() {
	var scene = document.getElementById('bg1');
	var scene1 = document.getElementById('charzard-y');
	var scene2 = document.getElementById('full-text');

	var parallax = new Parallax(scene);
	var parallax = new Parallax(scene1);
	var parallax = new Parallax(scene2);
}

function onePageNav() {
	$('.section-menu ul.nav').onePageNav({
	    currentClass: 'active',
	    changeHash: false,
	    scrollSpeed: 750,
	    scrollThreshold: 0.1,
	    filter: '',
	    easing: 'swing',
	    begin: function() {
	        //I get fired when the animation is starting
	    },
	    end: function() {
	        //I get fired when the animation is ending
	    },
	    scrollChange: function($currentListItem) {
	        //I get fired when you enter a section and I pass the list item of the section
	    }
	});

	var pull        = $('#pull');  
        menu        = $('.section-menu ul');  
        menuHeight  = menu.height();
          
    $(pull).on('click', function(e) {  
        e.preventDefault();  
        menu.slideToggle();
        pull.toggleClass('active');
    });

    $(document).click(function(e) {
         menu.slideUp();
    });

    $('.section-menu ul li a').on('click', function(e) { 
        e.preventDefault();  
        menu.slideUp();
    });

    $(".section-menu").click(function(e) {
        e.stopPropagation();
    });

    $(window).resize(function(){  
	    var w = $(window).width();  
	    if(w > 320 && menu.is(':hidden')) {  
	        menu.removeAttr('style');  
	    }  
	});
}

function headerTopHeight() {
	var headerBgHeight = $('#header-top').find('.background-nodeg img').height();
	var headerTopHeight = $('#header-top').find('.sides');
	var headerSliceHeight = $('#header-top').find('.slice');

	headerTopHeight.css('min-height', headerBgHeight);
}

function charizardLeadsCardsToggle() {
	//use event delegation
	$(".toogleCard").click(function() {
	    $(this).find('img').toggle();
	});
}

function xyFlashfireSliders() {
	var xyFlashfire1 = new Swiper('#xy-flashfire-slider-1',{
		loop:true,
		grabCursor: true,
		initialSlide: 2
		});

	var xyFlashfire2 = new Swiper('#xy-flashfire-slider-2',{
		loop:true,
		grabCursor: true,
		initialSlide: 8
		});

	$('#xy-flashfire-slider-1 .prev').on('click', function(e){
		e.preventDefault()
		xyFlashfire1.swipePrev()
	})
	$('#xy-flashfire-slider-1 .next').on('click', function(e){
		e.preventDefault()
		xyFlashfire1.swipeNext()
	})

	$('#xy-flashfire-slider-2 .prev').on('click', function(e){
		e.preventDefault()
		xyFlashfire2.swipePrev()
	})
	$('#xy-flashfire-slider-2 .next').on('click', function(e){
		e.preventDefault()
		xyFlashfire2.swipeNext()
	})
}


function watchEpisodesCarousel() {
	var howManySlide = $('#watch-episodes-carousel .swiper-slide').length - 4;
	var watchSlider = new Swiper('#watch-episodes-carousel',{
		grabCursor: true,
		slidesPerView: 4,
		loop: false,
		cssWidthAndHeight: 1024,
		onSlideChangeStart: function(){
			$("#watch-episodes-carousel .prev, #watch-episodes-carousel .next").removeClass('hide');
	        if(watchSlider.activeIndex === 0) {
	            $("#watch-episodes-carousel .prev").addClass('hide');
	        }
	        if(watchSlider.activeIndex === howManySlide) {
	            $("#watch-episodes .navigation .next").addClass('hide');
	        }
		},
	})

	$('#watch-episodes-carousel .prev').on('click', function(e){
		e.preventDefault()
		watchSlider.swipePrev()
	})
	$('#watch-episodes-carousel .next').on('click', function(e){
		e.preventDefault()
		watchSlider.swipeNext()
	})
}

function charizardCardsSlider() {
	//Swiper FEATURED
	var howManySlides = $('#featured-slide .swiper-slide').length - 1;
	var featuredSlide = $('#featured-slide').swiper({
		slidesPerView:'1',
		centeredSlides: true,
		initialSlide: '2',
		onImagesReady: function() {
			var descItem = $('#featured-slide .swiper-slide').eq(featuredSlide.activeIndex).find('.desc').html();
			var descWrapper = $('.desc_wrapper').html(descItem);
		},
		onSlideChangeStart: function(){
	        featuredThumb.swipeTo(featuredSlide.activeIndex)
	        var descItem = $('#featured-slide .swiper-slide').eq(featuredSlide.activeIndex).find('.desc').html();
			var descWrapper = $('.desc_wrapper').html(descItem);
		},
	})


	//Swiper FEATURED THUMB
	var featuredThumb = $('#featured-thumb').swiper({
		visibilityFullFit: false,
		slidesPerView:'5',
		centeredSlides: true,
		initialSlide: '2',

		//Thumbnails Clicks
		onSlideClick: function(){
	        featuredThumb.swipeTo(featuredThumb.clickedSlideIndex)
			featuredSlide.swipeTo( featuredThumb.clickedSlideIndex, 500, false )
		},
	    onSlideChangeStart: function(){
			featuredSlide.swipeTo( featuredThumb.activeIndex, 500, false )
	        $('#featured-thumb .active-nav').removeClass('active-nav')
	        $('#featured-thumb .swiper-slide').eq(featuredSlide.activeIndex).addClass('active-nav')

	        $("#charizard-cards-slider-wrapper .prev, #charizard-cards-slider-wrapper .next").removeClass('hide');
	        if(featuredSlide.activeIndex === 0) {
	            $("#charizard-cards-slider-wrapper .prev").addClass('hide');
	        }
	        if(featuredSlide.activeIndex === howManySlides) {
	            $("#charizard-cards-slider-wrapper .next").addClass('hide');
	        }
		},
	})

	$('#charizard-cards-slider-wrapper .prev').on('click', function(e){
		e.preventDefault()
		featuredSlide.swipePrev()
	})
	$('#charizard-cards-slider-wrapper .next').on('click', function(e){
		e.preventDefault()
		featuredSlide.swipeNext()
	})
}

function modalPopUpCenter() {
	function adjustModalMaxHeightAndPosition(){
		$('.modal').each(function(){
			if($(this).hasClass('in') == false){
			  $(this).show();
			};

			var contentHeight = $(window).height() - 60;
			var headerHeight = $(this).find('.modal-header').outerHeight() || 2;
			var footerHeight = $(this).find('.modal-footer').outerHeight() || 2;

			$(this).find('.modal-content').css({
			  'max-height': function () {
			    return contentHeight;
			  }
			});

			$(this).find('.modal-body').css({
			  'max-height': function () {
			    return contentHeight - (headerHeight + footerHeight);
			  }
			});

			$(this).find('.modal-dialog').addClass('modal-dialog-center').css({
			  'margin-top': function () {
			    return -($(this).outerHeight() / 2);
			  },
			  'margin-left': function () {
			    return -($(this).outerWidth() / 2);
			  }
			});
			if($(this).hasClass('in') == false){
			  $(this).hide();
			};
		});
	};
		
	if ($(window).height() >= 320){
	  $(window).resize(adjustModalMaxHeightAndPosition).trigger("resize");
	}
	
	
	$('a[data-target="#leave-site-modal"]').click(function(e){
  		var exitPath = $(this).attr('href');
		$('a#continueToPage').attr('href','');
			$('a#continueToPage').attr('href',exitPath);
	});
	
	
	$("a#continueToPage").on("click", function(e){
		$("#leave-site-modal").modal("hide");
	  	e.stopPropagation();	
	});
}

function wallpaperModal() {
	$(".fancybox").fancybox({
	    openEffect  : 'none',
	    closeEffect : 'none',
	     arrows : false,
	    loop : false,
	    afterLoad   : function() {
	        //this.inner.prepend( '<h1>1. My custom title</h1>' );
	        var img = this.content.find('img');
	        var buttons = this.content.find('.download-buttons');

	        this.content = this.content.html(img);
	        this.outer = this.content.append( buttons );
	    }
	});
}

function limeLightPlayerResponsive() {
	var namespace = {};
	namespace.videoSizeChange = function(){
		var ratio = .5612903;
		$(".player").each(function(){
			var videoWidth = $(this).width();
			//if (videoWidth < 1){
				// the span doesn't have a width on iOs. So we'll use its parent
			//	videoWidth = $(this).parent().width();
			//}
			var newHeight = Math.round(videoWidth  * ratio);
			//console.log(videoWidth, newHeight);

			// this one works on desktop browsers with object (flash video player)
			$(this).find("object").height(newHeight).width(videoWidth);

			// for iOs
			$(this).find(".limelight-player-footprint").css({'height': newHeight + "px", 'width': videoWidth + "px"});

		});
	} // END videoSizeChange
	window.onload = namespace.videoSizeChange;
	window.onresize = namespace.videoSizeChange;
}



/* HOT POKEMON EPISODE FOREACH */
function limelightPlayerCallback(playerId, eventName, data) {
    var id = "limelight_player_156792";
    //if ((LimelightPlayer.getPlayers() == null || LimelightPlayer.getPlayers().length == 0)) {
    //    LimelightPlayer.registerPlayer(id);
    //}

    switch (eventName) {

        case 'onChannelLoad':
            doOnChannelLoad(data);
            break;
			
		case 'onMediaLoad':
			doOnMediaLoad(data);
			break;
		
    }
}
	
function doOnChannelLoad(e) {
	
	//create a dynamic playlist of media in the channel
	if (e.mediaList && e.mediaList.length > 0) {
	
		var playlistHTML = "";
		
		for (var i = 0; i < e.mediaList.length; i++) {
			var media = e.mediaList[i];
			if (media) {
				playlistHTML += '<div class="swiper-slide">';
				playlistHTML += '<a href="javascript:onPlaylistItemClick(\'' + media.id + '\');">';
				playlistHTML += '<img src="' + media.thumbnailUrl + '"/>';
				playlistHTML += '<b>' + media.title + '</b><br />';
				playlistHTML += '</a>';
				playlistHTML += '</div>';
			}
		}
	
		var playlistBox = document.getElementById('playlist-box').innerHTML = playlistHTML;  watchEpisodesCarousel();
	}
}
	
function onPlaylistItemClick(mediaId) {
	LimelightPlayer.doSetMedia(mediaId, false);
}

function doOnMediaLoad(e) {
  	document.getElementById('mainVideoTitle').innerHTML = e.title;
}
/* HOT POKEMON EPISODE FOREACH */

/* MOBILE SECTION - load more start here*/
function mobileSectionLoadMore() {
	var pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;
 
	$(window).on("load", function() {
	    if (pixelRatio > 1) {
	 
	        $.getJSON('../php_file.php', function(data) {
	            $('img').each(function(){
	                var $$ = $(this);
	                // check it's not an external link
	                if ($$.attr('src').lastIndexOf("http://", 0) !== 0) {
	 
	                    var imgIndex = data.indexOf($$.attr('src')); // is the image in the JSON?
	 
	                    if (imgIndex >= 0) {
	 
	                        $$.attr('src', data[imgIndex].replace(".","@2x."));
	                    }
	                }
	            });
	        });
	 
	    }
	});

	

	$(".video-items .item").hide();
	$(".video-items .item").slice(0, 3).show();

	$(".load-more").click(function(){
	    var showing = $(".video-items .item:visible").length;
	    $(".video-items .item").slice(showing - 1, showing + 3).slideDown();
	    $(".video-items .item .video object").width(175).height(98);
	});
}
/* MOBILE SECTION - load more end here*/

/* HEADER MOBILE SUPPORT start here */
function HeaderMobileSuport() {
	if ( $(window).width() < 568) {
		if ( $(window).height() < 480) {
 			$('#header-top').css('min-height','355px');
	 		$('.mobile-bg.visible-xs').attr('src','images/header-top/header-s-m.jpg');
		}  
	}
}
/* HEADER MOBILE SUPPORT end here */

$(document).ready(function() {
	"use strict";

	pageLoader();
	skrollR();
	HeaderParallax();
	onePageNav();
	charizardLeadsCardsToggle();
	charizardCardsSlider();
	modalPopUpCenter();
	wallpaperModal();
	
	mobileSectionLoadMore();
	limeLightPlayerResponsive();
	HeaderMobileSuport();

});

$(window).load( function(){
	headerTopHeight();
	xyFlashfireSliders();

});


$(window).resize(function(){
	headerTopHeight();
});