const express = require('express');
const controller = require('../../controllers/song.controller');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/songs List Songs
   * @apiDescription Get a list of songs
   * @apiVersion 1.0.0
   * @apiName ListSongs
   * @apiGroup Song
   *
   * @apiSuccess {Object[]} songs List of songs.
   *
   */
  .get(controller.list)
  /**
   * @api {post} v1/songs Create Song
   * @apiDescription Create a new song
   * @apiVersion 1.0.0
   * @apiName CreateSong
   * @apiGroup Song
   *
   * @apiParam  {String}                 title
   * @apiParam  {String}                 avatar
   * @apiParam  {String}                 artist
   * @apiParam  {String}                 subTitle
   * @apiParam  {Number}                 rating
   * @apiParam  {String}                 comments
   * @apiParam  {String}                 album
   * @apiParam  {String}                 year
   * @apiParam  {Number}                 number
   * @apiParam  {String}                 genre
   * @apiParam  {String}                 length
   *
   * @apiSuccess (Created 201) {String}  id
   * @apiSuccess (Created 201) {String}  title
   * @apiSuccess (Created 201) {String}  avatar
   * @apiSuccess (Created 201) {String}  artist
   * @apiSuccess (Created 201) {String}  subTitle
   * @apiSuccess (Created 201) {Number}  rating
   * @apiSuccess (Created 201) {String}  comments
   * @apiSuccess (Created 201) {String}  album
   * @apiSuccess (Created 201) {String}  year
   * @apiSuccess (Created 201) {Number}  number
   * @apiSuccess (Created 201) {String}  genre
   * @apiSuccess (Created 201) {String}  length
   *
   */
  .post(controller.create);

router
  .route('/:id')
  /**
   * @api {get} v1/songs/:id Get Song
   * @apiDescription Get song info
   * @apiVersion 1.0.0
   * @apiName GetSong
   * @apiGroup Song
   *
   * @apiParam   {String}  id            Song id
   *
   * @apiSuccess {String}  id
   * @apiSuccess {String}  title
   * @apiSuccess {String}  avatar
   * @apiSuccess {String}  artist
   * @apiSuccess {String}  subTitle
   * @apiSuccess {Number}  rating
   * @apiSuccess {String}  comments
   * @apiSuccess {String}  album
   * @apiSuccess {String}  year
   * @apiSuccess {Number}  number
   * @apiSuccess {String}  genre
   * @apiSuccess {String}  length
   *
   */
  .get(controller.get);

router
  .route('/:id/playlists')
  /**
   * @api {get} v1/songs/:id/playlists Get playlists of a song
   * @apiDescription Get playlists which a song belongs to
   * @apiVersion 1.0.0
   * @apiName GetPlaylistsOfSong
   * @apiGroup Song
   *
   * @apiParam   {String}  id            Song id
   *
   * @apiSuccess {Object[]} playlists of a song.
   *
   */
  .get(controller.getPlaylistsOfSong);

router
  .route('/add-playlists')
  /**
   * @api {post} v1/songs/add-playlists  Add a song to playlists
   * @apiDescription Add a song to playlists
   * @apiVersion 1.0.0
   * @apiName AddSongToPlaylists
   * @apiGroup Song
   *
   * @apiParam  {String}                 songId
   * @apiParam  {String[]}               playlistIds
   *
   * @apiSuccess (Created 201) {Boolean}
   *
   */
  .post(controller.addSongToPlaylists);

module.exports = router;
