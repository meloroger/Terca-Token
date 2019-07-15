import React, { useReducer, useEffect } from 'react';
import Web3 from 'web3';
import BlockchainContext from './blockchainContext';
import BlockchainReducer from './blockchainReducer';
import { BLOCKCHAIN_DATA, SET_LOADING, SET_ACCOUNT } from '../types';
import {
  TOKENSALE_ABI,
  TOKENSALE_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS
} from '../config';

const BlockchainState = props => {
  const initialState = {
    accounts: [],
    loading: false,
    tokenSale: null,
    token: null,
    tokensAvailable: 0,
    tokensSold: 0,
    transaction: null
  };

  useEffect(() => {
    blockchainData();

    // eslint-disable-next-line
  }, []);

  const [state, dispatch] = useReducer(BlockchainReducer, initialState);
  // window.ethereum.on('accountsChanged', accounts => {
  //   dispatch({
  //     type: SET_LOADING
  //   });
  //   dispatch({
  //     type: SET_ACCOUNT,
  //     payload: accounts
  //   });
  // });
  const blockchainData = async () => {
    dispatch({
      type: SET_LOADING
    });
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const network = await web3.eth.net.getNetworkType();
    console.log('network: ', network);
    web3.eth.defaultAccount = await web3.eth.getAccounts();
    let accounts = await web3.eth.getAccounts();

    const { token, tokenSale } = await contracts(web3);
    console.log(accounts);

    let res = {
      network,
      token,
      accounts,
      tokenSale
    };
    console.log(res);

    dispatch({
      type: BLOCKCHAIN_DATA,
      payload: res
    });
  };

  const contracts = web3 => {
    const tokenSale = new web3.eth.Contract(TOKENSALE_ABI, TOKENSALE_ADDRESS);
    console.log(tokenSale);

    const token = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);

    return { token, tokenSale };
  };

  const exchangeTokens = numberOfTokens => {
    this.tokenSale
      .deployed()
      .then(instance => {
        return instance.buyTokens(numberOfTokens, {
          from: this.accounts[0],
          value: numberOfTokens,
          gas: 500000
        });
      })
      .then(result => console.log('tokens bought...', result));
  };

  return (
    <BlockchainContext.Provider
      value={{
        accounts: state.accounts,
        tokenSale: state.tokenSale,
        token: state.token,
        tokensAvailable: state.tokensAvailable,
        tokensSold: state.tokensSold,
        transaction: state.transaction,
        loading: state.loading,

        blockchainData,
        exchangeTokens
      }}>
      {props.children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainState;
