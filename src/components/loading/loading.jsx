import React from 'react';

const Loading = () => {
  const loadingStyle = {
    marginTop: `200px`,
    textAlign: `center`,
  };

  return (
    <div className="loading" style={loadingStyle}>
      <img src="img/spinner.gif" alt="Loading..." width="64" height="64"/>
    </div>
  );
};

export default Loading;
