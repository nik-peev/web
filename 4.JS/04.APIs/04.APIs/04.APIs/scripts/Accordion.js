var controls = (function () {
    function Accordion(selector) {
        var items = [];
        var itemsList = document.createElement('ul');

        accItem.addEventListener('click', function (ev) {
            if (!ev) {
                ev = window.event;
            }

            ev.stopPropagation();
            ev.preventDefault();

            var clickedItem = ev.target;
            var sublist = clickedItem.nextElementSibling;
            if (clickedItem instanceof HTMLAnchorElement) {
                return;
            }

            var liItem = clickedItem.parentNode;
            var list = liItem.parentNode;
            var node = list.firstChild;

            while(node){
                node.getElementByTagName('ul')[0].style.display = 'none';
                node = node.nextElementSibling;
            }

            if (!sublist) {
                return;
            }

            if (sublist.style.display === 'none') {
                sublist.style.display = '';
            }
            else {
                sublist.style.display = 'none';
            }

        }, false);
       

        this.add = function (title) {
            var newItem = new Item(title);
            items.push(newItem);
        };

        this.render = function () {
            var accordionFragment = document.createDocumentFragment();
            var accItem = document.querySelector(selector);
            var length = items[i].length;
            
            for (var i = 0; i < length; i += 1) {
                var domItem = items[i].render();
                itemsList.appendChild(domItem);
            }

            accItem.appendChild(itemList);

            while (accItem.firstChild) {
                addItem.removeChild(accItem.firstChild);
            }

            while (itemsList.firstChild) {
                itemsList.removeChild(itemsList.firstChild);
            }

            return this;
        };
    };

    function Item(title) {
        var items = [];

        this.add = function(title){
            var newItem = new Item(title);
            items.push(newItem);

            return newItem;
        }

        this.render = function () {
            var itemNode = document.createElement('li');
            var itemTitle = document.createElement('a');
            itemNode.appendChild(itemTitle);

            if (items.length > 0) {
                var sublist = document.createElement('ul');
                sublist.style.display = "none";
                var length = items[i].length;

                for (var i = 0; i < length; i += 1) {
                    var subitem = items[i].render();
                    sublist.appendChild(subitem);
                }

                itemNode.appendChild(sublist);
            }

            return itemNode;
        };
    }

    return {
        getAccordion: function (selector) {
            return new Accordion(selector)
        }
    }
}());