/* eslint-disable no-unused-vars */
const BASE_URL = 'https://final-project-dthe36jxxa-lz.a.run.app';
const URL = 'http://localhost:8080';

export const API_URL = (slug) => `${URL}/${slug}`;
// export const API_URL = (slug) => `${BASE_URL}/${slug}`;

export const BGG_API_SEARCH_BY_NAME = 'https://boardgamegeek.com/xmlapi/search?search=';

export const BGG_API_SEARCH_BY_OBJECT_ID = 'https://boardgamegeek.com/xmlapi/boardgame/';
