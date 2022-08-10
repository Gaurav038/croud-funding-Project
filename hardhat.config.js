/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config({ path: './.env.local' });

task("accounts", "Prints the List of Account", async (taskarg, hre) => {
  const accounts = await hre.ethers.getSigners()
  for(const account of accounts){
    console.log(account.address)
  }
})

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY
const RINKEBY_RPC_URL = process.env.NEXT_PUBLIC_RINKEBY_RPC_URL
const GOERLI_RPC_URL = process.env.NEXT_PUBLIC_GOERLI_RPC_URL
const polygon_RPC_URL = process.env.NEXT_PUBLIC_RPC_URL

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
      saveDeployments: true,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: [Hardhat],
      chainId: 31337,
    },
    polygon: {
      url: polygon_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80001
    }
    ,
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5
    }
  }
};
 