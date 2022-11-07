require("@nomiclabs/hardhat-truffle5");
//require("@nomiclabs/hardhat-ganache");

module.exports = {
  //defaultNetwork:"ganache",
  solidity: {
    compilers: [
      {
        version: "0.6.6",
      },
     {
       version: "0.5.16",
     },
      {
        version: "0.4.18",
      },
      {
        version: "0.8.0",
      },
      {
        version: "0.8.4",
      },
      {
        version: "0.4.22",
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },

  networks: {
    hardhat: {
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: true,
  
    },
   },
};