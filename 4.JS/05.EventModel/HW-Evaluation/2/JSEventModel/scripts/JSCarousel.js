var images = ["images/animals/bird.jpg", "images/animals/cat.jpg", "images/animals/dog.jpg",
"images/animals/dogs.jpg", "images/animals/fox.jpg", "images/animals/lion.jpg",
"images/animals/pandas.jpg", "images/animals/polar-bear.jpg", "images/animals/rabbit.jpg",
"images/animals/racoons.jpg"];

var imageContainer = document.getElementById("currentImage");
var leftArrow = document.getElementById("left-arrow");
var rightArrow = document.getElementById("right-arrow");
var currentImageIndex = 0;

attachEventHandler(leftArrow, 'click', movePrevious);
attachEventHandler(rightArrow, 'click', moveNext);

function movePrevious() {
    if (currentImageIndex == 0) {
        currentImageIndex = images.length;
    }
    currentImageIndex--;
    changePicture();
}

function moveNext() {
    if (currentImageIndex == images.length - 1) {
        currentImageIndex = -1
    }
    currentImageIndex++;
    changePicture();
}


function changePicture() {
    imageContainer.setAttribute("src", images[currentImageIndex]);
}

function attachEventHandler(element, eventType, eventHandler) {
    if (document.attachEvent) {
        element.attachEvent("on" + eventType, eventHandler);
    } else if (document.addEventListener) {
        element.addEventListener(eventType, eventHandler, false);
    } else {
        element["on" + eventType] = eventHandler;
    }
}

