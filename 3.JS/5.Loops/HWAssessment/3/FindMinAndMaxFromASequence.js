function FindMinAndMax() {
    var sequence = document.getElementById("gatherer").value;
    var result = sequence.split(',');

    var min = parseInt(result[0]);
    var max = parseInt(result[0]);
	
    for (i = 0; i < result.length; i++) {

        currentNum = parseInt(result[i]);

        if (currentNum < min) {
            min = currentNum;
	    }

        if (currentNum > max) {
	        max = currentNum;
	    }
	}

	document.getElementById("result").innerText = "Min: " + min + " Max: " + max;
}