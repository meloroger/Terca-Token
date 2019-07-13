import React, { useContext, useEffect, useState } from 'react';
import Test from './Test';
import BlockchainContext from '../context/blockchainContext';

const Countdown = () => {
  const blockchainContext = useContext(BlockchainContext);
  const { loading, accounts } = blockchainContext;

  return (
    <div>
      <h1>Terca Token</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h5>Your account: {accounts}</h5>
        </div>
      )}
    </div>
  );
};

export default Countdown;
