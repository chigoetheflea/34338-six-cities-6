import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page';

const App = ({placesCount}) => {
  return (
    <MainPage
      placesCount={placesCount}
    />
  );
};

App.propTypes = {
  placesCount: PropTypes.number.isRequired,
};

export default App;
