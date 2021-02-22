import {getRandomInteger} from '../util/util';

const IMG_URL = `http://picsum.photos/248/152`;
const MIN_PRICE = 100;
const MAX_PRICE = 5000;

export default [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Paris`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      avatarUrl: `${IMG_URL}?r=${Math.random()}`,
      id: 3,
      isPro: true,
      name: `Angelina`
    },
    id: 1,
    images: [`${IMG_URL}?r=${Math.random()}`, `${IMG_URL}?r=${Math.random()}`],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: `${IMG_URL}?r=${Math.random()}`,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    rating: 4.8,
    title: `Beautiful & luxurious studio at great location`,
    type: `apartment`
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Paris`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      avatarUrl: `${IMG_URL}?r=${Math.random()}`,
      id: 3,
      isPro: true,
      name: `Angelina`
    },
    id: 2,
    images: [`${IMG_URL}?r=${Math.random()}`, `${IMG_URL}?r=${Math.random()}`],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: `${IMG_URL}?r=${Math.random()}`,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    rating: 4.2,
    title: `Beautiful & luxurious studio at great location`,
    type: `apartment`
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Amsterdam`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      avatarUrl: `${IMG_URL}?r=${Math.random()}`,
      id: 3,
      isPro: true,
      name: `Angelina`
    },
    id: 3,
    images: [`${IMG_URL}?r=${Math.random()}`, `${IMG_URL}?r=${Math.random()}`],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: `${IMG_URL}?r=${Math.random()}`,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    rating: 2,
    title: `Beautiful & luxurious studio at great location`,
    type: `apartment`
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Amsterdam`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      avatarUrl: `${IMG_URL}?r=${Math.random()}`,
      id: 3,
      isPro: true,
      name: `Angelina`
    },
    id: 4,
    images: [`${IMG_URL}?r=${Math.random()}`, `${IMG_URL}?r=${Math.random()}`],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: `${IMG_URL}?r=${Math.random()}`,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    rating: 4.8,
    title: `Beautiful & luxurious studio at great location`,
    type: `apartment`
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Amsterdam`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      avatarUrl: `${IMG_URL}?r=${Math.random()}`,
      id: 3,
      isPro: true,
      name: `Angelina`
    },
    id: 5,
    images: [`${IMG_URL}?r=${Math.random()}`, `${IMG_URL}?r=${Math.random()}`],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: `${IMG_URL}?r=${Math.random()}`,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    rating: 3,
    title: `Beautiful & luxurious studio at great location`,
    type: `apartment`
  },
];
