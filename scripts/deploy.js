
const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contract with account: ",deployer.address)
  console.log("Account balance: ",accountBalance.toString());

  const WebPortal = await hre.ethers.getContractFactory("WebPortal");
  const webPortalContract = await WebPortal.deploy();
  await webPortalContract.deployed();

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