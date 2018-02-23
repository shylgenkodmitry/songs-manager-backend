const Playlist = require('../models/playlist.model');
const SongPlaylistMatch = require('../models/songPlaylistMatch.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Get playlist
 * @public
 */
exports.get = async (req, res) => {
  try {
    const playlist = await Playlist.get(req.params.id);
    return res.json(playlist);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Create playlist
 * @public
 */
exports.create = async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body.data).exec();
    return res.json(playlist);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * List playlists
 * @public
 */
exports.list = async (req, res) => {
  try {
    const playlists = await Playlist.find({}).exec();
    return res.json(playlists);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get songs of the playlist
 * @public
 */
exports.getSongsOfPlaylist = async (req, res) => {
  try {
    const songs = await SongPlaylistMatch.getSongsOfPlaylist(req.params.id);
    return res.json(songs);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Add songs to the playlist
 * @public
 */
exports.addSongsToPlaylist = async (req, res) => {
  try {
    const { playlistId, songIds } = req.body.data;
    const result = await SongPlaylistMatch.addSongsToPlaylist(playlistId, songIds);
    return res.json(result);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};
