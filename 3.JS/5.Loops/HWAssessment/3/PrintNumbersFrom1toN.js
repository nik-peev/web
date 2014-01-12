function PrintNumbers1toN() {
    var numberN = document.getElementById("gatherer").value;
	var result = [];
	
	for (i = 1; i <= numberN; i++) {
	    result.push(i);
	}

	document.getElementById("result").innerText = result.join(' ');
}