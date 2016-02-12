"use strict";

module.exports = (function(_callService, account_id, label, folder, async_job_id) {

  if(!folder) {
    throw new Error("Missing required parameter 'folder'");
  }

  var resource = 'accounts/' + encodeURIComponent(account_id) + '/sources/' + encodeURIComponent(label) + '/folders/' + encodeURIComponent(folder) + '/messages/';

  if (async_job_id) {
    resource += encodeURIComponent(async_job_id) + '/';
  }

  return {
    get() {
      return _callService.get(resource);
    }
  }

});
