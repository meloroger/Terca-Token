import React, { useReducer, useEffect } from 'react';
import Web3 from 'web3';
import BlockchainContext from './blockchainContext';
import BlockchainReducer from './blockchainReducer';
import {
  BLOCKCHAIN_DATA,
  SET_LOADING,
  SET_ACCOUNT,
  SET_TOKENSALE
} from '../types';
import { TOKENSALE_ABI, TOKENSALE_ADDRESS } from '../config';

const BlockchainState = props => {
  const initialState = {
    accounts: [],
    loading: false,
    tokenSale: null
  };

  useEffect(() => {
    blockchainData();

    // eslint-disable-next-line
  }, []);

  const [state, dispatch] = useReducer(BlockchainReducer, initialState);

  const bootstrap = {
    blockchainInit: () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      bootstrap.accounts(web3);
      bootstrap.tokenSale(web3);
    },

    accounts: async web3 => {
      const accounts = await web3.eth.getAccounts();
      dispatch({
        type: SET_ACCOUNT,
        payload: accounts
      });
    },

    tokenSale: async web3 => {
      const tokenSale = await new web3.eth.Contract(
        TOKENSALE_ABI,
        TOKENSALE_ADDRESS
      );
      dispatch({
        type: SET_TOKENSALE,
        payload: tokenSale
      });
    }
  };

  const blockchainData = async () => {
    dispatch({
      type: SET_LOADING
    });

    bootstrap.blockchainInit();

    dispatch({
      type: BLOCKCHAIN_DATA
    });
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
        loading: state.loading,
        exchangeTokens
      }}>
      {props.children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainState;
