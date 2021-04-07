import React, {useEffect} from 'react';
import {bool, func, string} from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../util/const';
import {getAuthCheckStatus, getAuthorizationStatus} from '../../store/user/selectors';
import {checkAuthorization} from '../../store/api-actions';

const PrivateRoute = ({render, exact, path, authorizationStatus, isAuthChecked, checkAuth}) => {
  useEffect(() => {
    if (!isAuthChecked) {
      checkAuth();
    }
  }, [isAuthChecked]);

  return (
    isAuthChecked && <Route
      path={path}
      exact={exact}
      render={
        (props) => {
          return (
            (authorizationStatus === AuthorizationStatus.AUTH)
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
  isAuthChecked: bool,
  checkAuth: func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  isAuthChecked: getAuthCheckStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  checkAuth() {
    dispatch(checkAuthorization());
  },
});

export {PrivateRoute};
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
