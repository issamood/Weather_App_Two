import { addSeconds, fromUnixTime } from "date-fns";

const apiFunctions = () => {
  //weather api
  const API_KEY = "a03547c4f30c166e114f29862a6a5444";

  async function getLocationData(location, units = "imperial") {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`,
        { mode: "cors" }
      );
      const locationData = await response.json();

      if (response.status >= 400) {
        return locationData;
      }
      return getCoordinateData(locationData, units);
    } catch (error) {
      return { cod: error.name, message: error.message };
    }
  }

  async function getCoordinateData(locationData, units) {
    const { coord } = locationData;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=${units}&appid=${API_KEY}`,
        { mode: "cors" }
      );
      const coordinateData = await response.json();

      //Forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=${units}&appid=${API_KEY}`,
        { mode: "cors" }
      );
      const forecastData = await forecastResponse.json();

      return extractData({ locationData, coordinateData, forecastData, units });
    } catch (error) {
      return { cod: error.name, message: error.message };
    }
  }

  async function extractData(data) {
    const englishRegionNames = new Intl.DisplayNames(["en"], {
      type: "region",
    });
    const { locationData, coordinateData, forecastData, units } = data;

    // remove this after (checking to see coordinateData is)
    console.log(locationData);
    console.log(coordinateData);
    console.log(forecastData);

    //Get and format data
    const currentDate = new Date(coordinateData.dt * 1000);
    const sunriseTime = new Date(coordinateData.sys.sunrise * 1000);
    const sunsetTime = new Date(coordinateData.sys.sunset * 1000);

    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const formattedCurrentDate = currentDate.toLocaleDateString(
      "en-US",
      dateOptions
    );
    const formattedCurrentTime = currentDate.toLocaleTimeString(
      "en-US",
      timeOptions
    );
    const combinedCurrentDate = `${formattedCurrentDate} | ${formattedCurrentTime}`;

    const formattedSunriseTime = sunriseTime.toLocaleTimeString(
      "en-US",
      timeOptions
    );
    const formattedSunsetTime = sunsetTime.toLocaleTimeString(
      "en-US",
      timeOptions
    );

    const extractedData = {
      city: locationData.name,
      country: englishRegionNames.of(locationData.sys.country),
      date: combinedCurrentDate,
      units,
      current: {
        temp: Math.round(coordinateData.main.temp),
        feelsLike: Math.round(coordinateData.main.feels_like),
        humidity: coordinateData.main.humidity,
        clouds: coordinateData.clouds,
        visibility: coordinateData.visibility / 1000,
        windSpeed: coordinateData.wind.speed,
        windDegree: coordinateData.wind.deg,
        tempDescription: coordinateData.weather[0].icon,
        sunrise: formattedSunriseTime,
        sunset: formattedSunsetTime,
      },
      daily: [],
    };

    for (let i = 0; i < 39; i += 8) {
      extractedData.daily.push({
        date: addSeconds(
          fromUnixTime(forecastData.list[i].dt),
          coordinateData.timezone_offset
        ),
        icon: forecastData.list[i].weather[0].icon,
        temp: forecastData.list[i].main.temp,
        tempMax: forecastData.list[i].main.temp_max,
        tempMin: forecastData.list[i].main.temp_min,
        windDegree: forecastData.list[i].wind.deg,
        windSpeed: forecastData.list[i].wind.speed,
      });
    }

    return extractedData;
  }

  return {
    getLocationData,
  };
};

export default apiFunctions;
