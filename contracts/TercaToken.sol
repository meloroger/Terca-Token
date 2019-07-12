pragma solidity ^0.5.0;

contract TercaToken {
    /** This contract is based off of the basic standard given for a ERC-20 TOKEN */

    /** Terca Token State Properties */

    string public name;
    string public symbol;
    string public standard;
    uint256 public totalSupply;

    /** Events emitted during transactions */

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    /** Data stored on blockchain contract */

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    /** Constructor--> Initializes the total amount of tokens for this contract. Also, the name symbol and standard. The address(Administrator) that deploys this contract will be awarded all tokens. */

    constructor(uint256 _initialSupply, string memory _name, string memory _symbol, string memory _standard) public {
        totalSupply = _initialSupply;
        name = _name;
        symbol = _symbol;
        standard = _standard;
        balanceOf[msg.sender] = _initialSupply;
    }

    /** To transfer tokens directly to another address--> call this function */

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, 'Insufficient tokens available, Please verify your request...');

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    /** Functions that serve for an Entity(such as a exchange) to buy your tokens and distribute them to different buyers. Also, can place an allowance into a separate address for one or many users to change */

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value, 'Insufficient tokens available, Please verify your request...');

        require(allowance[_from][msg.sender] >= _value, 'not approved');

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function getAllowance(address _owner, address _spender) public view returns (uint256 remaining) {

        return allowance[_owner][_spender];
    }
}