import React, { useEffect } from 'react';

const Countdown = () => {
  useEffect(() => {
    countingDown();
  }, []);

  const countingDown = () => {
    const countdown = document.querySelector('.countdown');
    console.log(countdown);

    // Set Launch Date
    const launchDate = new Date('Dec 1, 2019 13:00:00').getTime();

    // Update every second
    const interval = setInterval(() => {
      // Get todays date and time (ms)
      const now = new Date().getTime();

      // Distance from now to the launch date
      const distance = launchDate - now;

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result
      countdown.innerHTML = `
    <div>${days}<span>Days</span></div>
    <div>${hours}<span>Hours</span></div>
    <div>${mins}<span>Minutes</span></div>
    <div>${seconds}<span>Seconds</span></div>
    `;
      // If launch date passed
      if (distance < 0) {
        // Stop countdown
        clearInterval(interval);
        // Style and output text
        countdown.getElementsByClassName.color = '#17a2b8';
        countdown.innerHTML = 'Launched!';
      }
    }, 1000);
  };

  return (
    <div>
      <section className='landing'>
        <div className='landing-inner'>
          <h1 id='title'>Terca Tokens</h1>
          <p>A fun-for-all project</p>
          <h1>Ending Soon!</h1>
          <div className='countdown' />
          <div className='countdown-links'>
            <a href='/exchange' id='exchange'>
              <button className='btn waves blue darken-3'>Exchange</button>
            </a>
            <a href='/about' id='about'>
              <button className='btn waves blue darken-3'>About</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Countdown;
