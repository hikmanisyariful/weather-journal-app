/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const idCountry = ",US";

// Personal API Key for OpenWeatherMap API
const apiKey = `&appid=${userApiKey}&units=imperial`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generate);

/* Function called by event listener */
function generate(e) {
  const zip = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  if (zip.length !== 5) {
    alert("Please, enter right zip code. It consists of 5 numbers.");
  } else {
    getAPI(zip).then(data => {
      postData("/add", {
        date: newDate,
        temp: data.main.temp,
        content: feeling
      });
      retrieveData();
    });
  }

  document.getElementById("zip").value = "";
  document.getElementById("feelings").value = "";
}

/* Function to GET Web API Data*/
const getAPI = async zip => {
  try {
    const response = await axios.get(baseURL + zip + idCountry + apiKey);
    return response.data;
  } catch (error) {
    console.log("Error::getAPI", error.response.data);
    errorHandling(error);
  }

  function errorHandling(error) {
    if (error.response.data.cod === "404") {
      location.reload();
      return alert("Sorry, the zip code was not found. Please try again!");
    }
  }
};

/* Function to POST data */
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const message = await response.json();
    return message;
  } catch (error) {
    console.log("Error::postData", error);
  }
};

/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("Error::retrieveDatar", error);
    // appropriately handle the error
  }
};
