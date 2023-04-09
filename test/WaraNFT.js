const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('WaraNFT Contract', function () {
  let WaraNFT
  let waraNFT
  const name = 'WaraNFT'
  const symbol = 'WARA'
  const tokenURI1 = 'hoge1'
  const tokenURI2 = 'hoge2'
  let owner
  let addr1

  beforeEach(async function () {
    // getSigners => get all accounts
    // first to owner
    // second to addr1
    ;[owner, addr1] = await ethers.getSigners()
    // contract is deploy
    WaraNFT = await ethers.getContractFactory('WaraNFT')
    waraNFT = await WaraNFT.deploy()
    // wait deploy
    await waraNFT.deployed()
  })

  it('Token name and symbol shuold be set.', async function () {
    expect(await waraNFT.name()).to.equal(name)
    expect(await waraNFT.symbol()).to.equal(symbol)
  })
  it('Deploy address shuold be set to owner.', async function () {
    expect(await waraNFT.owner()).to.equal(owner.address)
  })
  it('The owner should be able to NFT mint.', async function () {
    await waraNFT.nftMint(addr1.address, tokenURI1)
    expect(await waraNFT.ownerOf(1)).to.equal(addr1.address)
  })
  it('TokenId should be incremented every time NFT is created.', async function () {
    await waraNFT.nftMint(addr1.address, tokenURI1)
    await waraNFT.nftMint(addr1.address, tokenURI2)
    expect(await waraNFT.tokenURI(1)).to.equal(tokenURI1)
    expect(await waraNFT.tokenURI(2)).to.equal(tokenURI2)
  })
  it('Non-owner should fail to create NFT.', async function () {
    await expect(
      waraNFT.connect(addr1).nftMint(addr1.address, tokenURI1)
    ).to.be.revertedWith('Ownable: caller is not the owner')
  })
  it('Event publishing after NFT created.', async function () {
    await expect(waraNFT.nftMint(addr1.address, tokenURI1))
      .to.emit(waraNFT, 'TokenURIChanged')
      .withArgs(addr1.address, 1, tokenURI1)
  })
})
