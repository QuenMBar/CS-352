/*
 * marbleMania -- marbleMania simulates marbles and their motions though tilt
 * Created for CS352, Calvin College Computer Science
 *
 * Author: Quentin Barnes
 */

var marbleMania = { }
var backgroundImg;
var intervalID, time=0, step=5, tilt=0, prevTilt=0, speedUpRate=0;
var marble1, oldSpeed1=0, oldDistance1=0;
var marble2, oldSpeed2=0, oldDistance2=0;
var marble3, oldSpeed3=0, oldDistance3=0;
var marble4, oldSpeed4=0, oldDistance4=0;
var marbles = 1;
var running=false;

$(document).ready(function () { marbleMania.init(); });

marbleMania.init = function () {
  marbleMania.canvas  = $('#canvas1')[0];
  marbleMania.cx = marbleMania.canvas.getContext('2d');
  marbleMania.cx.fillStyle = 'rgb(255,0,0)';

  marbleMania.cx.setTransform(1,0,0,1,360,270);	// world frame is (-1,-1) to (1,1)

  // bind functions to events, button clicks
  $('#gobutton').bind('click', marbleMania.go);
  $('#stopbutton').bind('click', marbleMania.stop);
  $('#stepbutton').bind('click', marbleMania.step);
  $('#addbutton').bind('click', marbleMania.addMarbles);

  marbleMania.loadImages();
  backgroundImg.onload = function() { marbleMania.animate(); }
  marble1.onload = function() { marbleMania.animate(); }
}

marbleMania.animate = function() {

  $('#pointcount').text($('#slider1').val());   // Reads value of slider 1 in real time

  $('#pointcount2').text($('#slider2').val());    // Reads value of slider 2 in real time
  speedUpRate=$('#slider2').val()*.001;   // Calculates acceleration based on tilt of screen

  // update time according to how much time has elapsed
  step = parseInt($('#slider1').val());
  time += step;
  $('#timecount').text(time);

  marbleMania.cx.clearRect(-720, -520, 1440, 1040);

  marbleMania.cx.rotate(-prevTilt);
  marbleMania.cx.rotate($('#slider2').val()/50);    // Tilts the screen based on slider 2
  prevTilt = $('#slider2').val()/50;

  marbleMania.cx.save();
  marbleMania.cx.drawImage(backgroundImg, -360, -270, 720, 540);    // Background image

  // marble 1
  marbleMania.cx.save();
  if (((oldSpeed1 >= -25) && (speedUpRate <= 0)) || ((oldSpeed1 <= 25) && (speedUpRate >= 0))) {
    oldSpeed1 = oldSpeed1 + speedUpRate;  //If its not at terminal velocity, increase/decrease speed
  }
  oldDistance1 = oldDistance1 + (oldSpeed1 * (step/5));  //  Calculate position of the ball based on speed and time
  if (oldDistance1 >= 380) {  // If ball is off the screen, loop to the other side
    oldDistance1 = oldDistance1 - 760;
  } else if (oldDistance1 <= -380) {
    oldDistance1 = oldDistance1 + 760;
  }
  marbleMania.cx.translate(oldDistance1,0)  // Translate distance
  marbleMania.cx.translate(0, 175)  // Translate to the correct y
  marbleMania.cx.rotate(oldDistance1/25);  // Rotate based on dist traveled
  marbleMania.cx.drawImage(marble1, 0 - marble1.width/2, 0 - marble1.height/2);
  marbleMania.cx.restore();

  // marble 2  Same as marble 1
  if (marbles >= 2) {
    marbleMania.cx.save();
    if (((oldSpeed2 >= -25) && (speedUpRate <= 0)) || ((oldSpeed2 <= 25) && (speedUpRate >= 0))) {
      oldSpeed2 = oldSpeed2 + speedUpRate;
    }
    oldDistance2 = oldDistance2 + (oldSpeed2 * (step / 5));
    if (oldDistance2 >= 380) {
      oldDistance2 = oldDistance2 - 760;
    } else if (oldDistance2 <= -380) {
      oldDistance2 = oldDistance2 + 760;
    }
    marbleMania.cx.translate(oldDistance2, 0)
    marbleMania.cx.translate(0, 171.5)
    marbleMania.cx.rotate(oldDistance2 / 25);
    marbleMania.cx.drawImage(marble2, 0 - marble2.width / 2, 0 - marble2.height / 2);
    marbleMania.cx.restore();
  }

  // marble 3  Higher max speed, lower acceleration
  if (marbles >= 3) {
    marbleMania.cx.save();
    if (((oldSpeed3 >= -28) && (speedUpRate <= 0)) || ((oldSpeed3 <= 28) && (speedUpRate >= 0))) {
      oldSpeed3 = oldSpeed3 + (speedUpRate - (speedUpRate * .1));
    }
    oldDistance3 = oldDistance3 + (oldSpeed3 * (step / 5));
    if (oldDistance3 >= 380) {
      oldDistance3 = oldDistance3 - 760;
    } else if (oldDistance3 <= -380) {
      oldDistance3 = oldDistance3 + 760;
    }
    marbleMania.cx.translate(oldDistance3, 0)
    marbleMania.cx.translate(0, 168)
    marbleMania.cx.rotate(oldDistance3 / 25);
    marbleMania.cx.drawImage(marble3, 0 - marble3.width / 2, 0 - marble3.height / 2);
    marbleMania.cx.restore();
  }

  // marble 4  Lower max speed, higher acceleration
  if (marbles >= 4) {
    marbleMania.cx.save();
    if (((oldSpeed4 >= -22) && (speedUpRate <= 0)) || ((oldSpeed4 <= 22) && (speedUpRate >= 0))) {
      oldSpeed4 = oldSpeed4 + (speedUpRate + (speedUpRate * .1));
    }
    oldDistance4 = oldDistance4 + (oldSpeed4 * (step / 5));
    if (oldDistance4 >= 380) {
      oldDistance4 = oldDistance4 - 760;
    } else if (oldDistance4 <= -380) {
      oldDistance4 = oldDistance4 + 760;
    }
    marbleMania.cx.translate(oldDistance4, 0)
    marbleMania.cx.translate(0, 177)
    marbleMania.cx.rotate(oldDistance4 / 25);
    marbleMania.cx.drawImage(marble4, 0 - marble4.width / 2, 0 - marble4.height / 2);
    marbleMania.cx.restore();
  }

  marbleMania.cx.restore();
}

// turn on animation: cause animate function to be called every 20ms
marbleMania.go = function() {
  if (!running) {
    intervalID = setInterval(marbleMania.animate, 20);
    running = true;
  }
}
  
marbleMania.stop = function() {
  clearInterval(intervalID);
  running = false;
}

marbleMania.step = function() {
  $('#messageWindow').prepend("...step " + step + "<br>");
  marbleMania.animate();
}

marbleMania.addMarbles = function () {
  marbles = marbles + 1;
}
  
marbleMania.loadImages = function() {
  marble1 = new Image();     marble1.src = "marble1.png";
  marble2 = new Image();     marble2.src = "marble2.png";
  marble3 = new Image();     marble3.src = "marble3.png";
  marble4 = new Image();     marble4.src = "marble4.png";
  backgroundImg = new Image();  backgroundImg.src = "background.jpg";
}

