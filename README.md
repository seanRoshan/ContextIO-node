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

 The `Client` constructor requires your OAuth consumer key and secret. You can optionally specify the API you wish to use. By default, the client will use version 2.0.

``` js
var ContextIO = require('contextio');

var ctxioClient = ContextIO({
  key: "YOUR CONTEXT.IO OAuth CONSUMER KEY",
  secret: "YOUR CONTEXT.IO OAuth CONSUMER SECRET",
  version: "SELECTED API VERSION"
});
```

We **strongly** discourage keeping OAuth credentials in source control. If you ever need to regenerate your consumer secret you can do so on our [developer console](https://console.context.io/#settings)


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
ctxioClient.RESOURCE(INSTANCE_ID).SUB_RESOURCE().METHOD(PARAMS).then(success_handler)
```

### Success Callback
Your callback function will receive one argument, an object containing the API response. We even JSON parsed it for you!

### Error handling
All errors are thrown, so to handle these gracefully you should add a `catch()` to your API calls.


``` js
ctxioClient.accounts().get({limit:15}).then(function (res) {
	console.log(res);
}).catch(function (err) {
  console.log(err.message);
});
```

### Parameters
Query parameters are passed in as an object to the method call: `.get({limit:15})`.  
Post parameters are passed the same way: `.post({email:"test@test.com"})`.  
If an endpoint supports both query params and a post body, you can pass the query params as another object: `.post({email:"test@test.com"}, {foo: "bar"})`.
