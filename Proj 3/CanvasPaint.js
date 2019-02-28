/*
 * CanvasPaint 352 -- starter code for a paint program using the 
 * HTML5 canvas element--for CS352, Calvin College Computer Science
 *
 * Harry Plantinga -- January 2011
 * 
 * changes (January 2017):
 *   use <input type="file"> for loading a file 
 *   add paintbrush size indicator
 */

$(document).ready(function () { 
  cpaint.init(); 
});

var cpaint = {
  drawing: 		false,
  tool:			'marker',
  lineThickness: 	12,
  color:		'#333399',
}

cpaint.init = function () {  
  cpaint.canvas  = $('#canvas1')[0];
  cpaint.cx = cpaint.canvas.getContext('2d');
  cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);
  					// create offscreen copy of canvas in an image
  cpaint.dotCanvas = $('#dotCanvas')[0];	// canvas for paintbrush size indicator
  cpaint.dcx = cpaint.dotCanvas.getContext('2d');

  // draw initial dot in paintbrush size indicator
  cpaint.dcx.fillStyle = "#666";
  cpaint.dcx.beginPath();
  cpaint.dcx.arc(21,14,$('#widthSlider').val()/2,0,Math.PI*2,true);
  cpaint.dcx.closePath();
  cpaint.dcx.fill();

 // bind functions to events, button clicks
  $(cpaint.canvas).bind('mousedown', cpaint.drawStart);
  $(cpaint.canvas).bind('mousemove', cpaint.draw);
  $('*').bind('mouseup', cpaint.drawEnd);
  $('#color1').bind('change', cpaint.colorChange);
  $('#widthSlider').bind('change', cpaint.widthChange);
  $('#color1').colorPicker();			// initialize color picker
  $('#mainmenu').clickMenu();			// initialize menu
//  $('#file1').bind('change', cpaint.loadImage);
  $('#file1').bind('change', alert('got #file1 change event'));
  

  // bind menu options
  $('#menuClear').bind('click', cpaint.clear);
  $('#menuNew').bind('click', cpaint.clear);
  $('#menuFade').bind('click', cpaint.fade);
  $('#menuUnfade').bind('click', cpaint.unfade);
  $('#menuOpen').bind('click',cpaint.open);
  $('#menuSave').bind('click',cpaint.save);
  $('#toolBar').toggle();		// when toolbar is initialized, make it visible
}

/*
 * handle mousedown events
 */
cpaint.drawStart = function(ev) {
  var x, y; 				// convert event coords to (0,0) at top left of canvas
  x = ev.pageX - $(cpaint.canvas).offset().left;
  y = ev.pageY - $(cpaint.canvas).offset().top;
  ev.preventDefault();

  cpaint.drawing = true;			// go into drawing mode
  cpaint.cx.lineWidth = cpaint.lineThickness;
  cpaint.cx.strokeStyle = cpaint.color;
  cpaint.cx.fillStyle = cpaint.color;
  cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);

  // save drawing window contents
  cpaint.cx.beginPath();			// draw initial point
  cpaint.cx.arc(x, y, cpaint.lineThickness/2, 0, Math.PI*2, true);
  cpaint.cx.fill();

  cpaint.oldX = x;
  cpaint.oldY = y;
}

/*
 * handle mouseup events
 */
cpaint.drawEnd = function(ev) {
  var x, y;
  x = ev.pageX - $(cpaint.canvas).offset().left;
  y = ev.pageY - $(cpaint.canvas).offset().top;
  cpaint.drawing = false;
  cpaint.cx.beginPath();			// draw initial point
  cpaint.cx.arc(x, y, cpaint.lineThickness/2, 0, Math.PI*2, true);
  cpaint.cx.fill();
}

/*
 * handle mousemove events
 */
