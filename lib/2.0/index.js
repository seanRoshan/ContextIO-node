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
        get: _callService.get.bind(this, resource),
        post: _callService.post.bind(this, resource),
        delete: _callService.delete.bind(this, resource),

        //Connect Tokens
        connect_tokens(token) {
          resource += token ? 'connect_tokens/' + encodeURIComponent(token) + '/' : 'connect_tokens/'

          return {
            get: _callService.get.bind(this, resource),
            post: _callService.post.bind(this, resource),
            delete: _callService.delete.bind(this, resource)
          }
        },

        //Contacts
        contacts(email) {
          resource += email ? 'contacts/' + encodeURIComponent(email) + '/' : 'contacts/'

          return {
            get: _callService.get.bind(this, resource),

            //Files
            files() {
              return {
                get: _callService.get.bind(this, resource + 'files/')
              }
            },

            //Messages
            messages() {
              return {
                get: _callService.get.bind(this, resource + 'messages/')
              }
            },

            //Threads
            threads() {
              return {
                get: _callService.get.bind(this, resource + 'threads/')
              }
            },
          }
        },

        //Connect Tokens
        email_addresses(email) {
          resource += email ? 'email_addresses/' + encodeURIComponent(email) + '/' : 'email_addresses/'

          return {
            get: _callService.get.bind(this, resource),
            post: _callService.post.bind(this, resource),
            delete: _callService.delete.bind(this, resource)
          }
        },

        //Files
        files(file_id) {
          resource += file_id ? 'files/' + encodeURIComponent(file_id) + '/' : 'files/'

          return {
            get: _callService.get.bind(this, resource),

            //Content is a special snowflake with special get functions
            content() {
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


            //Related
            related() {
              resource += 'related/'

              return {
                get: _callService.get.bind(this, resource)
              }
            },
          }
        },

        //Messages
        messages(message_id) {
          resource += message_id ? 'messages/' + encodeURIComponent(message_id) + '/' : 'messages/'

          return {
            get: _callService.get.bind(this, resource),
            post: _callService.post.bind(this, resource),
            delete: _callService.delete.bind(this, resource),

            //Body
            body() {
              resource += 'body/'

              return {
                get: _callService.get.bind(this, resource)
              }
            },

            //Flags
            flags() {
              resource += 'flags/'

              return {
                get: _callService.get.bind(this, resource),
                post: _callService.post.bind(this, resource)
              }
            },

            //Folders
            folders() {
              resource += 'folders/'

              return {
                get: _callService.get.bind(this, resource),
                post: _callService.post.bind(this, resource),
                put: _callService.put.bind(this, resource)
              }
            },

            //Headers
            headers() {
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

            //Source
            source() {
              resource += 'source/'

              return {
                get: _callService.getRaw.bind(this, resource)
              }
            },

            //Thread
            thread() {
              resource += 'thread/'

              return {
                get: _callService.get.bind(this, resource)
              }
            },
          }
        },

        //Sources
        sources(label) {
          resource += label ? 'sources/' + encodeURIComponent(label) + '/' : 'sources/'

          return {
            get: _callService.get.bind(this, resource),
            post: _callService.post.bind(this, resource),
            delete: _callService.delete.bind(this, resource),

            //Folders
            folders(folder) {
              resource += folder ? 'folders/' + encodeURIComponent(folder) + '/' : 'folders/'

              return {
                get: _callService.get.bind(this, resource),
                put: _callService.put.bind(this, resource),
                delete: _callService.delete.bind(this, resource),

                //Expunge
                expunge() {
                  resource += 'expunge/'

                  return {
                    post: _callService.post.bind(this, resource)
                  }
                },

                //Messages
                messages(async_job_id) {
                  resource += async_job_id ? 'messages/' + encodeURIComponent(async_job_id) + '/' : 'messages/'

                  return {
                    get: _callService.get.bind(this, resource)
                  }
                }
              }
            }
          }
        },

        //Sync
        sync() {
          resource += 'sync/'

          return {
            get: _callService.get.bind(this, resource),
            post: _callService.post.bind(this, resource)
          }
        },

        //Webhooks
        webhooks(webhook_id) {
          resource += webhook_id ? 'webhooks/' + encodeURIComponent(webhook_id) + '/' : 'webhooks/'

          return {
            get: _callService.get.bind(this, resource),
            post: _callService.post.bind(this, resource),
            delete: _callService.delete.bind(this, resource)
          }
        }
      }
    }

    //Connect Tokens
    connect_tokens(token) {
      var resource = token ? 'connect_tokens/' + encodeURIComponent(token) + '/' : 'connect_tokens/'

      return {
        get: _callService.get.bind(this, resource),
        post: _callService.post.bind(this, resource),
        delete: _callService.delete.bind(this, resource)
      }
    }

    //Discovery
    discovery() {
      return {
        get: _callService.get.bind(this, 'discovery/')
      }
    }

    //OAuth Providers
    oauth_providers(key) {
      var resource = key ? 'oauth_providers/' + encodeURIComponent(key) + '/' : 'oauth_providers/'

      return {
        get: _callService.get.bind(this, resource),
        post: _callService.post.bind(this, resource),
        delete: _callService.delete.bind(this, resource)
      }
    }

  }

})
