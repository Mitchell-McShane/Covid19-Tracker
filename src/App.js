import './App.css';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox/InfoBox';
import Map from './Map/Map';
import Table from './Table/Table';
import LineGraph from './LineGraph/LineGraph';
import { sortData } from './utils/util';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(res => res.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        })
    }
    getCountriesData();

  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      })
  };

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
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app-right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
