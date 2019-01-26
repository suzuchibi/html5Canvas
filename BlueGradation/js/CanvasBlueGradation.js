/*---------------------------------------------------
Canvas-BlueGradation Script v1.0.0
Author: ToruSuzuki(Yokohama-Japan)
ECMAscript: 2014(ES5)
---------------------------------------------------*/

(function(global, factory) {
  'use strict';
  global.CanvasBlueGradation = factory();
}(this, function() {
  'use strict';
  return function() {

    var particles = [], ctx,
    canvas = document.getElementById('canvas'),
    ratio = window.devicePixelRatio || 1,
    SCREEN_WIDTH = window.innerWidth*ratio,
    SCREEN_HEIGHT = window.innerHeight*ratio,
    option = {
      'NUM': 240,
      'BASE': 300*ratio,
      'RADIUS': 100,
      'SPEED': 1.5*ratio,
    };
    console.log(ratio);

    if (canvas.getContext) {
      ctx = canvas.getContext('2d');
      canvas.width = SCREEN_WIDTH;
      canvas.height = SCREEN_HEIGHT;
      if (ratio !== 1) {
        canvas.style.width = SCREEN_WIDTH*0.5+'px';
        canvas.style.height = SCREEN_HEIGHT*0.5+'px';
      }

      function ResetCanvas() {
        if (SCREEN_WIDTH !== window.innerWidth*ratio || SCREEN_HEIGHT !== window.innerHeight*ratio ) {
          SCREEN_WIDTH = window.innerWidth*ratio;
          SCREEN_HEIGHT = window.innerHeight*ratio;
          canvas.width = SCREEN_WIDTH;
          canvas.height = SCREEN_HEIGHT;
          if (ratio !== 1) {
            canvas.style.width = SCREEN_WIDTH*0.5+'px';
            canvas.style.height = SCREEN_HEIGHT*0.5+'px';
          }
        }
      }

      function AppRender() {
        //ResetCanvas();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        particles.forEach(function(e) {
          e.Update();
          e.Draw();
        });
        window.requestAnimationFrame(AppRender);
      }

      function ArtCanvas() {
        this.Init();
      }
      ArtCanvas.prototype.Init = function() {
        this.x = Math.floor(Math.random()*SCREEN_WIDTH);
        this.y = Math.floor(Math.random()*SCREEN_HEIGHT);
        this.v = {
          'x': (Math.random()-0.5)*option.SPEED*ratio,
          'y': (Math.random()-0.5)*option.SPEED*ratio
        };
        //this.color = '#'+(Math.random()*0x404040+0xaaaaaa | 0).toString(16);
        this.radius =  option.BASE+Math.floor(Math.random()*option.RADIUS);
      };
      ArtCanvas.prototype.Gradient = function() {
        var g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0.2, 'rgba(0,28,48,'+0.05+')');
        g.addColorStop(0.3, 'rgba(0,28,48,'+0.2+')');
        g.addColorStop(1, 'rgba(0,28,48,'+0+')');
        return g;
      };
      ArtCanvas.prototype.Draw = function() {
        ctx.fillStyle = this.Gradient();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fill();
        ctx.closePath();
      };
      ArtCanvas.prototype.Update = function() {
        this.x += this.v.x;
        this.y += this.v.y;
        if(this.x < 0 || this.x > SCREEN_WIDTH) this.v.x = this.v.x*-1;
        if(this.y < 0 || this.y > SCREEN_HEIGHT) this.v.y = this.v.y*-1;
      };

      /* Start Apprication */
      for(var i = 0; i < option.NUM; i++) { particles.push(new ArtCanvas()); }
      ResetCanvas();
      AppRender();
    }
  }
}))