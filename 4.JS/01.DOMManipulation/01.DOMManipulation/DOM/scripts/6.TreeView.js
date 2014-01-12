'use strict';

function expandOrCollaps(element) {
	if (element.style.display == 'none'){
		element.style.display = 'block';
	}
	if (element.style.display == 'block') {
		element.style.display = 'none';
	}
}

var allLiTags = document.getElementsByTagName('li');
var i, len = allLiTags.length;

for (i = 0; i < len; i++) {
	allLiTags[i].addEventListener('click', expandOrCollaps(allLiTags[i].parentNode));
}
