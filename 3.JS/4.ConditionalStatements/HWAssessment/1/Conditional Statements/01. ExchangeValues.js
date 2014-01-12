var number1 = parseInt(prompt("First number:"), 10);
var number2 = parseInt(prompt("Second number:"), 10);
var holder;
console.log("First number " + number1);
console.log("Second number " + number2);

if(number1 > number2){
  holder = number1;
  number1 = number2;
  number2 = holder;
}

console.log("First number after " + number1);
console.log("Second number after " + number2);