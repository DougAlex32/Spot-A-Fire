const express = require('express');
const router = express.Router();
const { Song, Genre, Comment } = require('../models');

// GET route for all songs
router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.render('songs/songs', { songs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST route to create a new song
router.post('/songs', async (req, res) => {
  const { title, genre } = req.body;

  try {
    const newSong = await Song.create({ title, genre });
    res.status(201).json(newSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for all genres
router.get('/genres', async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.render('genres/genres', { genres });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST route to create a new genre
router.post('/genres', async (req, res) => {
  const { name } = req.body;

  try {
    const newGenre = await Genre.create({ name });
    res.status(201).json(newGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Additional routes for creating playlists, adding/editing/deleting comments, etc.

module.exports = router;

