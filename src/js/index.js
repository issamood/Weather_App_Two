//Import all necessary files
import "../style/style.css";
import apiFunctions from "../js/apiFunctions";
import domFunctions from "../js/domFunctions";

//Opted not to use a handlers file because the project is relatively small.

//loadApp async function loads functions from domFunctions file to render app with given input
const loadApp = async function getInputDataRetrieveApiAndRunDom(
  input = "New York City",
  unit = "imperial"
) {
  domFunctions.loadingIcon("currentlyLoading");
  const weatherDataObject = await apiFunctions.getLocData(input, unit);
  domFunctions.renderApp(weatherDataObject);
  domFunctions.loading("finishedLoading");
};

//Checking if geolocation exists
function handleSuccess(position) {
  const { latitude, longitude } = position.coords;
  // Convert coordinate into location
  console.log(latitude);
  console.log(longitude);
  // Run loadApp function with converted location input
}

// Function to handle error scenario
function handleError() {
  console.log("Error");
  loadApp();
}

// Options for geolocation
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

if ("geolocation" in navigator) {
  // If it does, get user location.
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
} else {
  // If not, just use default input for loadApp function
  loadApp();
}
