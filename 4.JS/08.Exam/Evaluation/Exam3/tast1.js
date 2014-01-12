	controls = (function () {
	GridView = function (selector) {
				var setOfGrids = [];
				var allRows = [];
				var parent = document.querySelector(selector);
				parent.style.border = "solid 1px red";
				var holder = document.getElementById("container");
				holder.addEventListener("click",onClickTable,false);

				this.addHeader = function () {
					var newHeader = new Header(arguments);
					allRows.push(newHeader);
					//return newHeader;
				};

				this.addRow = function () {
					var newRow = new Row(arguments);
					allRows.push(newRow);
					return newRow;
				};

				this.render = function (){

					for (var i = 0; i < allRows.length; i++) {
						var domItem = allRows[i].render();
						parent.appendChild(domItem);
					}
				};

				this.serialize = function () {
					var serializeItem = [];
						for (var i = 0; i < allRows.length; i++) {
							var serAcc = allRows[i].serialize();
							serializeItem.push(serAcc);
						}
					return serializeItem;
				};
			}// end

			function onClickTable (ev) {
				if (!ev) {
						ev = window.event;
					}
					ev.stopPropagation();
					ev.preventDefault();
					
					var td = ev.target;
					var tr = td.parentNode;
					if (!(tr instanceof HTMLTableRowElement)) {
						return;
					}
					
					if (tr.nextElementSibling.className === "innerGrids") {
					if (tr.nextElementSibling.firstElementChild.style.display === "none") {
						tr.nextElementSibling.firstElementChild.style.display = "";
					}else{
						tr.nextElementSibling.firstElementChild.style.display = "none";
					}
						
					}
			}

			Row = function (arguments) {
				this.innerViews = [];
				var cols = [];
				if (arguments) {
				var numberOfCols = arguments.length;
				}
				var args = arguments;
				
			this.render = function (){
				// create 1 row
				var row = document.createElement("tr");

				// create the cols

				for (var i = 0; i < numberOfCols; i++) {
					var col = document.createElement("td");
					col.innerHTML = args[i];
					col.style.border = "solid 1px black";
					cols.push(col);
					row.appendChild(col);
					}

					if (this.innerViews.length > 0) {
						var frag = document.createDocumentFragment();
						
						frag.appendChild(row);
						var rowInner = document.createElement("tr");
						rowInner.className = "innerGrids";
						var table = this.innerViews[0].render();
						rowInner.appendChild(table);
						table.style.display = "none";
						frag.appendChild(rowInner)
						return frag;
					}
				return row;
				};

				this.getNestedGridView = function () {
					var newRow = new Row(arguments);
					var grid = new GridViewIn();
					this.innerViews.push(grid);
					return grid;
				}

				this.serialize = function () {
					var thisItem = {
						args : args
					};
					if (this.innerViews.length > 0) {
						var serializeItem = [];
						for (var i = 0; i < this.innerViews.length; i++) {
							var serItem = this.innerViews[i].serialize();
							serializeItem.push(serItem);
						}
						// ako ima items togawa mu slagame o6te edno prop na
						// thisItem
						thisItem.innerItems = serializeItem;
					}
					// wry6tam rezultatyt
					return thisItem;
				};
			};

			Header =  function (arguments) {
				var colsh = [];
				var numberOfCols = arguments.length;
				var args = arguments;
				this.render = function (){
					var rowh = document.createElement("tr");
					for (var i = 0; i < numberOfCols; i++) {
						var colh = document.createElement("td");
						colh.innerHTML = args[i];
						colh.style.border = "solid 1px black";
						colsh.push(colh);
						rowh.appendChild(colh);
					}
					return rowh;
				};
				this.serialize = function () {
					var thisItem = {
						agrs : args
					};
					
					return thisItem;
				};
			}

			GridViewIn = function () {
				var setOfGrids = [];
				var allRows = [];
				var parent = document.createElement("table");

				this.addHeader = function () {
					var newHeader = new Header(arguments);
					allRows.push(newHeader);
					//return newHeader;
				};

				this.addRow = function () {
					var newRow = new Row(arguments);
					allRows.push(newRow);
					return newRow;
				};

				this.render = function (){

					for (var i = 0; i < allRows.length; i++) {
						var domItem = allRows[i].render();
						// Towa tuka sa Item ne sa dom elementi
						// Item.renred() 6te go prawi dom el
						parent.appendChild(domItem);
					}
					return parent;
				};
				this.serialize = function () {
					var serializeItem = [];
						for (var i = 0; i < allRows.length; i++) {
							var serAcc = allRows[i].serialize();
							serializeItem.push(serAcc);
						}
					return serializeItem;
				};
			}// end

	return {
		getGridView: function (selector) {
			return new GridView(selector);
		}
	}
}());
//var schoolsGrid = controls.getGridView("#grid-view-holder");
//schoolsGrid.addHeader("Name","Location","Total Students", "Specialty");
//schoolsGrid.addRow("A","B0","C","D");
//schoolsGrid.addRow("A","B0",200,"D");
//schoolsGrid.addRow("A","<br/>",200,"D");
// task2
//var academyRow = schoolsGrid.addRow("W","WWW", "Hm", "200");
//var academyGrid = academyRow.getNestedGridView();
//academyGrid.addHeader("Header1","Header2");
//academyGrid.addRow("JS-2","Ohh");

//schoolsGrid.addRow("A","B0",200,"D");
//schoolsGrid.addRow("A","<br/>",200,"D");
//schoolsGrid.render();
// task 4
var schools = controls.getGridView("#grid-view-holder");
schools.addHeader("name","lacation","numberOfCourses","specialty","setOfCourses");

 var innerTable = schools.addRow("PMG", "Sofiq", 55, "Math", 13);
 		var innerGrid = innerTable.getNestedGridView();
 			innerGrid.addHeader("title", "startTime", "totalStudents", "setOfStudents");
 			var innerInnerGrid = innerGrid.addRow("SomeTitle", "20.05.12", "50", "2");
 			var gridStudents = innerInnerGrid.getNestedGridView();
 				gridStudents.addHeader("FirstName", "LastName","grade","marks");
 				gridStudents.addRow("AName","Last","45","16");
schools.render();

var serial = schools.serialize();
		localStorage.save("firstSetObj" , serial);
		var data = localStorage.load("firstSetObj");
		console.log(data);