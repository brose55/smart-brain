import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation';
import Logo from './components/Logo.js';
import Rank from './components/Rank.js';
import ImageLinkForm from './components/ImageLinkForm';
import FacialRecognition from './components/FacialRecognition';
import './App.css';

const app = new Clarifai.App({
 apiKey: '60396a7ead6f47528a232c65767e9cd7'
});

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
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  }

  handleSubmit = () => {
    this.setState({ imageUrl: this.state.input});
    app.models
      .predict(
      Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        console.log(err);
      }
    );
  }

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
        <ImageLinkForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <FacialRecognition
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
