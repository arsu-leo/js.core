const ServerDispatcherChain = require('.')

class ServerDispatcherChainLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    path            = this.locator.locate('path'),
    dispatcherChain = new ServerDispatcherChain(path)

    return dispatcherChain
  }
}

module.exports = ServerDispatcherChainLocator
