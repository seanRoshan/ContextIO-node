"use strict";

var clientV2 = require('./2.0')
var clientLite = require('./lite')

//Context.IO Client constructor. ContextIO.Client({key, secret, version})
exports.Client = function (settings) {
  var _supportedApiVersions = ['2.0', 'lite']

  //Check settings
  if (!settings) {
    throw new Error("Missing ContextIO Client settings.")
  }

  if (!settings.version) {
    settings.version = _supportedApiVersions[0]
  }

  if (_supportedApiVersions.indexOf(settings.version) == -1) {
    throw new Error(settings.version+" is not a supported ContextIO API version.")
  }

  if (!(settings.key && settings.secret)) {
    throw new Error("Context.IO consumer attribues 'secret' and 'key' are both required.")
  }

  if (settings.version === '2.0') {
    return new clientV2(settings)
  } else if (settings.version === 'lite') {
    return new clientLite(settings)
  } else {
    throw new Error("Unable to create ContextIO client for that version. How did you even get here?")
  }

}
