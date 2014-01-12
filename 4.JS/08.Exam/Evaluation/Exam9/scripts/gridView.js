var controls = (function () {
    function getGridView(containerId, isSchoolData) {
        var container = document.querySelector(containerId);
        var table = document.createElement("table");
        container.appendChild(table);
        var tableBody = document.createElement("tbody");
        table.appendChild(tableBody);
        attachEventHandler(container);

        function attachEventHandler(element) {
            element.addEventListener("click", function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                if ((ev.target instanceof HTMLAnchorElement)) {
                    console.log(ev.target);
                }

                if ((ev.target instanceof HTMLTableCellElement)) {
                    showNestedTable(ev.target.parentNode);
                }
            }, false)
        }

        function showNestedTable(previousElement) {
            var nestedGrid = previousElement.nextElementSibling;
            if (nestedGrid) {
                var child = nestedGrid.firstChild;
                if (child && child.className === "nested-grid") {
                    if (nestedGrid.style.display === "none") {
                        nestedGrid.style.display = "";
                    } else {
                        nestedGrid.style.display = "none";
                    }
                }
            }
        }

        function addHeader() {
            var data = arguments;
            var tableHeader = document.createElement("thead");
            var tableRow = document.createElement("tr");
            var tableCell = document.createElement("th");
            var anchor = document.createElement("a");
            anchor.href = "#";
            
            var len = data.length;
            var index;
            for (index = 0; index < len; index++) {
                anchor.title = data[index];
                anchor.innerHTML = data[index];
                tableCell.appendChild(anchor.cloneNode(true));
                tableRow.appendChild(tableCell.cloneNode(true));
                tableCell.innerHTML = "";
            }

            tableHeader.appendChild(tableRow);
            table.insertBefore(tableHeader, tableBody);
        }

        function addRow() {
            var data = arguments;
            var tableRow = document.createElement("tr");
            var tableCell = document.createElement("td");
            var len = data.length;
            var index;
            for (index = 0; index < len; index++) {
                tableCell.innerHTML = data[index];
                tableRow.appendChild(tableCell.cloneNode(true));
                tableCell.innerHTML = "";
            }

            tableBody.appendChild(tableRow);

            function getNestedGridView() {
                var nestedRow = document.createElement("tr");
                var nestedCell = document.createElement("td");
                nestedCell.id = data[0].killWhiteSpace() + "Grid";
                nestedCell.className = "nested-grid";
                nestedCell.setAttribute("colspan", data.length);
                nestedRow.appendChild(nestedCell);
                nestedRow.style.display = "none";

                var nextRow = tableRow.nextElementSibling;
                if (nextRow) {
                    tableBody.insertBefore(nestedRow, nextRow);
                } else {
                    tableBody.appendChild(nestedRow)
                }
                
                var nestedGrid = controls.getGridView("#" + nestedCell.id, false);
                return nestedGrid;

            }

            return {
                getNestedGridView: getNestedGridView,
            };

        }

        function getGridViewData() {
            var schoolsData = new SchoolsData();
            var body = container.getElementsByTagName("tbody")[0];
            var rowContainer = [];
            var rowElement = body.firstChild;
            while (rowElement) {
                rowContainer.push(rowElement);
                rowElement = rowElement.nextElementSibling;
            }
            var len = rowContainer.length;;
            for (var i = 0; i < len; i += 1) {
                var hasNested = rowContainer[i].getElementsByClassName("nested-grid")[0];
                if (!hasNested) {
                    schoolsData.addSchool(getSchool(rowContainer[i]))
                }
            }
            
            return schoolsData;
        }

        function getSchool(row) {
            var data = row.getElementsByTagName("td");
            var len = data.length;
            var schoolData = [];
            for (var propIndex = 0; propIndex < len; propIndex += 1) {
                schoolData.push(data[propIndex].innerHTML);
            }
            var school = new School(schoolData);

            var nextRow = row.nextElementSibling;
            if (nextRow) {
                var nestedChild = nextRow.firstChild;
                if (nestedChild && nestedChild.className === "nested-grid") {
                    var courses = nestedChild.getElementsByTagName("tbody")[0];
                    var rowContainer = [];
                    var rowElement = courses.firstChild;
                    while (rowElement) {
                        rowContainer.push(rowElement);
                        rowElement = rowElement.nextElementSibling;
                    }
                    for (var i = 0; i < rowContainer.length; i++) {
                        var hasNested = rowContainer[i].getElementsByClassName("nested-grid")[0];
                        if (!hasNested) {
                            school.addCourse(getCourse(rowContainer[i]))
                        }
                    }
                }
            }
            return school;
        }

        function getCourse(row) {
            var data = row.getElementsByTagName("td");
            var len = data.length;
            var courseData = [];
            for (var propIndex = 0; propIndex < len; propIndex += 1) {
                courseData.push(data[propIndex].innerHTML);
            }
            var course = new Course(courseData);

            return course;
        }


        return {
            addHeader: addHeader,
            addRow: addRow,
            getGridViewData: getGridViewData,
        };
    }

    function SchoolsData() {
        this.schools = [];
        this.addSchool = function (school) {
            this.schools.push(school);
        }
    }

    function School(arguments) {
        this.name = arguments[0];
        this.location = arguments[1];
        this.numberOfStudents = arguments[2]
        this.numberOfCourses;
        this.speciality = arguments[3];
        this.courses = [];
        this.addCourse = function (course) {
            this.courses.push(course);
        }
    }

    function Course(arguments) {
        this.title = arguments[0];
        this.startDate = arguments[1];
        this.numberOfStudents = arguments[2];
    }

    function Student(arguments) {
        this.firstName = arguments[0];
        this.lastName = arguments[1];
        this.grade = arguments[2];
    }

    function buildGridView(containerId, buildData) {
        var schoolsGrid = controls.getGridView(containerId);
        schoolsGrid.addHeader("Name", "Location", "Total Students", "Speciality");
        var schools = buildData.schools;
        for (var i = 0; i < schools.length; i+=1) {
            var school = schools[i];
            var schoolRow = schoolsGrid.addRow("new " + school.name, school.location, school.numberOfStudents, school.speciality);
            if (school.courses.length > 0) {
                var courses = school.courses;
                var gridGenerator = schoolRow.getNestedGridView();
                gridGenerator.addHeader("Title", "Start Date", "Total Students");
                for (var j = 0; j < courses.length; j += 1) {
                    var course = courses[i];
                    gridGenerator.addRow(course.title, course.startDate, course.numberOfStudents);
                }
            }
        }
    }

    function createNested(generator, courses) {
        
        for (var i = 0; i < courses.length; i += 1) {
            var course = courses[i];
            console.log(course);
            generator.addRow(course.title, course.startDate, course.numberOfStudents);
        }
    }



    return {
        getGridView: getGridView,
        buildGridView: buildGridView,
    };
}());

var schoolRepository = (function () {
    function save(key, object) {
        localStorage.setObject(key, object);
    };

    function load(key) {
        return localStorage.getObject(key);
    };

    return {
        save: save,
        load: load,
    };
}());