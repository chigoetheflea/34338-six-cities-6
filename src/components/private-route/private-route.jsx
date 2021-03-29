import React from 'react';
import {bool, func, string} from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../util/const';

const PrivateRoute = ({render, exact, path, status}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={
        (props) => {
          return (
            status === AuthorizationStatus.AUTH
              ? render(props)
              : <Redirect to="/login"/>
          );
        }
      }
    />
  );
};

PrivateRoute.propTypes = {
  path: string.isRequired,
  exact: bool.isRequired,
  render: func.isRequired,
  status: string.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.authorizationStatus,
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
