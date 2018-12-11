const CallService = require("./call-service");

// lite endpoints.
const APIVLITE = settings => {
  if (!settings || !(settings.secret && settings.key)) {
    throw new Error(
      "Context.IO consumer attribues 'secret' and 'key' are both required."
    );
  }

  const _callService = CallService("lite", settings);

  return {
    app() {
      let resource = "app/";

      return {
        status_callback_url() {
          resource += "status_callback_url/";

          return {
            get: _callService.get.bind(_callService, resource),
            post: _callService.post.bind(_callService, resource),
            delete: _callService.delete.bind(_callService, resource)
          };
        },

        logs() {
          resource += "logs/";

          return {
            webhooks() {
              resource += "webhooks/";

              return {
                get: _callService.get.bind(_callService, resource)
              };
            },

            calls() {
              resource += "calls/";

              return {
                get: _callService.get.bind(_callService, resource)
              };
            }
          };
        }
      };
    },

    resource(resource_url) {
      if (!resource_url) {
        throw new Error("resource required for explicit resource call");
      }

      return {
        get: _callService.get.bind(_callService, resource_url),
        post: _callService.post.bind(_callService, resource_url),
        delete: _callService.delete.bind(_callService, resource_url),
        put: _callService.put.bind(_callService, resource_url)
      };
    },

    users(user_id) {
      let resource = user_id
        ? "users/" + encodeURIComponent(user_id) + "/"
        : "users/";

      return {
        get: _callService.get.bind(_callService, resource),
        post: _callService.post.bind(_callService, resource),
        delete: _callService.delete.bind(_callService, resource),

        connect_tokens(token) {
          if (!user_id) {
            throw new Error("user_id required for subresources");
          }

          resource += token
            ? "connect_tokens/" + encodeURIComponent(token) + "/"
            : "connect_tokens/";

          return {
            get: _callService.get.bind(_callService, resource),
            post: _callService.post.bind(_callService, resource),
            delete: _callService.delete.bind(_callService, resource)
          };
        },

        contacts() {
          if (!user_id) {
            throw new Error("user_id required for subresources");
          }

          resource += "contacts";
          return {
            get: _callService.get.bind(_callService, resource)
          };
        },

        email_accounts(label) {
          if (!user_id) {
            throw new Error("user_id required for subresources");
          }

          resource += label
            ? "email_accounts/" + encodeURIComponent(label) + "/"
            : "email_accounts/";

          return {
            get: _callService.get.bind(_callService, resource),
            post: _callService.post.bind(_callService, resource),
            delete: _callService.delete.bind(_callService, resource),

            folders(folder) {
              if (!label) {
                throw new Error("label required for subresources");
              }

              resource += folder
                ? "folders/" + encodeURIComponent(folder) + "/"
                : "folders/";

              return {
                get: _callService.get.bind(_callService, resource),
                post: _callService.post.bind(_callService, resource),

                messages(message_id) {
                  if (!folder) {
                    throw new Error("folder required for subresources");
                  }

                  resource += message_id
                    ? "messages/" + encodeURIComponent(message_id) + "/"
                    : "messages/";

                  return {
                    get: _callService.get.bind(_callService, resource),
                    put: _callService.put.bind(_callService, resource),

                    attachments(attachment_id) {
                      if (!message_id) {
                        throw new Error("message_id required for subresources");
                      }

                      resource += attachment_id
                        ? "attachments/" +
                          encodeURIComponent(attachment_id) +
                          "/"
                        : "attachments/";

                      return {
                        get: _callService.get.bind(_callService, resource),
                        getFile: _callService.getFile.bind(
                          _callService,
                          resource
                        )
                      };
                    },

                    body() {
                      if (!message_id) {
                        throw new Error("message_id required for subresources");
                      }

                      resource += "body/";

                      return {
                        get: _callService.get.bind(_callService, resource)
                      };
                    },

                    flags() {
                      if (!message_id) {
                        throw new Error("message_id required for subresources");
                      }

                      resource += "flags/";

                      return {
                        get: _callService.get.bind(_callService, resource)
                      };
                    },

                    headers() {
                      if (!message_id) {
                        throw new Error("message_id required for subresources");
                      }

                      resource += "headers/";

                      return {
                        get: _callService.get.bind(_callService, resource)
                      };
                    },

                    raw() {
                      if (!message_id) {
                        throw new Error("message_id required for subresources");
                      }

                      resource += "raw/";

                      return {
                        get: _callService.getRaw.bind(_callService, resource)
                      };
                    },

                    read() {
                      if (!message_id) {
                        throw new Error("message_id required for subresources");
                      }

                      resource += "read/";

                      return {
                        post: _callService.post.bind(_callService, resource),
                        delete: _callService.delete.bind(_callService, resource)
                      };
                    }
                  };
                }
              };
            }
          };
        },

        webhooks(webhook_id) {
          if (!user_id) {
            throw new Error("user_id required for subresources");
          }

          resource += webhook_id
            ? "webhooks/" + encodeURIComponent(webhook_id) + "/"
            : "webhooks/";

          return {
            get: _callService.get.bind(_callService, resource),
            post: _callService.post.bind(_callService, resource),
            delete: _callService.delete.bind(_callService, resource)
          };
        }
      };
    },

    connect_tokens(token) {
      const resource = token
        ? "connect_tokens/" + encodeURIComponent(token) + "/"
        : "connect_tokens/";

      return {
        get: _callService.get.bind(_callService, resource),
        post: _callService.post.bind(_callService, resource),
        delete: _callService.delete.bind(_callService, resource)
      };
    },

    discovery() {
      return {
        get: _callService.get.bind(_callService, "discovery/")
      };
    },

    oauth_providers(key) {
      const resource = key
        ? "oauth_providers/" + encodeURIComponent(key) + "/"
        : "oauth_providers/";

      return {
        get: _callService.get.bind(_callService, resource),
        post: _callService.post.bind(_callService, resource),
        delete: _callService.delete.bind(_callService, resource)
      };
    },

    webhooks(webhook_id) {
      const resource = webhook_id
        ? "webhooks/" + encodeURIComponent(webhook_id) + "/"
        : "webhooks/";

      return {
        get: _callService.get.bind(_callService, resource),
        post: _callService.post.bind(_callService, resource),
        delete: _callService.delete.bind(_callService, resource)
      };
    }
  };
};

module.exports = APIVLITE;
