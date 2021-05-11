import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import CardTopInfo from "../components/CardTopInfo";
import Map from "../components/Map";
import ToolbarTop from "../components/Toolbar";
import { sortData, prettyPrintStat } from "../components/util";
import "leaflet/dist/leaflet.css";
import CountriesTable from "../components/CountriesTable";
import LineGraph from "../components/LineGraph";
import "../styles/dashboard.css";
import CopyrightC from "../components/CopyrightC";

function DashboardP() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  return (
    <div>
      {/* toolbar */}
      <ToolbarTop
        country={country}
        onCountryChange={onCountryChange}
        countries={countries}
      />
      {/* body */}
      <Container maxWidth="lg">
        <Grid style={{ marginTop: 24 }} container spacing={3}>
          {/* cardsinfo, map */}
          <Grid item xs={12} md={8} sm={12}>
            <Grid container spacing={3}>
              {/* cardinfo */}

              <Grid item xs={4} md={4} sm={4}>
                <CardTopInfo
                  isRed
                  onClick={(e) => setCasesType("cases")}
                  title="Cases"
                  active={casesType === "cases"}
                  cases={prettyPrintStat(countryInfo.todayCases)}
                  total={"total :" + prettyPrintStat(countryInfo.cases)}
                  styleColor="red"
                />
              </Grid>
              <Grid item xs={4} md={4} sm={4}>
                <CardTopInfo
                  onClick={(e) => setCasesType("recovered")}
                  title="Recovered"
                  active={casesType === "recovered"}
                  cases={prettyPrintStat(countryInfo.todayRecovered)}
                  total={"total :" + prettyPrintStat(countryInfo.recovered)}
                  styleColor="green"
                />
              </Grid>
              <Grid item xs={4} md={4} sm={4}>
                <CardTopInfo
                  isRed
                  onClick={(e) => setCasesType("deaths")}
                  title="Deaths"
                  styleColor="red"
                  active={casesType === "deaths"}
                  cases={prettyPrintStat(countryInfo.todayDeaths)}
                  total={"total :" + prettyPrintStat(countryInfo.deaths)}
                />
              </Grid>

              {/* map */}
              <Grid item xs={12} md={12} sm={12}>
                <Map
                  countries={mapCountries}
                  casesType={casesType}
                  center={mapCenter}
                  zoom={mapZoom}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* table countries */}
          <Grid item xs={12} md={4} sm={12}>
            <CountriesTable countries={tableData} />
          </Grid>
        </Grid>
        {/* graph */}
        <Typography
          component="h6"
          variant="h6"
          color="inherit"
          align="left"
          style={{ marginTop: 24, fontWeight: 600 }}
          noWrap>
          Coronavirus evolution last 120 days
        </Typography>
        <Grid style={{ marginTop: 24 }} container>
          <Grid item xs={12} md={12} sm={12}>
            <LineGraph casesType={casesType} />
          </Grid>
        </Grid>
      </Container>
      <CopyrightC />
    </div>
  );
}

export default DashboardP;
