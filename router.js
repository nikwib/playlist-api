'use strict';

const playlist = require('./controllers/playlistController');
const Router = require('koa-router');
const HTTPError = require('./HTTPError');

const router = new Router({
  prefix: '/api/v1'
});

router
  .post('/playlist', playlist.addPlaylist)
  .post('/playlist/:id', playlist.addToPlaylist)
  .get('/playlist', playlist.getPlaylists)
  .get('/playlist/:id', playlist.getPlaylistInfo)
  .get('/*', ctx => { throw new HTTPError(404, 'The route does not exist'); });

module.exports = router;
