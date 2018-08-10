import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Logo from './components/Logo.js';
import SignIn from './components/SignIn';
import Register from './components/Register'
import Navigation from './components/Navigation';
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
      box: {},
      route: 'signIn',
      isSignedIn: false
    }
  }

  handleRouteChange = (route) => {
    if (route === 'signIn') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route });
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
      .then(response => this.displayFacialOutline(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
    }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFacialOutline = (box) => {
    console.log(box);
    this.setState({ box: box})
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation handleRouteChange={this.handleRouteChange} isSignedIn={this.state.isSignedIn} />
        <Logo />
        {
          this.state.route === 'home' ?
          <div>
            <Rank />
            <ImageLinkForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
            <FacialRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
          </div>
          : (
            this.state.route === 'signIn' ?
              <SignIn handleRouteChange={this.handleRouteChange} />
            :
              <Register handleRouteChange={this.handleRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
