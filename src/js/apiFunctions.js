import { addSeconds, fromUnixTime } from "date-fns";

const apiFunctions = (() => {
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

    // remove this after (checking to see wtf coordinateData is)
    console.log(locationData);
    console.log(coordinateData);
    console.log(forecastData);

    const extractedData = {
      city: locationData.name,
      country: englishRegionNames.of(locationData.sys.country),
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
        sunrise: addSeconds(
          fromUnixTime(coordinateData.sys.sunrise),
          coordinateData.timezone_offset + new Date().getTimezoneOffset() * 60
        ),
        sunset: addSeconds(
          fromUnixTime(coordinateData.sys.sunset),
          coordinateData.timezone_offset + new Date().getTimezoneOffset() * 60
        ),
      },
      daily: [],
    };

    //Process data for daily information
    // extractedData.daily = coordinateData.daily
    //   .slice(1, 8)
    //   .map((dailyForecast) => ({
    //     date: addSeconds(
    //       fromUnixTime(dailyForecast.dt),
    //       coordinateData.timezone_offset
    //     ),
    //     icon: dailyForecast.weather[0].icon,
    //     tempDescription: dailyForecast.weather[0].description,
    //     dayTemp: Math.round(dailyForecast.temp.day),
    //     nightTemp: Math.round(dailyForecast.temp.night),
    //     windDegree: dailyForecast.wind_deg,
    //     windSpeed: dailyForecast.wind_speed,
    //   }));


    // Have to fix this 
    for (let i = 0; i < 39; i + 8) {
      extractedData.daily[i].push(() => {
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
  }

  return {
    getLocationData,
  };
})();

export default apiFunctions;
