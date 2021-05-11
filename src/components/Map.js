import React from "react";
import { Paper } from "@material-ui/core";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "../styles/map.css";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  return (
    <Paper elevation={4} className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </Paper>
  );
}

export default Map;
