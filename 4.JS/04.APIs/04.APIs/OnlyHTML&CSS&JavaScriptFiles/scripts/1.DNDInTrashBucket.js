var content = document.getElementById('content');

function execute() {
    var timeNow = new Date().getTime;
    var trashArray = createTrash();
    content.appendChild(trashArray);
}

function createTrash() {
    var TRASH_ITEMS = 8;
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
    ev.target.cursor = 'move';
}

function drop(ev) {
    ev.preventDefault();
    bin.src = 'images/RecycleBin_empty.png';
    var data = ev.dataTransfer.getData('dragged-id');
    var elementToRemove = document.getElementById(data);
    elementToRemove.parentNode.removeChild(elementToRemove);
}

function generateRandomNum(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}