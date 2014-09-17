(function($jQuery, Modernizr) {

    $(document).ready(function() {


        jQuery(document).on('keyup', function(evt) {
            if (evt.keyCode == 27) {
                $('.bigCircle').fadeOut("normal", function() {
                    $(this).remove();
                });
                //TweenLite.to('.profile-details', 0.5, {autoAlpha:0});
                $('body').css('overflow', 'auto');
            }
        });


        $.fn.spin.presets.flower = {
            lines: 11, // The number of lines to draw
            length: 0, // The length of each line
            width: 4, // The line thickness
            radius: 11, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#fff', // #rgb or #rrggbb or array of colors
            speed: 1.7, // Rounds per second
            trail: 27, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: true, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '50%', // Top position relative to parent
            left: '50%' // Left position relative to parent
        }

        $(".circle").click(function() {


            var p = $(this);
            var position = p.position();
            //        var imageUrl = $('img', this).attr('src');
            var addsqrt = Math.pow($(window).width(), 2) + Math.pow($(window).height(), 2);
            var diag = Math.sqrt(addsqrt);
            var ft = -(diag - $(window).height()) / 2;
            var fl = -(diag - $(window).width()) / 2;
            $('.container').append("<div class='bigCircle'></div>");
            $('.closeBtn').css('top', '300px');
            $('.closeBtn').css('left', '300px');
            $('.closeBtn').hide();
            $('.bigCircle').css('height', '150px');
            $('.bigCircle').css('width', '150px');
            $('.bigCircle').css('position', 'absolute');
            $('.bigCircle').css('border-radius', '50%');
            $('.bigCircle').css('margin', '15px');
            $('.bigCircle').css('top', position.top);
            $('.bigCircle').css('left', position.left);
            $('.bigCircle').css('background-size', 'cover');
            $('.bigCircle').spin('flower');

            var bigImage = $('img', this).data('big');
            $('.bigCircle')
                .css('background-image', 'url(' + bigImage + ')')
                .waitForImages(function() {
                    $('.bigCircle').spin(false);
                    TweenLite.to('.bigCircle', 0.5, {
                        width: diag,
                        height: diag,
                        margin: '0',
                        top: ft,
                        left: fl,
                        onComplete: circleOpen
                    });
                    // This *does* work
                }, $.noop, true);


            function circleOpen() {
                $('body').css('overflow', 'hidden');
                $('.container').append("<div class='bigContent'><div class='closeBtn'>+</div></div>");
                $('.closeBtn').show();
                $('.closeBtn').click(function() {
                    $(this).hide();
                    TweenLite.to('.bigCircle', 0.5, {
                        width: p.width(),
                        height: p.height(),
                        margin: '15px',
                        top: position.top,
                        left: position.left,
                        onComplete: circleClose

                    });

                    function circleClose() {
                        $('.bigCircle').fadeOut("normal", function() {
                            $('.closeBtn').remove();
                            $(this).remove();
                        });
                    }

                });
                //TweenLite.to('.closeBtn',0.2, {opacity: '1'});
            }
        });
    });

}(jQuery, Modernizr));