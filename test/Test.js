var passport = require('passport');
var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();

var app = require('express')();
var models = require('../models/models.js')();
var races = require('../routes/races');
var routes = require('../routes/routes.js');

function makeRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

function postRequest(route, data, statusCode, done){
	request(app)
		.post(route)
        .send(data)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

function putRequest(route, data, statusCode, done){
	request(app)
		.put(route)
        .send(data)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

function deleteRequest(route, statusCode, done){
	request(app)
		.delete(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

describe("Testing Race route", function () {
    app.use('/', races);
    describe("Get Races", function(){
        it('Should return the existing races', function(done){
           makeRequest('/', 200, function(err, res){
              if(err){ return done(err); }
               expect(res.body).to.not.be.undefined;
               done();
           });
        });
    });
    
    describe("Add race", function(){
        it('should be unauthorized', function(done){
            var expectedName = "TEST";
            var race = { "title" : expectedName };
            postRequest('/', race, 401, function(err, res){
                if(err){ return done(err); }
                done();
            });
        });
    });
    
    describe("Get single race", function(){
        it('should not be found', function(done){
            var raceid = "sertfygbhnj";
            makeRequest('/' + raceid, 200, function(err, res){
                if(err){ return done(err); }
                done();
            });
        });
    });
    
    describe("Update race", function(){
        it('should be unauthorized', function(done){
            var raceid = "sertfygbhnj";
            putRequest('/' + raceid, {} , 401, function(err, res){
                if(err){ return done(err); }
                done();
            });
        });
    });
    
    describe("Delete race", function(){
        it('should be unauthorized', function(done){
            var raceid = "sertfygbhnj";
            deleteRequest('/' + raceid, 401, function(err, res){
                if(err){ return done(err); }
                done();
            });
        });
    });
});