import React from 'react';

const NotAvailable = () => {
  return (
    <div className="page page--gray page--404">
      <main className="page__main page__main--404">
        <div className="page__404-container container">
          <section className="page404">
            <h1 className="page404__title">Server is not available</h1>
          </section>
        </div>
      </main>
    </div>
  );
};

export default NotAvailable;
