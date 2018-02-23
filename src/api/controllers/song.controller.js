const Song = require('../models/song.model');
const SongPlaylistMatch = require('../models/songPlaylistMatch.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Get song
 * @public
 */
exports.get = async (req, res) => {
  try {
    const song = await Song.get(req.params.id);
    return res.json(song);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Create song
 * @public
 */
exports.create = async (req, res) => {
  try {
    const song = await Song.create(req.body.data).exec();
    return res.json(song);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * List songs
 * @public
 */
exports.list = async (req, res) => {
  try {
    const songs = await Song.find({}).exec();
    return res.json(songs);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get playlists which a song belongs to
 * @public
 */
exports.getPlaylistsOfSong = async (req, res) => {
  try {
    const playlists = await SongPlaylistMatch.getPlaylistsOfSong(req.params.id);
    return res.json(playlists);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Add song to playlists
 * @public
 */
exports.addSongToPlaylists = async (req, res) => {
  try {
    const { songId, playlistIds } = req.body.data;
    const result = await SongPlaylistMatch.addSongToPlaylists(songId, playlistIds);
    return res.json(result);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

