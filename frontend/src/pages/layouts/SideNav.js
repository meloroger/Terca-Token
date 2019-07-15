import React, { useContext } from 'react';
import BlockchainContext from '../../context/blockchain/blockchainContext';

const SideNav = () => {
  const blockchainContext = useContext(BlockchainContext);
  const { accounts, tokenSale } = blockchainContext;

  const exchangeTokens = () => {
    let tokens = document.getElementById('tokens');
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
                <div className='row'>
                  <div className='center-align'>
                    <p>Your Account Address:</p>
                    <hr />
                    <p id='account-side'>{accounts}</p>
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
