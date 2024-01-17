const domFunctions = () => {
  const mainContainer = document.querySelector(".main-container");

  function loadingIcon(status) {
    const loadingIconDiv = document.querySelector(".loading");
    const wrapperContainer = document.querySelector(".wrapper");

    if (status === "currentlyLoading") {
      loadingIconDiv.className = "loading show";
      mainContainer.className = "main-container hide";
      wrapperContainer.style.gridTemplateRows = "auto auto auto 70px";
    } else {
      loadingIconDiv.className = "loading hide";
      mainContainer.className = "main-container show";
      wrapperContainer.style.gridTemplateRows = "auto 0px auto 70px";
    }
  }

  function convertIcon(iconId) {
    switch (iconId) {
      case "01d":
        return "fa-sun";
      case "01n":
        return "fa-moon-stars";
      case "02d":
        return "fa-cloud-sun";
      case "02n":
        return "fa-cloud-moon";
      case "03d":
        return "fa-clouds-sun";
      case "03n":
        return "fa-clouds-moon";
      case "04d":
      case "04n":
        return "fa-clouds";
      case "09d":
      case "09n":
        return "fa-cloud-showers-heavy";
      case "10d":
        return "fa-cloud-sun-rain";
      case "10n":
        return "fa-cloud-moon-rain";
      case "11d":
      case "11n":
        return "fa-thunderstorm";
      case "13d":
      case "13n":
        return "fa-cloud-snow";
      case "50d":
      case "50n":
        return "fa-fog";
      default:
    }
    return false;
  }

  function getWind(windSpeed, units) {
    const roundedSpeed = Math.round(windSpeed);
    let windDesc;
    let speed = windSpeed;
    if (units === "imperial") {
      speed *= 0.44704;
    }
    if (windSpeed < 0.5) {
      windDesc = "Calm";
    } else if (speed < 1.6) {
      windDesc = "Light air";
    } else if (speed < 3.4) {
      windDesc = "Light breeze";
    } else if (speed < 5.6) {
      windDesc = "Gentle breeze";
    } else if (speed < 8) {
      windDesc = "Moderate breeze";
    } else if (speed < 10.8) {
      windDesc = "Fresh breeze";
    } else if (speed < 13.9) {
      windDesc = "Strong breeze";
    } else if (speed < 17.2) {
      windDesc = "High wind";
    } else if (speed < 20.8) {
      windDesc = "Gale";
    } else if (speed < 24.5) {
      windDesc = "Strong gale";
    } else if (speed < 28.5) {
      windDesc = "Storm";
    } else if (speed < 32.7) {
      windDesc = "Violent storm";
    } else if (speed >= 32.7) {
      windDesc = "Hurricane";
    }
    return { windDesc, roundedSpeed };
  }

  function changeUnits(units) {
    const metricButton = document.querySelector(".unitMetric");
    const imperialButton = document.querySelector(".unitImperial");
    const tempUnits = document.querySelectorAll(".unit-temp");
    const speedUnits = document.querySelectorAll(".unit-speed");

    let tempUnit;
    let windUnit;

    if (units === "metric") {
      metricButton.className = "settings-metric active";
      imperialButton.className = "settings-metric";
      tempUnit = "°F";
      windUnit = "mph";
    }

    tempUnits.forEach((unit) => {
      unit.textContent = tempUnit;
    });
    speedUnits.forEach((unit) => {
      unit.textContent = windUnit;
    });
  }

  function renderCurrentForecast(city, country, current, units) {}
  const weatherIcon = document.querySelector(".weather-icon");
  const windDegreeIcon = document.querySelector(".icon-wind-degree");
  const dataCity = document.querySelector(".header-town");
  const dataCountry = document.querySelector(".header-country");
  const dataCurrentTemp = document.querySelector(".weather-temp");
  const dataTime = document.querySelector(".header-time");
  const dataFeelsLike = document.querySelector(".desc-tempfeel");
  const dataTempDesc = document.querySelector(".data-temp-desc");
  const dataWindDesc = document.querySelector(".data-wind-desc");
  const dataWindSpeed = document.querySelector(".data-wind-speed");
  const dataVisibility = document.querySelector(".data-visibility");
  const dataClouds = document.querySelector(".data-cloudiness");
  const dataSunrise = document.querySelector(".data-sunrise");
  const dataSunset = document.querySelector(".dataSunset");

  return {
    loadingIcon,
  };
};

export default domFunctions;
