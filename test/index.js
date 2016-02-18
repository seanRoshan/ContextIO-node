"use strict";
var ContextIO = require('../../ContextIO-node');

var ctxioClient = new ContextIO.Client({
  version: '2.0',
  key: "vbkutn4r",
  secret: "6nd8T5XW06ONLgVx"
});

ctxioClient.oauth_providers().get().then(function(res) {
	console.log(res);
}).catch(function(err) {
  console.log(err);
});
