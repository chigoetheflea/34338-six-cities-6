import React, {useRef, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bool, func, string} from 'prop-types';
import browserHistory from '../../services/browser-history';
import {Redirect} from 'react-router';

import Header from '../header/header';
import {changeCity} from '../../store/actions';
import {login} from '../../store/api-actions';
import {CITIES, DEFAULT_CITY, Path, AuthorizationStatus} from '../../util/const';
import {getRandomArrayElement, getLoginValidityMessage} from '../../util/util';
import {getAuthorizationStatus, getLoginError} from '../../store/user/selectors';

const ERROR_MESSAGE = `Error. Try again`;

const Login = ({loginUser, updateCity, authorizationStatus, loginError}) => {
  const loginRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    if (loginError) {
      setLoginForm({
        ...loginForm,
        isError: true,
        isDisabled: true,
      });
    }
  }, [loginError]);

  const [loginForm, setLoginForm] = useState({
    isDisabled: true,
    isError: false,
  });

  const handleUserLogin = (evt) => {
    evt.preventDefault();

    const userData = {
      login: loginRef.current.value,
      password: passwordRef.current.value,
    };

    loginUser(userData);
  };

  const randomCity = getRandomArrayElement(CITIES) || DEFAULT_CITY;

  const handleCityChange = () => {
    updateCity(randomCity);
  };

  const handleFieldChange = (evt) => {
    const target = evt.target;
    const {value} = target;

    target.setCustomValidity(getLoginValidityMessage(value));
    target.reportValidity();

    setLoginForm({
      ...loginForm,
      isDisabled: !formRef.current.checkValidity(),
    });
  };

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return (
      <Redirect to={Path.HOME} />
    );
  }

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title" data-testid="login-title">Sign in</h1>
            <form
              ref={formRef}
              onSubmit={handleUserLogin}
              className="login__form form"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  data-testid="email"
                  onChange={handleFieldChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  data-testid="password"
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                data-testid="login-button"
                disabled={loginForm.isDisabled ? `disabled` : ``}
              >
                Sign in
              </button>
              {loginForm.isError && <p>{ERROR_MESSAGE}</p>}
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button
                onClick={handleCityChange}
                className="locations__item-link"
              >
                <span>{randomCity.name}</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

Login.propTypes = {
  loginUser: func.isRequired,
  updateCity: func.isRequired,
  authorizationStatus: string,
  loginError: bool,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  loginError: getLoginError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loginUser(data) {
    dispatch(login(data));
  },
  updateCity(city) {
    dispatch(changeCity(city));

    browserHistory.push(Path.HOME);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
