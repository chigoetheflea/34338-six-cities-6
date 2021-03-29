import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/header';

const PageNotFound = () => {
  return (
    <div className="page page--gray page--404">
      <Header />

      <main className="page__main page__main--404">
        <div className="page__404-container container">
          <section className="page404">
            <h1 className="page404__title">Page not found!</h1>
            <Link className="page404__link" to="/">
              Return to home page
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PageNotFound;
