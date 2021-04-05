import React, {useRef} from 'react';
import {connect} from 'react-redux';
import {func} from 'prop-types';
import browserHistory from '../../services/browser-history';

import Header from '../header/header';
import {changeCity, getOffers} from '../../store/actions';
import {login} from '../../store/api-actions';
import {CITIES, Path} from '../../util/const';
import {getRandomArrayElement} from '../../util/util';

const Login = ({loginUser, updateCity}) => {
  const loginRef = useRef();
  const passwordRef = useRef();

  const handleUserLogin = (evt) => {
    evt.preventDefault();

    const userData = {
      login: loginRef.current.value,
      password: passwordRef.current.value,
    };

    loginUser(userData);
  };

  const randomCity = getRandomArrayElement(CITIES);
  const {name} = randomCity;

  const handleCityChange = () => {
    updateCity(randomCity);
  };

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
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
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button
                onClick={handleCityChange}
                className="locations__item-link"
              >
                <span>{name}</span>
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
};

const mapDispatchToProps = (dispatch) => ({
  loginUser(data) {
    dispatch(login(data));
  },
  updateCity(city) {
    dispatch(changeCity(city));
    dispatch(getOffers());

    browserHistory.push(Path.HOME);
  },
});

export default connect(null, mapDispatchToProps)(Login);
