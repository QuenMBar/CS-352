/*
 * solar -- Solar system simulator -- frames and animation example
 * Created for CS352, Calvin College Computer Science
 *
 */

var solar = { }
var backgroundImg;
var intervalID, time=0, step=5, tilt=0, prevTilt=0, speedUpRate=0;
var marble1, oldSpeed1=0, oldDistance1=0;
var marble2, oldSpeed2=0, oldDistance2=0;
var marble3, oldSpeed3=0, oldDistance3=0;
var marble4, oldSpeed4=0, oldDistance4=0;
var marbles = 1;
var running=false;

$(document).ready(function () { solar.init(); });

solar.init = function () {  
  solar.canvas  = $('#canvas1')[0];
  solar.cx = solar.canvas.getContext('2d');
  solar.cx.fillStyle = 'rgb(255,0,0)';

  solar.cx.setTransform(1,0,0,1,360,270);	// world frame is (-1,-1) to (1,1)

  // bind functions to events, button clicks
  $('#gobutton').bind('click', solar.go);
  $('#stopbutton').bind('click', solar.stop);
  $('#stepbutton').bind('click', solar.step);
  $('#addbutton').bind('click', solar.addMarbles);

  solar.loadImages();
  backgroundImg.onload = function() { solar.animate(); }
  marble1.onload = function() { solar.animate(); }
}

solar.animate = function() {

  $('#pointcount').text($('#slider1').val());

  $('#pointcount2').text($('#slider2').val());
  speedUpRate=$('#slider2').val()*.001;

  // update time according to how much time has elapsed
  step = parseInt($('#slider1').val());
  time += step;
  $('#timecount').text(time);

  solar.cx.clearRect(-720, -520, 1440, 1040);

  solar.cx.rotate(-prevTilt);
  solar.cx.rotate($('#slider2').val()/50);
  prevTilt = $('#slider2').val()/50;

  solar.cx.save();
  solar.cx.drawImage(backgroundImg, -360, -270, 720, 540);

  // marble 1
  solar.cx.save();
  if (((oldSpeed1 >= -25) && (speedUpRate <= 0)) || ((oldSpeed1 <= 25) && (speedUpRate >= 0))) {
    oldSpeed1 = oldSpeed1 + speedUpRate;
  }
  oldDistance1 = oldDistance1 + (oldSpeed1 * (step/5));
  if (oldDistance1 >= 380) {
    oldDistance1 = oldDistance1 - 760;
  } else if (oldDistance1 <= -380) {
    oldDistance1 = oldDistance1 + 760;
  }
  solar.cx.translate(oldDistance1,0)
  solar.cx.translate(0, 175)
  solar.cx.rotate(oldDistance1/25);
  solar.cx.drawImage(marble1, 0 - marble1.width/2, 0 - marble1.height/2);
  solar.cx.restore();

  // marble 2
  if (marbles >= 2) {
    solar.cx.save();
    if (((oldSpeed2 >= -25) && (speedUpRate <= 0)) || ((oldSpeed2 <= 25) && (speedUpRate >= 0))) {
      oldSpeed2 = oldSpeed2 + speedUpRate;
    }
    oldDistance2 = oldDistance2 + (oldSpeed2 * (step / 5));
    if (oldDistance2 >= 380) {
      oldDistance2 = oldDistance2 - 760;
    } else if (oldDistance2 <= -380) {
      oldDistance2 = oldDistance2 + 760;
    }
    solar.cx.translate(oldDistance2, 0)
    solar.cx.translate(0, 175)
    solar.cx.rotate(oldDistance2 / 25);
    solar.cx.drawImage(marble2, 0 - marble2.width / 2, 0 - marble2.height / 2);
    solar.cx.restore();
  }

  // marble 3
  if (marbles >= 3) {
    solar.cx.save();
    if (((oldSpeed3 >= -25) && (speedUpRate <= 0)) || ((oldSpeed3 <= 25) && (speedUpRate >= 0))) {
      oldSpeed3 = oldSpeed3 + speedUpRate;
    }
    oldDistance3 = oldDistance3 + (oldSpeed3 * (step / 5));
    if (oldDistance3 >= 380) {
      oldDistance3 = oldDistance3 - 760;
    } else if (oldDistance3 <= -380) {
      oldDistance3 = oldDistance3 + 760;
    }
    solar.cx.translate(oldDistance3, 0)
    solar.cx.translate(0, 175)
    solar.cx.rotate(oldDistance3 / 25);
    solar.cx.drawImage(marble3, 0 - marble3.width / 2, 0 - marble3.height / 2);
    solar.cx.restore();
  }

  // marble 4
  if (marbles >= 4) {
    solar.cx.save();
    if (((oldSpeed4 >= -25) && (speedUpRate <= 0)) || ((oldSpeed4 <= 25) && (speedUpRate >= 0))) {
      oldSpeed4 = oldSpeed4 + speedUpRate;
    }
    oldDistance4 = oldDistance4 + (oldSpeed4 * (step / 5));
    if (oldDistance4 >= 380) {
      oldDistance4 = oldDistance4 - 760;
    } else if (oldDistance4 <= -380) {
      oldDistance4 = oldDistance4 + 760;
    }
    solar.cx.translate(oldDistance4, 0)
    solar.cx.translate(0, 175)
    solar.cx.rotate(oldDistance4 / 25);
    solar.cx.drawImage(marble4, 0 - marble4.width / 2, 0 - marble4.height / 2);
    solar.cx.restore();
  }

  solar.cx.restore();
}

// turn on animation: cause animate function to be called every 20ms
solar.go = function() {
  if (!running) {
    intervalID = setInterval(solar.animate, 20);
    running = true;
  }
}
  
solar.stop = function() {
  clearInterval(intervalID);
  running = false;
}

solar.step = function() {
  $('#messageWindow').prepend("...step " + step + "<br>");
  solar.animate();
}

solar.addMarbles = function () {
  marbles = marbles + 1;
}
  
solar.loadImages = function() {
  marble1 = new Image();     marble1.src = "marble1.png";
  marble2 = new Image();     marble2.src = "marble2.png";
  marble3 = new Image();     marble3.src = "marble3.png";
  marble4 = new Image();     marble4.src = "marble4.png";
  backgroundImg = new Image();  backgroundImg.src = "background.jpg";
}

