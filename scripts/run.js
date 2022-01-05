const main = async () => {
  const pingContractFactory = await hre.ethers.getContractFactory('PingPortal');
  const pingContract = await pingContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await pingContract.deployed();
  console.log('Contract addy:', pingContract.address);

  // get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    pingContract.address
  );
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  // ping contract first time
  let pingTxn = await pingContract.ping('A message!');
  await pingTxn.wait();

  // get new contract balance
  contractBalance = await hre.ethers.provider.getBalance(pingContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  const [_, randomAcct] = await hre.ethers.getSigners();

  // ping contract again w/ new address
  pingTxn = await pingContract.connect(randomAcct).ping('Another message!');
  await pingTxn.wait();

  let allPings = await pingContract.getAllPings();
  console.log(allPings);

  // ping contract again w/ original address
  pingTxn = await pingContract.ping('A message!');
  await pingTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(pingContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );
  // console.log('random acct balane:', randomAcct);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
