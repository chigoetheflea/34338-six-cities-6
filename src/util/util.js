const RATING_INCREMENT = 20;

const getRandomInteger = (min, max) => {
  const randomInteger = min + Math.random() * (max - min + 1);

  return Math.floor(randomInteger);
};

const getFormattedRating = (rating) => {
  const roundedRating = Math.round(rating);

  return RATING_INCREMENT * roundedRating;
};

export {
  getRandomInteger,
  getFormattedRating,
};
