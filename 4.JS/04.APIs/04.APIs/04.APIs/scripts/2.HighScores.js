var content = document.getElementById('content');

function execute() {
	startTime = new Date().getTime();
	content.appendChild(createTrash());
}

function createTrash() {
	var TRASH_ITEMS = 5;
	var fragment = document.createDocumentFragment();
	var bin = document.getElementById('bin');

	for (var i = 0; i < TRASH_ITEMS; i++) {
		var trash = document.createElement('img');
		trash.style.left = generateRandomNum(100, 650) + 'px';
		trash.style.top = generateRandomNum(50, 400) + 'px';
		trash.style.width = generateRandomNum(30, 120) + 'px';
		trash.style.position = 'absolute';
		trash.src = 'images/trash.jpg';
		trash.draggable = 'true';
		trash.addEventListener('dragstart', function () { drag(event) }, false);
		trash.id = 'trash' + i;

		fragment.appendChild(trash);
	}

	return fragment;
}

function allowDrop(ev) {
	bin.src = 'images/RecycleBin_full.png';
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData('dragged-id', ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	bin.src = 'images/RecycleBin_empty.png';
	var data = ev.dataTransfer.getData('dragged-id');
	var elementToRemove = document.getElementById(data);
	elementToRemove.parentNode.removeChild(elementToRemove);
	var trushItems = content.childNodes;

	if (trushItems.length === 1) {
		var endTime = new Date().getTime();
		saveScore(endTime);
	}
}

function displayScore() {
	var storageArray = [];
	var fieldset = document.getElementById('scores');

	for (var i = 0; i < localStorage.length; i++) {
		storageArray[i] = parseFloat(localStorage.key(i));
	}

	storageArray.sort(function (a, b) { return a - b });
	var innerHtml = '';

	for (var j = 0; j < 5; j++) {
		var key = storageArray[j];
		var value = localStorage.getItem(key);
		if (value != null && key != undefined) {
			innerHtml = innerHtml + (j + 1) + '. ' + value + ' - ' + key + 's <br/>';
		}
	}

	innerHtml = '<legend>High scores:</legend>' + innerHtml;
	fieldset.innerHTML = innerHtml;
}

function saveScore(endTime) {
	var key = parseFloat((endTime - startTime) / 1000);
	var fifthKey = parseFloat(window.localStorage.key(localStorage.length - 1));

	if (localStorage.length < 5 || key < fifthKey) {
		var value = prompt('Enter your nickname:');
		localStorage.setItem(key, value);
	}

	displayScore();
}

function clearStorage() {
	localStorage.clear();
}

function generateRandomNum(min, max) {
	return Math.floor((Math.random() * (max - min)) + min);
}