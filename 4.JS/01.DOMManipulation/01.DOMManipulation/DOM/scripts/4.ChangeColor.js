'use strict';

function changeFontColor() {
    var fontColor = document.getElementById('fontColor').value;
    var contentArea = document.getElementById('contentArea');
    contentArea.style.color = fontColor;
}

function changeBackgroundColor() {
    var backgroundColor = document.getElementById('backgroundColor').value;
    var contentArea = document.getElementById('contentArea');
    contentArea.style.backgroundColor = backgroundColor;
}