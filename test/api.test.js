const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server'); // Assuming your Express app instance is exported from server.js
const { Song, Genre, Comment, Library } = require('../models');

before(function (done) {
  db.sequelize.sync({ force: true }).then(function () {
    done();
  });
});

describe('API Routes', function () {
  let testSongId;
  let testGenreId;

  before(async () => {
    // Create a test song
    const testSong = await Song.create({
      title: 'Test Song',
      genre: 'Test Genre',
    });
    testSongId = testSong.id;

    // Create a test genre
    const testGenre = await Genre.create({
      name: 'Test Genre',
    });
    testGenreId = testGenre.id;
  });

  describe('GET /api/songs', function () {
    it('should return all songs', function (done) {
      request(app)
        .get('/api/songs')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /api/songs', function () {
    it('should create a new song', function (done) {
      request(app)
        .post('/api/songs')
        .send({ title: 'New Song', genre: 'New Genre' })
        .expect(201)
        .end(function (err, res) {
          expect(res.body).to.have.property('id');
          done();
        });
    });
  });

  describe('GET /api/genres', function () {
    it('should return all genres', function (done) {
      request(app)
        .get('/api/genres')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /api/genres', function () {
    it('should create a new genre', function (done) {
      request(app)
        .post('/api/genres')
        .send({ name: 'New Genre' })
        .expect(201)
        .end(function (err, res) {
          expect(res.body).to.have.property('id');
          done();
        });
    });
  });

  describe('POST /api/library/add', function () {
    it('should add a song to the library', function (done) {
      request(app)
        .post('/api/library/add')
        .send({ songId: testSongId })
        .expect(302) // Assuming you are using redirect
        .end(function (err, res) {
          // Add additional checks if needed
          done();
        });
    });
  });

  describe('POST /api/library/remove', function () {
    it('should remove a song from the library', function (done) {
      request(app)
        .post('/api/library/remove')
        .send({ songId: testSongId })
        .expect(302) // Assuming you are using redirect
        .end(function (err, res) {
          // Add additional checks if needed
          done();
        });
    });
  });

  describe('GET /api/library', function () {
    it('should get the user library', function (done) {
      request(app)
        .get('/api/library')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
