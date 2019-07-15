import React, { useContext } from 'react';
import BlockchainContext from '../../context/blockchain/blockchainContext';

const SideNav = () => {
  const blockchainContext = useContext(BlockchainContext);
  const { accounts, tokenSale } = blockchainContext;

  const exchangeTokens = () => {
    const tokens = document.getElementById('tokens');
    const tokenPrice = 100000000000000000;

    tokenSale.methods
      .buyTokens(tokens.value)
      .send({
        from: accounts[0],
        value: tokens.value * tokenPrice,
        gas: 500000
      })
      .then(receipt => console.log('tokens bought...', receipt));

    tokens.innerHTML = '';
  };
  return (
    <div>
      <ul id='slide-out' className='sidenav'>
        <li>
          <div className='user-view' id='user-view'>
            <div>
              <div className='row'>
                <h4 id='side-h4'>Terca Tokens</h4>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    exchangeTokens();
                  }}>
                  <div className='row'>
                    <div className='input-field'>
                      <input
                        placeholder='Terca Tokens...'
                        id='tokens'
                        name='numberOfTokens'
                        type='number'
                      />

                      <label htmlFor='numberOfTokens'>How many tokens?</label>
                    </div>
                    <button className='waves btn-small blue center-align'>
                      Exchange
                    </button>
                  </div>
                </form>
                <div id='sidenav-text' className='row'>
                  <div className='center-align'>
                    <p>
                      MetaMask is in Privacy Mode by default this could cause
                      issues
                    </p>
                    <hr />
                    <p>Your Account</p>
                    <p id='account-side'>{accounts}</p>
                    <hr />
                    <p>
                      If transactions are failing, please try resetting your
                      transaction history in your MetaMask Wallet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
