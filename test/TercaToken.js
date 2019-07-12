/** Assign instance of token contract */

const TercaToken = artifacts.require('./TercaToken.sol');

contract('TercaToken', accounts => {
  let tokenInstance;

  it('initilaizes the contract with the correct values', () => {
    return TercaToken.deployed()
      .then(instance => {
        tokenInstance = instance;
        return tokenInstance.name();
      })
      .then(name => {
        assert.equal(name, 'TercaToken', 'has correct name');
        return tokenInstance.symbol();
      })
      .then(symbol => {
        assert.equal(symbol, 'Terca', 'has correct symbol');
        return tokenInstance.standard();
      })
      .then(standard => {
        assert.equal(standard, 'Terca Token v1.0', 'has correct standard');
      });
  });

  it('allocates the total supply upon deployment', () => {
    return TercaToken.deployed()
      .then(instance => {
        tokenInstance = instance;
        return tokenInstance.totalSupply();
      })
      .then(totalSupply => {
        assert.equal(
          totalSupply.toNumber(),
          10000000,
          'allocated the initial supply to the admin account'
        );
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then(adminBalance => {
        assert.equal(
          adminBalance.toNumber(),
          10000000,
          'allocated initial supply to admin balance'
        );
      });
  });

  it('transfers token ownership', () => {
    return TercaToken.deployed()
      .then(instance => {
        tokenInstance = instance;
        /** Checks require statement */
        return tokenInstance.transfer.call(accounts[1], 99999999);
      })
      .then(assert.fail)
      .catch(error => {
        /** Must revert due to request is more than balance of admin account */
        assert(
          error.message.indexOf('revert') >= 0,
          'error message must contain revert'
        );
        return tokenInstance.transfer.call(accounts[1], 1, {
          from: accounts[0]
        });
      })
      .then(success => {
        assert.equal(success, true, 'transfer completed successfully');
        return tokenInstance.transfer(accounts[1], 1, { from: accounts[0] });
      })
      .then(receipt => {
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(
          receipt.logs[0].event,
          'Transfer',
          'should be the "Transfer" event'
        );
        assert.equal(
          receipt.logs[0].args._from,
          accounts[0],
          'logs the account the tokens are transferred from'
        );
        assert.equal(
          receipt.logs[0].args._to,
          accounts[1],
          'logs the account the tokens are transferred to'
        );
        assert.equal(
          receipt.logs[0].args._value,
          1,
          'logs the transfer amount'
        );
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then(balance => {
        assert.equal(
          balance.toNumber(),
          9999999,
          'deducts the amount from the sending account'
        );
      });
  });

  it('approves tokens for delegated transfer', () => {
    return TercaToken.deployed()
      .then(instance => {
        tokenInstance = instance;
        return tokenInstance.approve.call(accounts[1], 100);
      })
      .then(success => {
        assert.equal(success, true, 'returns true');
        return tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
      })
      .then(receipt => {
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(
          receipt.logs[0].event,
          'Approval',
          'should be the "Approval" event'
        );
        assert.equal(
          receipt.logs[0].args._owner,
          accounts[0],
          'logs the account the tokens are authorized by'
        );
        assert.equal(
          receipt.logs[0].args._spender,
          accounts[1],
          'logs the account the tokens are authorized to'
        );
        assert.equal(
          receipt.logs[0].args._value,
          100,
          'logs the transfer amount'
        );
        return tokenInstance.getAllowance(accounts[0], accounts[1]);
      })
      .then(allowance => {
        assert.equal(
          allowance.toNumber(),
          100,
          'stores the allowance for delegated transfer'
        );
      });
  });

  it('handles delegated transfer', () => {
    return TercaToken.deployed()
      .then(instance => {
        tokenInstance = instance;
        fromAccount = accounts[2];
        toAccount = accounts[3];
        spendingAccount = accounts[4];
        /** Transfer some tokens to fromAccount */
        return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
      })
      .then(receipt => {
        /** Approve spendingAccount to spend 10 tokens from fromAccount */
        return tokenInstance.approve(spendingAccount, 10, {
          from: fromAccount
        });
      })
      .then(receipt => {
        /** Try transfering something larger than the sender's balance */
        return tokenInstance.transferFrom(fromAccount, toAccount, 99999999, {
          from: spendingAccount
        });
      })
      .then(assert.fail)
      .catch(error => {
        assert(
          error.message.indexOf('revert') >= 0,
          'must fail if balance is insufficient'
        );
        /** Try transfering something larger than approved amount */
        return tokenInstance.transferFrom(fromAccount, toAccount, 20, {
          from: accounts[0]
        });
      })
      .then(assert.fail)
      .catch(error => {
        console.log(error.message);
        assert(
          error.message.indexOf('revert') >= 0,
          'cannot transfer value larger than approved amount'
        );
        return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, {
          from: spendingAccount
        });
      })
      .then(success => {
        assert.equal(success, true);
        return tokenInstance.transferFrom(fromAccount, toAccount, 10, {
          from: spendingAccount
        });
      })
      .then(receipt => {
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(
          receipt.logs[0].event,
          'Transfer',
          'should be the "Transfer" event'
        );
        assert.equal(
          receipt.logs[0].args._from,
          fromAccount,
          'logs the account the tokens are transferred from'
        );
        assert.equal(
          receipt.logs[0].args._to,
          toAccount,
          'logs the account the tokens are transferred to'
        );
        assert.equal(
          receipt.logs[0].args._value,
          10,
          'logs the transfer amount'
        );
        return tokenInstance.balanceOf(fromAccount);
      })
      .then(balance => {
        assert.equal(
          balance.toNumber(),
          90,
          'deducts the amount form the sending account'
        );
        return tokenInstance.balanceOf(toAccount);
      })
      .then(balance => {
        assert.equal(
          balance.toNumber(),
          10,
          'adds the amount from the receiving account'
        );
        return tokenInstance.allowance(fromAccount, spendingAccount);
      })
      .then(allowance => {
        allowance.toNumber(), 0, 'deducts the amount from the allowance';
      });
  });
});
