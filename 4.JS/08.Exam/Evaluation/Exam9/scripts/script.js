window.addEventListener("load", init, false);

function init() {
    //=======================================================================

    //Task 1 2 3 I removed the render but is still working with recursion
    var schoolsGrid = controls.getGridView("#grid-view-holder");
    schoolsGrid.addHeader("Name", "Location", "Total Students", "Speciality");
    schoolsGrid.addRow("<br/>PMG", "Burgas", 400, "Math");
    var testRow = schoolsGrid.addRow("TUES", "Sofia", 500, "IT");
    var academyRow = schoolsGrid.addRow("Telerik Academy", "Sofia", 5000, "IT");
    var academyGrid = academyRow.getNestedGridView();
    academyGrid.addHeader("Title", "Start Date", "Total Students");
    academyGrid.addRow("JS 2", "11-april-2013", 400);
    academyGrid.addRow("SEO", "15-may-2013", 1300);
    academyGrid.addRow("Slice and Dice", "05-april-2013", 500);
    var testGrid = testRow.getNestedGridView();
    testGrid.addHeader("Title", "Start Date", "Total Students");
    testGrid.addRow("JS 2", "11-april-2013", 400);
    testGrid.addRow("SEO", "15-may-2013", 1300);
    var test = testGrid.addRow("Slice and Dice", "05-april-2013", 500);
	
	var testGrid1 = test.getNestedGridView();
	testGrid1.addHeader("Title", "Start Date", "Total Students");
    testGrid1.addRow("JS 2", "11-april-2013", 400);
    testGrid1.addRow("SEO", "15-may-2013", 1300);

    //=======================================================================


    //Task 4 This is only test objects but it works 
    // uncomment the last two logs to see the results
    var testData = [{ name: "asd" }, { name: "dsa" }];
    schoolRepository.save("testData", testData);
    console.log(localStorage);
    console.log(schoolRepository.load("testData"));


    //=======================================================================


    //Task 5 Here is working with the original objects School, Course and Student
    //uncomment the logs to see each result
    var schoolData = schoolsGrid.getGridViewData();
    schoolRepository.save("schools-repository", schoolData);
    //console.log(schoolData);
    //console.log(localStorage["schools-repository"]);
    var schoolsDataLoaded = schoolRepository.load("schools-repository");
    //console.log(schoolsDataLoaded);

    //=======================================================================

    //Task 6
    //The table is generated in other div you'll see it in the browser.
    var schoolsGridViewSecond = controls.buildGridView("#schools-repository", schoolsDataLoaded);

    
}