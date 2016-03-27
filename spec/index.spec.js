var ContextIO = require('../../ContextIO-node')

describe('ContextIO Tests', function () {
  it('create a client', function () {
    var ctxioClient = ContextIO({
      key: 'key',
      secret: 'secret',
    })
  })

  it('create a client with missing settings', function () {
    expect(function () {
      var ctxioClient = ContextIO()
    }).toThrow(new Error('Missing ContextIO settings'))
  })

  it('create a client with an invalid version', function () {
    expect(function () {
      var ctxioClient = ContextIO({
        key: 'test',
        secret: 'secret',
        version: 'other_version'
      })
    }).toThrow(new Error('Not a supported ContextIO API version'))
  })

  it('create a client and check the consumer key and secret', function (done) {
    var ctxioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      debug: true
    })

    ctxioClient.discovery().get().then(function (res) {
      expect(res.oauth.consumer_key).toBe('testy_key')
      expect(res.oauth.consumer_secret).toBe('sooper_secret')
      done()
    })
  })

  it('create a versioned client', function (done) {
    var ctxioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: 'lite',
      debug: true
    })

    ctxioClient.discovery().get().then(function (res) {
      expect(res.url).toBe('https://api.context.io/lite/discovery/')
      done()
    })
  })

  it('check a POST', function (done) {
    var ctxioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      debug: true
    })

    ctxioClient.accounts().post({foo: 'bar'}).then(function (res) {
      expect(res.url).toBe('https://api.context.io/2.0/accounts/')
      expect(res.form.foo).toBe('bar')
      expect(res.method).toBe('POST')
      done()
    })
  })
})
