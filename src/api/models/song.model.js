const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

/**
 * Song Schema
 * @private
 */
const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: 'Untitled',
  },
  avatar: {
    type: String,
  },
  artist: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  rating: {
    type: Number,
  },
  comments: {
    type: String,
  },
  album: {
    type: String,
  },
  year: {
    type: Date,
  },
  number: {
    type: Number,
  },
  genre: {
    type: String,
  },
  length: {
    type: String,
  },
}, {
  timestamps: true,
});

/**
 * Statics
 */
songSchema.statics = {

  /**
   * Get song
   *
   * @param {ObjectId} - The objectId of song.
   * @returns {Promise<Song, APIError>}
   */
  async get(id) {
    try {
      let song;

      if (mongoose.Types.ObjectId.isValid(id)) {
        song = await this.findById(id).exec();
      }
      if (song) return song;

      throw new APIError({
        message: 'Specified song does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

};

/**
 * @typedef Song
 */
module.exports = mongoose.model('Song', songSchema);
