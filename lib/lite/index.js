"use strict";
var callService = require('../call-service');

//Endpoints
var discovery = require('./discovery')
var users = require('./users')



module.exports = (function(consumer) {
//Private Members
var _callService;

  return new class {

    constructor() {
      if(!consumer || !(consumer.secret && consumer.key)) {
        throw new Error("Missing required consumer attribute with 'key' and 'secret' properties.");
      }
      _callService = new callService('lite', consumer);
    }

    //Users
    users(user_id) {
      return users(_callService, user_id);
    }

    //Connect Tokens

    //Discovery
    discovery() {
      return discovery(_callService);
    }

    //Oauth Providers

  }();

});
