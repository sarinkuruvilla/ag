/*jshint browser: true*/
/*global jQuery, Modernizr, jsPlumb, skrollr*/

(function($jQuery, Modernizr, jsPlumb) {
    var controller;

    $(document).ready(function() {
        controller = new ScrollMagic();

        // infographic icon
        new ScrollScene({
                triggerElement: "#handle",
                duration: 300,
                offset: -250
            })
            .addTo(controller)
            .triggerHook("onCenter")
            .setTween(new TimelineMax().add([
                TweenMax.to("#handle", 3, {rotation: 180, transformOrigin:"109px 109px", ease: Linear.easeNone}),
            ]));


        // parallax1
        new ScrollScene({
                triggerElement: "#page3",
                duration: $(window).height() + 300,
                offset: -250
            })
            .addTo(controller)
            .triggerHook("onCenter")
            .setTween(new TimelineMax().add([
                TweenMax.fromTo("#page3 .floating-text", 0.3, {top: "30%", opacity:0}, {top: "20%", opacity:1, ease: Expo.easeIn}),
                TweenMax.fromTo("#page3 #background1-parallax", 1, {backgroundPosition: "0 80%", ease: Linear.easeNone}, {backgroundPosition: "0 -50%", ease: Linear.easeNone})
            ]));


        // parallax2
        new ScrollScene({
                triggerElement: "#page5",
                duration: $(window).height() + 300,
                offset: -250
            })
            .addTo(controller)
            .triggerHook("onCenter")
            .setTween(new TimelineMax().add([
                TweenMax.fromTo("#page5 #background2-parallax", 1, {backgroundPosition: "0 80%", ease: Linear.easeNone}, {backgroundPosition: "0 -50%", ease: Linear.easeNone})
            ]));

        // find investors
        new ScrollScene({
                triggerElement: "#page6",
                duration: $(window).height() + 300,
                offset: -250
            })
            .addTo(controller)
            .triggerHook("onCenter")
            .setTween(new TimelineMax().add([
                TweenMax.fromTo("#page6", 1, {backgroundPosition: "450px -170px", ease: Linear.easeNone}, {backgroundPosition: "250px -800px", ease: Linear.easeNone})
            ]));




        // parallax3
        new ScrollScene({
                triggerElement: "#page7",
                duration: $(window).height() + 300,
                offset: -250
            })
            .addTo(controller)
            .triggerHook("onCenter")
            .setTween(new TimelineMax().add([
                TweenMax.fromTo("#page7 #background3-parallax", 1, {backgroundPosition: "0 80%", ease: Linear.easeNone}, {backgroundPosition: "0 -50%", ease: Linear.easeNone})
            ]));

        // parallax4
        new ScrollScene({
                triggerElement: "#page9",
                duration: $(window).height() + 300,
                offset: -250
            })
            .addTo(controller)
            .triggerHook("onCenter")
            .setTween(new TimelineMax().add([
                TweenMax.fromTo("#page9 #background4-parallax", 1, {backgroundPosition: "0 80%", ease: Linear.easeNone}, {backgroundPosition: "0 -50%", ease: Linear.easeNone})
            ]));

        createArtistGrid();

        //$("#cover").fadeOut();
        TweenLite.to("#cover", 0.2, {autoAlpha:0});

    });
    

    function createInfoIcon() {
        var canvas = document.getElementById("info-icons");
        var context = canvas.getContext("2d");

        // Variables store centre and radius of arc
        var x = 250;
        var y = 125;
        var radius =80;

        // define start and finish angle
        var startAngle = 1 * Math.PI;
        var endAngle = 0.5 * Math.PI;

        // set the direction to anticlockwise
        var counterClockwise = true;

        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        context.lineWidth =10;
        context.lineCap="round";


        context.strokeStyle = "#fa4b2a";
        context.stroke();
    }

    // Yeah, that's right.
    function createKnobScrubber() {
        var frameCount = 61,
            images = [];
        for (var i = 0; i < frameCount; i++) {
            images[i] = new Image();
            images[i].src = "images/knob/A_knob-render_2_" + padLeft(i, 5) + ".jpg";
        }

        $("#knob").videoScrubber({
            images: images,
            frameCount: frameCount,
            yOffsetAdjustment: function() {
                return -1 * (window.innerHeight * 2 - (window.innerHeight / 3));
            },
            scrollRatio: 2,
            frameRatio: 20
        });
    }



    function createArtistGrid() {
        var container = $(".our-artists");

        container.isotope({
            // Disable window resizing
            itemSelector: ".artist-photo",
            masonry: {
                columnWidth: $(window).width() <= 640 ? 80 : 216,
                isFitWidth: true
            }
        });

        container.isotope("on", "layoutComplete",
            function(isoInstance, laidOutItems) {
                console.debug("isotope:layoutComplete", isoInstance, laidOutItems);
            }
        );

        $(".artist-photo").click(function() {
            var currentPhoto = $(this);

            $(".artist-photo").not(currentPhoto).each(function() {
                var $this = $(this);

                if ($this.hasClass("gigante")) {
                    $this.removeClass("gigante");
                    $this.children("img").first().addClass("rollzoom");
                }
            });

            currentPhoto.toggleClass("gigante");
            currentPhoto.children("img").first().toggleClass("rollzoom");
            container.isotope("layout");
        });
    }

    // Triggered after all images have been either loaded or confirmed broken.
    function adjustImagePositioning() {
        console.debug("adjustImagePositioning");

        var screenGrab = $("#screenGrab"),
            $window = $(window);

        // TODO: find out why we are doing this - seems crazy expensive computationally
        var tempImage = new Image();

        tempImage.src = screenGrab.attr("src");

        var windowWidth = $window.width(),
            windowHeight = $window.height(),
            windowRatioHeightToWidth = windowHeight / windowWidth,
            newImageWidth = tempImage.width,
            newImageHeight = tempImage.height,
            newImageRatioHeightToWidth = newImageHeight / newImageWidth,
            newWidth,
            newHeight;

        tempImage.remove();

        if (windowRatioHeightToWidth > newImageRatioHeightToWidth) {
            newHeight = windowHeight;
            newWidth = windowHeight / newImageRatioHeightToWidth;
        }
        else {
            newHeight = windowWidth * newImageRatioHeightToWidth;
            newWidth = windowWidth;
        }

        screenGrab.css({
            width: newWidth,
            height: newHeight,
            left: ( windowWidth - newWidth ) / 2,
            top: ( windowHeight - newHeight ) / 2
        });
    }

    function padLeft(number, length) {
        var result = String(number);
        while (result.length < length) {
            result = "0" + result;
        }
        return result;
    }
}(jQuery, Modernizr, jsPlumb));
