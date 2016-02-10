"use strict";

var clientV2 = require('./client-v2');

/**
 * Context.IO Client constructor. ContextIO.Client(consumer, version)
 * @param {String} version Default [Optional] Explicitly sets the version of the API (default is the latest stable)
 * @param {Object} consumer [Required] Default Your Context.IO consumer key and consumer secret.
 */
exports.Client = function (consumer, version) {
  var _supportedApiVersions = ['2.0'];

  var settings = {
    version: (typeof version == 'string') ? version : _supportedApiVersions[0],
    consumer: (typeof consumer == 'object') ? consumer : false
  };

  if (!settings.consumer || !('key' in settings.consumer) || !('secret' in settings.consumer)) {
    throw new Error("Missing required consumer attribute with 'key' and 'secret' properties.");
  }

  if (_supportedApiVersions.indexOf(settings.version) == -1) {
    throw new Error(settings.version+" is not a supported API version.");
  }

  return new clientV2(settings.consumer);
};
