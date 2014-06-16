/**
 *  pixelWatcher.js :: Morgan (Reece) Phillips @linuxpoetry mrrrgn.com @2014
 */

var PixelWatcher = function(options) {
    var self = this;

    self.videoObject = options.videoObject;
    if (self.videoObject.nodeName.toLowerCase() != "video" &&
        self.videoObject.nodeName.toLowerCase() != "canvas") {
        throw Error("A valid video or canvas must be specified.");
    }
    self.frameRate = options.frameRate || 4;
    self.videoWidth = self.videoObject.width || self.videoObject.videoWidth;
    self.videoHeight = self.videoObject.height || self.videoObject.videoHeight;
    
    self.width = options.width || self.videoWidth;
    self.height = options.height || self.videoHeight;
    self.offsetX = options.offsetX || 0;
    self.offsetY = options.offsetY || 0;

    self.motionThreshold = options.motionThreshold || 1;

    // Used for comparissons in triggering motion events.
    self._previousPixelStats = undefined;
    
    self.start = function() {
        self._generateCanvas();
        setInterval(self._processCanvas, 1000/self.frameRate);
    };

    self.stop = function() {
        clearInterval(self._processCanvas);
    };

    self.addEventListener = function(eventName, eventHandler) {
        window.addEventListener(eventName, eventHandler);    
    };

    self._generateCanvas = function() {
        self.canvas = document.createElement('canvas');
        self.canvas.id = 'pixel-watcher-' + new Date().toString();
        self.canvas.hidden = false;
        self.canvas.width = self.videoWidth;
        self.canvas.height = self.videoHeight;
        self.canvasContext = self.canvas.getContext('2d');
    };

    self._copyFrameToCanvas = function() {
       self.canvasContext.drawImage(
           self.videoObject,
           0,
           0,
           self.videoWidth, 
           self.videoHeight
       ); 
    };

    self._processCanvas = function() {
        self._copyFrameToCanvas();
        canvasData = self.canvasContext.getImageData(
            self.offsetX,
            self.offsetY,
            self.width,
            self.height
        );
        var i = 0;
        var pixelStats = {r: 0, g: 0, b: 0, avg:0};
        while (i < canvasData.data.length) {
            var r = canvasData.data[i*4] || 0;
            var g = canvasData.data[i*4+1] || 0;
            var b = canvasData.data[i*4+2] || 0;
            var avg = (r + g + b)/3;
            pixelStats.r += r;
            pixelStats.g += g;
            pixelStats.b += b;
            pixelStats.avg += avg;
            i++;
        }
        for (key in pixelStats) {
            pixelStats[key] = Math.round(pixelStats[key]/(canvasData.data.length/4));
        }
        window.dispatchEvent(new CustomEvent('pixelstats', {'detail': pixelStats}));

        // Now decide whether or not to trigger a motion event
        var previousPixelStats = self._previousPixelStats || pixelStats;
        self._previousPixelStats = pixelStats;
        if (Math.abs(previousPixelStats.avg - pixelStats.avg) > self.motionThreshold) {
            window.dispatchEvent(new Event('motion'));
        };
        
    };
};