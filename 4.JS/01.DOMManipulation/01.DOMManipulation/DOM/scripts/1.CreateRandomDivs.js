function createRandomDivs(number) {
	'use strict';

	var contentDiv = document.getElementById('content');
	var documentFragment = document.createDocumentFragment();
	var numberOfDivs = document.getElementById('numberOfDivs').value | 0;
	var count = 0, randomDiv, top, left;

	while (contentDiv.firstChild) {
		contentDiv.removeChild(contentDiv.firstChild);
	}

	while (count < numberOfDivs) {
		randomDiv = document.createElement('div');
		randomDiv.className = 'styled';
		randomDiv.innerHTML = '<strong>div</strong>';

		randomDiv.style.width = generateRandomNum(20, 100) + 'px';
		randomDiv.style.height = randomDiv.style.width;
		randomDiv.style.borderWidth = generateRandomNum(1, 20) + 'px';
		randomDiv.style.borderRadius = generateRandomNum(0, 40) + 'px';
		randomDiv.style.borderColor = generateRandomColor();

		top = generateRandomNum(0, 390);
		randomDiv.style.top = top + 'px';
		left = generateRandomNum(0, 900);
		randomDiv.style.left = left + 'px';

		randomDiv.style.fontSize = parseInt(randomDiv.style.width) / 2 + 'px';
		randomDiv.style.lineHeight = parseInt(randomDiv.style.width) + 'px';
		randomDiv.style.background = generateRandomColor();
		randomDiv.style.color = generateRandomColor();

		documentFragment.appendChild(randomDiv);

		count++;
	}

	contentDiv.appendChild(documentFragment);
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
