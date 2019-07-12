/** Assign instances of Contracts to Test */

const TercaToken = artifacts.require('TercaToken');
const TercaTokenSale = artifacts.require('TercaTokenSale');

contract('TercaTokenSale', accounts => {
  let tokenInstance;
  let tokenSaleInstance;
  let admin = accounts[0];
  let buyer = accounts[1];
  let tokenPrice = 100000000000000000;
  let tokensAvailable = 7500000;
  let numberOfTokens;

  it('initializes the contract with the correct values', () => {
    return TercaTokenSale.deployed()
      .then(instance => {
        tokenSaleInstance = instance;
        return tokenSaleInstance.address;
      })
      .then(address => {
        assert.notEqual(address, 0x0, 'has contract address');
        return tokenSaleInstance.tokenContract();
      })
      .then(address => {
        assert.notEqual(address, 0x0, 'has token contract address');
        return tokenSaleInstance.tokenPrice();
      })
      .then(price => {
        assert.equal(price, tokenPrice, 'token has correct price');
      });
  });

  it('facilitates token buying', () => {
    return TercaToken.deployed()
      .then(instance => {
        tokenInstance = instance;
        return TercaTokenSale.deployed();
      })
      .then(instance => {
        tokenSaleInstance = instance;
        return tokenInstance.transfer(
          tokenSaleInstance.address,
          tokensAvailable,
          { from: admin }
        );
      })
      .then(receipt => {
        numberOfTokens = 10;
        return tokenSaleInstance.buyTokens(numberOfTokens, {
          from: buyer,
          value: numberOfTokens * tokenPrice
        });
      })
      .then(receipt => {
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(
          receipt.logs[0].event,
          'Sell',
          'should be the "Sell" event'
        );
        assert.equal(
          receipt.logs[0].args._buyer,
          buyer,
          'logs the account that purchased the tokens'
        );
        assert.equal(
          receipt.logs[0].args._amount,
          numberOfTokens,
          'logs the number of tokens purchased'
        );
        return tokenSaleInstance.tokensSold();
      })
      .then(amount => {
        assert.equal(
          amount.toNumber(),
          numberOfTokens,
          'increments the number of tokens sold'
        );
        return tokenInstance.balanceOf(buyer);
      })
      .then(balance => {
        assert.equal(balance.toNumber(), numberOfTokens);
        return tokenInstance.balanceOf(tokenSaleInstance.address);
      })
      .then(balance => {
        assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
        return tokenSaleInstance.buyTokens(numberOfTokens, {
          from: buyer,
          value: 1
        });
      })
      .then(assert.fail)
      .catch(error => {
        assert(
          error.message.indexOf(
            'revert' >= 0,
            'msg.value must equal number of tokens in wei'
          )
        );
        return tokenSaleInstance.buyTokens(8000000, {
          from: buyer,
          value: numberOfTokens * tokenPrice
        });
      })
      .then(assert.fail)
      .catch(error => {
        assert(
          error.message.indexOf('revert') >= 0,
          'cannot purchase more tokens than available'
        );
      });
  });

  it('ends token sale', () => {
    return TercaToken.deployed()
      .then(instance => {
        tokenInstance = instance;
        return TercaTokenSale.deployed();
      })
      .then(instance => {
        tokenSaleInstance = instance;
        return tokenSaleInstance.endSale({ from: buyer });
      })
      .then(assert.fail)
      .catch(error => {
        assert(
          error.message.indexOf('revert' >= 0, 'must be admin to end sale')
        );
        return tokenSaleInstance.endSale({ from: admin });
      })
      .then(receipt => {
        return tokenInstance.balanceOf(admin);
      })
      .then(balance => {
        assert.equal(
          balance.toNumber(),
          9999990,
          'returns all unsold tokens to admin'
        );
        return tokenSaleInstance.tokenPrice();
      })
      .then(price => {
        assert.equal(price.toNumber(), 0, 'token price was reset');
      });
  });
});
