'use strict';

if (!document.querySelectorAll) {
    document.querySelectorAll = function (selector) {
        if (selector[0] === '#') {
            return document.getElementById(selector.substr(1));
        }
        else if (selector[0] === '.') {
            return document.getElementsByClassName(selector.substr(1));
        }
        else {
            return document.getElementsByTagName(selector);
        }
    }
}

if (!document.querySelector) {
    document.querySelector = function (selector) {
        return document.getElementById(selector.substr(1));
    }
}

function selectAndChange() {
    var divToRotate = document.querySelectorAll('.divToRotate');

    for (var i = 0; i < divToRotate.length; i++) {
        divToRotate[i].style.backgroundColor = 'green';
        divToRotate[i].style.color = 'yellow';
        divToRotate[i].style.left = 475 - 50 * i + 'px';
    }

    var contentDiv = document.querySelector("#content");
    contentDiv.style.backgroundColor = 'orange';
}