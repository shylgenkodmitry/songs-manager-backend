const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const songRoutes = require('./song.route');
const playlistRoutes = require('./playlist.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/songs', songRoutes);
router.use('/playlists', playlistRoutes);

module.exports = router;
