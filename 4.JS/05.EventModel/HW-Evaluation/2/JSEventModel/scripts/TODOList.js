var addButton = document.getElementById("add");
var form = document.getElementsByTagName("form")[0];
var deleteButton = document.getElementById("delete");
var hideButton = document.getElementById("hide");
var showButton = document.getElementById("show");

attachEventHandler(addButton, 'click', addItem);
attachEventHandler(deleteButton, 'click', deleteSelectedItems);
attachEventHandler(hideButton, 'click', hideSelectedItems);
attachEventHandler(showButton, 'click', showHiddenItems);

function createDivWithCheckbox(value) {
    var div = document.createElement('div');
    var checkbox = document.createElement('input');
    checkbox.className = "todoCheckbox";
    checkbox.type = "checkbox";
    div.appendChild(checkbox);
    div.innerHTML += value;
    return div;
}

function addItem() {
    var textValue = document.getElementById("item-name").value;
    var checkbox = createDivWithCheckbox(textValue);
    form.appendChild(checkbox);
}

function deleteSelectedItems() {
    var checkboxes = document.querySelectorAll(".todoCheckbox");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            var parent = checkboxes[i].parentNode;
            form.removeChild(parent);
        }
    }
}

function hideSelectedItems() {
    var checkboxes = document.querySelectorAll(".todoCheckbox");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            var parent = checkboxes[i].parentNode;
            parent.style.display = "none";
        }
    }
}

function showHiddenItems() {
    var checkboxes = document.querySelectorAll(".todoCheckbox");
    for (var i = 0; i < checkboxes.length; i++) {
        var parent = checkboxes[i].parentNode;
        if (parent.style.display == "none") {
            parent.style.display = "block";
        }
    }
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

