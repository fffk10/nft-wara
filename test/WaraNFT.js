const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('WaraNFTコントラクト', () => {
  it('トークン名前とシンボルがセットされるべき', async () => {
    const name = 'WaraNFT'
    const symbol = 'WARA'
    const WaraNFT = await ethers.getContractFactory('WaraNFT')
    const waraNFT = await WaraNFT.deploy()
    await waraNFT.deployed()

    expect(await waraNFT.name()).to.equal(name)
    expect(await waraNFT.symbol()).to.equal(symbol)
  })
  it('デプロイアドレスがownerに設定されるべき', async () => {
    // ===== preprocessing ===== //
    const [owner] = await ethers.getSigners()
    const WaraNFT = await ethers.getContractFactory('WaraNFT')
    const waraNFT = await WaraNFT.deploy()
    await waraNFT.deployed()

    // ===== assert ===== //
    expect(await waraNFT.owner()).to.equal(owner.address)
  })
})
