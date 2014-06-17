$(window).resize(function () {
    jsPlumb.repaintEverything();
});

$( document ).ready(function() {

    $browserHeight = $(window).height();
    $browserWidth = $(window).width();
    var circlePos = ($browserHeight/2) - 165;
    var knobPos = ($browserHeight/2) - 275;
    if(!Modernizr.touch) {
        $('.circle').css({ top: circlePos + 'px' });
    }
    $('#knob').css({ top: knobPos + 'px' });


    var page5bottom = $('#page5').position().top + $('#page5').outerHeight(true);
    $('#page6').css({ top: page5bottom });

    var page6bottom = page5bottom + $('#page6').outerHeight(true);
    $('footer').css({ top: page6bottom });

    if(!Modernizr.touch && $browserWidth >= 992) {
        jsPlumb.bind("ready", function () {
            jsPlumb.setRenderMode(jsPlumb.SVG);


            var endpoint_1 = {
                endpoint: "Blank",
                anchors: ["Right", "Left"],
                connectorStyle: {
                    lineWidth: 2.5,
                    strokeStyle: "#ffffff",
                    dashstyle: "3 1"
                },
                isSource: true,
                maxConnections: 10,
                isTarget: true,

                dropOptions: {
                    tolerance: "touch",
                    hoverClass: "dropHover"
                }
            };

            var endpoint_2 = {
                endpoint: "Blank",
                anchor:[ 0.2, 0.4, 0, 0, 0, 50 ],
                connectorStyle: {
                    lineWidth: 2.5,
                    strokeStyle: "#ffffff",
                    dashstyle: "3 1"
                },
                isSource: true,
                maxConnections: 10,
                isTarget: true,

                dropOptions: {
                    tolerance: "touch",
                    hoverClass: "dropHover"
                }
            };

            var endpoint_3 = {
                endpoint: "Blank",
                anchor:[ 0.8, 0.4, 0, 0, 0, 50 ],
                connectorStyle: {
                    lineWidth: 2.5,
                    strokeStyle: "#ffffff",
                    dashstyle: "3 1"
                },
                isSource: true,
                maxConnections: 10,
                isTarget: true,

                dropOptions: {
                    tolerance: "touch",
                    hoverClass: "dropHover"
                }
            };

            var endpoint_4 = {
                endpoint: "Blank",
                //anchor:[ -0.05, 0.2, 0, -1, 0, 50 ],

                anchor:[ -0.05, 0.2, 0, 1, 0, 50 ],
                connectorStyle: {
                    lineWidth: 2.5,
                    strokeStyle: "#ffffff",
                    dashstyle: "3 1"
                },
                isSource: true,
                maxConnections: 10,
                isTarget: true,

                dropOptions: {
                    tolerance: "touch",
                    hoverClass: "dropHover"
                }
            };


            jsPlumb.Defaults.DragOptions = {
                zIndex: 20
            };
            jsPlumb.Defaults.Connector = ["Flowchart", {
                gap: 10,
                cornerRadius: 35
            }];

            var e1 = jsPlumb.addEndpoint("youCircle", endpoint_1);
            var e2 = jsPlumb.addEndpoint("knob", endpoint_2);
            var e3 = jsPlumb.addEndpoint("knob", endpoint_3);
            var e4 = jsPlumb.addEndpoint("data-description", endpoint_4);

            jsPlumb.connect({
                source: e1,
                target: e2,
            });
            jsPlumb.connect({
                source: e3,
                target: e4
            });
        });
    }
    
    totalFrames = 61; // the number of images in the sequence of JPEG files (this could be calculated server-side by scanning the frames folder)

        for(i = 0; i < totalFrames; i++) { // loop for each image in sequence
            images[i] =  new Image(); // add image object to array
            images[i].src = "images/knob/A_knob-render_2_"+pad(i, 5)+".jpg"; // set the source of the image object
        }


    $( window ).scroll(function() {
        var p = $( ".artist-questions" );
        var offset = p.offset();
        //console.log( "left: " + offset.left + ", top: " + offset.top );
        //console.log(s.getScrollTop());

    });

    //console.log($(window).scrollTop());

    if(!Modernizr.touch && $browserWidth >= 992) {
        $(function() {
            var windowWidth = $(window).width();
            if(windowWidth > 767){
                var s = skrollr.init({
                forceHeight: false,
                
                easing: {
                    WTF: Math.random,
                    inverted: function(p) {
                        return 1-p;
                    }
                }
            });
        }});

    }
});







