"use strict";

module.exports = (function(_callService, account_id, label, folder, async_job_id) {
  var resource = 'accounts/' + account_id + '/sources/' + label + '/folders/' + folder + '/messages/';

  if (async_job_id) {
    resource += async_job_id + '/';
  }

  return {
    get() {
      return _callService.get(resource);
    }
  }

});
