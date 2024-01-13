//Import all necessary files
import '../style/style.css';
import apiFunctions from '../js/apiFunctions';
import domFunctions from '../js/domFunctions';

//Opted not to use a handlers file because the project is relatively small.

const loadApp = async function getInputDataRetrieveApiAndRunDom(input = 'New York City', unit = 'imperial'){
    domFunctions.loadingIcon('currentlyLoading');
    const weatherDataObject = await apiFunctions.getLocData(input, unit);
    domFunctions.renderApp(weatherDataObject);
    domFunctions.loading('finishedLoading');
}

//Checking if geolocation exists 
if ("geolocation" in navigator) {
    //If it does, get user location.
    navigator.geolocation.getCurrentPosition(success, error, options);
    //Make a app load function that has a default input location if nothing is given
    //If an input is given then use that input value instead.
    function success(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        //Convert coordinate into location

        //Run loadApp function with converted location input

    }

    function error(){
        loadApp();
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
} else {
    //If not, just use default input for loadApp function
    loadApp();
}