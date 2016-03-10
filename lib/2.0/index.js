"use strict"

var callService = require('../call-service')

//2.0 endpoints.
module.exports = (function(settings) {

  //Private Members
  var _callService

  //Public functions
  return new class {

    constructor() {
      if(!settings || !(settings.secret && settings.key)) {
        throw new Error("Context.IO consumer attribues 'secret' and 'key' are both required.")
      }

      //Instantiate our callService
      _callService = new callService('2.0', settings)
    }

    accounts(account_id) {
      var resource = account_id ? 'accounts/' + encodeURIComponent(account_id) + '/' : 'accounts/'

      return {
        get: _callService.get.bind(_callService, resource),
        post: _callService.post.bind(_callService, resource),
        delete: _callService.delete.bind(_callService, resource),

        connect_tokens(token) {

          if (!account_id) {
            throw new Error("account_id required for subresources")
          }

          resource += token ? 'connect_tokens/' + encodeURIComponent(token) + '/' : 'connect_tokens/'

          return {
            get: _callService.get.bind(_callService, resource),
            post: _callService.post.bind(_callService, resource),
            delete: _callService.delete.bind(_callService, resource)
          }
        },

        contacts(email) {

          if (!account_id) {
            throw new Error("account_id required for subresources")
          }

          resource += email ? 'contacts/' + encodeURIComponent(email) + '/' : 'contacts/'

          return {
            get: _callService.get.bind(_callService, resource),

            files() {

              if (!email) {
                throw new Error("email required for subresources")
              }

              return {
                get: _callService.get.bind(_callService, resource + 'files/')
              }
            },

            messages() {

              if (!email) {
                throw new Error("email required for subresources")
              }

              return {
                get: _callService.get.bind(_callService, resource + 'messages/')
              }
            },

            threads() {

              if (!email) {
                throw new Error("email required for subresources")
              }

              return {
                get: _callService.get.bind(_callService, resource + 'threads/')
              }
            },
          }
        },

        email_addresses(email) {

          if (!account_id) {
            throw new Error("account_id required for subresources")
          }

          resource += email ? 'email_addresses/' + encodeURIComponent(email) + '/' : 'email_addresses/'

          return {
            get: _callService.get.bind(_callService, resource),
            post: _callService.post.bind(_callService, resource),
            delete: _callService.delete.bind(_callService, resource)
          }
        },

        files(file_id) {

          if (!account_id) {
            throw new Error("account_id required for subresources")
          }

          resource += file_id ? 'files/' + encodeURIComponent(file_id) + '/' : 'files/'

          return {
            get: _callService.get.bind(_callService, resource),

            //Content is a special snowflake with special get functions
            content() {

              if (!file_id) {
                throw new Error("file_id required for subresources")
              }

              resource += 'content/'

              return {
                get(params) {
                  if(params && params.as_link) {
                    return _callService.getRaw(resource, params)
                  } else {
                    return _callService.getFile(resource)
                  }
                }
              }
            },


            related() {

              if (!file_id) {
                throw new Error("file_id required for subresources")
              }

              resource += 'related/'

              return {
                get: _callService.get.bind(_callService, resource)
              }
            },
          }
        },

        messages(message_id) {

          if (!account_id) {
            throw new Error("account_id required for subresources")
          }

          resource += message_id ? 'messages/' + encodeURIComponent(message_id) + '/' : 'messages/'

          return {
            get: _callService.get.bind(_callService, resource),
            post: _callService.post.bind(_callService, resource),
            delete: _callService.delete.bind(_callService, resource),

            body() {

              if (!message_id) {
                throw new Error("message_id required for subresources")
              }

              resource += 'body/'

              return {
                get: _callService.get.bind(_callService, resource)
              }
            },

            flags() {

              if (!message_id) {
                throw new Error("message_id required for subresources")
              }

              resource += 'flags/'

              return {
                get: _callService.get.bind(_callService, resource),
                post: _callService.post.bind(_callService, resource)
              }
            },

            folders() {

              if (!message_id) {
                throw new Error("message_id required for subresources")
              }

              resource += 'folders/'

              return {
                get: _callService.get.bind(_callService, resource),
                post: _callService.post.bind(_callService, resource),
                put: _callService.put.bind(_callService, resource)
              }
            },

            headers() {

              if (!message_id) {
                throw new Error("message_id required for subresources")
              }

              resource += 'headers/'

              return {
                get(params) {
                  if(params && params.raw) {
                    return _callService.getRaw(resource, params)
                  } else {
                    return _callService.get(resource)
                  }
                }
              }
            },

            source() {

              if (!message_id) {
                throw new Error("message_id required for subresources")
              }

              resource += 'source/'

              return {
                get: _callService.getRaw.bind(_callService, resource)
              }
            },

            thread() {

              if (!message_id) {
                throw new Error("message_id required for subresources")
              }

              resource += 'thread/'

              return {
                get: _callService.get.bind(_callService, resource)
              }
            },
          }
        },

        sources(label) {

          if (!account_id) {
            throw new Error("account_id required for subresources")
          }

          resource += label ? 'sources/' + encodeURIComponent(label) + '/' : 'sources/'

          return {
            get: _callService.get.bind(_callService, resource),
            post: _callService.post.bind(_callService, resource),
            delete: _callService.delete.bind(_callService, resource),

            folders(folder) {

              if (!label) {
                throw new Error("label required for subresources")
              }

              resource += folder ? 'folders/' + encodeURIComponent(folder) + '/' : 'folders/'

              return {
                get: _callService.get.bind(_callService, resource),
                put: _callService.put.bind(_callService, resource),
                delete: _callService.delete.bind(_callService, resource),

                expunge() {

                  if (!folder) {
                    throw new Error("folder required for subresources")
                  }

                  resource += 'expunge/'

                  return {
                    post: _callService.post.bind(_callService, resource)
                  }
                },

                messages(async_job_id) {

                  if (!folder) {
                    throw new Error("folder required for subresources")
                  }

                  resource += async_job_id ? 'messages/' + encodeURIComponent(async_job_id) + '/' : 'messages/'

                  return {
                    get: _callService.get.bind(_callService, resource)
                  }
                }
              }
            }
          }
        },

        sync() {

          if (!account_id) {
            throw new Error("account_id required for subresources")
          }

          resource += 'sync/'

          return {
            get: _callService.get.bind(_callService, resource),
            post: _callService.post.bind(_callService, resource)
          }
        },

        webhooks(webhook_id) {

          if (!account_id) {
            throw new Error("account_id required for subresources")
          }

          resource += webhook_id ? 'webhooks/' + encodeURIComponent(webhook_id) + '/' : 'webhooks/'

          return {
            get: _callService.get.bind(_callService, resource),
            post: _callService.post.bind(_callService, resource),
            delete: _callService.delete.bind(_callService, resource)
          }
        }
      }
    }

    connect_tokens(token) {
      var resource = token ? 'connect_tokens/' + encodeURIComponent(token) + '/' : 'connect_tokens/'

      return {
        get: _callService.get.bind(_callService, resource),
        post: _callService.post.bind(_callService, resource),
        delete: _callService.delete.bind(_callService, resource)
      }
    }

    discovery() {
      return {
        get: _callService.get.bind(_callService, 'discovery/')
      }
    }

    oauth_providers(key) {
      var resource = key ? 'oauth_providers/' + encodeURIComponent(key) + '/' : 'oauth_providers/'

      return {
        get: _callService.get.bind(_callService, resource),
        post: _callService.post.bind(_callService, resource),
        delete: _callService.delete.bind(_callService, resource)
      }
    }

  }

})
