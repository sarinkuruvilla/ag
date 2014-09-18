/*jshint browser: true*/
/*global jQuery, Modernizr*/

(function($jQuery, Modernizr) {


    $(document).ready(function() {

        //$("#cover").fadeOut();
        TweenLite.to("#cover", 0.2, {
            autoAlpha: 0
        });

    });


}(jQuery, Modernizr));