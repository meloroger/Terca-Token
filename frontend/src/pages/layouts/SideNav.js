import React, { useContext } from 'react';
import BlockchainContext from '../../context/blockchain/blockchainContext';

const SideNav = () => {
  const blockchainContext = useContext(BlockchainContext);
  const { accounts } = blockchainContext;
  return (
    <div>
      <ul id='slide-out' className='sidenav'>
        <li>
          <div className='user-view' id='user-view'>
            <div>
              <div className='row'>
                <h4 id='side-h4'>Terca Tokens</h4>
                <form>
                  <div className='row'>
                    <div className='input-field'>
                      <input
                        placeholder='Terca Tokens...'
                        id='numberOfTokens'
                        type='number'
                      />

                      <label htmlFor='numberOfTokens'>How many tokens?</label>
                    </div>
                    <button className='waves btn-small blue'>Exchange</button>
                  </div>
                </form>
                <div className='row'>
                  <div className='left-align left'>
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
