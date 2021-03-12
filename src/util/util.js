import {MONTHES} from './const';

const RATING_INCREMENT = 20;

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

export {
  getRandomInteger,
  getFormattedRating,
  getFormattedDate,
  getSortedReviews,
};
