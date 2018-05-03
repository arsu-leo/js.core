const
expect  = require('chai').expect,
context = require('mochawesome/addContext')

describe('controller/server/http/router', () =>
{
  const
  config =
  [
    {
      middleware  : '/middle-1'
    },
    {
      view        : 'json'
    },
    {
      policy      : '/',
      dispatcher  : 'index',
      middleware  : '/middle-2'
    },
    {
      view        : 'raw',
      policy      : '/foo',
      dispatcher  : 'foo'
    },
    {
      dispatcher  : 'baz',
      policy      :
      {
        method    : 'post',
        path      : '/bar'
      }
    },
    {
      policy      : '/bar',
      dispatcher  : 'bar',
      middleware  : ['/middle-2', '/middle-3']
    }
  ],
  Router = require('./router')

  describe('flattenRoutes(routes)', () =>
  {
    let router

    before(function()
    {
      context(this, { title:'config', value:config })
      router = new Router(config)
    })

    it('should return a flatten route', function()
    {
      context(this, { title:'config', value:config })

      const route = router.flattenRoutes(config)

      expect(route.view).to.be.equal('json')
      expect(route.policy).to.be.equal('/')
      expect(route.dispatcher).to.be.equal('index')
      expect(route.middleware.length).to.be.equal(2)
    })
  })

  describe('findRoute(request)', () =>
  {
    let router, result1, result2, result3, result4, result5

    before(function()
    {
      context(this, { title:'config', value:config })

      router  = new Router(config)

      result1 = router.findRoute({ url:{ pathname:'/' }})
      result2 = router.findRoute({ url:{ pathname:'/foo' }})
      result3 = router.findRoute({ url:{ pathname:'/bar' }, method:'get'})
      result4 = router.findRoute({ url:{ pathname:'/bar' }, method:'post'})
      result5 = router.findRoute({ url:{ pathname:'/no-matching-pathname' }})
    })

    it('middleware is an array',
    () => expect(result1.middleware).is.an('array'))

    it('middleware builds on',
    () => expect(result1.middleware.length).to.be.equal(2))

    it('middleware routes correctly',
    () => expect(result2.middleware.length).to.be.equal(1))

    it('middleware can be defined as an array',
    () => expect(result3.middleware.length).to.be.equal(3))

    it('view is inherited',
    () => expect(result1.view).to.be.equal('json'))

    it('found correct dispatcher ',
    () => expect(result1.dispatcher).to.be.equal('index'))

    it('overwrite the view',
    () => expect(result2.view).to.be.equal('raw'))

    it('first match should have hierarchy',
    () => expect(result3.dispatcher).to.be.equal('bar'))

    it('method policy routes correctly',
    () => expect(result4.dispatcher).to.be.equal('baz'))

    it('no match should return an undefined dispatcher',
    () => expect(result5.dispatcher).to.be.equal(undefined))
  })
})
