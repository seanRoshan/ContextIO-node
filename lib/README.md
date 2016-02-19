Dev Notes
============================================

The workhorse of this library is the `call-service`, that dude handles all the OAUTH signing and request making. We're using promises over straight up callback functions, so you'll want to use `then()` and `catch()` to handle responses from it.

There is _no_ api error handling in the library right now. The policy is "Hit the api and throw errors if it is unhappy."

Responses will be parsed as JSON, with the exception of the `accounts/files` endpoint on 2.0.

The different clients are really just a description of the endpoints bound to the `call-service` using the wonderful `bind()`. If this looks like witchcraft I recommend the [MDN article on bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
