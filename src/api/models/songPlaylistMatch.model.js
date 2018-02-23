const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

/**
 * SongPlaylistMatch Schema
 * @private
 */
const songPlaylistMatchSchema = new mongoose.Schema({
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
  },
  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist',
  },
}, {
  timestamps: true,
});

/**
 * Statics
 */
songPlaylistMatchSchema.statics = {

  /**
   * Add a song to playlists
   *
   * @param {ObjectId} songId - The objectId of song.
   * @param {ObjectId[]} playlistIds - The objectIds of playlists.
   * @returns {Promise<any>}
   */
  addSongToPlaylists(songId, playlistIds) {
    const promises = [];
    playlistIds.forEach((playlistId) => {
      promises.push(this.findOrCreate({ songId, playlistId }));
    });
    return Promise.all(promises).then(() => true);
  },

  /**
   * Add songs to a playlist
   *
   * @param {ObjectId} playlistId - The objectId of playlist.
   * @param {ObjectId[]} songIds - The objectIds of songs.
   * @returns {Promise<any>}
   */
  addSongsToPlaylist(playlistId, songIds) {
    const promises = [];
    songIds.forEach((songId) => {
      promises.push(this.findOrCreate({ songId, playlistId }));
    });
    return Promise.all(promises).then(() => true);
  },

  /**
   * Get playlists to which a song belongs to
   *
   * @param {ObjectId} songId - The objectId of song.
   * @returns {Promise<any, APIError>}
   */
  async getPlaylistsOfSong(songId) {
    try {
      if (mongoose.Types.ObjectId.isValid(songId)) {
        return await this.find({ songId }).populate({ path: 'playlistId', model: 'Playlist' }).exec();
      }

      throw new APIError({
        message: 'Specified song does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get songs of the playlist
   *
   * @param {ObjectId} playlistId - The objectId of playlist.
   * @returns {Promise<any, APIError>}
   */
  async getSongsOfPlaylist(playlistId) {
    try {
      if (mongoose.Types.ObjectId.isValid(playlistId)) {
        return await this.find({ playlistId }).populate({ path: 'songId', model: 'Song' }).exec();
      }

      throw new APIError({
        message: 'Specified playlist does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

/**
 * @typedef SongPlaylistMatch
 */
songPlaylistMatchSchema.plugin(findOrCreate);
module.exports = mongoose.model('SongPlaylistMatch', songPlaylistMatchSchema);
