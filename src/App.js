import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, } from '@material-ui/core';

function App() {

  const [countries, setCountries] = useState([]);

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));

        setCountries(countries);
      })
    }
    getCountriesData();

  }, [])

  return (
    <div className="App">
      <div className="app-header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">

            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}



          </Select>
        </FormControl>
      </div>

    </div>
  );
}

export default App;
