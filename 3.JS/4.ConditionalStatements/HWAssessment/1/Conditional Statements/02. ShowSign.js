var number1 = parseFloat(prompt("First number:"));
var number2 = parseFloat(prompt("Second number:"));
var number3 = parseFloat(prompt("Third number:"));
var positive = true;
        if (number1 === 0 || number2 === 0 || number3 === 0)
        {
            console.log("The product is zero");
        }
        else
        {
            if (number1 < 0 && number2 < 0)
            {
                positive = !positive;
                console.log("The product of the numbers will be a negative number");
            }
            else
            {
                console.log("The product of the numbers will be a positive number");
            }
        }