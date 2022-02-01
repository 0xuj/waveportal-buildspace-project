
const hre = require("hardhat");

async function main() {

  const WebPortal = await hre.ethers.getContractFactory("WebPortal");
  const webPortalContract = await WebPortal.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });
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