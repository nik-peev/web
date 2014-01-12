
var dom = (function () {

    var buffer = {};
    var bufferSize = 100;

    function createElement(tagName, attributes, innerHTML) {
        var child = document.createElement(tagName);

        for (var attrName in attributes) {
            child.setAttribute(attrName, attributes[attrName]);
        }

        child.innerHTML = innerHTML;
        return child;
    }

    function getElement(selector) {
        return document.querySelector(selector);
    }

    function getElements(selector) {
        return document.querySelectorAll(selector);
    }

    function addElement(parentSelector, tagName, attributes, innerHTML) {
        var parent = getElement(parentSelector);
        var newChild = createElement(tagName, attributes, innerHTML);

        parent.appendChild(newChild);
    }

    function removeElements(parentSelector, childSelector) {
        var elementsToRemove = getElements(parentSelector + " " + childSelector);

        for (var i = 0; i < elementsToRemove.length; i++) {
            elementsToRemove[i].parentNode.removeChild(elementsToRemove[i]);
        }
    }

    function attachEventHandler(selector, eventType, handler) {
        var element = getElement(selector);
        if (element.addEventListener) {
            element.addEventListener(eventType, handler, false);
        } else {
            element.attachEvent("on" + eventType, handler);
        }
    }

    function addElementViaBuffer(parentSelector, tagName, attributes, innerHTML) {
        if (!buffer[parentSelector]) {
            buffer[parentSelector] = document.createDocumentFragment();
        }
        var element = createElement(tagName, attributes, innerHTML);
        buffer[parentSelector].appendChild(element);

        if (buffer[parentSelector].childNodes.length === bufferSize) {
            var parent = getElement(parentSelector);
            parent.appendChild(buffer[parentSelector]);
            buffer[parentSelector] = null;
        }
    }

    return {
        addElement: addElement,
        getElement: getElement,
        getElements: getElements,
        removeElements: removeElements,
        attachEventHandler: attachEventHandler,
        addElementViaBuffer: addElementViaBuffer
    };
})();