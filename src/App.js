import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Logo from './components/Logo.js';
import SignIn from './components/SignIn';
import Register from './components/Register'
import Navigation from './components/Navigation';
import Rank from './components/Rank.js';
import ImageLinkForm from './components/ImageLinkForm';
import FacialRecognition from './components/FacialRecognition';
import './App.css';

// say something about config particles
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

//object used to clear state upon sign out
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  handleRouteChange = (route) => {
    if (route === 'signIn') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route });
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  }

  handlePictureSubmit = () => {
    this.setState({ imageUrl: this.state.input});
      fetch('https://cryptic-falls-77467.herokuapp.com/imageUrl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://cryptic-falls-77467.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.displayFacialOutline(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
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
    this.setState({ box: box})
  }

  render() {
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation
          handleRouteChange={this.handleRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        <Logo />
        {
          this.state.route === 'home' ?
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries} />
            <ImageLinkForm
              handleChange={this.handleChange}
              handleSubmit={this.handlePictureSubmit}
            />
            <FacialRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
          </div>
          : (
            this.state.route === 'signIn' ?
              <SignIn loadUser={this.loadUser} handleRouteChange={this.handleRouteChange} />
            :
              <Register loadUser={this.loadUser} handleRouteChange={this.handleRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
