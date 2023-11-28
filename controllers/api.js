
const express = require('express');
const router = express.Router();
const { Song, Genre, Comment, Library } = require('../models');

// GET route for all songs
router.get('/songs', async (req, res) => {
    try {
      // Fetch all songs from the database
      const allSongs = await Song.findAll();
      res.render('songs/songs', { songs: allSongs });
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

// POST route to add a song to the library
// POST route to add a song to the user's library
router.post('/library/add', async (req, res) => {
    const { songId } = req.body;
    const userId = req.user.id;
  
    try {
      // Check if songId is provided
      if (!songId) {
        return res.status(400).json({ error: 'songId is required' });
      }
  
      // Check if the song is already in the library
      const existingEntry = await Library.findOne({
        where: { songId: songId, userId: userId },
      });
  
      if (existingEntry) {
        return res.status(400).json({ error: 'Song already in the library' });
      } else {
        // If the song is not in the library, add it
        await Library.create({ songId: songId, userId: userId });
        
        // Redirect the user to the library route after successfully adding the song
        return res.redirect('/api/library');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
});

  // POST route to remove a song from the library
// Assuming you are using Express
router.post('/library/remove', async (req, res) => {
    const { songId } = req.body;
    try {
        await Library.destroy({ where: { userId: req.user.id, songId: songId } });
        res.redirect('/api/library');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  
 

  router.get('/library', async (req, res) => {
    try {
      const userLibrary = await Library.findAll({
        where: { userId: req.user.id },
        include: [Song],
      });
  
      res.render('library/library', { library: userLibrary });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;

