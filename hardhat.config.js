require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: '0.8.0',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    rinkeby: {
      url: process.env.STAGING_ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
