import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import leaflet from 'leaflet';
import {arrayOf, number, shape, string} from 'prop-types';
import locationPropTypes from '../../prop-types/location';

import 'leaflet/dist/leaflet.css';

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [20, 30],
});

const iconActive = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [20, 30],
});

const LeafletMap = {
  ID: `map`,
  WIDTH: `100%`,
  HEIGHT: `100%`,
};

const Map = ({city, points, hoveredOffer}) => {
  const mapRef = useRef();
  const {latitude, longitude, zoom} = city;

  useEffect(() => {
    mapRef.current = leaflet.map(LeafletMap.ID, {
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
      const {latitude: lat, longitude: lng, id} = point;

      leaflet.marker({
        lat,
        lng,
      },
      {
        icon: id === hoveredOffer ? iconActive : icon,
      })
      .addTo(mapRef.current)
      .bindPopup(point.title);
    });

    return () => {
      mapRef.current.remove();
    };
  }, [points, hoveredOffer]);

  return (
    <div
      id={LeafletMap.ID}
      style={{width: LeafletMap.WIDTH, height: LeafletMap.HEIGHT}}
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
  hoveredOffer: number,
};

const mapStateToProps = (state) => ({
  hoveredOffer: state.hoveredOffer,
  isRelatedLoaded: state.isRelatedLoaded,
});

export {Map};
export default connect(mapStateToProps)(Map);
