var number1 = parseInt(prompt("Enter a value for number 1"), 10);
var number2 = parseInt(prompt("Enter a value for number 2"), 10);
var number3 = parseInt(prompt("Enter a value for number 3"), 10);
var number4 = parseInt(prompt("Enter a value for number 4"), 10);
var number5 = parseInt(prompt("Enter a value for number 5"), 10);

var compare1and2 = Math.max(number1, number2);
var compare3and4 = Math.max(number3, number4);
var compare1and5 = Math.max(number1, number5);
var compare1stTo2ndCouple = Math.max(compare1and2, compare3and4);
var compareLastCouple = Math.max(compare1stTo2ndCouple, compare1and5);
console.log("The greatest variable is : " + compareLastCouple);
                                          