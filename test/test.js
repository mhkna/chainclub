const ChainClub = artifacts.require('./ChainClub.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('ChainClub', () => {

  before(async () => {
    var chainclub = await ChainClub.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await chainclub.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await chainclub.name()
      assert.equal(name, 'ChainClub')
    })
  })
})
