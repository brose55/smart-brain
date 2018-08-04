import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Logo from './components/Logo.js';
import Rank from './components/Rank.js';
import ImageLinkForm from './components/ImageLinkForm';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <header>
          <Navigation />
          <Logo />
        </header>
        <Rank />
        <ImageLinkForm />
        {/* <FacialRecogniton /> */}
      </div>
    );
  }
}

export default App;
