function drawEllipse(centerX, centerY, width, height, fillColor, strokeColor) {

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    context.beginPath();

    context.moveTo(centerX, centerY - height / 2); 

    context.bezierCurveTo(
      centerX + width / 2, centerY - height / 2,
      centerX + width / 2, centerY + height / 2,
      centerX, centerY + height / 2); 

    context.bezierCurveTo(
      centerX - width / 2, centerY + height / 2,
      centerX - width / 2, centerY - height / 2, 
      centerX, centerY - height / 2); 

    context.fillStyle = fillColor;
    context.fill();
    context.strokeStyle = strokeColor;
    context.stroke();
    context.closePath();
}
function drawRect(x, y, width, height) {
    
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    context.beginPath();
    context.fillStyle = "#396693";
    context.strokeStyle = "#252423";
    context.stroke();
    context.fillRect(x, y, width, height);
    context.closePath();
}