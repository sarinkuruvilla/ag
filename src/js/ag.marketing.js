/*jshint browser: true*/
/*global jQuery, Modernizr, jsPlumb, skrollr*/

(function($jQuery, Modernizr, jsPlumb) {
    var controller;

    $(document).ready(function() {
        controller = new ScrollMagic();

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
            console.log('testing');
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
