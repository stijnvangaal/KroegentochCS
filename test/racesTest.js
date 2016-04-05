var passport = require('passport');
var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();

var models = require('../models/models.js')();
var app = require('express')();
var races = require('../routes/races');
var login = require('../routes/routes');

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

// describe("Testing User items", function(){
//     app.use('/', login);
//     describe("Register", function(){
//        it("Should have registered", function(done){
//            var user = {'username': 'user', 'password' : "test" };
//            request(app)
// 		    .post('/signup')
//             .send(user)
// 		    .end(done);
//        });
//     }); 
// });











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
        it('should return a newly created race', function(done){
            var expectedName = "TEST";
            var race = { "title" : expectedName };
            console.log('testing');
            putRequest('/', race, 200, function(err, res){
                console.log('post ended');
                if(err){ return done(err); }
                expect(res.body).to.have.property('title');
                expect(res.body.name).to.not.be.undefined;
                expect(res.body.name).to.equal(expectedName);
                done();
            });
        });
    });
});