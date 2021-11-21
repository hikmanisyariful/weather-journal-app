/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const idCountry = ",US";

// Personal API Key for OpenWeatherMap API
const apiKey = `&appid=632803a19551c6a857ac74b54a1b12d3`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generate);

/* Function called by event listener */
function generate(e) {
  const zip = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  getApi(zip).then(data => {
    postData('/add', {date: newDate, temp: data.main.temp, content: feeling})
    retrieveData('/all')
  });
}

/* Function to GET Web API Data*/
const getApi = async zip => {
  const response = await fetch(baseURL + zip + idCountry + apiKey)
  try {
    const data = await response.json();
    return data
  } catch (error) {
    console.log('Error::getApi', error);
  }
};

/* Function to POST data */
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const message = await response.json()
    return message
  } catch (error) {
    console.log('Error::postData', error)
  }
} 

/* Function to GET Project Data */
const retrieveData = async (url) => {
  const response = await fetch(url)

  try {
    const newEntry = await response.json()
    document.getElementById('date').innerHTML = newEntry[newDate].date;
    document.getElementById('temp').innerHTML = `${(newEntry[newDate].temp)} degrees`;
    document.getElementById('content').innerHTML = newEntry[newDate].content;
  } catch (error) {
    console.log('Error::retrieveData', error)
  }
}
