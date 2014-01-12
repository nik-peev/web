var controls = (function () {

    function Grid(selector) {
        var gridView = document.querySelector("#grid-view-holder")
        var headerItems = [];
        var rowItems = [];
        var table = document.createElement("table");
        gridView.appendChild(table);

        this.addHeader = function () {
            var gridHeader = new GridHeader(arguments);
            for (var i = 0; i < gridHeader.length; i++) { //push strings in headerItems Array up there
                headerItems.push(gridHeader[i]);
            }
        }

        this.addRow = function () {
            var gridRow = new GridRow(arguments);
            var gridArr = [];
            for (var i = 0; i < gridRow.length; i++) {
                gridArr.push(gridRow[i]);
            }
            rowItems.push(gridArr);
            console.log(rowItems);
        }

        function renderRowItems() {

            for (var i = 0; i < rowItems.length; i++) {
                var row = rowItems[i];

                var tableRow = document.createElement("tr");

                for (var j = 0; j < row.length; j++) {
                    var td = document.createElement("td");
                    td.innerHTML = row[j];
                    tableRow.appendChild(td);
                }
                table.appendChild(tableRow);
            }
        }

        this.render = function () {

            while(table.firstChild){
                table.removeChild(table.firstChild);
            }

            var tableHead = document.createElement("thead");
            var tableRow = document.createElement("tr");
            tableHead.appendChild(tableRow);

            for (var i = 0; i < headerItems.length; i++) {
                var td = document.createElement("td");
                td.innerHTML = headerItems[i];
                tableRow.appendChild(td);
            }

            table.appendChild(tableHead);

            renderRowItems();
        }
    }

    function GridHeader(arguments) {
        var grHeader = [];

        for (var i = 0; i < arguments.length; i++) {
            grHeader.push(arguments[i])
        }

        return grHeader;
    }

    function GridRow(arguments) {
        var grRow = [];

        for (var i = 0; i < arguments.length; i++) {
            grRow.push(arguments[i]);
        }

        return grRow;
    }

    return{
        getGridView: function (selector) {
            return new Grid(selector);
        }
    }

})();




































