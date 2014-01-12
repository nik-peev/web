var wrap = document.getElementById("wrapper"),
	carousel = document.createElement("div"),
	leftArrow = document.createElement("div"),
	rightArrow = document.createElement("div"),
	imageURLs = [],
	currentImageIndex = 0;

imageURLs.push("Images/watchdogs.jpg");
imageURLs.push("Images/jonah.jpg");
imageURLs.push("Images/superman.jpg");

attachEventHandler(leftArrow, 'mouseover', leftArrowHover);
attachEventHandler(leftArrow, 'mouseout', leftArrowHover);
attachEventHandler(leftArrow, 'click', slideLeft);
leftArrow.style.width = "50px";
leftArrow.style.height = "275px";
leftArrow.style.border = "1px solid black";
leftArrow.style.float = "left";
leftArrow.style.backgroundImage = 'url("Images/larrow.png")';
wrap.appendChild(leftArrow);

carousel.style.width = "183px";
carousel.style.height = "275px";
carousel.style.border = "1px solid black";
carousel.style.float = "left";
carousel.style.backgroundImage = "url(" + imageURLs[0] + ")";
wrap.appendChild(carousel);

attachEventHandler(rightArrow, 'mouseover', rightArrowHover);
attachEventHandler(rightArrow, 'mouseout', rightArrowHover);
attachEventHandler(rightArrow, 'click', slideRight);
rightArrow.style.width = "50px";
rightArrow.style.height = "275px";
rightArrow.style.border = "1px solid black";
rightArrow.style.float = "left";
rightArrow.style.backgroundImage = 'url("Images/rarrow.png")';
wrap.appendChild(rightArrow);

function attachEventHandler(element, eventType, eventHandler) {
    if (document.attachEvent) {
        element.attachEvent("on" + eventType, eventHandler);
    } else if (document.addEventListener) {
        element.addEventListener(eventType, eventHandler, false);
    } else {
        element["on" + eventType] = eventHandler;
    }
}

function leftArrowHover(ev) {
	if(ev.type == 'mouseover') {
		this.style.backgroundImage = 'url("Images/larrow1.png")';
	}
	else {
		this.style.backgroundImage = 'url("Images/larrow.png")';
	}
}

function rightArrowHover(ev) {
	if(ev.type == 'mouseover') {
		this.style.backgroundImage = 'url("Images/rarrow1.png")';
	}
	else {
		this.style.backgroundImage = 'url("Images/rarrow.png")';
	}
}

function slideLeft() {
	if(currentImageIndex == 0) {
		currentImageIndex = imageURLs.length - 1;
	}
	else {
		currentImageIndex--;
	}

	refreshCarousel();
}

function slideRight() {
	if(currentImageIndex == imageURLs.length - 1) {
		currentImageIndex = 0;
	}
	else {
		currentImageIndex++;
	}

	refreshCarousel();
}

function refreshCarousel() {
	carousel.style.backgroundImage = "url(" + imageURLs[currentImageIndex] + ")";
}