var ContextIO = require('../../ContextIO-node')

describe('ContextIO Tests', function () {
  it('check a nested 2.0 resource', function (done) {
    var ctxioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      debug: true
    })

    ctxioClient.accounts('account_id').messages('message_id').get().then(function (res) {
      expect(res.url).toBe('https://api.context.io/2.0/accounts/account_id/messages/message_id/')
      done()
    })
  })

  it('check a 2.0 resource under accounts with no account_id', function (done) {
    var ctxioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      debug: true
    })

    expect(function () {
      ctxioClient.accounts().messages().get().then(function (res) {
        // Should have errored out of here
        expect(true).toBe(false)
      })
    }).toThrow(new Error('account_id required for subresources'))

    done()
  })

  it('check a deeply nested 2.0 resource with one missing parent identifier', function (done) {
    var ctxioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      debug: true
    })

    expect(function () {
      ctxioClient.accounts('account_id').sources('').folders('folder').messages().get().then(function (res) {
        // Should have errored out of here
        expect(true).toBe(false)
      })
    }).toThrow(new Error('label required for subresources'))

    done()
  })

  it('check a 2.0 resource_url', function (done) {
    var ctxioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      debug: true
    })

    var resource_url = 'https://api.context.io/2.0/foo/bar/baz'

    ctxioClient.resource(resource_url).post().then(function (res) {
      expect(res.url).toBe(resource_url)
      expect(res.method).toBe('POST')
      done()
    })
  })

  it('check a malformed 2.0 resource_url', function (done) {
    var ctxioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      debug: true
    })

    var resource_url = 'https://github.com/foo/bar/baz'

    ctxioClient.resource(resource_url).get().then(function (res) {
      expect(res.url).toBe('https://api.context.io/2.0/' + resource_url)
      done()
    })
  })
  
})
