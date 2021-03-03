import {MONTHES} from './const';

const RATING_INCREMENT = 20;

const isItNeedsZero = (source) => source < 10 ? `0` + source : source;

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
  const month = date.getMonth();
  const day = date.getDate();

  switch (dateFormat) {
    case `yyyy-mm-dd`:
      return `${year}-${isItNeedsZero(month + 1)}-${isItNeedsZero(day + 1)}`;

    case `month-yyyy`:
      return `${MONTHES[month]} ${year}`;
  }

  return null;
};

const getSortedReviews = (reviews) => {
  const reviewsForSorting = [...reviews];

  reviewsForSorting.sort((firstReview, secondReview) => {
    if (firstReview.date < secondReview.date) {
      return -1;
    }

    if (firstReview.date > secondReview.date) {
      return 1;
    }

    return 0;
  });

  return reviewsForSorting;
};

export {
  getRandomInteger,
  getFormattedRating,
  getFormattedDate,
  getSortedReviews,
};
