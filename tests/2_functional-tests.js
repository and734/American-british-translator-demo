const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server.js'); // Assuming server.js exports the app

chai.use(chaiHttp);

suite('Functional Tests', () => {
    // #1
    test("Translation with text and locale fields: POST request to /api/translate", (done) => {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: "Mangoes are my favorite fruit.",
            locale: "american-to-british"
        })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
            done();
        })
    })
    // #2
    test("Translation with text and invalid locale field: POST request to /api/translate", (done) => {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: "Mangoes are my favorite fruit.",
            locale: "american-to-french"
        })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid value for locale field')
            done();
        })
    })
    // #3
    test("Translation with missing text field: POST request to /api/translate", (done) => {
        chai.request(server)
        .post('/api/translate')
        .send({
            locale: "american-to-british"
        })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field(s) missing')
            done();
        })
    })
    // #4
    test("Translation with missing locale field: POST request to /api/translate", (done) => {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: "Mangoes are my favorite fruit.",
        })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field(s) missing')
            done();
        })
    })
    // #5
    test("Translation with empty text: POST request to /api/translate", (done) => {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: "",
            locale: "american-to-british"
        })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'No text to translate')
            done();
        })
    })
    // #6
    test("Translation with text that needs no translation: POST request to /api/translate", (done) => {
        chai.request(server)
        .post('/api/translate')
        .send({
            text: "Hello World.",
            locale: "american-to-british"
        })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.translation, 'Everything looks good to me!')
            done();
        })
    })
});
