const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

/**
 * Playlist Schema
 * @private
 */
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: 'Untitled',
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
});

/**
 * Statics
 */
playlistSchema.statics = {

  /**
   * Get playlist
   *
   * @param {ObjectId} - The objectId of playlist.
   * @returns {Promise<Playlist, APIError>}
   */
  async get(id) {
    try {
      let playlist;

      if (mongoose.Types.ObjectId.isValid(id)) {
        playlist = await this.findById(id).exec();
      }
      if (playlist) return playlist;

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
 * @typedef Playlist
 */
module.exports = mongoose.model('Playlist', playlistSchema);
