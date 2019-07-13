import { BLOCKCHAIN_DATA, SET_LOADING, SET_ACCOUNT } from './types';

export default (state, action) => {
  switch (action.type) {
    case BLOCKCHAIN_DATA:
      console.log(action.payload);
      return {
        ...state,
        web3: action.payload.web3,
        accounts: action.payload.accounts,
        network: action.payload.network,
        tokenSale: action.payload.tokenSale,
        token: action.payload.token,
        loading: false
      };
    case SET_ACCOUNT:
      return {
        ...state,
        accounts: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        loading: true
      };
    default:
      return state;
  }
};
