import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bool, number, shape, string} from 'prop-types';

import {AuthorizationStatus} from '../../util/const';
import {signInStyle} from './sign-in-style';

const Header = ({authorizationStatus, loggedUser, isFrontPage = false}) => {
  const getAuthorizationBlock = (userStatus) => {
    const avatar = <div className="header__avatar-wrapper user__avatar-wrapper" />;

    return (
      userStatus === AuthorizationStatus.AUTH
        ? <Link
          to="/favorites"
          className="header__nav-link header__nav-link--profile"
        >
          {avatar}
          <span className="header__user-name user__name">{loggedUser.email}</span>
        </Link>
        : <Link
          to="/login"
          className="header__sign-in"
          style={signInStyle}
        >
          {avatar}
          <span className="header__login">Sign in</span>;
        </Link>
    );
  };

  const getHomeLinkBlock = () => {
    const logo = <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />;

    return (
      isFrontPage
        ? <a className="header__logo-link header__logo-link--active">
          {logo}
        </a>
        : <Link className="header__logo-link" to="/">
          {logo}
        </Link>
    );
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {getHomeLinkBlock()}
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
  loggedUser: state.loggedUser,
  authorizationStatus: state.authorizationStatus,
});

export default connect(mapStateToProps)(Header);
