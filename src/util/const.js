const ZOOM = 10;

const CITIES = [
  {
    name: `Paris`,
    location: {
      latitude: 48.856663,
      longitude: 2.351556,
      zoom: ZOOM,
    },
  },
  {
    name: `Cologne`,
    location: {
      latitude: 47.010209,
      longitude: 2.320878,
      zoom: ZOOM,
    },
  },
  {
    name: `Brussels`,
    location: {
      latitude: 50.846697,
      longitude: 4.352535,
      zoom: ZOOM,
    },
  },
  {
    name: `Amsterdam`,
    location: {
      latitude: 52.373057,
      longitude: 4.892557,
      zoom: ZOOM,
    },
  },
  {
    name: `Hamburg`,
    location: {
      latitude: 53.550682,
      longitude: 9.992895,
      zoom: ZOOM,
    },
  },
  {
    name: `Dusseldorf`,
    location: {
      latitude: 51.230569,
      longitude: 6.787428,
      zoom: ZOOM,
    },
  },
];

const DEFAULT_CITY = CITIES[0];

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

const PlaceCardType = {
  BASIC: `BASIC`,
  FAVORITE: `FAVORITE`,
  RELATED: `RELATED`,
};

const SortingType = {
  POPULAR: `Popular`,
  PRICE_INCREASE: `Price: low to high`,
  PRICE_DECREASE: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};

const DEFAULT_SORTING = SortingType.POPULAR;

export {
  CITIES,
  MONTHES,
  DEFAULT_CITY,
  PlaceCardType,
  DEFAULT_SORTING,
  SortingType,
};
