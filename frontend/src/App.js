import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import BlockchainState from './context/blockchain/BlockchainState';
import Countdown from './pages/Countdown';
import Exchange from './pages/Exchange';
import About from './pages/About';

const App = () => {
  useEffect(() => {
    /** Init Materialize JS */
    M.AutoInit();
  });

  return (
    <BlockchainState>
      <Router>
        <div className='App'>
          <div>
            <Switch>
              <Route exact path='/' component={Countdown} />
              <Route exact path='/exchange' component={Exchange} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    </BlockchainState>
  );
};

export default App;
