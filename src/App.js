import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide")

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

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="App">
      <div className="app-left">
        <div className="app-header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}



            </Select>
          </FormControl>
        </div>

        <div className="app-stats">
          <InfoBox title="Coronavirus Cases" cases={136} total={2000} />

          <InfoBox title="Recovered" cases={1364} total={3000} />

          <InfoBox title="Deaths" cases={1362} total={4000} />
        </div>

        <Map />
      </div>
      <Card className="app-right">
        <CardContent>
         <h3>Live Cases by Country</h3>
         <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