// skrollr.init({
// 	forceHeight: false
// });



$(function() {
	
	var didScroll = false;
	
	window.onscroll = doThisStuffOnScroll;
	
	function doThisStuffOnScroll() {
	    didScroll = true;
	    jsPlumb.repaintEverything();
	}
	

	setInterval(function() {
	    if(didScroll) {
	        didScroll = false;
	        if( $(window).scrollTop() > 500 && !Modernizr.touch) {
	        	BV.getPlayer().pause();
	        }
	        if( $(window).scrollTop() < 300 && !Modernizr.touch) {
	        	BV.getPlayer().play();
	        }
	    }
	}, 100);
	
	
    // Use Modernizr to detect for touch devices, 
    // which don't support autoplay and may have less bandwidth, 
    // so just give them the poster images instead
    var screenIndex = 1,
        numScreens = $('.screen').length,
        isTransitioning = false,
        transitionDur = 1000,
        BV,
        videoPlayer,
        isTouch = Modernizr.touch,
        $bigImage = $('.big-image'),
        $window = $(window);
    
    if (!isTouch) {
        // initialize BigVideo
        BV = new $.BigVideo({forceAutoplay:isTouch});
        BV.init();
        showVideo();
        
        BV.getPlayer().addEvent('loadeddata', function() {
            onVideoLoaded();
        });

        

        // adjust image positioning so it lines up with video
        $bigImage
            .css('position','relative')
            .imagesLoaded(adjustImagePositioning);
        // and on window resize
        $window.on('resize', adjustImagePositioning);
    } else {
        if($browserHeight >= $browserWidth) {

            console.log('height is bigger');
            //$bigImage.css({height: 100%});
        } else {
            console.log('width is bigger');
            //$('.big-image').css({width: 100%;});
        }
    }
    
    

    function showVideo() {
        BV.show($('#screen-'+screenIndex).attr('data-video'),{ambient:true});
    }
/*
    $( "#playBtn" ).click(function() {
		$( ".content-text" ).toggle();
		$(this).append("<div id='closeBtn'>+</div>");
	});
*/

if(!Modernizr.touch) {
    $('#playBtn').click(function(){
        $(this).animate({opacity:"hide"});
        $('.content-text').animate({opacity:"hide"});
        $('.main-nav').animate({opacity:"hide"}, function(){
            $('#closeBtn').show();
            BV.show($('#screen-'+screenIndex).attr('data-videowithaudio'),{ambient:false});

        });
        $('#closeBtn').click(function() {
            $(this).animate({opacity:"hide"}, function() {
                BV.show($('#screen-'+screenIndex).attr('data-video'),{ambient:true});
                $('#playBtn').animate({opacity:"show"});
                $('.content-text').animate({opacity:"show"});
                $('.main-nav').animate({opacity:"show"});
            });
        });
    });
} else {
    $('#playBtn').click(function(){
        location.href = $('#screen-'+screenIndex).attr('data-mobile-streaming');
    });
} 

  //       $( this ).fadeOut( "fast", function() {
		//     // Animation complete.
		// });
		// $('.content-text').fadeOut( "fast", function() {
		//     // Animation complete.
		// });
		// $('.main-nav').fadeOut( "fast", function() {
		//     // Animation complete.
		//     $("header").append("<div id='closeBtn'>+</div>");

		//     $("#closeBtn").click( "fast", function() {
		//     	BV.show($('#screen-'+screenIndex).attr('data-video'),{ambient:true});
		// 	    // Animation complete.
		// 	    $( this ).fadeOut( "fast", function() {
		// 		    // Animation complete.
		// 		    $('.main-nav').fadeIn( "fast" );
		// 		});
		// 		$('#playBtn').fadeIn( "fast");
		// 		$('.content-text').fadeIn( "fast", function() {
		// 			// Animation complete.
		// 		});
				
		// 	});
		// });
	

if( $browserWidth >= 992 ) {
    $('#playBtn').mouseover(function(){
    	$(this).css("backgroundPosition","0 -130px");
    });
    $('#playBtn').mouseout(function(){
    	$(this).css("backgroundPosition","0 0");
    });
} else {
    $('#playBtn').mouseover(function(){
        $(this).css("backgroundPosition","0 -50px");
    });
    $('#playBtn').mouseout(function(){
        $(this).css("backgroundPosition","0 0");
    });

}
 //    if (!isTouch) {
 //        // PixelWatcher must be initialized with a video or canvas object
 //        var videoObj = BV.getPlayer().tag;
 //        var pixelWatcher = undefined;

 //        videoObj.addEventListener("loadeddata", function() {
 //            pixelWatcher = new PixelWatcher({
 //                videoObject: videoObj,
 //                height: 50,
 //                offsetX: 25,
 //                offsetY: videoObj.videoHeight/4
 //            });

      
 //            // Sets up an event listener which displays text, colored with the inverse average RGB for the region we're watching. 
 //            pixelWatcher.addEventListener("pixelstats", function(e) {
 //                if(e.detail.avg >= 127) {
 //                    $("header").css( "color", "black" );
 //                    $("#main-logo").css({ '-webkit-filter': 'invert(0%)' });
 //                } else {
 //                    $("header").css( "color", "white" );
 //                    $("#main-logo").css({ '-webkit-filter': 'invert(100%)' });
 //                }
 //            });
            
 //            // Start pixelWatcher running
 //            // pixelWatcher.start();
 //            // Add pixelWatcher's internal canvas to visualize what's happening for the demo
 //            // document.body.appendChild(pixelWatcher.canvas);
 //        });
	// }

    function next() {
        isTransitioning = true;
        
        // update video index, reset image opacity if starting over
        if (screenIndex === numScreens) {
            $bigImage.css('opacity',1);
            screenIndex = 1;
        } else {
            screenIndex++;
        }
        
        if (!isTouch) {
            $('#big-video-wrap').transit({'left':'-100%'},transitionDur)
        }
            
        (Modernizr.csstransitions)?
            $('.wrapper').transit(
                {'left':'-'+(100*(screenIndex-1))+'%'},
                transitionDur,
                onTransitionComplete):
            onTransitionComplete();
    }

    function onVideoLoaded() {
        $('#screen-'+screenIndex).find('.big-image').transit({'opacity':0},500)
    }

    function onTransitionComplete() {
        isTransitioning = false;
        if (!isTouch) {
            $('#big-video-wrap').css('left',0);
            showVideo();
        }
    }

    function adjustImagePositioning() {
        $bigImage.each(function(){
            var $img = $(this),
                img = new Image();

            img.src = $img.attr('src');

            var windowWidth = $window.width(),
                windowHeight = $window.height(),
                r_w = windowHeight / windowWidth,
                i_w = img.width,
                i_h = img.height,
                r_i = i_h / i_w,
                new_w, new_h, new_left, new_top;

            if( r_w > r_i ) {
                new_h   = windowHeight;
                new_w   = windowHeight / r_i;
            }
            else {
                new_h   = windowWidth * r_i;
                new_w   = windowWidth;
            }

            $img.css({
                width   : new_w,
                height  : new_h,
                left    : ( windowWidth - new_w ) / 2,
                top     : ( windowHeight - new_h ) / 2
            })

        });

    }

});

