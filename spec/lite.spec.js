var ContextIO = require('../../ContextIO-node')

describe('ContextIO Tests', function () {
  it('check a nested lite resource', function (done) {
    var ctxioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: 'lite',
      debug: true
    })

    ctxioClient.users('user_id').connect_tokens('token').get().then(function (res) {
      expect(res.url).toBe('https://api.context.io/lite/users/user_id/connect_tokens/token/')
      done()
    })
  })

  it('check a lite resource under users with no user_id', function (done) {
    var ctxioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: 'lite',
      debug: true
    })

    expect(function () {
      ctxioClient.users().connect_tokens('tokens').get().then(function (res) {
        // Should have errored out of here
        expect(true).toBe(false)
      })
    }).toThrow(new Error('user_id required for subresources'))

    done()
  })

  it('check a deeply nested lite resource with one missing parent identifier', function (done) {
    var ctxioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: 'lite',
      debug: true
    })

    expect(function () {
      ctxioClient.users('user_id').email_accounts('label').folders().messages().get().then(function (res) {
        // Should have errored out of here
        expect(true).toBe(false)
      })
    }).toThrow(new Error('folder required for subresources'))

    done()
  })
})
