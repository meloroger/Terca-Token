import React, { useContext, useState } from 'react';
import BlockchainContext from '../context/blockchainContext';

const Test = () => {
  const [accounts, setAccounts] = useState();

  return (
    <div>
      <h5>Your account: {accounts}</h5>
    </div>
  );
};

export default Test;
