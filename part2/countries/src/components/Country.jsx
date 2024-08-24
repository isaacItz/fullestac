const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital.join(", ")}</p>
      <p>
        currencies:{" "}
        {Object.keys(country.currencies).map((c) => (
          <li key={c}>
            {country.currencies[c].name}, symbol: {country.currencies[c].symbol}
          </li>
        ))}
      </p>
      <p>
        languages:{" "}
        {Object.keys(country.languages).map((lang) => (
          <li key={lang}>{country.languages[lang]}</li>
        ))}
      </p>
      <img width={70} src={country.flags.svg} alt={country.name.common} />
    </div>
  );
};

export default Country;
