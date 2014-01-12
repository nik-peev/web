
(function () {
    if (!Storage.prototype.save) {
        Storage.prototype.save = function setObject(key, obj) {
            var jsonObj = JSON.stringify(obj);
            this.setItem(key, jsonObj);
        };
    }
    if (!Storage.prototype.load) {
        Storage.prototype.load = function getObject(key) {
            var jsonObj = this.getItem(key);
            var obj = JSON.parse(jsonObj);
            return obj;
        };
    }
})();
//task 1,2,3 and 5
controls = function () {

    function Grid(selector) {

        var rows = [];

        var table = document.querySelector(selector);

        table.addEventListener("click", function (ev) {

            if (!ev) {
                ev = window.event;
            }
            ev.stopPropagation();
            ev.preventDefault();

            var clickedItem = ev.target;
            if (!(clickedItem instanceof HTMLTableCellElement)) {
                return;
            }

            var trParent = clickedItem.parentNode;
            var tableParent = trParent.parentNode;
            var lastTableTR = tableParent.lastElementChild;
            var lastElement = lastTableTR.lastElementChild;

            if (!(lastElement instanceof HTMLTableCellElement)) {
                if (lastElement.style.display === "none") {
                    lastElement.style.display = "";
                }
                else {
                    lastElement.style.display = "none";
                }
            }

        }, false);

        this.addHeader = function (arguments) {
            var newHeader = new RowItem(arguments);
            rows.push(newHeader);
        }

        this.addRow = function (arguments) {
            var newRow = new RowItem(arguments);
            rows.push(newRow);
            return newRow;
        }

        this.render = function () {

            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }

            for (var i = 0; i < rows.length; i++) {
                if (i === 0) {
                    var newheader = rows[0].renderHeader();
                    table.appendChild(newheader);
                }
                else {
                    var newItem = rows[i].render()
                    table.appendChild(newItem);
                }

            }
        }

        this.getGridViewData = function () {
            var serializedItems = [];
            for (var i = 0; i < rows.length; i += 1) {
                serializedItems.push(rows[i].getGridViewData());
            }
            return serializedItems;
        }

    }

    function RowItem(title) {

        var innerRows = [];

        this.addHeader = function (arguments) {
            var newInnerHeader = new RowItem(arguments);
            innerRows.push(newInnerHeader);
            
        }

        this.addRow = function (arguments) {
            var newInnerRow = new RowItem(arguments);
            innerRows.push(newInnerRow);
            return newInnerRow;
        }

        this.render = function () {

            if (innerRows.length > 0) {
                var innerTable = document.createElement("table");
                innerTable.style.display = "none";
                for (var i = 0; i < innerRows.length; i++) {
                    if (i === 0) {
                        var newHeader = innerRows[0].renderHeader();
                        innerTable.appendChild(newHeader);
                    }
                    else {
                        var newRow = innerRows[i].render();
                        innerTable.appendChild(newRow);
                    }
                }
            }

            var tr = document.createElement("tr");

            createRowElemets();

            if (innerTable) {

                tr.appendChild(innerTable);
            }
            return tr;

            function createRowElemets() {
                for (var i = 0; i < title.length; i++) {
                    var td = document.createElement("td");
                    td.innerHTML = title[i];

                    tr.appendChild(td);
                }
            }
        }

        this.renderHeader = function () {
            var th = document.createElement("tr");

            createRowElemets();

            return th;

            function createRowElemets() {
                for (var i = 0; i < title.length; i++) {
                    var td = document.createElement("th");
                    td.innerHTML = title[i];

                    th.appendChild(td);
                }
            }
        }

        this.getGridViewData = function () {
            var thisItem = {
                title: title
            };
            if (innerRows.length > 0) {
                var serializedItems = [];
                for (var i = 0; i < innerRows.length; i += 1) {
                    var serItem = innerRows[i].getGridViewData();
                    serializedItems.push(serItem);
                }
                thisItem.innerRows = serializedItems;
            }
            return thisItem;
        }
    }

    return {
        getGridView: function (selector) {
            return new Grid(selector);
        },
        
    }
}();


//Таск.4
var schoolDataRepository = function () {
    function SchoolsRepository() {

        this.save =function(key,obj){
            localStorage.save(key, obj);
        }
        this.load = function (key) {
            return localStorage.load(key);
        }

    }
    return {
        schoolRepository: function () {
            return new SchoolsRepository()
        },
        
    }
}();

//class school
function School(name, location, numberOfCourses, specialty, setOfCourses) {
    this.name = name;
    this.location = location;
    this.numberOfCourses = numberOfCourses;
    this.specialty = specialty;
}

//class course
function Course(title, startDate, totalStudents, setOfStudents) {
    this.title = title;
    this.startDate = startDate;
    this.totalStudents = totalStudents;
    this.setOfStudents = setOfStudents || null;
}

//class student
function Student(firstName, lastName, grade, mark) {
    this.firstname = firstName;
    this.lastName = lastName;
    this.grade = grade;
    this.mark = mark;
}
