import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import {arrayOf, shape, string} from 'prop-types';
import locationPropTypes from '../../prop-types/location';

import 'leaflet/dist/leaflet.css';

const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [20, 30]
});

const MAP_ID = `map`;
const MAP_WIDTH = `100%`;
const MAP_HEIGHT = `100%`;

const Map = ({city, points}) => {
  const mapRef = useRef();

  useEffect(() => {
    mapRef.current = leaflet.map(MAP_ID, {
      center: {
        lat: city.latitude,
        lng: city.longitude,
      },
      zoom: city.zoom,
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);

    points.forEach((point) => {
      leaflet.marker({
        lat: point.latitude,
        lng: point.longitude,
      },
      {
        icon: ICON,
      })
      .addTo(mapRef.current)
      .bindPopup(point.title);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div
      id={MAP_ID}
      style={{width: MAP_WIDTH, height: MAP_HEIGHT}}
      ref={mapRef}
    />
  );
};

Map.propTypes = {
  city: shape(locationPropTypes).isRequired,
  points: arrayOf(shape({
    title: string.isRequired,
    ...locationPropTypes,
  })).isRequired,
};

export default Map;
