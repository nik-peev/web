var number1 = parseFloat(prompt("First number:"));
var number2 = parseFloat(prompt("Second number:"));
var number3 = parseFloat(prompt("Third number:"));
if ((number1 > number2) && (number1 > number3)){
            console.log(number1 + " is the greatest integer out of the three entered");
        }
        else if ((number2 > number1) && (number2 > number3)){
            console.log(number2 + " is the greatest integer out of the three entered");
        }
        else if ((number3 > number1) && (number3 > number2)){
            console.log(number3 + " is the greatest integer out of the three entered");
        }
        else{
            console.log("Two or all of the entered integers have equal values");
        }