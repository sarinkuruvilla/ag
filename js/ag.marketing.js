/*jshint browser: true*/
/*global jQuery, Modernizr, jsPlumb, skrollr*/

(function($, Modernizr, jsPlumb, skrollr) {
    var screenMdMin = 992;

    $(document).ready(function() {
        var $window = $(window),
            $browserHeight = $window.height(),
            $browserWidth = $window.width(),
            circlePos = ($browserHeight / 2) + 55,
            knobPos = ($browserHeight / 2) - 275;

        if (!Modernizr.touch) {
            $(".circle").css({ top: circlePos + "px" });
        }
        $("#knob").css({ top: knobPos + "px" });

        var page5 = $("#page5"),
            page6 = $("#page6"),
            page5bottom = page5.position().top + page5.outerHeight(true);

        page6.css({ top: page5bottom });

        if ($browserHeight <= 800) {
            $(".cube-main").css({ height: 290 });
        }

        $("footer").css({ top: page5bottom + page6.outerHeight(true) });

        createConnectors();
        createKnobScrubber();

        if (!Modernizr.touch && $browserWidth >= 767) {
            skrollr.init({ forceHeight: false });
        }

        createBigVideo();
        createArtistGrid();

        $window.on("resize", function() {
            console.debug("window.resize");
            jsPlumb.repaintEverything();
            adjustImagePositioning();
        });

        $window.on("scroll", function() {
            console.debug("window.scroll");
            jsPlumb.repaintEverything();
        });
    });

    function createConnectors() {
        if (!Modernizr.touch && $(window).width() >= screenMdMin) {
            jsPlumb.bind("ready", function() {
                jsPlumb.setRenderMode(jsPlumb.SVG);

                var endpointDefaults = {
                    endpoint: "Blank",
                    cssClass: "_jsPlumb_endpoint",

                    connectorStyle: {
                        lineWidth: 2.5,
                        strokeStyle: "#ffffff",
                        dashstyle: "3 1"
                    },

                    connector: [
                        "Flowchart", {
                            gap: 10,
                            cornerRadius: 35
                        }
                    ]
                };

                var endpoint1 = $.extend({}, endpointDefaults, { anchors: ["Right", "Left"], isSource: true }),
                    endpoint2 = $.extend({}, endpointDefaults, { anchor: [ 0.2, 0.4, 0, 0, 0, 50 ], isTarget: true }),
                    endpoint3 = $.extend({}, endpointDefaults, { anchor: [ 0.8, 0.4, 0, 0, 0, 50 ], isSource: true }),
                    endpoint4 = $.extend({}, endpointDefaults, { anchor: [ -0.05, 0.2, 0, 1, 0, 50 ], isTarget: true });

                var e1 = jsPlumb.addEndpoint($("#you-circle"), endpoint1),
                    e2 = jsPlumb.addEndpoint($("#knob"), endpoint2),
                    e3 = jsPlumb.addEndpoint($("#knob"), endpoint3),
                    e4 = jsPlumb.addEndpoint($("#data-description"), endpoint4);

                jsPlumb.setContainer($("#page3 .overflow-container"));
                jsPlumb.connect({ source: e1, target: e2 });
                jsPlumb.connect({ source: e3, target: e4 });
            });
        }
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

    function createBigVideo() {
        var $screenGrab = $("#screenGrab"),
            page1 = $("#page1"),
            playButton = $("#playBtn");

        $screenGrab.imagesLoaded(adjustImagePositioning);

        console.group("Video data diagnostics:");
        console.debug("video =>", page1.data("video"));
        console.debug("video-no-audio =>", page1.data("video-no-audio"));
        console.debug("video-mobile-streaming =>", page1.data("video-mobile-streaming"));
        console.groupEnd();

        // Use Modernizr to detect for touch devices, which don't support autoplay and may have less bandwidth,
        // so just give them the poster images instead
        if (!Modernizr.touch) {
            // adjust image positioning so it lines up with video
            $screenGrab.css("position", "relative");

            var bigVideo = new $.BigVideo({ forceAutoplay: true });
            bigVideo.init();
            bigVideo.show(page1.data("video"), { ambient: true });

            bigVideo.getPlayer().on("loadeddata", function() {
                // Fired when the player has downloaded data at the current playback position
                $screenGrab.transit({ "opacity": 0 }, 300);
            });

            playButton.click(function() {
                $(this).animate({ opacity: "hide" });
                $(".content-text").animate({ opacity: "hide" });
                $(".main-nav").animate({ opacity: "hide" }, function() {
                    $("#closeBtn").show();
                    bigVideo.show(page1.data("video-no-audio"), { ambient: false });
                });

                $("#closeBtn").click(function() {
                    $(this).animate({ opacity: "hide" }, function() {
                        bigVideo.show(page1.data("video"), { ambient: true });
                        playButton.animate({ opacity: "show" });
                        $(".content-text").animate({ opacity: "show" });
                        $(".main-nav").animate({ opacity: "show" });
                    });
                });
            });
        } else {
            playButton.click(function () {
                window.location.href = page1.data("video-mobile-streaming");
            });
        }

        if ($(window).width() >= screenMdMin) {
            playButton.mouseover(function() {
                $(this).css("backgroundPosition", "0 -130px");
            });
            playButton.mouseout(function() {
                $(this).css("backgroundPosition", "0 0");
            });
        } else {
            playButton.mouseover(function() {
                $(this).css("backgroundPosition", "0 -50px");
            });
            playButton.mouseout(function() {
                $(this).css("backgroundPosition", "0 0");
            });
        }
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
                var page5 = $("#page5"),
                    page6 = $("#page6"),
                    bottom = page5.position().top + page5.outerHeight(true);
                page6.css({ top: bottom });
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
}(jQuery, Modernizr, jsPlumb, skrollr));
