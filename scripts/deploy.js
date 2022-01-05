const main = async () => {
  const pingContractFactory = await hre.ethers.getContractFactory('PingPortal');
  const pingContract = await pingContractFactory.deploy({
    // deploy with eth
    value: hre.ethers.utils.parseEther('0.1'),
  });

  await pingContract.deployed();

  console.log('PingPortal address: ', pingContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();

// Deployed PingPortal contract address on Rinkeby:
// 0xd6A1A7c091634217Ac42bAC439a850D0B28782dC