cpaint.draw = function(ev) {
  var x, y;
  x = ev.pageX - $(cpaint.canvas).offset().left;
  y = ev.pageY - $(cpaint.canvas).offset().top;
  cpaint.cx.lineCap = 'round';
  cpaint.cx.lineWidth = cpaint.lineThickness;

  if (cpaint.drawing) {
    cpaint.cx.beginPath();			// draw initial stroke
    cpaint.cx.moveTo(cpaint.oldX, cpaint.oldY);
    cpaint.cx.lineTo(x,y);
    cpaint.cx.stroke();
    cpaint.oldX = x;
    cpaint.oldY = y;
  }
} 

/*
 * clear the canvas, offscreen buffer, and message box
 */
cpaint.clear = function(ev) {
  cpaint.cx.clearRect(0, 0, cpaint.canvas.width, cpaint.canvas.height);
  cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);
  $('#messages').html("");
}  


/*
 * color picker widget handler
 */
cpaint.colorChange = function(ev) {
  $('#messages').prepend("Color: " + $('#color1').val() + "<br>");
  cpaint.color = $('#color1').val();
}

/*
 * paintbrush size slider handler: draw a dot to show size of paintbrush size
 */
cpaint.widthChange = function(ev) {
  cpaint.lineThickness = $('#widthSlider').val();

  // erase dotCanvas, then draw dot of appropriate size
  cpaint.dcx.clearRect(0, 0, cpaint.dotCanvas.width, cpaint.dotCanvas.height);
  cpaint.dcx.beginPath();
  cpaint.dcx.arc(21,14,$('#widthSlider').val()/2,0,Math.PI*2,true);
  cpaint.dcx.closePath();
  cpaint.dcx.fill();
}

/*
 * handle open menu item by making open dialog visible
 */
cpaint.open = function(ev) { 
  $('#fileInput').toggle();
  $('#closeBox1').bind('click',cpaint.closeDialog);
  $('#messages').prepend("In open<br>");	
}

/*
 * get file from user via file input; load it into canvas
 */
cpaint.loadImage = function() {
  file1 = $('#file1');
  if (file1.files && file1.files[0]) {
    $('#messages').prepend("Loading image " + file1.files[0].name + "<br>");
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#preview').attr('src', e.target.result);
      img = document.getElementById("preview");
      cpaint.cx.clearRect(0, 0, cpaint.canvas.width, cpaint.canvas.height);
      cpaint.cx.drawImage(img,0, 0, cpaint.canvas.width, cpaint.canvas.height);
      cpaint.closeDialog();
    }

    reader.readAsDataURL(file1.files[0]);
  }
}

/*
 * upon a click on the close box, hide the file open dialog
 */
cpaint.closeDialog = function() {
  $('#fileInput').toggle();
}

/*
 * to save a drawing, copy it into an image element
 * which can be right-clicked and save-ased
 */
cpaint.save = function(ev) {
  $('#messages').prepend("Saving...<br>");	
  var dataURL = cpaint.canvas.toDataURL();
  if (dataURL) {
    $('#saveWindow').show();
    $('#saveImg').attr('src',dataURL);
    $('#closeBox2').bind('click',cpaint.closeSaveWindow);
  } else {
    alert("Your browser doesn't implement the toDataURL() method needed to save images.");
  }
}

cpaint.closeSaveWindow = function() {
  $('#saveWindow').hide();
}

/*
 * Fade/unfade an image by altering Alpha of each pixel
 */
cpaint.fade = function(ev) {
  $('#messages').prepend("Fade<br>");	
  cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);
  var pix = cpaint.imgData.data;
  for (var i=0; i<pix.length; i += 4) {
    pix[i+3] /= 2;		// reduce alpha of each pixel
  }
  cpaint.cx.putImageData(cpaint.imgData, 0, 0);
}

cpaint.unfade = function(ev) {
  $('#messages').prepend("Unfade<br>");	
  cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);
  var pix = cpaint.imgData.data;
  for (var i=0; i<pix.length; i += 4) {
    pix[i+3] *= 2;		// increase alpha of each pixel
  }
  cpaint.cx.putImageData(cpaint.imgData, 0, 0);
}

