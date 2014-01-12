'use strict';

var divContent = document.getElementById('content');
var windowWidth = divContent.offsetWidth;
var windowHeight = divContent.offsetHeight;
// divToRotate contents collection of all five divs that will rotate. Their class is 'divToRotate'.
var divToRotate = document.getElementsByClassName('divToRotate');
var numOfElements = divToRotate.length;
var elementWidth = divToRotate[0].offsetWidth;
var centerLeft = windowWidth / 2 - elementWidth / 2;
var centerTop = windowHeight / 2 - elementWidth / 2;

positionOnCircle(divToRotate, 200);

function rotate(element, radius, startAngle) {
    var x, y, left, top;

    x = Math.cos(startAngle);
    y = Math.sin(startAngle);
    left = x * radius;
    top = y * radius;
    element.style.left = centerLeft + left + 'px';
    element.style.top = centerTop + top + 'px';
    // The step of the rotation is 1 degree = 2 * Math.PI / 360 = Math.PI / 180.
    startAngle = startAngle + Math.PI / 180;

    // The setTumeout loops the whole function at given interval in miliseconds.
    // Timeount = 100 / 360 means that the function should be executed 360 times per 100 ms,
    // which means that a full turn lasts 100 ms, because the step of rotation is 1 degree,
    // although it seems to me much slower, I don't know why?!
    setTimeout(function () { rotate(element, radius, startAngle); }, 100 / 360);
}

function positionOnCircle(elementsCollection, radius) {
    var x, y, j, left, top, element = 0;
    var numOfElements = elementsCollection.length;

    for (j = 0; j < 2 * Math.PI; j = j + 2 * Math.PI / numOfElements) {
        x = Math.cos(j);
        y = Math.sin(j);
        left = x * radius;
        top = y * radius;
        elementsCollection[element].style.left = elementsCollection[element].offsetLeft + left + 'px';
        elementsCollection[element].style.top = elementsCollection[element].offsetTop + top + 'px';
        element++;
    }
}

// Every of the 5 elements is positioned in one sector (1/5 of the circle = 1/5 * 2 * Math.PI)
function startRotation() {
    for (var sector = 0; sector < numOfElements; sector++) {
        rotate(divToRotate[sector], 200, 2 * sector * Math.PI / numOfElements);
    }
}