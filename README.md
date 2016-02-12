Context.IO - Mailboxes know a lot. Use them.
============================================

Context.IO is the missing email API that makes it easy and fast to integrate your user's email data in your application. ContextIO-node is the official Node.js client library.

Usage of this library requires you to register for a Context.IO API key. You can get one free here: http://context.io/

Installation
------------

ContextIO-node is installed using npm (http://npmjs.org/)

``` bash
  $ npm install contextio
```

Getting started
---------------

Once you install the contextio package, using it in your code is simple:

``` js
  var ContextIO = require('contextio');

  var ctxioClient = new ContextIO.Client({
    key: "YOUR CONTEXT.IO CONSUMER KEY",
    secret: "YOUR CONTEXT.IO CONSUMER SECRET",
    version: "SELECTED API VERSION"
  });
```

 The `Client` constructor requires your OAuth consumer key and secret. You can optionally specify the API you wish to use. By default, the client will use version 2.0.


Making calls to the Context.IO API
---------------------------------

Complete documentation is available on http://context.io/docs/ and you can also play around with the API using the Context.IO Explorer (https://console.context.io/#explore, developer account required).

The design of this library follows the URI structure very closely. For example, to call:

``` http
GET /2.0/accounts?limit=15
```

you would do:

``` js
ctxioClient.accounts().get({limit:15}).then(function (res) {
	console.log(res);
});
```

Making it more general, the equivalent of this generic URI:

``` http
METHOD /2.0/RESOURCE/INSTANCE_ID/SUB_RESOURCE?PARAMS
```

would be:

``` js
ctxioClient.RESOURCE(INSTANCE_ID).SUB_RESOURCE().METHOD(PARAMS).then(callback_function)
```
Note that if the resource name contains an underscore character (eg. connect_tokens), you can use both connect_tokens() or connectTokens() with this library.

### Error handling
All errors are thrown, so to handle these gracefully you should add a `catch()` to your API calls.

``` js
ctxioClient.accounts().get({limit:15}).then(function (res) {
	console.log(res);
}).catch(function (err) {
  console.log(err);
});
```

### Parameters


### Promise resolution
Your success function will get some stuff, dude idk
