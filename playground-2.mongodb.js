/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'my_messages';
const collection = 'codeblocks';

// The current database to use.
use(database);

// Create a new collection.
db.createCollection(collection);

// Define raw strings for the code blocks
const asyncCode = String.raw`async function fetchData() {
  try {
    // Mistake: you have to use await before fetch the data, please fix it.
    const response = fetch('https://api.example.com/data');
    
    // Parse the JSON response
    const data = await response.json();
    
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}`;

const promiseCode = String.raw`function fetchData() {
  return new Promise((resolve, reject) => {
    // Simulate a delayed response
    setTimeout(() => {
      const data = { message: 'Data fetched successfully' };
    // Mistake: you forgot to send the data as variable at the resolve, please fix it.
      resolve();
    }, 2000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));`;

const calculateAverage = String.raw`function calculateAverage(Arr) {
    const Arr = [10, 2, 30];

    your execrsie:
    Please complete the part of the return in the function in order to get the average of the array. without any spaces.
    
    // Function to calculate the average of an array
    function calculateAverage(Arr) {
      const sum = Arr.reduce((acc, num) => acc + num, 0);
      return ()
    }
  }`;
  
const ArrayOperations = String.raw`const numbers = [2, 5, 8, 11, 3, 6];

// Filter: Keep only numbers greater than 5
const greaterThanFive = numbers.filter(num => num > 5);
console.log('Numbers greater than 5:', greaterThanFive);

// Filter: Keep only even numbers
const evenNumbers = greaterThanFive.filter(num => num % 2 === 0);
console.log('Even Numbers:', evenNumbers);

// Reduce: Sum of all numbers
const sum = evenNumbers.reduce((acc, num) => acc + num, 0);
console.log('Sum:', sum);

// your answer:
sum == 
`;

//#############################################################################################3
// Define solutions for each code block
const asyncSolution = String.raw`async function fetchData() {
  try {
    // Mistake: you have to use await before fetch the data, please fix it.
    const response = await fetch('https://api.example.com/data');
    
    // Parse the JSON response
    const data = await response.json();
    
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}`;

const promiseSolution = String.raw`function fetchData() {
  return new Promise((resolve, reject) => {
    // Simulate a delayed response
    setTimeout(() => {
      const data = { message: 'Data fetched successfully' };
    // Mistake: you forgot to send the data as variable at the resolve, please fix it.
      resolve(data);
    }, 2000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));`;

const calculateAverageSolution = String.raw`function calculateAverage(Arr) {
    const Arr = [10, 2, 30];

    your execrsie:
    Please complete the part of the return in the function in order to get the average of the array. without any spaces.
    
    // Function to calculate the average of an array
    function calculateAverage(Arr) {
      const sum = Arr.reduce((acc, num) => acc + num, 0);
      return (sum/Arr.length)
    }
  }`;

const ArrayOperationsSolution = String.raw`const numbers = [2, 5, 8, 11, 3, 6];

// Filter: Keep only numbers greater than 5
const greaterThanFive = numbers.filter(num => num > 5);
console.log('Numbers greater than 5:', greaterThanFive);

// Filter: Keep only even numbers
const evenNumbers = greaterThanFive.filter(num => num % 2 === 0);
console.log('Even Numbers:', evenNumbers);

// Reduce: Sum of all numbers
const sum = evenNumbers.reduce((acc, num) => acc + num, 0);
console.log('Sum:', sum);

// your answer:
sum == 14
`;

// #############################################################################################
// Insert code blocks and solutions into the collection
db.codeblocks.insertMany([
  {
    title: "Async Case",
    code: asyncCode,
    solution: asyncSolution
  },
  {
    title: "Promise Example",
    code: promiseCode,
    solution: promiseSolution
  },
  {
    title: "calculate Average of array",
    code: calculateAverage,
    solution: calculateAverageSolution
  },
  {
    title: "Array Manipulation",
    code: ArrayOperations,
    solution: ArrayOperationsSolution
  }
]);
