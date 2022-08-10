const {ethers, run, network} = require('hardhat')

async function main() {
    const CompaignFactory = await ethers.getContractFactory("CompaignFactory")
    const compaignFactory = await CompaignFactory.deploy()

    await compaignFactory.deployed()

    console.log("Factory deployed to: " ,compaignFactory.address)
}

main()
    .then(() => process.exit(0) )
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })