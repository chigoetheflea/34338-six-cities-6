const CITIES = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`,
];

const MONTHES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const DEFAULT_CITY = {
  name: CITIES[0],
  location: {
    latitude: 52.38333,
    longitude: 4.9,
    zoom: 10,
  },
};

const PlaceCardType = {
  BASIC: `BASIC`,
  FAVORITE: `FAVORITE`,
  RELATED: `RELATED`,
};

export {
  CITIES,
  MONTHES,
  DEFAULT_CITY,
  PlaceCardType,
};
