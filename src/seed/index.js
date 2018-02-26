Promise = require('bluebird'); // eslint-disable-line no-global-assign
const mongoose = require('../config/mongoose');
const Song = require('../api/models/song.model');
const Playlist = require('../api/models/playlist.model');

mongoose.connect()
  .then(() => {
    const promises = [];
    const songPromise = Song.remove({})
      .then(() => Song.create([{
        artist: 'Fifth Harmony',
        subTitle: 'Give It To Me Subtitle',
        rating: 5,
        comments: 'Best Ever',
        album: 'Give It To Me',
        year: '2018-02-22T00:00:00.000Z',
        number: 1,
        genre: 'pop',
        length: '05:11',
        title: 'Give It To Me',
        avatar: 'http://thatgrapejuice.net/wp-content/uploads/2015/02/fifth-harmony-avatar-thatgrapejuice.jpg',
      }, {
        artist: 'Fifth Harmony',
        subTitle: 'Alone Subtitle',
        rating: 5,
        comments: 'Best Ever',
        album: 'So Cool',
        year: '2018-02-22T00:00:00.000Z',
        number: 2,
        genre: 'pop',
        length: '04:31',
        title: 'Alone',
        avatar: 'https://static.spin.com/files/2017/08/fifth-harmony-album-1502358486-custom-0-1504195911-640x640.jpg',
      }, {
        artist: 'Fifth Harmony',
        subTitle: 'So Cool Subtitle',
        rating: 5,
        comments: 'Best Ever',
        album: 'So Cool',
        year: '2018-02-22T00:00:00.000Z',
        number: 1,
        genre: 'pop',
        length: '03:45',
        title: 'So Cool',
        avatar: 'https://www.billboard.com/files/styles/article_main_image/public/media/fifth-harmony-press-photo-2017-billboard-1548.jpg',
      }]))
      .catch(err => console.error('---Error while trying to seed Song data---\n', err));
    promises.push(songPromise);

    const playlistPromise = Playlist.remove({})
      .then(() => Playlist.create([{
        name: 'Favorites',
        description: 'My Favorite Songs',
      }, {
        name: 'Good',
        description: 'Good Songs',
      }]))
      .catch(err => console.error('---Error while trying to seed Playlist data---\n', err));
    promises.push(playlistPromise);

    return Promise.all(promises)
      .then(() => console.log('----Song and Playlist data seeded successfully----'))
      .finally(() => mongoose.disconnect());
  })
  .catch(err => console.error('----Error while trying to connect to mongodb----', err))
  .finally(() => process.exit());
