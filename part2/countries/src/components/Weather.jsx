import { useState, useEffect } from "react";
import weatherService from "@src/services/weather";

const Weather = ({ capitals }) => {
  console.log("rendering weather...");
  const [temperature, setTemperature] = useState([]);
  useEffect(() => {
    capitals.forEach((city) => {
      const temp = weatherService.getWeather(city).then((weather) => {
        setTemperature(temp => [...temp, weather.data]);
        console.log("temperature arr: ", temperature)
        console.log("promise resolved", weather);
      });
    });
  }, []);
  return (
    <>
      <h1>Weather for {capitals.join(', ')}</h1>
      <p>temperature {temperature && temperature.map((t) => <li>{t}</li>)}</p>
    </>
  );
};

export default Weather;
