var newItem = document.getElementById('newItem'),
	addButton = document.getElementById('add'),
	showButton = document.getElementById('show'),
	hideButton = document.getElementById('hide'),
	taskList = document.getElementById('tasks');

addButton.addEventListener('click', addItem);
showButton.addEventListener('click', showList);
hideButton.addEventListener('click', hideList);

function addItem() {
    if (newItem.value) {
        var li = document.createElement('li');
        var p = document.createElement('p');
        var remove = document.createElement('button');
        remove.innerHTML = 'X';
        remove.id = 'remove';
        remove.addEventListener('click', removeItem);

        var content = document.createTextNode(newItem.value);

        p.appendChild(content);
        li.appendChild(p);
        li.appendChild(remove);
        taskList.appendChild(li);
    }
}

function removeItem(ev) {
    taskList.removeChild(this.parentNode);
}

function showList() {
    taskList.style.display = 'block';
}

function hideList() {
    taskList.style.display = 'none';
}