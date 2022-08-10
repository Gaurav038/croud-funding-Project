// SPDX-License-Identifier: MIT

pragma solidity >0.7.0 <=0.9.0;

contract CompaignFactory {
    address[] public deployedCompaigns;

    event compaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address compaignAddress,
        string imageURI,
        uint indexed timestamp,
        string indexed category
    );

    function createCompaign(
        string memory compaignTitle,
        uint requiredCompaignAmount,
        string memory imgURI,
        string memory category,
        string memory storyURI
    ) public {
        Compaign newCompaign = new Compaign(
            compaignTitle, requiredCompaignAmount, imgURI, storyURI, msg.sender );

        deployedCompaigns.push(address(newCompaign));

        emit compaignCreated(
            compaignTitle,
            requiredCompaignAmount,
            msg.sender,
            address(newCompaign),
            imgURI,
            block.timestamp,
            category        
        );
    }
}

contract Compaign {
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint public recievedAmount;


    event donated(address indexed donar, uint indexed amount, uint indexed timestamp);

    constructor(
        string memory compaignTitle,
        uint requiredCompaignAmount,
        string memory imgURI,
        string memory storyURI,
        address compaignOwner
    ) {
        title = compaignTitle;
        requiredAmount = requiredCompaignAmount;
        image = imgURI;
        story = storyURI;
        owner = payable(compaignOwner);
    }

    function donate() public payable {
        require(requiredAmount > recievedAmount, "required Amount FullFilled ...");
        owner.transfer(msg.value);
        recievedAmount += msg.value;

        emit donated(msg.sender, msg.value, block.timestamp);
    }
}