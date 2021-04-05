import React from 'react';
import {bool, func, string} from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../util/const';
import {getAuthorizationStatus} from '../../store/user/selectors';

const PrivateRoute = ({render, exact, path, authorizationStatus}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={
        (props) => {
          return (
            authorizationStatus === AuthorizationStatus.AUTH
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
  authorizationStatus: string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
