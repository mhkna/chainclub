const ChainClub = artifacts.require('./ChainClub.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('ChainClub', ([author]) => {
  let chainclub

  before(async () => {
    chainclub = await ChainClub.deployed()
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

  describe('posts', async () => {
    let result
    let postCount
    const hash = 'test123hash'

    before(async () => {
      //result will show emitted event
      result = await chainclub.addPost(hash, 'hello world', { from: author })
      postCount = await chainclub.postCount()
    })

    it('creates posts', async () => {
      const post = await chainclub.posts(1)
      assert.equal(post.text, 'hello world')
      assert.equal(postCount, 1)
      await chainclub.addPost('', 'hello world', { from: author }).should.be.rejected
      await chainclub.addPost(hash, '', { from: author }).should.be.rejected
    })

    it('fails with empty arguments', async () => {
      await chainclub.addPost('', 'hello world', { from: author }).should.be.rejected
      await chainclub.addPost(hash, '', { from: author }).should.be.rejected
    })

    it('emits proper PostCreated event details', async () => {
      const postEvent = result.logs[0].args
      assert.equal(postEvent.id.toNumber(), postCount.toNumber(), 'correct id')
      assert.equal(postEvent.hash, hash, 'correct hash')
      assert.equal(postEvent.text, 'hello world', 'correct post text')
      assert.equal(postEvent.author, author, 'correct author')
    })
  })

})
