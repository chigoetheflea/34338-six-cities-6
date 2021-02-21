const RATING_INC = 20;

const getRandomInteger = (min, max) => {
  const randomInteger = min + Math.random() * (max - min + 1);

  return Math.floor(randomInteger);
};

const getFormattedRating = (rating) => {
  const roundedRating = Math.round(rating);

  return {
    width: `${RATING_INC * roundedRating}%`
  };
};

export {
  getRandomInteger,
  getFormattedRating,
};
