import React from 'react';

const Navigation = ({ handleRouteChange, isSignedIn, route }) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p className='f3 link dim black underline pr4 pointer' onClick={() => handleRouteChange('signIn')}>Sign Out</p>
			</nav>
    )
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      {
        route === 'signIn' ?
        <p className='f3 link dim black underline pr4 pointer' onClick={() => handleRouteChange('Register')}>Register</p>
        :
        <p className='f3 link dim black underline pr4 pointer' onClick={() => handleRouteChange('signIn')}>Sign In</p>
      }
      </nav>
    )
  }
}

export default Navigation;