$(function(){
  
  if ($browserWidth<= 640) {
    touchWidth = 80;
  } else {
    touchWidth = 216;
  }
  var $container = $('.our-artists'),
      $body = $('body'),
      colW = touchWidth,
      columns = null;
  
  $container.isotope({
    // disable window resizing
    

    itemSelector: '.artist-photo',
    masonry: {
    	columnWidth: colW,
    	isFitWidth: true
    }
  });
  
  // filter items on button click
$('.sorter').click(function() {
  var filterValue = $(this).attr('data-filter');
  $container.isotope({ filter: filterValue });
});

$container.isotope( 'on', 'layoutComplete',
  function( isoInstance, laidOutItems ) {
    var bottom = $('#page5').position().top+$('#page5').outerHeight(true);
    $('#page6').css({ top: bottom });
  }
);


$(".artist-photo").click(function(){

	$('.artist-photo').not(this).each(function(){
		if ($(this).hasClass("gigante")) {
			$(this).removeClass("gigante");
			$(this).children('img').first()
				.addClass("rollzoom");
		}

	});

	$(this).toggleClass("gigante");
	$(this).children('img').first()
		.toggleClass("rollzoom");

	$container.isotope('layout');
	//$container.isotope( 'reloadItems' ).isotope();

	// var bottom = $('#page5').position().top+$('#page5').outerHeight(true);
	// $('#page6').css({ top: bottom });

});
  
  
});