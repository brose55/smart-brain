import React from 'react';

const Navigation = ({ handleRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => handleRouteChange('signIn')}>Sign Out</p>
      </nav>
    )
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => handleRouteChange('signIn')}>Sign In</p>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => handleRouteChange('Register')}>Register</p>
      </nav>
    )
  }
}

export default Navigation;
