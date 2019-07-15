import React from 'react';

const About = () => {
  return (
    <div id='about-page' className='center-align'>
      <h1>About page</h1>
      <p>
        I built this Web App using React.js and the Contracts are written in
        Solidity. Please visit my repository if you would like to see my code.
      </p>
      <button className='btn waves blue darken-3 btn-large'>Repository</button>
    </div>
  );
};

export default About;
