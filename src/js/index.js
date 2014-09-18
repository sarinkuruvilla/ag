/*jshint browser: true*/
/*global jQuery, Modernizr*/

(function($jQuery, Modernizr) {
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
                TweenMax.to("#handle", 3, {rotation: 90, transformOrigin:"109px 109px", ease: Linear.easeNone}),
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
                TweenMax.fromTo("#page6", 1, {backgroundPosition: "450px -170px", ease: Linear.easeNone}, {backgroundPosition: "250px - 800px", ease: Linear.easeNone})
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
        graphBack();

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

    function graphBack() {
        (function() {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
            }
         
            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                      timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
         
            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
        }());

        var posY = [1,1,1,1,1,1,1];
        var dataPoints = [0.95,0.9,0.75,0.73,0.64,0.68,0.51];
        var greenClr = "#8bb801";

        // A variable to store the requestID.
        var requestID;

        var c = document.getElementById("graphBack");
        var p = document.getElementById("graphBack").parentNode;
        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;

        var ctx = c.getContext("2d");
        ctx.canvas.width = p.clientWidth;
        ctx.canvas.height= p.clientHeight;





        // Animate.
        function animate() {

            requestID = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, c.width, c.height);
          
            function line(w,x,y,z){
              ctx.beginPath();
              ctx.moveTo(w, x);
              ctx.lineTo(y, z);
              ctx.lineWidth = 1;
              ctx.strokeStyle = '#ededed';
              ctx.stroke();
            }
            for (i = 2; i < 10; i++) { 
              var num = i / 10;
              line(0,p.clientHeight*num,p.clientWidth,p.clientHeight*num);
            }

            ctx.beginPath();
            ctx.moveTo(0, p.clientHeight);
            ctx.lineTo(0,p.clientHeight*posY[0]);
            ctx.lineTo((p.clientWidth/6),p.clientHeight*posY[1]);
            ctx.lineTo((p.clientWidth/6)*2,p.clientHeight*posY[2]);
            ctx.lineTo((p.clientWidth/6)*3,p.clientHeight*posY[3]);
            ctx.lineTo((p.clientWidth/6)*4,p.clientHeight*posY[4]);
            ctx.lineTo((p.clientWidth/6)*5,p.clientHeight*posY[5]);
            ctx.lineTo(p.clientWidth,p.clientHeight*posY[6]);
            ctx.lineTo(p.clientWidth,p.clientHeight);
            ctx.closePath();
            ctx.lineWidth = 5;

            // add linear gradient
            var grd = ctx.createLinearGradient(p.clientWidth/2, 0, p.clientWidth/2, p.clientHeight);
            // light blue
            grd.addColorStop(0.7, '#a2d200');   
            // dark blue
            grd.addColorStop(1, '#ffffff');
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.strokeStyle = greenClr;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            function dot(color,x,y){
              var radius = 5;
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
              ctx.fillStyle = color;
              ctx.fill();
            }
            

            
            if( posY[0] >= dataPoints[0] ) {
              dot(greenClr,0,p.clientHeight*posY[0]);
              posY[0] = posY[0] - 0.01;
            } else {
              posY[0] = dataPoints[0];
              dot(greenClr,0,p.clientHeight*posY[0]);
            }
          
            if( posY[1] > dataPoints[1] ) {
              dot(greenClr,(p.clientWidth/6),p.clientHeight*posY[1]);
              posY[1] = posY[1] - 0.01;
            } else {
              posY[1] = dataPoints[1];
              dot(greenClr,(p.clientWidth/6),p.clientHeight*posY[1]);
            }
            if( posY[2] > dataPoints[2] ) {
              dot(greenClr,(p.clientWidth/6)*2,p.clientHeight*posY[2]);
              posY[2] = posY[2] - 0.01;
            } else {
              posY[2] = dataPoints[2];
              dot(greenClr,(p.clientWidth/6)*2,p.clientHeight*posY[2]);
            }
            if( posY[3] > dataPoints[3] ) {
              dot(greenClr,(p.clientWidth/6)*3,p.clientHeight*posY[3]);
              posY[3] = posY[3] - 0.01;
            } else {
              posY[3] = dataPoints[3];
              dot(greenClr,(p.clientWidth/6)*3,p.clientHeight*posY[3]);
            }
            if( posY[4] > dataPoints[4] ) {
              dot(greenClr,(p.clientWidth/6)*4,p.clientHeight*posY[4]);
              posY[4] = posY[4] - 0.01;
            } else {
              posY[4] = dataPoints[4];
              dot(greenClr,(p.clientWidth/6)*4,p.clientHeight*posY[4]);
            }
            if( posY[5] > dataPoints[5] ) {
              dot(greenClr,(p.clientWidth/6)*5,p.clientHeight*posY[5]);
              posY[5] = posY[5] - 0.01;
            } else {
              posY[5] = dataPoints[5];
              dot(greenClr,(p.clientWidth/6)*5,p.clientHeight*posY[5]);
            }
            if( posY[6] > dataPoints[6] ) {
              dot(greenClr,(p.clientWidth/6)*6,p.clientHeight*posY[6]);
              posY[6] = posY[6] - 0.01;
            } else {
              posY[6] = dataPoints[6];
              dot(greenClr,(p.clientWidth/6)*6,p.clientHeight*posY[6]);
            }
            //dot(greenClr,(p.clientWidth/6)*2,p.clientHeight*0.75);
            //dot(greenClr,(p.clientWidth/6)*3,p.clientHeight*0.73);
            //dot(greenClr,(p.clientWidth/6)*4,p.clientHeight*0.64);
            //dot(greenClr,(p.clientWidth/6)*5,p.clientHeight*0.68);
            //dot(greenClr,p.clientWidth,p.clientHeight*0.51);

            function roundToolTip(x, y, w, h, radius, msg) {
              x = x - w/2;
              y = y - (h+(radius*2));
              var r = x + w;
              var b = y + h;
              // ctx.shadowBlur=4;
              // ctx.shadowColor = "#ff0000";
              ctx.beginPath();
              var my_gradient=ctx.createLinearGradient(x,x,x,r);
              my_gradient.addColorStop(0,"#ffffff");
              my_gradient.addColorStop(1,"#f0f0f0");
              ctx.fillStyle=my_gradient;

              
              //ctx.shadowColor="#c6c6c6";
              ctx.moveTo(x+radius, y);
              ctx.lineTo(r-radius, y);
              ctx.quadraticCurveTo(r, y, r, y+radius);
              ctx.lineTo(r, y+h-radius);
              ctx.quadraticCurveTo(r, b, r-radius, b);
              ctx.lineTo((w/2)+x+radius,b);
              ctx.lineTo((w/2)+x,b+radius);
              ctx.lineTo(((w/2)+x)-radius,b);
              ctx.lineTo(x+radius, b);

              ctx.quadraticCurveTo(x, b, x, b-radius);
              ctx.lineTo(x, y+radius);
              ctx.quadraticCurveTo(x, y, x+radius, y);
              ctx.fill();
              ctx.fillStyle= "#000";
              ctx.font = "25px Arial";
              ctx.fillText(msg,x+radius,b-radius); 
            }

            roundToolTip((p.clientWidth/6), p.clientHeight*0.9, 200, 50, 10, "OCT21, 2013");

        }

        animate();
        /*// Event listener for the start button.
        startBtn.addEventListener('click', function(e) {
          e.preventDefault();

          // Start the animation.
          requestID = requestAnimationFrame(animate);
        });*/

    }

}(jQuery, Modernizr));
