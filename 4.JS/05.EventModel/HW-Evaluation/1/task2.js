var wrap = document.getElementById("wrapper"),
	input = document.createElement("input"),
	addBtn = document.createElement("button"),
	deleteBtn = document.createElement("button"),
	hideBtn = document.createElement("button"),
	showAllBtn = document.createElement("button"),
	toDoList = document.createElement("ol");

wrap.appendChild(input);

attachEventHandler(addBtn, 'click', addItem);
addBtn.innerHTML = "Add";
wrap.appendChild(addBtn);

attachEventHandler(deleteBtn, 'click', removeItem);
deleteBtn.innerHTML = "Delete";
wrap.appendChild(deleteBtn);

attachEventHandler(hideBtn, 'click', hideItem);
hideBtn.innerHTML = "Hide";
wrap.appendChild(hideBtn);

attachEventHandler(showAllBtn, 'click', showAllItems);
showAllBtn.innerHTML = "Show All";
wrap.appendChild(showAllBtn);

wrap.appendChild(toDoList);

function attachEventHandler(element, eventType, eventHandler) {
    if (document.attachEvent) {
        element.attachEvent("on" + eventType, eventHandler);
    } else if (document.addEventListener) {
        element.addEventListener(eventType, eventHandler, false);
    } else {
        element["on" + eventType] = eventHandler;
    }
}

function addItem() {
	if(input.value != "") {
		var listItem = document.createElement("li"),
			radioInput = document.createElement("input");
		
		listItem.innerHTML = input.value;

		radioInput.setAttribute('type', 'radio');
		radioInput.setAttribute('name', 'todoListItem');
		listItem.appendChild(radioInput);
		toDoList.appendChild(listItem);

		input.value = "";
	}
}

function removeItem() {
	var radios = document.querySelectorAll('input[type="radio"]');

	for(var i = 0; i < radios.length; i++) {
		if(radios[i].checked) {
			var parent = radios[i].parentNode;		//parent is the li element
			parent.parentNode.removeChild(parent);
		}
	}
}

function hideItem() {
	var radios = document.querySelectorAll('input[type="radio"]');

	for(var i = 0; i < radios.length; i++) {
		if(radios[i].checked) {
			var parent = radios[i].parentNode;		//parent is the li element
			parent.style.display = "none";
		}
	}
}

function showAllItems() {
	var listItems = toDoList.children;

	for(var i = 0; i < listItems.length; i++) {
		listItems[i].style.display = "list-item";
	}
}