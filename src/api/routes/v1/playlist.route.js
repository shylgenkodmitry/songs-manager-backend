const express = require('express');
const controller = require('../../controllers/playlist.controller');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/playlists List Playlists
   * @apiDescription Get a list of playlists
   * @apiVersion 1.0.0
   * @apiName ListPlaylists
   * @apiGroup Playlist
   *
   * @apiSuccess {Object[]} playlists List of playlists.
   *
   */
  .get(controller.list)
  /**
   * @api {post} v1/playlists Create Playlist
   * @apiDescription Create a new playlist
   * @apiVersion 1.0.0
   * @apiName CreatePlaylist
   * @apiGroup Playlist
   *
   * @apiParam  {String}                 name
   * @apiParam  {String}                 description
   *
   * @apiSuccess (Created 201) {String}  name
   * @apiSuccess (Created 201) {String}  description
   *
   */
  .post(controller.create);

router
  .route('/:id')
  /**
   * @api {get} v1/playlists/:id Get Playlist
   * @apiDescription Get playlist info
   * @apiVersion 1.0.0
   * @apiName GetPlaylist
   * @apiGroup Playlist
   *
   * @apiParam   {String}  id            Playlist id
   *
   * @apiSuccess {String}  id
   * @apiSuccess {String}  name
   * @apiSuccess {String}  description
   *
   */
  .get(controller.get);

router
  .route('/:id/songs')
  /**
   * @api {get} v1/playlists/:id/songs Get songs of a playlist
   * @apiDescription Get songs of a playlist
   * @apiVersion 1.0.0
   * @apiName GetSongsOfPlaylist
   * @apiGroup Playlist
   *
   * @apiParam   {String}  id            Playlist id
   *
   * @apiSuccess {Object[]} songs of a playlist.
   *
   */
  .get(controller.getSongsOfPlaylist);

router
  .route('/add-songs')
  /**
   * @api {post} v1/playlists/add-songs  Add songs to a playlist
   * @apiDescription Add songs to a playlist
   * @apiVersion 1.0.0
   * @apiName AddSongsToPlaylist
   * @apiGroup Playlist
   *
   * @apiParam  {String}                 playlistId
   * @apiParam  {String[]}               songIds
   *
   * @apiSuccess (Created 201) {Boolean}
   *
   */
  .post(controller.addSongsToPlaylist);

module.exports = router;
