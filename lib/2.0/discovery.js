"use strict";

module.exports = (function(_callService) {
  
  var resource = 'discovery/';

  return {
    get(params) {
      return _callService.get(resource, params);
    }
  }

});
