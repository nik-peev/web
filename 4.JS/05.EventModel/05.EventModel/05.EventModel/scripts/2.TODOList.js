var input = document.getElementById('input'),
	addButton = document.getElementById('add'),
	showButton = document.getElementById('show'),
	hideButton = document.getElementById('hide'),
	removeButton = document.getElementById('remove'),
	content = document.getElementById('content'),
	list = document.getElementById('list');

addButton.addEventListener('click', addItem);
showButton.addEventListener('click', showList);
hideButton.addEventListener('click', hideList);
removeButton.addEventListener('click', removeItem);

function addItem() {
	if (input.value) {
		var li = document.createElement('li');
		var check = document.createElement('input');
		check.className = 'check';
		check.type = 'checkbox';

		var inputText = input.value;
		list.appendChild(li);
		li.innerHTML = inputText;
		li.appendChild(check);
	} else {
		alert('Nothing to add!');
	}
}

function removeItem() {
	var allCheckBoxes = document.getElementsByClassName('check');
	for (var i = 0; i < allCheckBoxes.length; i++) {
		if (allCheckBoxes[i].checked) {
			allCheckBoxes[i].parentElement.parentElement.removeChild(allCheckBoxes[i].parentElement);
		}
	}
}

function showList() {
	var allCheckBoxes = document.getElementsByClassName('check');
	for (var i = 0; i < allCheckBoxes.length; i++) {
		if (allCheckBoxes[i].checked) {
			allCheckBoxes[i].parentElement.style.display = 'block';
		}
	}
}

function hideList() {
	var allCheckBoxes = document.getElementsByClassName('check');
	for (var i = 0; i < allCheckBoxes.length; i++) {
		if (allCheckBoxes[i].checked) {
			allCheckBoxes[i].parentElement.style.display = 'none';
		}
	}
}