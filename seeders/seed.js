const { faker } = require('@faker-js/faker');
const { Song, Genre } = require('../models');

async function seedDatabase() {
  // Seed genres
  const genres = [];
  for (let i = 0; i < 5; i++) {
    genres.push({
      name: faker.music.genre(),
    });
  }
  const seededGenres = await Genre.bulkCreate(genres, { returning: true });

  // Seed songs
  const songs = [];
  for (let i = 0; i < 20; i++) {
    songs.push({
      title: faker.music.songName(),
      genre: seededGenres[Math.floor(Math.random() * seededGenres.length)].name,
    });
  }
  await Song.bulkCreate(songs, { returning: true });

  console.log('Database seeded successfully');
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await seedDatabase();
  },

  down: async (queryInterface, Sequelize) => {
    // Add logic to undo seed data if needed
  },
};

