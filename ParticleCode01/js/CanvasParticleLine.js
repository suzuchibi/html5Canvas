/*---------------------------------------------------
Canvas-Particle-Line Script v1.0.0
Author: ToruSuzuki(Yokohama-Japan)
ECMAscript: 2014(ES5)
Inspired by Node Garden
---------------------------------------------------*/

(function(global, factory) {
  'use strict';
  global.CanvasParticleLine = factory();
}(this, function() {
  'use strict';
  return function() {

    var particles = [], ctx, max = 200, springAmount = 0,
    canvas = document.getElementById('canvas'),
    ratio = window.devicePixelRatio || 1,
    option = {
      'SPEED': 0.5,
      'NUM': 50,
      'SIZE': 2,
      'LINE': 1,
      'COLOR': '#c9eeff',
      'RGB': {
        'r': '165',
        'g': '226',
        'b': '255'
      },
      'RGB2': {
        'r': '102',
        'g': '175',
        'b': '255'
      }
    };
    max = max*ratio;

    if (canvas.getContext) {
      ctx = canvas.getContext('2d');

      function ResetCanvas() {
        if (canvas.width !== document.documentElement.clientWidth*ratio || canvas.height !== document.documentElement.clientHeight*ratio ) {
          canvas.width = document.documentElement.clientWidth*ratio;
          canvas.height = document.documentElement.clientHeight*ratio;
          if (ratio !== 1) {
            canvas.style.width = canvas.width*0.5+'px';
            canvas.style.height = canvas.height*0.5+'px';
          }
        }
      }

      function Distance(object1, object2) {
        var distanceX = object2.x-object1.x,
        distanceY = object2.y-object1.y;
        return Math.sqrt(distanceX*distanceX + distanceY*distanceY);
      }

      function DrawLine(ob1, ob2) {
        ctx.lineWidth = option.LINE;
        ctx.beginPath();
        ctx.moveTo(ob1.x, ob1.y);
        ctx.lineTo(ob2.x, ob2.y);
        ctx.strokeStyle = 'rgba('+option.RGB.r+','+option.RGB.g+','+option.RGB.b+', 0.1)';
        ctx.closePath();
        ctx.stroke();
        ob1.v.x += (ob2.x - ob1.x)*springAmount;
        ob1.v.y += (ob2.y - ob1.y)*springAmount;
        ob2.v.x -= (ob2.x - ob1.x)*springAmount;
        ob2.v.x -= (ob2.x - ob1.x)*springAmount;
      }

      function AppRender() {
        ResetCanvas();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function(e, ii) {
          e.Update();
          e.DrawCircle();
          e.DrawGradientCircle();
          if(ii !== particles.length){
            for(var i = ii+1; i < particles.length; i++) {
              if(Distance(e, particles[i]) < max) {
                DrawLine(e, particles[i]);
              }
            }
          }
        });
        window.requestAnimationFrame(AppRender);
      }

      function ArtCanvas() {
        this.Init();
      }
      ArtCanvas.prototype.Init = function() {
        this.x = Math.floor(Math.random()*document.documentElement.clientWidth*ratio);
        this.y = Math.floor(Math.random()*document.documentElement.clientHeight*ratio);
        this.v = {
          'x': (Math.random()-0.5)/option.SPEED,
          'y': (Math.random()-0.5)/option.SPEED
        };
        this.radius = option.SIZE*ratio;
        this.randomRadius = Math.floor(Math.random()*100)*ratio;
      };
      ArtCanvas.prototype.DrawCircle = function() {
        ctx.fillStyle = option.COLOR;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI*2, false);
        ctx.fill();
        ctx.closePath();
      };
      ArtCanvas.prototype.DrawGradientCircle = function() {
        var color = option.RGB2.r + ',' + option.RGB2.g + ',' + option.RGB2.b;
        ctx.fillStyle = 'rgba('+color+',0.1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.randomRadius, Math.PI*2, false);
        ctx.fill();
        ctx.closePath();
      };
      ArtCanvas.prototype.Update = function() {
        this.x += this.v.x;
        this.y += this.v.y;
        if(this.x < 0) this.x = document.documentElement.clientWidth*ratio;
        if(this.x > document.documentElement.clientWidth*ratio) this.x = 0;
        if(this.y < 0) this.y = document.documentElement.clientHeight*ratio;
        if(this.y > document.documentElement.clientHeight*ratio) this.y = 0;
      };

      /* Start Apprication */
      for(var i = 0; i < option.NUM; i++) { particles.push(new ArtCanvas()); }
      AppRender();
    }
  }
}))