const ContextIO = require('../../ContextIO-node')

describe('ContextIO Tests', () => {
  it('check a nested 2.0 resource', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: '2.0',
      debug: true
    })

    cioClient.accounts('account_id').messages('message_id').get().then(res => {
      expect(res.url).toBe('https://api.context.io/2.0/accounts/account_id/messages/message_id/')
      done()
    })
  })

  it('check a 2.0 resource under accounts with no account_id', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: '2.0',
      debug: true
    })

    expect(() => {
      cioClient.accounts().messages().get().then(res => {
        // Should have errored out of here
        expect(true).toBe(false)
      })
    }).toThrow(new Error('account_id required for subresources'))

    done()
  })

  it('check a deeply nested 2.0 resource with one missing parent identifier', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: '2.0',
      debug: true
    })

    expect(() => {
      cioClient.accounts('account_id').sources('').folders('folder').messages().get().then(res => {
        // Should have errored out of here
        expect(true).toBe(false)
      })
    }).toThrow(new Error('label required for subresources'))

    done()
  })

  it('check a 2.0 resource_url', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: '2.0',
      debug: true
    })

    const resource_url = 'https://api.context.io/2.0/foo/bar/baz'

    cioClient.resource(resource_url).post().then(res => {
      expect(res.url).toBe(resource_url)
      expect(res.method).toBe('POST')
      done()
    })
  })

  it('check a malformed 2.0 resource_url', done => {
    const cioClient = ContextIO({
      key: 'testy_key',
      secret: 'sooper_secret',
      version: '2.0',
      debug: true
    })

    const resource_url = 'https://github.com/foo/bar/baz'

    cioClient.resource(resource_url).get().then(res => {
      expect(res.url).toBe('https://api.context.io/2.0/' + resource_url)
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
