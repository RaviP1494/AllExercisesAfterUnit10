// //object destructuring 1
// let facts = { numPlanets: 8, yearNeptuneDiscovered: 1846 };
// let { numPlanets, yearNeptuneDiscovered } = facts;

// console.log(numPlanets); // prints 8
// console.log(yearNeptuneDiscovered); // prints 1846




// //object destructuring 2
// let planetFacts = {
//     numPlanets: 8,
//     yearNeptuneDiscovered: 1846,
//     yearMarsDiscovered: 1659
// };

// let { numPlanets, ...discoveryYears } = planetFacts;

// console.log(discoveryYears); // prints out the object of planetFacts without numPlanets property included




// //object destructuring 3
// function getUserData({ firstName, favoriteColor = "green" }) {
//     return `Your name is ${firstName} and you like ${favoriteColor}`;
// }

// getUserData({ firstName: "Alejandro", favoriteColor: "purple" }) // prints 'Your name is Alejandro and you like purple'
// getUserData({ firstName: "Melissa" }) // prints 'Your name is Melissa and you like green'
// getUserData({}) // prints 'Your name is Undefined and you like green'




// //array destructuring 1
// let [first, second, third] = ["Maya", "Marisa", "Chi"];

// console.log(first); // prints Maya
// console.log(second); // prints Marisa
// console.log(third); // prints Chi




// //array destructuring 2
// let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
//     "Raindrops on roses",
//     "whiskers on kittens",
//     "Bright copper kettles",
//     "warm woolen mittens",
//     "Brown paper packages tied up with strings"
// ]

// console.log(raindrops); // prints 'Raindrops on roses'
// console.log(whiskers); // prints 'whiskers on kittens'
// console.log(aFewOfMyFavoriteThings); // prints a representation of an array of the last 3 strings of the array




// //array destructuring 3
// let numbers = [10, 20, 30];
// [numbers[1], numbers[2]] = [numbers[2], numbers[1]]

// console.log(numbers) // prints a representation of the array [10,30,20]



//ES5 Assigning Variables to Object Properties

// var obj = {
//     numbers: {
//       a: 1,
//       b: 2
//     }
//   };

//   var a = obj.numbers.a;
//   var b = obj.numbers.b;

//ES2015 Object Destructuring
const obj = { numbers: { a: 1, b: 2 } };
const { numbers: { a, b } } = obj;




//ES5 Array Swap

// var arr = [1, 2];
// var temp = arr[0];
// arr[0] = arr[1];
// arr[1] = temp;

//ES2015 One-Line Array Swap with Destructuring
let arr = [1, 2];
[arr[1], arr[0]] = [...arr];




//raceResults()
const raceResults = ([first, second, third, ...rest]) => ({
    first,
    second,
    third,
    rest
})