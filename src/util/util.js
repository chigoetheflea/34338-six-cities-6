/* eslint-disable camelcase */

import {MONTHES, SortingType, ReviewSettings} from './const';

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

const getRandomArrayElement = (source) => source[getRandomInteger(0, source.length)];

const shuffleArray = (source) => {
  for (let i = source.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [source[i], source[j]] = [source[j], source[i]];
  }

  return source;
};

const getRandomArrayElements = (source, count) => {
  const additionalSource = [...source];
  const shuffledSource = shuffleArray(additionalSource);

  return shuffledSource.slice(0, count);
};

const makeSlug = (source) => source.toLowerCase().replace(/\W+/g, SLUG_REPLACER);

const adaptOfferToClient = (offer) => {
  const {is_favorite, is_premium, max_adults, preview_image, host: {is_pro, avatar_url}} = offer;

  const adaptedOffer = {
    ...offer,
    isFavorite: is_favorite,
    isPremium: is_premium,
    maxAdults: max_adults,
    previewImage: preview_image,
    host: {
      ...offer.host,
      isPro: is_pro,
      avatarUrl: avatar_url,
    },
  };

  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;
  delete adaptedOffer.host.is_pro;
  delete adaptedOffer.host.avatar_url;

  return adaptedOffer;
};

const adaptOffersToClient = (offers) => {
  const adaptedOffers = offers.map((offer) => adaptOfferToClient(offer));

  return adaptedOffers;
};

const adaptUserToClient = (user) => {
  const {avatar_url, is_pro} = user;

  const adaptedUserInfo = {
    ...user,
    avatarUrl: avatar_url,
    isPro: is_pro,
  };

  delete adaptedUserInfo.avatar_url;
  delete adaptedUserInfo.is_pro;

  return adaptedUserInfo;
};

const adaptReviewToClient = (review) => {
  const user = adaptUserToClient(review.user);

  return {
    ...review,
    user,
  };
};

const adaptReviewsToClient = (reviews) => {
  const adaptedReviews = reviews.map((review) => adaptReviewToClient(review));

  return adaptedReviews;
};

const getReviewValidityMessage = (value) => {
  const {length} = value;
  const isTextTooShort = length < ReviewSettings.MIN_LENGTH;
  const isTextEndsSoon = length > ReviewSettings.MAX_THRESHOLD && length < ReviewSettings.MAX_LENGTH;
  const charsLeft = ReviewSettings.MAX_LENGTH - length;

  if (isTextTooShort) {
    return `Your review is too short`;
  }

  if (isTextEndsSoon) {
    return `You have ${charsLeft} more characters left`;
  }

  return ``;
};

export {
  getRandomInteger,
  getFormattedDate,
  getFormattedRating,
  getSortedReviews,
  getFilteredOffersByCity,
  getSortedOffers,
  getRandomArrayElement,
  makeSlug,
  adaptOffersToClient,
  adaptOfferToClient,
  adaptUserToClient,
  getRandomArrayElements,
  adaptReviewsToClient,
  getReviewValidityMessage,
};
