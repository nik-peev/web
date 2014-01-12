function GridView(GridViewHolderId) {    
    var table = document.getElementById(GridViewHolderId);
    var currentRowIndex = 1;
    var holder = GridViewHolderId;

    GridView.prototype.addRow = function addRow(data, count) {
        var row = table.insertRow(currentRowIndex);
        currentRowIndex++;
        for (var i = 0; i < count; i++) {
            var cell = row.insertCell(i);
            cell.innerText = data.shift();
        }
        return row;
    }
    GridView.prototype.addHeader = function addHeader(data, count) {
        table.innerHTML = "<tr id='headRow" + holder + "'></tr>";
        var thead = document.getElementById('headRow' + holder);        

        do {
            var text = data.shift();
            thead.innerHTML += '<th>' + text + '</th>';
            count--;
        }
        while (count != 0);
    }
    GridView.prototype.getRow = function getRow(name) {
    }
}

var schools = new Array();

function Course(params) {
    return {
        name: params.name,
        startDate: params.startDate,
        totalStudents: params.totalStudents,
        students: params.students,
        toString: function toString() {
            var result = new Array();
            result.push(this.name);
            result.push(this.startDate);
            result.push(this.totalStudents);            
            for (var i = 0; i < this.students.length; i++) {
                result.push(this.students[i].toString());
            }
            return result.join(['^']);
        }
    }
};

function Student(params) {
    return {
        firstName: params.firstName,
        lastName: params.lastName,
        grade: params.grade,
        mark: params.mark,
        toString: function toString() {
            //return this.firstName + this.lastName + this.grade + this.mark;
            var result = new Array();
            result.push(this.firstName);
            result.push(this.lastName);
            result.push(this.grade);
            result.push(this.mark);
            return result.join(['^']);
        }
    }
};

function School(params) {
    return {
        name: params.name,
        location: params.location,
        coursesCount: params.coursesCount,
        specialty: params.specialty,
        courses: params.courses,
        toString: function toString() {
            var result = new Array();
            result.push(this.name);
            result.push(this.location);
            result.push(this.coursesCount);
            result.push(this.specialty);       
            for (var i = 0; i < this.courses.length; i++) {
                result.push(this.courses[i].toString());
            }
            return result.join(['^']);
        }
    }
};
function save(repoName, school) {
    localStorage.setItem(repoName, school.toString());
}
function load(schoolName) {
    var rawText = localStorage.getItem(schoolName);
    var elements = rawText.split('^');
    var index = 0;
    var school = new School(
        {
            name: elements[0],
            location: elements[1],
            coursesCount: elements[2],
            specialty: elements[3],
        });
    index=4;
    //while (index<elements.length) {
    //    var course = new Course(
    //    {
    //        name: elements[i++],
    //        startDate: elements[i++],
    //        totalStudents: elements[i++]

    //    });

    }

var students = new Array();
var student = new Student({ firstName: 'Pesho', lastName: 'Georgiev', grade: 6, mark: 3 });
students.push(student);
student = new Student({ firstName: 'Stamat', lastName: 'Ivanov', grade: 8, mark: 5 });
students.push(student);

var courses = new Array();
var course = new Course({name: 'JS', startDate: '16-05-2013',totalStudents: 220, students: students});
courses.push(course);
course = new Course({ name: 'OOP', startDate: '23-12-2010', totalStudents: 100, students: students });
courses.push(course);

var school = new School({name: 'SU',location:'Sofia', coursesCount:2,specialty:'IT',courses: courses});

save('maimun', school.toString());
var text = localStorage.getItem('maimun');
console.log(text);
load('maimun');

