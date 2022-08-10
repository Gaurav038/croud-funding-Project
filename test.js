const { ethers } = require("ethers")
const CompaignFactory = require("./artifacts/contracts/Compaign.sol/CompaignFactory.json")
require('dotenv').config({path: './.env.local'})

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_GOERLI_RPC_URL
    )

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        CompaignFactory.abi,
        provider
    )

    const getDeplyedCompaign = contract.filters.compaignCreated()

    let events  = await contract.queryFilter(getDeplyedCompaign)
    let rsltevent = events.reverse()
    console.log(rsltevent)
}

main()