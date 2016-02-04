const parseDate = require('./utils').parseDate;

module.exports = {

  endpoint: 'http://thegamesdb.net/api',
  staticUrl: 'http://thegamesdb.net/images',

  gameDetail: [
    { name: 'id', parser: parseInt },
    { name: 'GameTitle', rename: 'title' },
    { name: 'Platform', rename: 'platform' },
    { name: 'ReleaseDate', rename: 'releaseDate', parser: parseDate },
    { name: 'Overview', rename: 'overview' },
    { name: 'ESRB' },
    { name: 'Genres', rename: 'genres', parser: G => G.genre },
    { name: 'Players', rename: 'players' },
    { name: 'Youtube', rename: 'youtube' },
    { name: 'Publisher', rename: 'publisher' },
    { name: 'Developer', rename: 'developer' },
    { name: 'Rating', rename: 'rating', parser: parseFloat },
    { name: 'Similar', rename: 'similar' },
    { name: 'Images', rename: 'images' },
  ],

  gameList: [
    { name: 'id', parser: parseInt },
    { name: 'GameTitle', rename: 'title' },
    { name: 'ReleaseDate', rename: 'releaseDate', parser: parseDate },
    { name: 'Platform', rename: 'platform' },
  ],

  platformDetail: [
    { name: 'id', parser: parseInt },
    { name: 'Platform', rename: 'name' },
    { name: 'overview' },
    { name: 'developer' },
    { name: 'manufacter' },
    { name: 'cpu' },
    { name: 'memory' },
    { name: 'graphics' },
    { name: 'sound' },
    { name: 'display' },
    { name: 'media' },
    { name: 'maxcontrollers', rename: 'maxControllers', parser: parseInt },
    { name: 'Rating', rename: 'rating', parser: parseFloat },
  ],

  platformList: [
    { name: 'id', parser: parseInt },
    { name: 'name' },
    { name: 'alias' },
  ],
};
