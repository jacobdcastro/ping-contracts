// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract PingPortal {
    uint256 totalPings;

    uint256 private seed;

    event NewPing(
        address indexed from,
        uint256 timestamp,
        string message,
        bool isWinner
    );

    struct Ping {
        address pinger; // The address of the user who pinged.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user pinged.
        bool isWinner; // Whether this ping won the prize
    }

    Ping[] pings;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        seed = (block.timestamp + block.difficulty) % 100;
        console.log("Ping counter contract!");
    }

    function ping(string memory _message) public payable {
        // check for 5-minute wait time
        require(
            lastWavedAt[msg.sender] + 1 minutes < block.timestamp,
            "Please Wait 5 minutes"
        );

        // update address's latest ping timestamp
        lastWavedAt[msg.sender] = block.timestamp;

        totalPings += 1;
        console.log("%s has pingd!", msg.sender);

        // generate new random #
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        bool isWinner;

        // user wins 25% of the time
        if (seed <= 25) {
            isWinner = true;
            pings.push(Ping(msg.sender, _message, block.timestamp, isWinner));

            console.log("%s won!", msg.sender);
            uint256 prizeAmount = 0.001 ether;

            // ensure contract is not out of funds
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        } else {
            pings.push(Ping(msg.sender, _message, block.timestamp, isWinner));
            console.log("%s did not win :(", msg.sender);
        }

        console.log("isWinner: %s", isWinner);

        // emit completion of New Ping
        emit NewPing(msg.sender, block.timestamp, _message, isWinner);
    }

    function getAllPings() public view returns (Ping[] memory) {
        return pings;
    }

    function getTotalPings() public view returns (uint256) {
        console.log("We have %s total pings!", totalPings);
        return totalPings;
    }
}
