// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CharitableDonations {
    address public owner;
    uint256 public totalDonations;

    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    Donation[] public donations;
    mapping(address => uint256) public donorTotalDonations;

    uint256 public donationCancelPeriod; // Time period in seconds during which donors can cancel their donations
    mapping(address => uint256) public donationCancellationTime;

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can perform this action"
        );
        _;
    }

    event DonationReceived(
        address indexed donor,
        uint256 amount,
        uint256 timestamp
    );
    event FundsDistributed(address indexed charity, uint256 amount);
    event ExcessFundsWithdrawn(uint256 amount);
    event DonationCancelled(address indexed donor, uint256 amount);

    constructor() {
        owner = msg.sender;
        donationCancelPeriod = 1200;
    }

    function donate() external payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        totalDonations += msg.value;
        donorTotalDonations[msg.sender] += msg.value;

        Donation memory newDonation = Donation({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        });

        donations.push(newDonation);

        emit DonationReceived(msg.sender, msg.value, block.timestamp);
    }

    function distributeFunds(address payable charity) external onlyOwner {
        require(
            address(this).balance > 0,
            "No funds available for distribution"
        );

        // Check for address is not empty address(0) => 0x0000
        require(charity != address(0), "Invalid charity address");

        uint256 fundsToDistribute = address(this).balance;
        charity.transfer(fundsToDistribute);

        emit FundsDistributed(charity, fundsToDistribute);
    }

    function withdrawFunds() external onlyOwner {
        require(address(this).balance > 0, "No funds available to withdraw");
        payable(owner).transfer(address(this).balance);

        emit ExcessFundsWithdrawn(address(this).balance);
    }

    function cancelDonation() external {
        uint256 donationIndex = findDonationIndex(msg.sender);
        require(donationIndex != donations.length, "No donation found");

        Donation storage donation = donations[donationIndex];
        require(
            block.timestamp < donation.timestamp + donationCancelPeriod,
            "Donation cannot be cancelled"
        );

        totalDonations -= donation.amount;
        donorTotalDonations[msg.sender] -= donation.amount;

        emit DonationCancelled(msg.sender, donation.amount);

        // Refund the canceled donation back to the donor
        payable(msg.sender).transfer(donation.amount);

        // Remove the donation from the array by moving the last element to its position
        donations[donationIndex] = donations[donations.length - 1];
        donations.pop();
    }

    function findDonationIndex(address donor) internal view returns (uint256) {
        for (uint256 i = 0; i < donations.length; i++) {
            if (donations[i].donor == donor) {
                return i;
            }
        }
        // Return a constant value to indicate an invalid index
        return donations.length;
    }

    function getDonationCount() public view returns (uint256) {
        return donations.length;
    }

    function getDonation(
        uint256 index
    ) external view returns (address donor, uint256 amount, uint256 timestamp) {
        require(index < donations.length, "Invalid donation index");

        donor = donations[index].donor;
        amount = donations[index].amount;
        timestamp = donations[index].timestamp;
    }

    function getDonorTotalDonations(
        address donor
    ) external view returns (uint256) {
        return donorTotalDonations[donor];
    }

    // Withdraw any remaining funds from the contract (only available to the contract owner)
    function withdrawRemainingFunds() external onlyOwner {
        require(address(this).balance > 0, "No funds available to withdraw");
        payable(owner).transfer(address(this).balance);
    }

    function getAllDonations() public view returns (Donation[] memory) {
        uint256 numOfDonations = getDonationCount();
        Donation[] memory allDonations = new Donation[](numOfDonations);

        for (uint i = 0; i < numOfDonations; i++) {
            Donation storage item = donations[i];

            allDonations[i] = item;
        }

        return allDonations;
    }
}
