const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()

  const beerContractFactory = await hre.ethers.getContractFactory('BeerPortal')
  const beerContract = await beerContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  })
  await beerContract.deployed()
  console.log('Contract deployed to:', beerContract.address)
  console.log('Contract deployed by:', owner.address)

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    beerContract.address,
  )
  console.log(
    '💰 Contract balance:',
    hre.ethers.utils.formatEther(contractBalance),
  )

  // beerCount;
  let beerCount
  let beers
  beerCount = await beerContract.getTotalBeers()

  let beerTxn = await beerContract.sendBeer('Holiiii cataluñi', 2)
  await beerTxn.wait()

  beerCount = await beerContract.getTotalBeers()
  beer = await beerContract.getAllBeers()

  beerTxn = await beerContract.sendBeer('Tituuuu', 8)
  await beerTxn.wait()

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(beerContract.address)
  console.log(
    '💰 Contract balance:',
    hre.ethers.utils.formatEther(contractBalance),
  )

  beerCount = await beerContract.getTotalBeers()
  beer = await beerContract.getAllBeers()

  console.log(beer)
}

const runDMC = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runDMC()
