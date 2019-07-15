import {
  BLOCKCHAIN_DATA,
  SET_LOADING,
  SET_ACCOUNT,
  SET_TOKENSALE
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case BLOCKCHAIN_DATA:
      return {
        ...state,
        loading: false
      };
    case SET_TOKENSALE:
      return {
        ...state,
        tokenSale: action.payload
      };
    case SET_ACCOUNT:
      return {
        ...state,
        accounts: action.payload
      };
    case SET_LOADING:
      return {
        loading: true
      };
    default:
      return state;
  }
};
