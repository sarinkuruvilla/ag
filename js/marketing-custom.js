$(document).ready(function () {

    var $window = $(window);
    var $browserHeight = $(window).height();
    var $browserWidth = $(window).width();
    var circlePos = ($browserHeight / 2) + 55;
    var knobPos = ($browserHeight / 2) - 275;
    if (!Modernizr.touch) {
        $('.circle').css({ top: circlePos + 'px' });
    }
    $("#knob").css({ top: knobPos + "px" });

    var page5 = $("#page5");
    var page6 = $("#page6");
    var page5bottom = page5.position().top + page5.outerHeight(true);
    page6.css({ top: page5bottom });

    if ($browserHeight <= 800) {
        $('.cube-main').css({ height: 290 });
    }

    var page6bottom = page5bottom + page6.outerHeight(true);
    $("footer").css({ top: page6bottom });

    if (!Modernizr.touch && $browserWidth >= 992) {
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
                anchor: [ 0.2, 0.4, 0, 0, 0, 50 ],
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
                anchor: [ 0.8, 0.4, 0, 0, 0, 50 ],
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

                anchor: [ -0.05, 0.2, 0, 1, 0, 50 ],
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
                target: e2
            });
            jsPlumb.connect({
                source: e3,
                target: e4
            });
        });
    }

    var totalFrames = 61; // the number of images in the sequence of JPEG files (this could be calculated server-side by scanning the frames folder)

    for (var i = 0; i < totalFrames; i++) { // loop for each image in sequence
        images[i] = new Image(); // add image object to array
        images[i].src = "images/knob/A_knob-render_2_" + pad(i, 5) + ".jpg"; // set the source of the image object
    }

    if (!Modernizr.touch && $browserWidth >= 992) {
        var windowWidth = $window.width();
        if (windowWidth > 767) {
            var s = skrollr.init({
                forceHeight: false,
                easing: {
                    WTF: Math.random,
                    inverted: function (p) {
                        return 1 - p;
                    }
                }
            });
        }
    }

    var $bigImage = $(".big-image");

    function adjustImagePositioning() {
        // Triggered after all images have been either loaded or confirmed broken.
        console.debug("adjustImagePositioning");

        $bigImage.each(function () {
            var currentImage = $(this);

            // TODO: find out why we are doing this - seems crazy expensive computationally
            var tempImage = new Image();

            tempImage.src = currentImage.attr("src");

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

            currentImage.css({
                width: newWidth,
                height: newHeight,
                left: ( windowWidth - newWidth ) / 2,
                top: ( windowHeight - newHeight ) / 2
            })

        });
    }

    // imagesLoaded jQuery plugin
    imagesLoaded($bigImage, adjustImagePositioning);

    // Use Modernizr to detect for touch devices, which don't support autoplay and may have less bandwidth,
    // so just give them the poster images instead
    var screenIndex = 1,
        bigVideo;

    var currentScreen = $("#screen-" + screenIndex);

    console.group("Video data diagnostics:");
    console.debug("video =>", currentScreen.data("video"));
    console.debug("video-no-audio =>", currentScreen.data("video-no-audio"));
    console.debug("video-mobile-streaming =>", currentScreen.data("video-mobile-streaming"));
    console.groupEnd();

    if (!Modernizr.touch) {
        // adjust image positioning so it lines up with video
        $bigImage.css("position", "relative");

        // initialize BigVideo
        bigVideo = new $.BigVideo({forceAutoplay: true});
        bigVideo.init();
        bigVideo.show(currentScreen.data("video"), {ambient: true});

        bigVideo.getPlayer().on("loadeddata", function () {
            // Fired when the player has downloaded data at the current playback position
            currentScreen.find(".big-image").transit({"opacity": 0}, 300)
        });

    } else {
        if ($browserHeight >= $browserWidth) {
            console.debug("height is bigger");
            //$bigImage.css({height: 100%});
        } else {
            console.debug("width is bigger");
            //$(".big-image").css({width: 100%;});
        }
    }

    var playButton = $("#playBtn");

    if (!Modernizr.touch) {
        playButton.click(function () {
            $(this).animate({opacity: "hide"});
            $(".content-text").animate({opacity: "hide"});
            $(".main-nav").animate({opacity: "hide"}, function () {
                $("#closeBtn").show();
                bigVideo.show(currentScreen.data("video-no-audio"), {ambient: false});
            });

            $("#closeBtn").click(function () {
                $(this).animate({opacity: "hide"}, function () {
                    bigVideo.show(currentScreen.data("video"), {ambient: true});
                    playButton.animate({opacity: "show"});
                    $(".content-text").animate({opacity: "show"});
                    $(".main-nav").animate({opacity: "show"});
                });
            });
        });
    } else {
        playButton.click(function () {
            window.location.href = currentScreen.data("video-mobile-streaming");
        });
    }

    if ($browserWidth >= 992) {
        playButton.mouseover(function () {
            $(this).css("backgroundPosition", "0 -130px");
        });
        playButton.mouseout(function () {
            $(this).css("backgroundPosition", "0 0");
        });
    } else {
        playButton.mouseover(function () {
            $(this).css("backgroundPosition", "0 -50px");
        });
        playButton.mouseout(function () {
            $(this).css("backgroundPosition", "0 0");
        });
    }

    var $container = $(".our-artists");

    $container.isotope({
        // Disable window resizing
        itemSelector: ".artist-photo",
        masonry: {
            columnWidth: $browserWidth <= 640 ? 80 : 216,
            isFitWidth: true
        }
    });

    // Filter items on button click
    $(".sorter").click(function () {
        var filterValue = $(this).data("filter");
        $container.isotope({ filter: filterValue });
    });

    $container.isotope("on", "layoutComplete",
        function (isoInstance, laidOutItems) {
            console.debug("isotope:layoutComplete", isoInstance, laidOutItems);
            var bottom = page5.position().top + page5.outerHeight(true);
            page6.css({ top: bottom });
        }
    );

    $(".artist-photo").click(function () {
        var $current = $(this);

        $(".artist-photo").not($current).each(function () {
            if ($(this).hasClass("gigante")) {
                $(this).removeClass("gigante");
                $(this).children("img").first().addClass("rollzoom");
            }
        });

        $current.toggleClass("gigante");
        $current.children("img").first().toggleClass("rollzoom");
        $container.isotope("layout");
    });

    $window.on("resize", function () {
        console.debug("window.resize");
        jsPlumb.repaintEverything();
        adjustImagePositioning();
    });

    $window.on("scroll", function () {
        console.debug("window.scroll");
        jsPlumb.repaintEverything();
    });
});
