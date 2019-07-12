pragma solidity ^0.5.0;

/** Import Terca Token Contract */
import './TercaToken.sol';

contract TercaTokenSale {
    /** Initial Token Offering Sale---> this will be a timed event. At the end, contract should self-destruct and remaining tokens should return to admin account */

    address public admin;
    TercaToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    /** Trigger event for Client-Side Interaction */

    event Sell(address _buyer, uint256 _amount);

    /** Constructor--> Sets the admin, Terca Token Contract Instance and token to ether price is set */

    constructor(TercaToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    /** Multiplication Utility(from SafeMath Lib) */

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, 'multiply function error');
    }

    /** Enables user to buy tokens from contract */

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice), 'error occured');

        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens, 'insufficient tokens available');

        require(tokenContract.transfer(msg.sender, _numberOfTokens), 'transfer failed');

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    /** End Token sale- Only admin can call this function */

    function endSale() public {
        require(msg.sender == admin, 'invalid request');

        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))), 'error occured');

        tokenPrice = 0;

        //selfdestruct(msg.sender);
    }
}