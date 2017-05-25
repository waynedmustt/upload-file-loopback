/*
 * Model Attachment Unit Testing
 *
 * Copyright (c) 2017 Dimas Dewantara
 *
 * $Date: 5/20/17
 */

'use strict';

var request = require('supertest');
var app = require('../../server/server');
var expect = require('chai').expect;

describe('Model Attachment Upload', function() {
  this.timeout(0);

  it('Should able upload file', function(done) {
    request(app)
      .post('/api/attachments')
      .attach('file', 'data/upload-test.txt')
      .expect(function(res) {
        expect(res.body.files.file[0].name).to.equal('upload-test.txt');
        expect(res.body.files.file[0].type).to.equal('text/plain');
        expect(res.body.files.file[0].size).to.equal(4);
      })
    .end(done);
  });

  it('Should not able upload file', function(done) {
    request(app)
        .post('/api/attachments')
        .attach('files', 'data/upload-test.txt')
        .expect(function(res) {
          expect(res.body.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Unexpected Request');
        })
    .end(done);
  });
});

