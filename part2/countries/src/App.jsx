import { useState, useEffect } from "react";
import countriesService from "@src/services/countries";
import Country from "@src/components/Country";
import Weather from "@src/components/Weather";
function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState([]);
  const [tooMany, setTooMany] = useState(false);
  const [country, setCountry] = useState(null);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    countriesService.getAll().then((data) => {
      console.log(data);
      setCountries(data.data);
      setFilter(data.data);
    });
  }, []);

  const handleChange = (event) => {
    const country = event.target.value;
    if (country.length === 0) {
      setFilter(countries);
      setTooMany(false);
      setShowButton(false);
      return;
    }

    let filteredCountries = countries.filter((c) =>
      c.name.common.toLowerCase().startsWith(country.toLowerCase())
    );

    setFilter(filteredCountries);
    setTooMany(filteredCountries.length > 10);
    setShowButton(true);

    if (filteredCountries?.length === 1) {
      setCountry(filteredCountries[0]);
    } else {
      setCountry(null);
    }
  };

  const handleShowButtonClick = (name) => {
    setShowButton(!showButton);
    const country = countries.find((country) => country.name.common === name);
    setCountry(country);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <input type="button" value="new search" onClick={() => setCountry("")} />
      {tooMany && <p>Too many countries</p>}

      {!tooMany &&
        !country &&
        filter?.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            {showButton && (
              <input
                type="button"
                value="show"
                onClick={() => {
                  handleShowButtonClick(country.name.common);
                }}
              />
            )}
          </li>
        ))}

      {country && (
        <>
          <Country country={country} /> <Weather capitals={country.capital} />
        </>
      )}
    </div>
  );
}

export default App;
