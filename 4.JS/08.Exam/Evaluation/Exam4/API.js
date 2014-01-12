var controls = (function () {
    var getGridView = function (selector) {

        var grid = document.getElementById(selector);
        var header;
        var rows = new Array();
        var buffer = document.createDocumentFragment();

        grid.addEventListener("click", onClickGrid, false);

        function onClickGrid(ev) {
            if (!ev) {
                ev = window.event;
            }
            var target = ev.target.parentNode;
            if (target instanceof HTMLTableRowElement) {
                for (var index = 0; index < target.children.length; index++) {
                    var children = target.children[index];
                    if (children instanceof HTMLTableElement) {
                        if (children.style.display == "none") {
                            children.style.display = "";
                        }
                        else {
                            children.style.display = "none";
                        }
                    }
                }
            }
        }

        this.addHeader = function (params) {
            header = new row(params, "header");
            return header;
        }

        this.addRow = function (params) {
            var newRow = new row(params, "row");
            rows.push(newRow);
            return newRow;
        }

        this.render = function () {

            while (grid.firstChild) {
                grid.removeChild(grid.firstChild);
            }

            if (header) {
                buffer.appendChild(header.render());
            }
            for (var index = 0; index < rows.length; index++) {
                buffer.appendChild(rows[index].render());
            }

            grid.appendChild(buffer);
        }

        var getStudetFromCourse = function (students) {
            if (students.length > 0) {
                var gridSchools = new SchoolsRepository.Schools();
                var studentsList = new Array();
                for (var student = 0; student < students.length; student++) {
                    var studetItems = students[student].getTitles();
                    studentsList.push(gridSchools.createNewStudet(studetItems[0], studetItems[1], studetItems[2], studetItems[3]));
                }
            }

            return studentsList;
        }

        var getCoursesFromGrid = function (rowToConvert) {
            
            var gridSchools = new SchoolsRepository.Schools();
            var coursesFormGrid = rowToConvert.getNestedItems();
            var courses = new Array();
            if (coursesFormGrid.length > 0) {
                for (var course = 0; course < coursesFormGrid.length; course++) {
                    var courseItems = coursesFormGrid[course].getTitles();
                    courses.push(gridSchools.createNewCourse(courseItems[0], courseItems[1],
                        courseItems[2], getStudetFromCourse(coursesFormGrid[course].getNestedItems())));
                }
            }

            return courses;
        }

        this.getGridView = function () {
            var gridSchools = new SchoolsRepository.Schools();

            for (var index = 0; index < rows.length; index++) {
                var courses = getCoursesFromGrid(rows[index]);
                var titles = rows[0].getTitles();
                gridSchools.createNewSchool(titles[0], titles[1], titles[2], titles[3], titles[4],courses);
            }

            return gridSchools;
        }

        // this.addGridFromSchoolRepository = function (schoolData) {

            // var schools = schoolData.schools;

            // for (var index = 0; index < schools.length; index++) {
                // var school = this.addRow(new Array(schools[index].name, schools[index].location,
                // schools[index].numberOfCourses), "row");

                // var courses = schools[index].setOfCourses;
                // if (courses.length > 0) {
                    // for (var course = 0; course < courses.length; course++) {
                        // var thisCourse = school.addRow(new Array(courses[course].title,
                            // courses[course].startDate, courses[course].totalStudets),"row");

                        // var students = courses[course].setOfStudents;
                        // if (students.length > 0) {
                            // for (var student = 0 ; student < students.length; student++) {
                                // thisCourse.addRow(new Array(students[student].firstName, students[student].lastName,
                                    // students[student].grade, students[student].mark), "row");
                            // }
                        // }
                    // }
                // }

            // }
        // }
    }

    var headerItem = function (title) {
        var newItem = document.createElement("th");
        newItem.innerText = title;

        this.render = function () {
            return newItem;
        }
    }

    var row = function (titles,type) {
        var rowItems = new Array();
        var rowBuffer = document.createElement("tr");
        var nestedGrid = new Array();
        var nestedheader;
        var newNestedGrid = document.createElement("table");

        for (var index = 0; index < titles.length; index++) {
            if (type == "row") {
                rowItems.push(new rowItem(titles[index]));
            }
            else {
                rowItems.push(new headerItem(titles[index]));
            }
        }

        this.getNestedItems = function () {
            return nestedGrid;
        }
        
        this.getTitles = function(){
            return titles;
        }

        this.render = function () {
            for (var index = 0; index < rowItems.length; index++) {
                rowBuffer.appendChild(rowItems[index].render());
            }

            if (nestedGrid.length > 0 || nestedheader) {
                newNestedGrid.style.display = "none";
                if (nestedheader) {
                    newNestedGrid.appendChild(nestedheader.render());
                }
                for (var index = 0; index < nestedGrid.length; index++) {
                    newNestedGrid.appendChild(nestedGrid[index].render());
                }

                rowBuffer.appendChild(newNestedGrid);
            }
            return rowBuffer;
        }

        this.addHeader = function (params) {
            nestedheader = new row(params, "header");
        }

        this.addRow = function (params) {
            var newRow = new row(params, "row");
            nestedGrid.push(newRow);

            return newRow;

        }
    }

    var rowItem = function (title) {
        var newItem = document.createElement("td");
        newItem.innerText = title;

        this.render = function () {
            return newItem;
        }
    }

    return {
        getGridView: getGridView
    }
}());

var SchoolsRepository = (function () {
    var Schools = function () {
        var schools = new Array();
        var addNewSchool = function (name, location, numberOfCourses, specialty, setOfCourses) {
            var newSchool = new school();
            newSchool.name = name;
            newSchool.location = location;
            newSchool.numberOfCourses = numberOfCourses;
            newSchool.specialty = specialty;
            newSchool.setOfCourses = setOfCourses;

            schools.push(newSchool);
        }

        var school = function () {
            this.name = "";
            this.location = "";
            this.numberOfCourses = 0;
            this.specialty = "";
            this.setOfCourses = Array();
        }

        var newCourse = function (title, startDate, totalStudets, setOfStudents) {
            var newCourse = {
                title: title,
                startDate: startDate,
                totalStudets: totalStudets,
                setOfStudents: setOfStudents
            };

            return newCourse;
        }

        var newStudet = function (firstName, lastName, grade, mark) {
            var newStudent = {
                firstName: firstName,
                lastName: lastName,
                grade: grade,
                mark: mark
            };

            return newStudent;
        }

        return {
            createNewSchool: addNewSchool,
            createNewCourse: newCourse,
            createNewStudet: newStudet,
            schools: schools
        }
    }

    var save = function (key, schoolsData) {
        localStorage.setItem(key, JSON.stringify(schoolsData));
    }

    var load = function (key) {
        return JSON.parse(localStorage.getItem(key));
    }

    return {
        Schools: Schools,
        save: save,
        load: load
    }

})();