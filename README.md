Context.IO - Mailboxes know a lot. Use them.
============================================

Context.IO is the missing email API that makes it easy and fast to integrate your user's email data in your application. ContextIO-node is the official Node.js client library.

Usage of this library requires you to register for a Context.IO API key. You can get one free here: http://context.io/

Installation
------------

``` bash
$ npm install contextio
```

Getting started
---------------

The constructor requires your OAuth consumer key and secret. You can optionally specify the API version you wish to use. By default, the client will use version 2.0.

``` js
var ContextIO = require('contextio')

var ctxioClient = ContextIO({
  key: "YOUR CONTEXT.IO OAuth CONSUMER KEY",
  secret: "YOUR CONTEXT.IO OAuth CONSUMER SECRET",
  version: "SELECTED API VERSION"
})
```

We **strongly** discourage keeping OAuth credentials in source control. If you ever need to regenerate your consumer secret you can do so on our [developer console](https://console.context.io/#settings)


Making calls to the Context.IO API
----------------------------------

Complete documentation is available on http://context.io/docs/ and you can also play around with the API using the [API Explorer](https://console.context.io/#explore) on our developer console.

The design of this library follows the URI structure very closely. For example, to call:

``` http
GET /2.0/accounts?limit=15
```

your function call would be:

``` js
ctxioClient.accounts().get({limit:15}).then(function (res) {
  console.log(res);
});
```

Making it more general, the equivalent of this generic URI:

``` http
METHOD /RESOURCE/INSTANCE_ID/SUB_RESOURCE?PARAMS
```

would be:

``` js
ctxioClient.RESOURCE(INSTANCE_ID).SUB_RESOURCE().METHOD(PARAMS).then(success_handler)
```

Parameters
----------------------------------
Query parameters are passed in as an object to the method call:

```js
.get({limit:15})
```

Post parameters are passed the same way:

```js
.post({email:"test@test.com"})
```

If an endpoint supports both query params and a post body, you can pass the query params as another object:

```js
.post({email:"test@test.com"}, {foo: "bar"})
```

Success Callback
----------------------------------
Your callback function will receive one argument: an object containing the API response. The body will be JSON parsed for all endpoints that return JSON.

Endpoints that return a raw response will return the unparsed body.

The `2.0/accounts/files/content` endpoint will return an object containing the request headers and the unprocessed body. For more information, please visit our [documentation for that endpoint](https://context.io/docs/2.0/accounts/files/content).
```js
{ headers: res.headers, body: res.body }
```

Error handling
----------------------------------
All errors are thrown, so to handle these gracefully you should add a `catch()` to your API calls.

``` js
ctxioClient.accounts().get({limit:15}).then(function (res) {
  console.log(res)
}).catch(function (err) {
  console.log(err.message)
})
```

The only errors that this client produces occur when it does not have enough information to construct an api call.
This can occur when a parent resource identifier is missing or when the api key/secret/version are not being set correctly.

For example, this call would would cause an error to be thrown because there is no `account_id`.
```js
ctxioClient.accounts().messages().get()
```

There is no API error handling built in this client and all API errors will be thrown intact. Our [documentation](https://context.io/docs/) can help in understanding error codes and a handy reference for http status codes can be found over at [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Response_codes).


Testing
----------------------------------
Tests are written against [Jasmine 2.4](http://jasmine.github.io/2.4/introduction.html) and rely on instantiating a client with the `testing` option set to true

```js
var ctxioClient = ContextIO({
  key: "testy_key",
  secret: "sooper_secret",
  testing: true
})
```

This option sidesteps the http calls from `request-promise` and returns the object that would be passed to that library.

Support
----------------------------------

For API support please consult our [support site](http://support.context.io) and feel free to drop a line to support@context.io.

If you want to open an issue or PR for this library - go ahead! We'd love to hear your feedback.
