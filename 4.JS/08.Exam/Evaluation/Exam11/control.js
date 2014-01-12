var controls = (function() {

	function generateRandomNumber(from, to) {
		return Math.floor(Math.random() * to + from);
	}

	function GridView(selector) {
		var header = [],
			rows = [],
			holder = document.querySelector(selector),
			gridList = document.createElement("table"),
			headList = document.createElement("thead"),
			gridBody = document.createElement("tbody");

		this.addHeader = function(params) {
			//override header if exist with new one
			if (header.length !== 0) {
				header = [];
			}

			for (var index = 0; index < arguments.length; index += 1) {
				var newHeaderItem = new HeaderItem(arguments[index]);
				header.push(newHeaderItem);
			}
			return newHeaderItem;
		};

		this.addRow = function(params) {
			var newRowArr = [];
			for (var index = 0; index < arguments.length; index += 1) {
				var newRowItem = new RowItem(arguments[index]);
				newRowArr.push(newRowItem);
			}
			var newRow = new Row(newRowArr);
			rows.push(newRow);
			return newRow;
		};

		this.render = function() {

			while (gridBody.firstChild) {
				gridBody.removeChild(gridBody.firstChild);
			}

			while (headList.firstChild) {
				headList.removeChild(headList.firstChild);
			}

			while (gridList.firstChild) {
				gridList.removeChild(gridList.firstChild);
			}

			var i,
			headerLen = header.length,
				rowsLen = rows.length;
			//render header
			for (i = 0; i < headerLen; i += 1) {
				var domItemH = header[i].render();
				headList.appendChild(domItemH);
			}
			//render rows
			for (i = 0; i < rowsLen; i += 1) {
				var domItemR = rows[i].render();
				gridBody.appendChild(domItemR);
			}

			gridList.appendChild(headList);
			gridList.appendChild(gridBody);
			holder.appendChild(gridList);

			return this;
		};

	}

	function HeaderItem(title) {
		var headerItems = [];
		this.addHeader = function(title) {
			var newHeaderItem = new HeaderItem(title);
			headerItems.push(newHeaderItem);
			return newHeaderItem;
		};

		this.render = function() {
			var itemNode = document.createElement("th");
			itemNode.innerHTML = title;
			return itemNode;
		};
	}

	function Row(rowItems) {

		this.render = function() {
			var itemNode = document.createElement("tr");
			for (var i = 0; i < rowItems.length; i += 1) {
				itemNode.appendChild(rowItems[i].render());
			}

			return itemNode;
		}

		this.getNestedGridView = function() {
			var tbody = document.querySelector("table > tbody");
			var nestedHolderRow = document.createElement("tr");
			nestedHolderRow.setAttribute("class", "holder");
			var nestedHolderTd = document.createElement("td");
			var number = generateRandomNumber(100, 200);
			nestedHolderTd.setAttribute("id", "nestedID" + number);
			nestedHolderTd.setAttribute("colspan", rowItems.length);
			nestedHolderRow.appendChild(nestedHolderTd);
			tbody.appendChild(nestedHolderRow);
			document.querySelector(".holder").previousSibling.setAttribute("class", "collapsing");
			var nested = new GridView("#nestedID" + number);
			return nested;
		}
	}

	function RowItem(title) {
		var rowItems = [];
		this.addRow = function(title) {
			var newRowItem = new RowItem(title);
			rowItems.push(newRowItem);
			return newRowItem;
		};

		this.render = function() {
			var itemNode = document.createElement("td");
			itemNode.innerHTML = title;
			return itemNode;
		};
	}

	function addCollapseRows() {
		var collapsingElements = document.querySelector(".collapsing");
		attachEventHandler(collapsingElements, "click", collaps);

		function collaps() {
			if (collapsingElements.nextSibling.getAttribute("class") !== "hidden") {
				collapsingElements.nextSibling.setAttribute("class", ".hidden");
			} else {
				collapsingElements.nextSibling.setAttribute("class", ".visible");
			}
		}
	}

	function attachEventHandler(element, eventType, eventHandler) {
		if (document.attachEvent) {
			element.attachEvent("on" + eventType, eventHandler);
		} else if (document.addEventListener) {
			element.addEventListener(eventType, eventHandler, false);
		} else {
			element["on" + eventType] = eventHandler;
		}
	}


	return {
		getGridView: function(selector) {
			return new GridView(selector);
		},
		addCollapseRows: addCollapseRows
	}
}());