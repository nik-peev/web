var controls = (function () {

    var log = console.log;

    var Header = function (params) {
        var cells = [];
        var length = params.length;

        this.headerItems = cells;

        for (var i = 0; i < length; i++) {
            cells[i] = params[i];
        }

        this.render = function renderHeader() {
            var renderedHeader = document.createElement("tr");
            var cellsLength = cells.length;

            for (var i = 0; i < cellsLength; i++) {
                var cellElement = document.createElement("th");
                cellElement.innerHTML = cells[i];
                renderedHeader.appendChild(cellElement);
            }

            return renderedHeader;
        }
    }

    var Row = function (params) {
        var cells = [];
        var nestedGridView = null;
        var paramsLength = params.length;

        for (var i = 0; i < paramsLength; i++) {
            if (!(params[i] instanceof Array)) {
                cells[i] = params[i];
            }
            else {
                nestedGridView = getGridView();
                nestedGridView.addHeader(params[i][0]);
                for (var j = 1; j < params[i].length; j++) {
                    nestedGridView.addRow(params[i][j]);
                }
            }

        }

        this.render = function renderRow() {
            var renderedRow = document.createElement("tr");
            var cellsLength = cells.length;

            for (var i = 0; i < cellsLength; i++) {
                var cellElement = document.createElement("td");
                cellElement.innerHTML = cells[i];
                renderedRow.appendChild(cellElement);
            }

            if (nestedGridView !== null) {
                var gridCell = document.createElement("td");
                gridCell.appendChild(nestedGridView.render());
                renderedRow.appendChild(gridCell);
            }

            return renderedRow;
        }

        this.getNestedGridView = function getNestedGridView() {
            nestedGridView = new GridView();
            return nestedGridView;
        }

        this.serialize = function (header) {
            var thisItem = [];

            for (var i = 0; i < header.length; i++) {
                var objName = header[i];
                var objValue = cells[i];
                var subItem = {};

                subItem[objName] = objValue;
                thisItem.push(subItem);
            }

            if (nestedGridView !== null) {
                thisItem.push(nestedGridView.getGridViewData());
            }

            return thisItem;
        }
    }

    var GridView = function (selector) {
        var gridViewElement;
        var rows = [];
        var header;

        if (selector) {
            gridViewElement = document.querySelector(selector)
        }
        else {
            gridViewElement = document.createDocumentFragment();
        }

        this.addHeader = function addNewHeader() {
            header = new Header(arguments);
        }

        this.addRow = function addNewRow() {
            var newRow = new Row(arguments);
            rows.push(newRow);
            return newRow;
        }

        this.render = function renderGrid() {
            while (gridViewElement.firstChild) {
                gridViewElement.removeChild(gridViewElement.firstChild);
            }

            var gridViewTable = document.createElement("table");
            var rowsLength = rows.length;

            if (header) {
                gridViewTable.appendChild(header.render());
            }
            
            for (var i = 0; i < rowsLength; i++) {
                gridViewTable.appendChild(rows[i].render());
            }

            gridViewElement.appendChild(gridViewTable);

            return gridViewElement;
        }

        gridViewElement.addEventListener('click', function onClick(event) {
            if (!event) {
                event = window.event;
            }

            event.stopPropagation;
            event.preventDefault;

            var clickedItem = event.target;
            var parent = clickedItem.parentNode;

            if (!(parent instanceof HTMLTableRowElement)) {
                return;
            }

            for (var i = 0; i < parent.children.length; i++) {
                if (parent.children[i].firstChild instanceof HTMLTableElement) {
                    if (parent.children[i].style.display === "none") {
                        parent.children[i].style.display = "";
                    }
                    else {
                        parent.children[i].style.display = "none";
                    }
                }
            }
        }, false);

        var serialize = function () {
            var serializedItems = [];
            for (var i = 0; i < rows.length; i += 1) {
                serializedItems.push(rows[i].serialize(header.headerItems));
            }
            return serializedItems;
        }

        this.getGridViewData = function getData() {
            return serialize();
        }
    }

    var SchoolsRepository = function () {
        this.save = function saveData(repositoryName, schoolData) {
            localStorage.setObject(repositoryName, schoolData);
        }

        this.load = function loadData(repositoryName) {
            return localStorage.getObject(repositoryName);
        }
    }

    if (!Storage.prototype.setObject) {
        Storage.prototype.setObject = function setObject(key, obj) {
            var jsonObj = JSON.stringify(obj);
            this.setItem(key, jsonObj);
        };

    }
    if (!Storage.prototype.getObject) {
        Storage.prototype.getObject = function getObject(key) {
            var jsonObj = this.getItem(key);
            var obj = JSON.parse(jsonObj);
            return obj;
        };
    }

    function getGridView(selector) {
        return new GridView(selector);
    }

    function getSchoolsRepository() {
        return new SchoolsRepository();
    }

    function createGrid(item, data) {

    }

    function buildGridView(selector, data) {
        var gridView = new GridView(selector);

        if (data) {
            //get headers
            var headerItems = [];

            if (data[0] instanceof Array) {
                for (var index in data[0]) {
                    for (var key in data[0][index]) {
                        headerItems[index] = key;
                    }
                }
                gridView.addHeader.apply(null, headerItems);
            }
            else {
                var count = 0;
                for (var index in data) {
                    for (var key in data[index]) {
                        headerItems[count] = key;
                        count++;
                    }
                }
                gridView.addHeader.apply(null, headerItems);
            }

            //get value data
            for (var i = 0; i < data.length; i++) {
                var rowData = [];

                for (var j = 0; j < data[i].length; j++) {
                    for (var key in data[i][j]) {
                        //if (!(data[i][j][key] instanceof Array)) {
                            rowData.push(data[i][j][key]);
                        //}
                        //else {
                        //    var currentRow = gridView.addRow.apply(null, rowData);
                        //    var nestedGridView = currentRow.getNestedGridView();
                        //    nestedGridView = buildGridView(null, data[i][j][key]);
                        //}
                    }
                }
                //console.log(rowData);
                gridView.addRow.apply(null, rowData);
            }
        }

        console.log(gridView);
        return gridView;
    }

    return {
        getGridView: getGridView,
        getSchoolsRepository: getSchoolsRepository,
        buildGridView: buildGridView,
    }
}())