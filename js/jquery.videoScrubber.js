/*jslint browser: true*/
/*global jQuery*/

// Based on https://github.com/ghepting/javascript-video-scrubber/

(function ($) {
    "use strict";
        
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    
    function Scrubber(element, options) {
        this.element = element;
        this.currentFrame = 1;
        this.targetFrame = 1;
        this.images = options.images;
        this.frameCount = options.frameCount;
        this.yOffsetAdjustment = options.yOffsetAdjustment;
        this.scrollRatio = options.scrollRatio;
        this.frameRatio = options.frameRatio;
        
        var self = this;
        function animate() {
            requestAnimationFrame(animate);

            var theScrollRatio = typeof (self.scrollRatio) === "function" ?
                        self.scrollRatio() :
                        self.scrollRatio,
                theFrameRatio = typeof (self.frameRatio) === "function" ?
                        self.frameRatio() :
                        self.frameRatio;
            
            self.targetFrame = Math.max(Math.round(self.getYOffset() / theScrollRatio), 1);
            if (self.targetFrame !== self.currentFrame) {
                self.currentFrame += (self.targetFrame - self.currentFrame) / theFrameRatio;
            }
            self.changeFrame();
        }
        
        $(document).ready(function () { animate(); });
    }
    
    Scrubber.prototype.getYOffset = function () {
        var adjust = typeof (this.yOffsetAdjustment) === "function" ?
                this.yOffsetAdjustment() :
                this.yOffsetAdjustment;
        return typeof (window.pageYOffset) === "number" ?
                window.pageYOffset + adjust :
                document.documentElement.scrollTop + adjust; // Old IE
    };
    
    Scrubber.prototype.changeFrame = function () {
        var actualFrame = Math.round(this.currentFrame);
        
        if (this.images.length > 0 && this.images[actualFrame]) {
            if (this.images[actualFrame].complete) {
                if ($(this.element).attr("src") !== this.images[actualFrame].src) {
                    $(this.element).attr("src", this.images[actualFrame].src);
                }
            }
        }
    };

    Scrubber.prototype.animate = function () {
        var self = this;
        requestAnimationFrame(self.animate);
        
        this.targetFrame = Math.max(Math.round(this.getYOffset() / 30), 1);
        if (this.targetFrame !== this.currentFrame) {
            this.currentFrame += (this.targetFrame - this.currentFrame) / 5;
        }
        this.changeFrame();
    };
    
    $.fn.videoScrubber = function (options) {
        return this.filter("img").each(function (index, item) {
            var itemOptions = $.extend({},
                                       $.fn.videoScrubber.defaultOptions,
                                       $(item).data(),
                                       options);
            return new Scrubber(item, itemOptions);
        });
    };
    
    $.fn.videoScrubber.defaultOptions = {
        indexPadding: 5,
        resize: false,
        images: [],
        frameCount: 1,
        yOffsetAdjustment: 0,
        scrollRatio: 30,
        frameRatio: 5
    };
}(jQuery));