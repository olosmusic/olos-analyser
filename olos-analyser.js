(function(params){

  Polymer('olos-analyser', {

    width: 300,
    height: 300,
    rootfolder: '../olos-analyser/',

    // handle i/o
    input: null,
    output: null,

    ready: function() {
      this._audioContext = audioContext;

      this.initAnalyser();
      this.input = this.output = this.analyser;

      this.setupCanvas();

    },

    setupCanvas: function(container) {
      var scopeCanvas = document.createElement( 'canvas' );
      scopeCanvas.width = this.width; 
      scopeCanvas.height = this.height; 
      scopeCanvas.id = "scope";
      scopeCanvas.myContext = scopeCanvas.getContext( '2d' );

      this.$.container.appendChild(scopeCanvas);
      this.scopeCanvas = scopeCanvas;

      // TO DO: environment handles animation, only run when there is input
      window.requestAnimationFrame = window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame;

      this.animate();
    },

    initAnalyser: function() {
      // TO DO: dispose analyser if one exists
      this.analyser = audioContext.createAnalyser();
      this.analyser.fftSize = 2048;

      this.oscilloscope = new Oscilloscope(this.analyser, this.width, this.height);
    },

    animate: function() {
      var self = this;
      if (this.oscilloscope) {
        this.oscilloscope.draw(this.scopeCanvas.myContext);
        // if (freqCanvas)
        //   drawFreqBars(this.oscilloscope.analyser,freqCanvas.context);
      }
      requestAnimationFrame( this.animate.bind(this) );
    },

    dispose: function() {
      if (this.inputConnections) {
        for (var i = 0; i < this.inputConnections.length; i++) {
          console.log(this.inputConnections[i]);
          this.inputConnections[i].disconnect();
        }
      }
      this.analyser.disconnect();
      this.analyser = null;
    }

  });

})();