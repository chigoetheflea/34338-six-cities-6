import {MONTHES, SortingType} from './const';

const RATING_INCREMENT = 20;
const SLUG_REPLACER = `-`;

const getRandomInteger = (min, max) => {
  const randomInteger = min + Math.random() * (max - min + 1);

  return Math.floor(randomInteger);
};

const getFormattedRating = (rating) => {
  const roundedRating = Math.round(rating);

  return RATING_INCREMENT * roundedRating;
};

const getFormattedDate = ({sourceDate, dateFormat}) => {
  const date = new Date(sourceDate);
  const year = date.getFullYear();
  let month = date.getMonth();
  const day = date.getDate();

  switch (dateFormat) {
    case `yyyy-mm-dd`:
      month = month + 1;

      return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

    case `month-yyyy`:
      return `${MONTHES[month]} ${year}`;
  }

  return null;
};

const getSortedReviews = (reviews) => {
  const reviewsForSorting = [...reviews];

  reviewsForSorting.sort((prevReview, nextReview) => {
    if (prevReview.date === nextReview.date) {
      return 0;
    }

    return prevReview.date < nextReview.date ? -1 : 1;
  });

  return reviewsForSorting;
};

const getFilteredOffersByCity = (offers, currentCity) => offers.filter(({city: {name}}) => name === currentCity.name);

const getSortedOffers = (offers, sortingType) => {
  const offersForSorting = [...offers];

  switch (sortingType) {
    case SortingType.PRICE_INCREASE:
      return offersForSorting.sort((prevOffer, nextOffer) => {
        if (prevOffer.price === nextOffer.price) {
          return 0;
        }

        return prevOffer.price < nextOffer.price ? -1 : 1;
      });

    case SortingType.PRICE_DECREASE:
      return offersForSorting.sort((prevOffer, nextOffer) => {
        if (prevOffer.price === nextOffer.price) {
          return 0;
        }

        return prevOffer.price > nextOffer.price ? -1 : 1;
      });

    case SortingType.TOP_RATED:
      return offersForSorting.sort((prevOffer, nextOffer) => {
        if (prevOffer.rating === nextOffer.rating) {
          return 0;
        }

        return prevOffer.rating > nextOffer.rating ? -1 : 1;
      });
  }

  return offersForSorting;
};

const makeSlug = (source) => source.toLowerCase().replace(/\W+/g, SLUG_REPLACER);

export {
  getRandomInteger,
  getFormattedDate,
  getFormattedRating,
  getSortedReviews,
  getFilteredOffersByCity,
  getSortedOffers,
  makeSlug,
};
