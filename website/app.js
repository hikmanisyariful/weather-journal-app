/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = `632803a19551c6a857ac74b54a1b12d3&units=imperial`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generate);

/* Function called by event listener */
const generate = e => {
  console.log("Hello Bos");
};

/* Function to GET Web API Data*/

/* Function to POST data */

/* Function to GET Project Data */
// const getData = async url => {
//   const response = await fetch(url);

//   try {
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log("Error in getData", err);
//   }
// };
