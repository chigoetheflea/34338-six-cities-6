import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bool, number, shape, string} from 'prop-types';

import {AuthorizationStatus, Path} from '../../util/const';
import {getAuthorizationStatus, getLoggedUser} from '../../store/user/selectors';

const Header = ({authorizationStatus, loggedUser, isFrontPage = false}) => {
  const getAuthorizationBlock = (userStatus) => {
    return (
      userStatus === AuthorizationStatus.AUTH
        ? <Link
          to={Path.FAVORITES}
          className="header__nav-link header__nav-link--profile"
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img src={loggedUser.avatarUrl} alt="Avatar" width="20px" height="20px" />
          </div>
          <span className="header__user-name user__name">{loggedUser.email}</span>
        </Link>
        : <Link
          to={Path.LOGIN}
          className="header__nav-link header__nav-link--profile"
        >
          <span className="header__login">Sign in</span>
        </Link>
    );
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link"
              style={{pointerEvents: isFrontPage ? `none` : `auto`}}
              to={Path.HOME}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {getAuthorizationBlock(authorizationStatus)}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isFrontPage: bool,
  authorizationStatus: string.isRequired,
  loggedUser: shape({
    avatarUrl: string,
    email: string.isRequired,
    id: number.isRequired,
    isPro: bool.isRequired,
    name: string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  loggedUser: getLoggedUser(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(Header);
