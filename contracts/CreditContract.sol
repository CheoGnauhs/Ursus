pragma solidity >=0.4.22 <0.7.0;

contract CreditContract{
    // Define a struct
    struct Credit{
        address owner;
        uint credit;
    }
    
    // Create credits to restore Credit
    mapping (address=>Credit) credits;
    
    // Function modifier
    modifier onlyOwner(address _owner){
        require(
            msg.sender == _owner,
            'Only owner can call this.'
        );
        _;
    }
    
    // Init a new credit
    function initCredit(address _owner) public returns (string memory result){
        credits[_owner].owner = _owner;
        credits[_owner].credit = 100;
        return "success";
    }
    
    // Set credit of a user
    function setCredit(address _owner, uint _credit) public onlyOwner(_owner) returns (string memory result){
        credits[_owner].credit = _credit;
        return "success";
    }
    
    // Get credit of a user
    function getCredit(address _owner) public view returns (uint credit){
        return credits[_owner].credit;
    }
}