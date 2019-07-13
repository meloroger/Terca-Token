import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import BlockchainState from './context/BlockchainState';
import Countdown from './pages/Countdown';

const App = () => {
  useEffect(() => {
    /** Init Materialize JS */
    M.AutoInit();
  });

  return (
    <BlockchainState>
      <Router>
        <div className='App'>
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Countdown} />
            </Switch>
          </div>
        </div>
      </Router>
    </BlockchainState>
  );
};

export default App;
