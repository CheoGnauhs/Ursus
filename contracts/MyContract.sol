pragma solidity >=0.4.22 <0.7.0;

contract MyContract {
    function myFunction() public pure returns(uint myNumber, string memory myString) {
        return (23456, "Hello!%");
    }
}