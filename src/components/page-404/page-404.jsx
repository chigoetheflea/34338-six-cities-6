import React from 'react';
import {Link} from 'react-router-dom';
import InnerPageHeader from "../inner-page-header/inner-page-header";

const Page404 = () => {
  return (
    <div className="page page--gray page--404">
      <InnerPageHeader />

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

export default Page404;
