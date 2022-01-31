
const hre = require("hardhat");

async function main() {

  const [owner,randomPerson] = await hre.ethers.getSigners();
  const WebPortal = await hre.ethers.getContractFactory("WebPortal");
  const webPortalContract = await WebPortal.deploy();
  await webPortalContract.deployed();

  console.log("Contract depoyed to:",webPortalContract.address);
  console.log("Contract depoyed by:",owner.address);

  let waveCount;
  waveCount = await webPortalContract.getTotalWaves();

  let waveTxn = await webPortalContract.wave();
  await waveTxn.wait();

  waveCount = await webPortalContract.getTotalWaves();

  waveTxn = await webPortalContract.connect(randomPerson).wave();
  await waveTxn.wait();

  console.log("webPortal deployed to:", webPortalContract.address);
}


const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();