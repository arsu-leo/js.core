const HttpRouteBuilder = require('.')

class HttpRouteBuilderLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    deepmerge = this.locator.locate('deepmerge'),
    builder   = new HttpRouteBuilder(deepmerge)

    return builder
  }
}

module.exports = HttpRouteBuilderLocator
