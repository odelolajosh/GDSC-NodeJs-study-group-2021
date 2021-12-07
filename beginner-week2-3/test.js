const chai = require('chai');
const axios = require('axios');
const { URL, getJoke } = require('./task');
const assert = chai.assert;
const fs = require('fs');

let data;
let joke;

describe('Tests for beginner week 2 tasks', () => {
  before(async () => {
    data = await axios.get(URL);
    data = data.joke;
    joke = await getJoke();
  });
  it('Get correct joke from the joke api', (done) => {
    assert.equal(data.joke, joke, 'your joke doesnt match the api response');
    done();
  });

  it('Check that prime numbers are added to file successfully', (done) => {
    const correct = '';

    fs.readFile('./myFile.txt', (err, data) => {
      assert.equal(correct.trim(), data.trim());
      done();
    });
  });
});
