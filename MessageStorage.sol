pragma solidity ^0.8.0;

contract MessageStorage {
    mapping(bytes32 => string) private messages;

    function setMessage(bytes32 key, string memory message) public {
        messages[key] = message;
    }

    function getMessage(bytes32 key) public view returns (string memory) {
        return messages[key];
    }
}
