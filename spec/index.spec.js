const ContextIO = require('../../ContextIO-node')

describe('ContextIO Tests', () => {
  it('create a client', () => {
    const cioClient = ContextIO({
      key: 'key',
      secret: 'secret',
    })
  })

  it('create a client with missing settings', () => {
    expect(() => {
      const cioClient = ContextIO()
    }).toThrow(new Error('Missing ContextIO settings'))
  })

  it('create a client with an invalid version', () => {
    expect(() => {
      const cioClient = ContextIO({
        key: 'test',
        secret: 'secret',
        version: 'other_version'
      })
    }).toThrow(new Error('Not a supported ContextIO API version'))
  })

  it('create a client and check the consumer key and secret', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      debug: true
    })

    cioClient.discovery().get().then(res => {
      expect(res.oauth.consumer_key).toBe('testy_key')
      expect(res.oauth.consumer_secret).toBe('sooper_secret')
      done()
    })
  })

  it('create a versioned client', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: 'lite',
      debug: true
    })

    cioClient.discovery().get().then(res => {
      expect(res.url).toBe('https://api.context.io/lite/discovery/')
      done()
    })
  })

  it('check a POST', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: '2.0',
      debug: true
    })

    cioClient.accounts().post({foo: 'bar'}).then(res => {
      expect(res.url).toBe('https://api.context.io/2.0/accounts/')
      expect(res.form.foo).toBe('bar')
      expect(res.method).toBe('POST')
      done()
    })
  })
})
