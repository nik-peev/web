function SmallestAndLargest() {
    var elements = [];
	
	for (var prop in document) {
	    elements.push(document[prop]);
	}

	for (var prop in window) {
	    elements.push(window[prop]);
	}

	for (var prop in navigator) {
	    elements.push(navigator[prop]);
	}

	var min = String(elements[0].tagName);
	var max = String(elements[1].tagName);
	alert(min);
	alert(max);


	for (var element in elements) {
	    if (String(elements[element]) < min) {
	        min = String(elements[element]);
	    }

	    if (String(elements[element]) > max) {
	        max = String(elements[element]);
	    }

	    alert(min);
	    alert(max);
	}

	document.getElementById("result").innerText = "Smallest: " + min + " Largest: " + max;
}