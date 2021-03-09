const IMG_URL = `http://picsum.photos/248/152`;

export default [
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2019-05-01T14:13:56.569Z`,
    id: 1,
    rating: 4,
    user: {
      avatarUrl: `${IMG_URL}?r=${Math.random()}`,
      id: 1,
      isPro: false,
      name: `Max`
    }
  },
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2020-12-08T14:13:56.569Z`,
    id: 2,
    rating: 3,
    user: {
      avatarUrl: `${IMG_URL}?r=${Math.random()}`,
      id: 2,
      isPro: false,
      name: `Bob`
    }
  },
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2019-03-08T14:13:56.569Z`,
    id: 3,
    rating: 2,
    user: {
      avatarUrl: `${IMG_URL}?r=${Math.random()}`,
      id: 3,
      isPro: false,
      name: `Stive`
    }
  },
];
