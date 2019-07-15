import React from 'react';

const Centerfold = () => {
  return (
    <div className='exchange'>
      <div id='centerfold' className='row '>
        <div id='spacer' className='col s3' />
        <div className='col s6 center-align'>
          <h1 id='centerfold-h1'>Terca Tokens</h1>
          <div id='info'>
            <p className='flow-text'>
              Tokens have no real value!! These tokens are deployed to the
              Ropsten Test Network
            </p>
          </div>
          <div id='exchange-sidenav'>
            <button
              href='#!'
              data-target='slide-out'
              className='sidenav-trigger btn-large waves-effect blue'>
              EXCHANGE NOW!
            </button>
          </div>
        </div>
        <div id='exchange-links' className='col s3 center-align'>
          <ul>
            <li>
              <a href='/'>
                <button className='btn waves blue' id='countdown'>
                  Countdown
                </button>
              </a>
            </li>
            <li>
              <a href='/about'>
                <button className='btn waves blue' id='about'>
                  About
                </button>
              </a>
            </li>
            <li>
              <a
                href='https://faucet.ropsten.be/'
                target='_blank'
                rel='noopener noreferrer'>
                <button className='btn waves blue' id='about'>
                  Free Ether
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div id='metamask' className='row'>
        <div id='spacer' className='col s3' />
        <div id='card1' className='col s3'>
          <div className='card hoverable'>
            <div className='card-content'>
              <p className='center-align'>METAMASK</p>
              <br />
              <p>
                In order to exchange Test Ether for Terca Tokens, MetaMask
                Wallet is required. It's a simple chrome extension.
              </p>
            </div>
            <div className='card-action center-align'>
              <a
                id='card-link'
                href='https://metamask.io/'
                target='_blank'
                rel='noopener noreferrer'>
                INSTALL METAMASK
              </a>
            </div>
          </div>
        </div>
        <div id='card2' className='col s3'>
          <div className='card hoverable'>
            <div className='card-content'>
              <p className='center-align flow-text'>IMPORT YOUR TERCA TOKENS</p>
              <br />
              <p>
                Take this Contract Address:{' '}
                <strong>0x0dfjalkdjkfakdsakjfdsdka</strong> and insert it in the
                add token section in your MetaMask Wallet.
              </p>
            </div>
            <div className='card-action center-align'>
              <a
                id='card-link'
                href='https://metamask.zendesk.com/hc/en-us/articles/360015489031-How-to-View-Your-Tokens'
                target='_blank'
                rel='noopener noreferrer'>
                HELP
              </a>
            </div>
          </div>
        </div>

        <div id='spacer' className='col s3' />
      </div>
    </div>
  );
};

export default Centerfold;
