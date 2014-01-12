var controls = (function () {

    function hidePrev(item) {
        var prev = item.previousElementSibling;

        while (prev) {
            var subtable = prev.querySelector('table');
            if (subtable) {
                subtable.style.display = 'none';
            }

            prev = prev.previousElementSibling;
        }
    }

    function hideNext(item) {
        var next = item.nextElementSibling;
        while (next) {
            var subtable = next.querySelector('table');
            if (subtable) {
                subtable.style.display = 'none';
            }

            next = next.nextElementSibling;
        }
    }

    function Gridview(selector) {
        var items = [];
        var tableRow = document.querySelector(selector);

        tableRow.addEventListener('click',
        function (ev) {
            if (!ev) {
                ev = window.event;
            }
            ev.stopPropagation();
            ev.preventDefault();

            var clickedItem = ev.target;
            if (clickedItem.tagName !== 'TD') {
                return;
            }

            hidePrev(clickedItem.parentNode);
            hideNext(clickedItem.parentNode);

            var subtable = clickedItem.parentNode.lastElementChild;
            if (!subtable || subtable.tagName === 'TD') {
                return;
            }

            if (subtable.style.display === 'none') {
                subtable.style.display = '';
                
            } else {
                subtable.style.display = 'none';
            }
        }, false);

        var table = document.createElement('table');

        this.addRow = function (title) {
            var newItem = new Item(title);
            items.push(newItem);

            return newItem;
        };

        this.addHeader = function (title) {
            var newItem = new Item(title);
            items.push(newItem);
            newItem.tagName = 'th';

            return newItem;
        };

        this.render = function () {
            while (tableRow.firstChild) {
                tableRow.removeChild(tableRow.firstChild);
            }

            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }

            for (var i = 0, len = items.length; i < len; i += 1) {
                var domItem = items[i].render();
                table.appendChild(domItem);
            }

            tableRow.appendChild(table);

            return this;
        };

        this.serialize = function () {
            var serializedItems = [];
            for (var i = 0; i < items.length; i += 1) {
                serializedItems.push(items[i].serialize());
            }

            return serializedItems;
        };
    }

    function Item(title) {
        var items = [];
        this.addRow = function (title) {
            var newItem = new Item(title);
            items.push(newItem);
            return newItem;
        };

        this.addHeader = function (title) {
            var newItem = new Item(title);
            items.push(newItem);
            newItem.tagName = 'th';

            return newItem;
        };

        this.render = function () {
            var itemNode = document.createElement('tr');
            var rowContent = '';

            for (var i = 0, titleLen = title.length; i < titleLen; i += 1) {
                rowContent = rowContent + '<td>' + title[i].toString().escape() + '</td>';
            } 

            itemNode.innerHTML = rowContent;

            if (items.length > 0) {
                var subtable = document.createElement('table');
                subtable.style.display = 'none';

                for (var j = 0, itemsLen = items.length; j < itemsLen; j += 1) {
                    var subitem = items[j].render();
                    subtable.appendChild(subitem);
                }

                itemNode.appendChild(subtable);
            }

            return itemNode;
        };

        this.serialize = function () {
            var thisItem = {
                title: title
            };
            if (items.length > 0) {
                var serializedItems = [];
                for (var i = 0; i < items.length; i += 1) {
                    var serItem = items[i].serialize();
                    serializedItems.push(serItem);
                }
                thisItem.items = serializedItems;
            }

            return thisItem;
        };
    }

    return {
        getGridview: function (selector) {
            return new Gridview(selector);
        },
    };
}());

String.prototype.escape = function () {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function (tag) {
        return tagsToReplace[tag] || tag;
    });
};