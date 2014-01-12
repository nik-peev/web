var domModule = (function () {
	/*
	Create a module for working to work with DOM. The module should have the following functionality
	Add element to parent element by given selector
	Remove element from the DOM  by given selector
	Attach event to given selector by given event type and event hander
	Add elements to buffer, which appends them to the DOM when their for some selector count becomes 100
	The buffer contains elements for each selector it gets
	Get elements by CSS selector
	The module should reveal only the methods
	Create a module for working to work with DOM. The module should have the following functionality*/

	function appendChild(parentSelector, tagName, attributes, innerHTML) {
		var child = document.createElement(tagName);
		for (var attrName in attributes) {
			child.setAttribute(attrName, attributes[attrName]);
		}
		child.innerHTML = innerHTML;

		var parent = document.querySelector(parentSelector)
			parent.appendChild(child);
	}

	function removeChild(parentSelector, childSelector) {
		var elementsToRemove = document.querySelectorAll(parentSelector + " " + childSelector);

		for (var i = 0; i < elementsToRemove.length; i++) {
			elementsToRemove[i].parentNode.removeChild(elementsToRemove[i]);
		}
	}
	function addHandler(selector, eventType, handler) {
		var element = document.querySelector(selector);
		if (element.addEventListener) {
			element.addEventListener(eventType, handler, false);
		} else {
			element.attachEvent("on" + eventType, handler);
		}
	}

	var bufferElements = {};
	var MAX_ELEMENT_SIZE = 20;

	function appendToBuffer(parentSelector, tagName, attributes, innerHTML) {

		if (!bufferElements[parentSelector]) {
			bufferElements[parentSelector] = document.createDocumentFragment();
		}

		var element = document.createElement(tagName);

		for (var attrName in attributes) {
			element.setAttribute(attrName, attributes[attrName]);
		}
		element.innerHTML = innerHTML;

		bufferElements[parentSelector].appendChild(element);

		if (bufferElements[parentSelector].childNodes.length === MAX_ELEMENT_SIZE) {
			var parent = document.querySelector(parentSelector);
			parent.appendChild(bufferElements[parentSelector]);
			bufferElements[parentSelector] = null;
		}
	}

	return {
		appendChild : appendChild,
		removeChild : removeChild,
		addHandler : addHandler,
		appendToBuffer : appendToBuffer
	}
})(); ;