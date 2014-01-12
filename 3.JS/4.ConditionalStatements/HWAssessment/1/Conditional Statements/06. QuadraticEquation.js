var a = parseFloat(prompt("Enter a value for the coefficient a: "));
var b = parseFloat(prompt("Enter a value for the coefficient b: "));
var c = parseFloat(prompt("Enter a value for the coefficient c: "));
var root1;
var root2;
var discriminant = (b * b) - (4 * a * c);

if (discriminant === 0){
    root1 = -b / (2 * a);
    root2 = root1;
    console.log("The quadratic equation has ONE real root, which is: " + root1);
}
else if (discriminant < 0)
{
    console.log("The quadratic equation has NO real roots.");
}
else if (discriminant > 0)
{
    root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    console.log("The quadratic equation has TWO real roots, which are: " + root1 + " " + root2);
}