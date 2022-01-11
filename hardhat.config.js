require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.8",

  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/d30063b65b2a49fabc68a072abebae68", //Infura url with projectId
      accounts: ["4055cc31c541a6ae9233ab5da5e922c441b405790fc2a67fb5eb255c2e17fc29"] // add the account that will deploy the contract (private key)
     },
     
     bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 71000000000, // 71 gwei
      gas: 4000000,
      timeout: 15000,
      accounts: ["4055cc31c541a6ae9233ab5da5e922c441b405790fc2a67fb5eb255c2e17fc29"],
    },
   }
};
