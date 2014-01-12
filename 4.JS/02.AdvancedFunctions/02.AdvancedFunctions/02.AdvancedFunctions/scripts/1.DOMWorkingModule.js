var domModule = (function () {
    'use strict';

    function getElement(selector) {
        return document.querySelector(selector);
    }

    function getElements(selector) {
        return document.querySelectorAll(selector);
    }

    function addElement(parentSelector, element, innerHTML) {
        var parent = getElement(parentSelector);
        var newChild = document.createElement(element);

        newChild.innerHTML = innerHTML;
        parent.appendChild(newChild);
    }

    addElement('div', 'p', 'This is the first of two lines added by addElement function');
    addElement('div', 'p', 'Added by addElement function');

    function removeElement(parentSelector, childSelector, numberOfElement) {
        var parent;
        var elementsToRemoveFrom = getElements(parentSelector + " " + childSelector);

        parent = elementsToRemoveFrom[numberOfElement - 1].parentNode;
        parent.removeChild(elementsToRemoveFrom[numberOfElement - 1]);
    }

    removeElement('div', 'p', 2);
    addElement('div', 'p', 'The second line was removed by removeElement() and added again');

    function attachEventHandler(selector, eventType, handler) {
        var element = getElement(selector);
        if (element.addEventListener) {
            element.addEventListener(eventType, handler, false);
        } else {
            element.attachEvent("on" + eventType, handler);
        }
    }

    addElement('div', 'button', 'click me');
    attachEventHandler('button', 'click', function () { alert('Called by attachEventHandler'); });

    // no demo for this function so please follow the comments
    function addElementsThroughBuffer(parentSelector, element, innerHTML) {

        // maximum size of a document fragment
        var MAX_FRAGMENT_SIZE = 100;
        var fragmentsBuffer = {};

        // if there isn't a fragment for this selector - create new fragment
        if (!fragmentsBuffer[parentSelector]) {
            fragmentsBuffer[parentSelector] = document.createDocumentFragment();
        }
        // create the element to add
        var newChild = document.createElement(element);

        // add content in the new element
        newChild.innerHTML = innerHTML;

        // add the new element to the document fragment buffer
        fragmentsBuffer[parentSelector].appendChild(newChild);

        // if the buffer reaches its maximum size
        if (fragmentsBuffer[parentSelector].childNodes.length === MAX_FRAGMENT_SIZE) {
            var parent = getElement(parentSelector);
            // append document fragment to the DOM tree
            parent.appendChild(fragmentsBuffer[parentSelector]);
            // empty the document fragment
            fragmentsBuffer[parentSelector] = null;
        }
    }

    return {
        addElement: addElement,
        getElement: getElement,
        getElements: getElements,
        removeElement: removeElement,
        attachEventHandler: attachEventHandler,
        addElementsThroughBuffer: addElementsThroughBuffer
    };
})();