function PrintNumbers1toN() {
    var numberN = document.getElementById("gatherer").value;
	var result = [];
	
	for (i = 1; i <= numberN; i++) {

	    if (i % 3 == 0 && i % 7 == 0) {

	    } else {
	        result.push(i);
	    }
	}

	document.getElementById("result").innerText = result.join(' ');
}