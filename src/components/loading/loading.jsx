import React from 'react';
import {LoadingStyle} from './loading-style';

const Loading = () => {
  return (
    <div className="loading" style={LoadingStyle}>
      <img src="img/spinner.gif" alt="Loading..." width="64" height="64"/>
    </div>
  );
};

export default Loading;
