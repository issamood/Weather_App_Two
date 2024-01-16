//Import all necessary files
import "../style/style.css";
import apiFunctions from "../js/apiFunctions";
import domFunctions from "../js/domFunctions";

//Opted not to use a handlers file because the project is relatively small.

//Declarations
//Function to handle success from navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
function handleSuccess(position) {
  const { latitude, longitude } = position.coords;
  // Convert coordinate into location
  loadApp();
  // Run loadApp function with converted location input
}

// Function to handle error scenario from navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
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

//loadApp async function loads functions from domFunctions file to render app with given input
const loadApp = async function fetchThenRenderUsingDom(
  input = "Wilmington",
  unit = "imperial"
) {
  // domFunctions.loadingIcon("currentlyLoading");
  const weatherDataObject = await apiFunctions.getLocationData(input, unit);
  console.log(weatherDataObject);
  // domFunctions.renderApp(weatherDataObject);
  // domFunctions.loading("finishedLoading");
};

//Logic

//Initial load
if ("geolocation" in navigator) {
  // If it does, get user location.
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
} else {
  // If not, just use default input for loadApp function
  loadApp();
}
