const main = async () => {
  const WaraNFT = await ethers.getContractFactory('WaraNFT')
  const waraNFT = await WaraNFT.deploy()
  await waraNFT.deployed()

  console.log(`Contract deployed to: ${waraNFT.address}`)
}

const deploy = async () => {
  try {
    await main()
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

deploy()
