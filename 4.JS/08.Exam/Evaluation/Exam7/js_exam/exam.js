var controls = (function () {

    function initialGridView(selector) {
        var header = [];
        var rows = [];        
        var holderNode = document.querySelector(selector);

        this.addHeader = function () {
            header = [];
            for (var i = 0; i < arguments.length; i++) {
                header.push(arguments[i]);
            }
        }

        this.addRow = function () {
            var params = [];
            for (var i = 0; i < arguments.length; i++) {
                params[i] = arguments[i];
            }

            var row = new GridViewRow(params);
            rows.push(row);
            //console.log(row);
            return row;
        }

        this.render = function () {
            var table = document.createElement('table');
            if (header.length > 0) {
                var tableHeader = document.createElement('tr');
                for (var i = 0; i < header.length; i++) {
                    var cell = document.createElement('th');
                    var checkedText = header[i];
                    checkedText = checkedText.replace(/<br\s*[\/]?>/gi, "&#60;br />");
                    cell.innerHTML = checkedText; //here can check for escape br
                    tableHeader.appendChild(cell);
                }
                table.appendChild(tableHeader);
            }
            if (rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i].render();                   
                    table.appendChild(row);
                }
            }
            holderNode.appendChild(table);
        }

        this.getGridViewData = function () {
            var data = {};
            
            for (var i = 0; i < rows.length; i++) {
                var rowData = {};
                rowData["headers"] = header;
                rowData["rows"] = rows[i].getData();
                data[i] = rowData;
            }

            return data;
        }
        

        
    }; //end initial grid view

    //todo: make function to remove <br />

    function GridView() {
        var header = [];
        var rows = [];
        
        this.getData = function () {
            var data = {};
            for (var i = 0; i < rows.length; i++) {
                var rowData = {};
                rowData["headers"] = header;
                rowData["rows"] = rows[i].getData();
                data[i] = rowData;
            }
            
            return data;
        }
        this.addHeader = function () {
            header = [];
            for (var i = 0; i < arguments.length; i++) {
                header.push(arguments[i]);
            }
        }

        this.addRow = function () {
            var params = [];
            for (var i = 0; i < arguments.length; i++) {
                params[i] = arguments[i];
            }

            var row = new GridViewRow(params);
            rows.push(row);           
            return row;
        }

        this.render = function () {
            var table = document.createElement('table');
            if (header.length > 0) {
                var tableHeader = document.createElement('tr');
                for (var i = 0; i < header.length; i++) {
                    var cell = document.createElement('th');
                    var checkedText = header[i];
                    checkedText = checkedText.replace(/<br\s*[\/]?>/gi, "&#60;br />");
                    cell.innerHTML = header[i]; //here can check for escape br
                    tableHeader.appendChild(cell);
                }
                table.appendChild(tableHeader);

            }
            if (rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i].render();
                    table.appendChild(row);
                }
            }
            return table;
        }
        
    }
    // rows class
    function GridViewRow(params) {
        var items = [];
        var nestedTable;

        if (params.length > 0) {
            for (var i = 0; i < params.length; i++) {
                items[i] = params[i];
            }   
        }
        
        this.getData = function () {
            var data = {};
            data["items"] = items;
            if (nestedTable != undefined) {
                data["table"] = nestedTable.getData();
            }
            return data;
        }

        this.getNestedGridView = function () {
            var nestedGrid = new GridView();
            nestedTable = nestedGrid;

            return nestedGrid;
        }
        this.render = function () {
            var docFragment = document.createDocumentFragment();
            var tableRow = document.createElement('tr');

            if (nestedTable != undefined) {
                var elementTable = nestedTable.render()
                var newRow = document.createElement('tr');
                var newTd = document.createElement('td');
                newTd.appendChild(elementTable);
                newRow.appendChild(newTd);
            }
            if (items.length > 0) {              
                for (var i = 0; i < items.length; i++) {
                    var cell = document.createElement('td');
                    var checkedText = items[i];
                    checkedText = checkedText + "";
                    checkedText = checkedText.replace(/<br\s*[\/]?>/gi, "&#60;br />");
                    cell.innerHTML = checkedText; //here can check for escape br                  
                    tableRow.appendChild(cell);                 
                }                
            }
            if (nestedTable != undefined) {
                tableRow.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    var next = tableRow.nextElementSibling;
                    if (next.classList.contains('hidden')) {
                        next.classList.remove('hidden');
                    } else {
                        next.classList.add('hidden');
                    }
                })
            }
            docFragment.appendChild(tableRow);
            if (nestedTable != undefined) {
                docFragment.appendChild(newRow);
            }
            return docFragment;
        }
    }


    return {
        getGridView: function (selector) {
            return new initialGridView(selector);
        }  
    }
}());

//school

function School(name, location, numCourses, speciality, setCourses) {
    this.name = name;
    this.location = location;
    this.numCourses = numCourses;
    this.speciality = speciality;
    this.setCourses = setCourses;
}

function Course(title, startDate, totalStudents, setStudents) {
    this.title = title;
    this.startDate = startDate;
    this.totalStudents = totalStudents;
    this.setStudents = setStudents;
}

function Student(firstname, lastName, grade, mark) {
    this.firstName = firstname;
    this.lastName = lastName;
    this.grade = grade;
    this.mark = mark;
}

function SchoolRepository() {
    this.save = function (key, data) {
        localStorage.setObject(key, data);
    }
    this.load = function (key) {
        return localStorage.getObject(key);
    }
}

// loc storage extensions
(function () {
    if (!Storage.prototype.setObject) {
        Storage.prototype.setObject = function (key, obj) {
            this.setItem(key, JSON.stringify(obj));
        }
    }

    if (!Storage.prototype.getObject) {
        Storage.prototype.getObject = function (key) {
            return JSON.parse(this.getItem(key));
        }
    }
}());