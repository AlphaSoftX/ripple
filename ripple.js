function ripple(){
  var getPosition = function(centered, rect, event){
    var left = (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
    var top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
    if(centered){
      x = rect.width/2;
      y = rect.height/2;
    }else{
      x = event.pageX - rect.left - left;
      y = event.pageY - rect.top - top;
    }
    return {
      x: x,
      y: y
    };
  };
  var getRadius = function(x, y, rect) {
    var distX = Math.max(x, rect.width-x);
    var distY = Math.max(y, rect.height-y);
    return Math.ceil(Math.sqrt(distX*distX+distY*distY));
  };
  document.querySelectorAll('[ripple]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      var trigger = this.getAttribute('ripple');
      trigger = trigger === 'true' || trigger === '' ? true: false;
      if(trigger){
        var btnRect = this.getBoundingClientRect();
        var centered = this.getAttribute('ripple-centered');
        centered = centered === 'true' || centered === '' ? true: false;
        var position = getPosition(centered, btnRect, e);
        var color = this.getAttribute('ripple-bg');
        var disabled = this.getAttribute('ripple-disabled');
        disabled = disabled === 'true' || disabled === '' ? true: false;
        var radius = this.getAttribute('ripple-radius');
        radius = radius && !isNaN(Number(radius)) ? Number(radius): getRadius(position.x, position.y, btnRect);
        var fadeTime = this.getAttribute('ripple-fade-time');
        fadeTime = fadeTime && !isNaN(Number(fadeTime)) ? Number(fadeTime): 0;
        var fadeStyle = this.getAttribute('ripple-fade-style');
        var fadeDelay = this.getAttribute('ripple-fade-delay');
        fadeDelay = fadeDelay && !isNaN(Number(fadeDelay)) ? Number(fadeDelay): 0;
        var sizeTime = this.getAttribute('ripple-expand-time');
        sizeTime = sizeTime && !isNaN(Number(sizeTime)) ? Number(sizeTime): 0;
        var sizeStyle = this.getAttribute('ripple-expand-style');
        var sizeDelay = this.getAttribute('ripple-expand-delay');
        sizeDelay = sizeDelay && !isNaN(Number(sizeDelay)) ? Number(sizeDelay): 0;
        var removeDelay = this.getAttribute('ripple-remove-delay');
        removeDelay = removeDelay && !isNaN(Number(removeDelay)) ? Number(removeDelay): 1000;
        if(!disabled){
          var ripple = document.createElement('ripple');
          ripple.classList.add('ripples');
          ripple.style.left = (position.x - radius)+'px';
          ripple.style.top = (position.y - radius)+'px';
          ripple.style.width = (radius*2)+'px';
          ripple.style.height = (radius*2)+'px';
          if(color){
            ripple.style.setProperty('--ripple-bg', color);
          }
          if(fadeTime){
            ripple.style.setProperty('--fade-time', fadeTime+'ms');
          }
          if(fadeStyle){
            ripple.style.setProperty('--fade-style', fadeStyle);
          }
          if(fadeDelay){
            ripple.style.setProperty('--fade-delay', fadeDelay+'ms');
          }
          if(sizeTime){
            ripple.style.setProperty('--expand-time', sizeTime+'ms');
          }
          if(sizeStyle){
            ripple.style.setProperty('--expand-style', sizeStyle);
          }
          if(sizeDelay){
            ripple.style.setProperty('--expand-delay', sizeDelay+'ms');
          }
          this.appendChild(ripple);
          setTimeout(function(){
            ripple.style.opacity = 0;
            ripple.style.transform = 'scale3d(1,1,1)';
          },0);
          setTimeout(function() {
            ripple.remove();
          }, removeDelay);
        }
      }
    });
  });
}