pragma solidity >=0.4.22 <0.7.0;

contract ExpressContract{
    // Define a struct
    struct Express{
        uint id; // express id
        bool owner_checked; //whether owner is checked
        bool expressman_checked; //whether expressman is checked
        address payable owner; // owner of express
        address payable expressman; // expressmanof express
        uint cost; // pay for expressman
    }
    
    // Create expresses to store data
    mapping (uint=>Express) expresses;
    
    // Define an event to watch changes
    event checkStatus(bool owner_checked, bool expressman_checked);
    
    // Function modifiers
    modifier onlyOwner(uint _id){
        require(
            msg.sender == expresses[_id].owner,
            "Only express owner can call this."
        );
        _;
    }
    
    modifier onlyExpressman(uint _id){
        require(
            msg.sender == expresses[_id].expressman,
            "Only express expressesman can call this."
        );
        _;
    }
    
    //init a new express
    function init(uint _id, address payable _expressman) payable public returns(string memory info) {
        expresses[_id].id = _id;
        expresses[_id].owner = msg.sender;
        expresses[_id].expressman = _expressman;
        expresses[_id].owner_checked = false;
        expresses[_id].expressman_checked = false;
        expresses[_id].cost = msg.value;
        return "Init success.";
    }
    
    // Get express info
    function getExpress(uint _id) public view returns (uint id, address owner, address expressman, bool expressman_checked, bool owner_checked, uint cost){
        return (
            expresses[_id].id, 
            expresses[_id].owner, 
            expresses[_id].expressman, 
            expresses[_id].expressman_checked,
            expresses[_id].owner_checked,
            expresses[_id].cost
        );
    }
    
    // Change owner check status to 'true'
    function ownerCheck(uint _id) payable public onlyOwner(_id) returns (string memory) {
        expresses[_id].owner_checked = true;
        emit checkStatus(expresses[_id].owner_checked,expresses[_id].expressman_checked);
    }
    
    // Change expressman check status to 'true'
    function expressmanCheck(uint _id) payable public onlyExpressman(_id) returns (string memory) {
        expresses[_id].expressman_checked = true;
        emit checkStatus(expresses[_id].owner_checked,expresses[_id].expressman_checked);
    }
    
    // Finish express delivering status, make trasaction to expressman
    function finishExpress(uint _id) payable public returns (string memory){
        if(expresses[_id].owner_checked == true && expresses[_id].expressman_checked == true){
            expresses[_id].expressman.transfer(expresses[_id].cost);
            return "Transfer success.";
        }
        else return "Transfer fails";
    }
}