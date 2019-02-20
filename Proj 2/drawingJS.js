/*
 * gasket v2: draw a Sierpinski gasket by drawing lots of dots,
 * where each is the average of the previous and a random vertex
 * For CS352, Calvin College Computer Science
 *
 * Harry Plantinga -- January 2011
 */


var gasket = {
    radius:	0.005,				// dot radius
}
var vertex = new Array();

$(document).ready(function () { gasket.init(); });

gasket.init = function () {
    gasket.canvas  = $('#canvas1')[0];
    gasket.cx = gasket.canvas.getContext('2d');	// get the drawing canvas

    //text but i couldnt get it to work properly
    gasket.cx.fillStyle = 'rgba(0,0,0,1)';
    gasket.cx.font = '12px serif';
    gasket.cx.fillText('Welcome to long man!', 50, 50);

    // By default (0,0) is the upper left and canvas.width, canvas.height
    // is the lower right. We'll add a matrix multiplication to the state
    // to change the coordinate system so that the central part of the canvas
    // (a 300x300 square) is (0,0) to (1,1), with (0,0) in the lower left.
    gasket.cx.setTransform(300,0,0,-300,75,321);

    //loading the image in
    gasket.background = new Image();
    gasket.background.src = 'park.png';
    gasket.background.onload = gasket.drawBase();

    // bind functions to events, button clicks
    $('#drawArmsbutton').bind('click', gasket.drawArms);
    $('#slider1').bind('change', gasket.slider);
    gasket.happy = false;
    gasket.check = function () {
        gasket.happy = !gasket.happy;
        gasket.drawArms();
    }
    $('#armsID').bind('click', gasket.check);
}

gasket.drawBase = function(ev) {
    gasket.erase();

    gasket.cx.drawImage(gasket.background, -.3, -.3, 1.7, 1.7); //draw background

    gasket.cx.fillStyle = 'rgba(255,205,148,1)';
    gasket.cx.beginPath();
    gasket.cx.arc(.5, .75, .1, 0, Math.PI*2, true);  //draw head
    gasket.cx.fill();


    //draws the rest of the body
    gasket.cx.fillStyle = 'rgba(255,51,51,1)';
    gasket.cx.fillRect(.38, .2, .24, .47);
    gasket.cx.beginPath();
    gasket.cx.arc(.4, .64, .04, 0, Math.PI*2, true);
    gasket.cx.moveTo(.6, .64);
    gasket.cx.arc(.6, .64, .04, 0, Math.PI*2, false);
    gasket.cx.fill();

    gasket.cx.lineWidth = .001;
    gasket.cx.strokeStyle = 'rgba(0,0,0,1)';
    gasket.cx.beginPath();
    gasket.cx.arc(.55, .77, .01, 0, Math.PI*2, false);
    gasket.cx.stroke();
    gasket.cx.beginPath();
    gasket.cx.arc(.45, .77, .01, 0, Math.PI*2, true);
    gasket.cx.stroke();

    gasket.cx.fillStyle = 'rgba(0,0,153,1)';
    gasket.cx.beginPath();
    gasket.cx.moveTo(.38, .2);
    gasket.cx.lineTo(.38, -.1);
    gasket.cx.lineTo(.4, -.1);
    gasket.cx.lineTo(.5, .15);
    gasket.cx.lineTo(.6, -.1);
    gasket.cx.lineTo(.62, -.1);
    gasket.cx.lineTo(.62, .2);
    gasket.cx.lineTo(.38, .2);
    gasket.cx.closePath();
    gasket.cx.fill();

}

gasket.drawArms = function(ev) {
    gasket.drawBase();
    if (!gasket.happy) {  //if hes not happy, draws the arm going down
        gasket.cx.fillStyle = 'rgba(255,51,51,1)';
        gasket.cx.beginPath();
        gasket.cx.moveTo(.36, .65);
        gasket.cx.lineTo(.36 - (.05 * $('#slider1').val()), .65 - (.05 * $('#slider1').val()));
        gasket.cx.lineTo(.4 - (.05 * $('#slider1').val()), .61 - (.05 * $('#slider1').val()));
        gasket.cx.lineTo(.4, .61);
        gasket.cx.lineTo(.36, .65);
        gasket.cx.closePath();
        gasket.cx.fill();

        gasket.cx.beginPath();
        gasket.cx.moveTo(.64, .65);
        gasket.cx.lineTo(.64 + (.05 * $('#slider1').val()), .65 - (.05 * $('#slider1').val()));
        gasket.cx.lineTo(.6 + (.05 * $('#slider1').val()), .61 - (.05 * $('#slider1').val()));
        gasket.cx.lineTo(.6, .61);
        gasket.cx.lineTo(.64, .65);
        gasket.cx.closePath();
        gasket.cx.fill();

        gasket.cx.fillStyle = 'rgba(255,205,148,1)';
        gasket.cx.beginPath();
        gasket.cx.arc(.38 - (.05 * $('#slider1').val()), .63 - (.05 * $('#slider1').val()), .04, 0, Math.PI*2, true);
        gasket.cx.arc(.62 + (.05 * $('#slider1').val()), .63 - (.05 * $('#slider1').val()), .04, 0, Math.PI*2, true);
        gasket.cx.fill();

    } else { //Else draws them going up
        gasket.cx.fillStyle = 'rgba(255,51,51,1)';
        gasket.cx.beginPath();
        gasket.cx.moveTo(.42 - (.05 * $('#slider1').val()), .65 + (.05 * $('#slider1').val()));
        gasket.cx.lineTo(.42, .65);
        gasket.cx.lineTo(.38, .61);
        gasket.cx.lineTo(.38 - (.05 * $('#slider1').val()), .61 + (.05 * $('#slider1').val()));
        gasket.cx.lineTo(.42 - (.05 * $('#slider1').val()), .65 + (.05 * $('#slider1').val()));
        gasket.cx.closePath();
        gasket.cx.fill();

        gasket.cx.beginPath();
        gasket.cx.moveTo(.62, .61);
        gasket.cx.lineTo(.62 + (.05 * $('#slider1').val()), .61 + (.05 * $('#slider1').val()));
        gasket.cx.lineTo(.58 + (.05 * $('#slider1').val()), .65 + (.05 * $('#slider1').val()));
        gasket.cx.lineTo(.58, .65);
        gasket.cx.lineTo(.62, .61);
        gasket.cx.closePath();
        gasket.cx.fill();

        gasket.cx.fillStyle = 'rgba(255,205,148,1)';
        gasket.cx.beginPath();
        gasket.cx.arc(.4 - (.05 * $('#slider1').val()), .63 + (.05 * $('#slider1').val()), .04, 0, Math.PI*2, true);
        gasket.cx.arc(.6 + (.05 * $('#slider1').val()), .63 + (.05 * $('#slider1').val()), .04, 0, Math.PI*2, true);
        gasket.cx.fill();

    }
}

// draw a filled circle
gasket.circle = function(x, y, radius) {
    gasket.cx.beginPath();
    gasket.cx.arc(x, y, radius, 0, 2*Math.PI, false);
    gasket.cx.fill();
}

// erase canvas and message box
gasket.erase = function(ev) {
    gasket.cx.clearRect(-1,-1,3,3);
    $('#messages').html("");
}

// update the message below the slider with its setting
gasket.slider = function(ev) {
    $('#pointcount').text($('#slider1').val());
}
