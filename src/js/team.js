(function($jQuery, Modernizr) {

    $(document).ready(function() {


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
        };

        $('.thumbnail').click(function() {


            var p = $('body');
            var position = p.position();
            //        var imageUrl = $('img', this).attr('src');
            var addsqrt = Math.pow($(window).width(), 2) + Math.pow($(window).height(), 2);
            var diag = Math.sqrt(addsqrt);
            var ft = -(diag - $(window).height()) / 2;
            var fl = -(diag - $(window).width()) / 2;

            var teamMemberName = $(this).children('.caption').children('h3').html();
            var teamMemberTitle = $(this).children('.caption').children('p.subhead').html();
            var teamMemberBio = $(this).children('.caption').children('p.bio').html();
            var thumbWidth = $(this).width();
            var thumbHeight = $(this).height();


            $(this).parent().append('<div class=\'bigCircle\'></div>');
            
            $('.bigCircle').css('height', thumbHeight + 'px');
            $('.bigCircle').css('width', thumbWidth + 'px');
            $('.bigCircle').css('position', 'absolute');
            $('.bigCircle').css('border-radius', '50%');
            $('.bigCircle').css('margin', '0');
            $('.bigCircle').css('z-index', '99999');
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
                        top: $('body').scrollTop() + ft - $(this).parent().offset().top - parseInt($(this).parent().css('padding-top')) + parseInt($(this).parent().css('padding-bottom')),
                        left: fl - $(this).parent().position().left - parseInt($(this).parent().css('padding-left')) + parseInt($(this).parent().css('padding-right')),
                        onComplete: circleOpen
                    });
                    // This *does* work
                }, $.noop, true);


            function circleOpen() {

                jQuery(document).on('keyup', function(evt) {
                    if (evt.keyCode == 27) {
                        $( '.closeBtn' ).trigger( 'click' );
                    }
                });

                $('body').css('overflow', 'hidden');
                $('.bigCircle').append('<div class=\'bigContent\'><div class=\'bigContentContainer\'><h3>' + teamMemberName + '</h3><p class=\'subhead\'>' + teamMemberTitle + '</p><p class=\'bio\'>' + teamMemberBio + '</p><div class=\'closeBtn\'>+</div></div></div>');
                $('.closeBtn').css('top', '30px');
                $('.closeBtn').css('right', '50px');
                $('.bigContentContainer').css('width',$(window).width());
                $('.bigContentContainer').css('height',$(window).height());
                $('.bigContentContainer').css('position','absolute');
                $('.bigContentContainer').css('z-index','5');
                $('.bigContentContainer').css('top',($('.bigCircle').height() - $(window).height())/2 + 'px');
                $('.bigContentContainer').css('left',($('.bigCircle').width() - $(window).width())/2 + 'px');

                $('.closeBtn').click(function() {

                    $(this).parent().hide();
                    TweenLite.to('.bigCircle', 0.5, {
                        width: thumbWidth + 'px',
                        height: thumbHeight + 'px',
                        marginLeft: '15px',
                        marginRight: '15px',
                        top: position.top,
                        left: position.left,
                        onComplete: circleClose

                    });

                    function circleClose() {
                        $('.bigCircle').fadeOut('normal', function() {
                            $('body').css('overflow', 'auto');
                            $('.bigContentContainer').remove();
                            $(this).remove();
                        });
                    }

                });
                //TweenLite.to('.closeBtn',0.2, {opacity: '1'});
            }
        });
    });

}(jQuery, Modernizr));