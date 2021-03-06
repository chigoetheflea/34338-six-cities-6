import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import {arrayOf, shape, string} from 'prop-types';
import locationPropTypes from '../../prop-types/location';

import 'leaflet/dist/leaflet.css';

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [20, 30]
});

const LeafletMap = {
  id: `map`,
  width: `100%`,
  height: `100%`,
};

const Map = ({city, points}) => {
  const mapRef = useRef();
  const {id, width, height} = LeafletMap;
  const {latitude, longitude, zoom} = city;

  useEffect(() => {
    mapRef.current = leaflet.map(id, {
      center: {
        lat: latitude,
        lng: longitude,
      },
      zoom,
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
        icon,
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
      id={id}
      style={{width, height}}
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
