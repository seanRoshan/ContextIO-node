"use strict";

var clientV2 = require('./2.0');

//Context.IO Client constructor. ContextIO.Client({key, secret, version})
exports.Client = function (settings) {
  var _supportedApiVersions = ['2.0', 'lite']

  //Check settings
  if(!settings) {
    throw new Error("Missing ContextIO Client settings.")
  }

  if(!settings.version) {
    settings.version = _supportedApiVersions[0]
  }

  if (_supportedApiVersions.indexOf(settings.version) == -1) {
    throw new Error(settings.version+" is not a supported ContextIO API version.")
  }

  if (!(settings.key && settings.secret)) {
    throw new Error("Missing required consumer attribute with 'key' and 'secret' properties.")
  }

  return new clientV2(settings)


};
