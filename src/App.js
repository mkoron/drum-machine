import React, { Component } from 'react';
import { Box, Button, Container, Columns, Column, Notification, Title } from 'bloomer';
import './App.css';

const backgroundColors = ['violet', 'green', 'orange'];
const padColumns = 3;
const audios = [
  {
    id: 'Q',
    keyCode: 81,
    src: 'static/sounds/clap-808.mp3',
    text: 'clap-808'
  },
  {
    id: 'W',
    keyCode: 87,
    src: 'static/sounds/cowbell-808.mp3',
    text: 'cowbell-808'
  },
  {
    id: 'E',
    keyCode: 69,
    src: 'static/sounds/clap-slapper.mp3',
    text: 'clap-slapper'
  },
  {
    id: 'A',
    keyCode: 65,
    src: 'static/sounds/kick-acoustic01.mp3',
    text: 'kick-accoustic'
  },
  {
    id: 'S',
    keyCode: 83,
    src: 'static/sounds/kick-electro02.mp3',
    text: 'kick-electro'
  },
  {
    id: 'D',
    keyCode: 68,
    src: 'static/sounds/kick-newwave.mp3',
    text: 'kick-newwave'
  },
  {
    id: 'Z',
    keyCode: 90,
    src: 'static/sounds/openhat-tight.mp3',
    text: 'openhat-tight'
  },
  {
    id: 'X',
    keyCode: 88,
    src: 'static/sounds/shaker-shuffle.mp3',
    text: 'shaker-shuffle'
  },
  {
    id: 'C',
    keyCode: 67,
    src: 'static/sounds/tom-fm.mp3',
    text: 'tom-fm'
  }
] 

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      display: '...',
      volume: 10
    }

    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
  }

  updateDisplay(text) {
    this.setState({
      display: text
    })
  }

  updateVolume(volume) {
    this.setState({
        volume
    });
  }
  render() {
    return (
      <Container className="App" id="drum-machine">
        <Title isSize="1" hasTextAlign='centered'>Drum Machine</Title>
        <Columns>
          <Column isSize={7}>
            <Pads updateDisplay={this.updateDisplay} volume={this.state.volume} />
          </Column>
          <Column />
          <Column isSize={4}>
            <Controls volume={this.state.volume} updateVolume={this.updateVolume} display={this.state.display} />
          </Column>
        </Columns>
      </Container>
    );
  }
}

class DrumPad extends Component {
    constructor(props) {
      super(props);
      this.audio = React.createRef();

      this.player = '';
      this.handleKeypress = this.handleKeypress.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
      window.addEventListener("keyup", this.handleKeypress);
    }

    componentWillUnmount() {
      window.removeEventListener("keyup", this.handleKeypress);
    }

    playSound() {
      const audio = this.audio.current;
      const button = audio.parentElement;

      audio.volume = this.props.volume / 100;
      audio.currentTime = 0;
      audio.play();

      button.focus();
      button.style.opacity = 1;

      this.props.updateDisplay(this.props.sound.text);
    }

    handleKeypress(e) {
      if (e.keyCode === this.props.sound.keyCode) {
        this.playSound();
      }
    }

    handleClick() {
      this.playSound();
    }

    render() {
      return (
        <Column isSize="1/3">
          <Button className={`drum-pad ${ this.props.backgroundColor }-radial-background` } hasTextAlign='centered' onClick={this.handleClick}>
            <p>{this.props.sound.id}</p>
            <audio className="clip" id={this.props.sound.id}  ref={this.audio} 
              src={this.props.sound.src} type="audio/mpeg" onEnded={ (e) => e.target.parentElement.style.opacity = .6 }>
            </audio>
          </Button>
        </Column>
      );
  }
}

const Pads = (props) => (
  <Columns isMultiline>
    {audios.map( (item, index) => <DrumPad key={item.id} sound={item} volume={props.volume} updateDisplay={props.updateDisplay}
      backgroundColor={backgroundColors[Math.floor(index / padColumns)]}/>)}
  </Columns>
);

class Controls extends Component {
  constructor(props) {
    super(props);

    this.handleSlider = this.handleSlider.bind(this);
  }

  handleSlider(e) {
    this.props.updateVolume(e.target.value);
  }

  render() {
    return (
        <div>
            <Notification id="display" isColor="info" hasTextAlign="centered">{this.props.display}</Notification>
            <input class="slider" step="1" min="0" max="100" type="range" onChange={this.handleSlider} />
            <Notification id="display-volume" isColor="primary">{this.props.volume}</Notification>
        </div>
    );
  }
}

export default App;
