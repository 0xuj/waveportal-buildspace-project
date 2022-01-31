//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WebPortal {
    uint256 public totalWaves;

    constructor() {
        console.log("Smart Contractooor");
    }

    function wave() public {
        totalWaves++;
        console.log("%s, has waved", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("we have %d total waves!", totalWaves);
        return totalWaves;
    }
}
