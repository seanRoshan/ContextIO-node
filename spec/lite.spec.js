const ContextIO = require('../../ContextIO-node')

describe('ContextIO Tests', () => {
  it('check a nested lite resource', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: 'lite',
      debug: true
    })

    cioClient.users('user_id').connect_tokens('token').get().then(res => {
      expect(res.url).toBe('https://api.context.io/lite/users/user_id/connect_tokens/token/')
      done()
    })
  })

  it('check a lite resource under users with no user_id', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: 'lite',
      debug: true
    })

    expect(() => {
      cioClient.users().connect_tokens('tokens').get().then(res => {
        // Should have errored out of here
        expect(true).toBe(false)
      })
    }).toThrow(new Error('user_id required for subresources'))

    done()
  })

  it('check a deeply nested lite resource with one missing parent identifier', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: 'lite',
      debug: true
    })

    expect(() => {
      cioClient.users('user_id').email_accounts('label').folders().messages().get().then(res => {
        // Should have errored out of here
        expect(true).toBe(false)
      })
    }).toThrow(new Error('folder required for subresources'))

    done()
  })

  it('check a lite resource_url', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: 'lite',
      debug: true
    })

    const resource_url = 'https://api.context.io/lite/foo/bar/baz'

    cioClient.resource(resource_url).post().then(res => {
      expect(res.url).toBe(resource_url)
      expect(res.method).toBe('POST')
      done()
    })
  })

  it('check a malformed lite resource_url', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: 'lite',
      debug: true
    })

    const resource_url = 'https://github.com/foo/bar/baz'

    cioClient.resource(resource_url).get().then(res => {
      expect(res.url).toBe('https://api.context.io/lite/' + resource_url)
      done()
    })
  })

  it('checks an app-level call', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: 'lite',
      debug: true
    })

    cioClient.app().logs().webhooks().get().then(res => {
      expect(res.url).toBe('https://api.context.io/app/logs/webhooks/')
      done()
    })
  })

})
