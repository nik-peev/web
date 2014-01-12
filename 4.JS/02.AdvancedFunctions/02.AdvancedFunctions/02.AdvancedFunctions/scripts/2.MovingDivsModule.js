var divText = 1;
var StartLeft = 450;
var StartTop = 220;

function createTrack(width, height, left, top, borderRadius) {
    var contentDiv = document.getElementById('content');
    var element = document.createElement('div');
    element.style.width = width + 'px';
    element.style.height = height + 'px';
    element.style.left = left + 'px';
    element.style.top = top + 'px';
    element.style.border = 2 + 'px' + ' solid' + ' darkgrey';
    element.style.borderRadius = borderRadius + 'px';
    element.style.position = 'absolute';
    element.style.zIndex = -2;
    contentDiv.appendChild(element);
}

function createRandomDiv() {
    'use strict';

    var contentDiv = document.getElementById('content');
    var randomDiv = document.createElement('div');
    randomDiv.className = 'styled';
    randomDiv.innerHTML = '<strong>' + divText + '</strong>';
    divText++;

    randomDiv.style.width = 50 + 'px';
    randomDiv.style.height = randomDiv.style.width;
    randomDiv.style.borderWidth = 3 + 'px';
    randomDiv.style.borderRadius = 10 + 'px';
    randomDiv.style.borderColor = generateRandomColor();

    randomDiv.style.left = StartLeft + 'px';
    randomDiv.style.top = 25 + 'px';
    
    randomDiv.style.fontSize = parseInt(randomDiv.style.width) / 1.5 + 'px';
    randomDiv.style.lineHeight = parseInt(randomDiv.style.width) + 'px';
    randomDiv.style.background = generateRandomColor();
    randomDiv.style.color = generateRandomColor();

    contentDiv.appendChild(randomDiv);

    return randomDiv;
}

function generateRandomNum(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function generateRandomColor() {
    var red = generateRandomNum(0, 255);
    var green = generateRandomNum(0, 255);
    var blue = generateRandomNum(0, 255);
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function rotate(element, radius, startAngle) {
    var x, y, left, top;

    x = Math.cos(startAngle);
    y = Math.sin(startAngle);
    left = x * radius;
    top = y * radius;
    element.style.left = StartLeft + left + 'px';
    element.style.top = StartTop + top + 'px';

    // The step of the rotation is 1 degree = 2 * Math.PI / 360 = Math.PI / 180.
    startAngle = startAngle + Math.PI / 180;

    // The setTumeout loops the whole function at given interval in miliseconds.
    setTimeout(function () { rotate(element, radius, startAngle); }, 1);
}

function rectMovement(element, width, height) {
    var left = parseInt(element.style.left);
    var top = parseInt(element.style.top);

    if (left < StartLeft + width / 2 && top === StartTop - height / 2)
        left = left + 5;
    else if (left === StartLeft + width / 2 && top < StartTop + height / 2)
        top = top + 5;
    else if (top === StartTop + height / 2 && left > StartLeft - width / 2)
        left = left - 5;
    else
        top = top - 5;

    element.style.left = left + 'px';
    element.style.top = top + 'px';

    setTimeout(function () { rectMovement(element, width, height); }, 10);
}

function execute() {
    createTrack(300, 300, 325, 100, 150);
    createTrack(600, 400, 180, 50, 0);
    if (divText & 1 === 1)
        rotate(createRandomDiv(), 150, 0);
    else
        rectMovement(createRandomDiv(), 600, 400);
}
