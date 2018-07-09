import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import { Box, Container, Columns, Column, Notification, Title } from 'bloomer';

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
      display: 'playing'
    }

    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(text) {
    this.setState({
      display: text
    })
  }
  render() {
    return (
      <Container className="App" id="drum-machine">
        <Title hasTextAlign='centered'>Drum Machine</Title>
        <Columns>
          <Column isSize='2/3'>
            <Pads updateDisplay={this.updateDisplay} />
          </Column>
          <Column isSize='1/3'>
            <Controls display={this.state.display}/>
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
      audio.currentTime = 0;
      audio.play();
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
          <Box className="drum-pad" hasTextAlign='centered' onClick={this.handleClick}>
            {this.props.sound.id}
            <audio className="clip" id={this.props.sound.id}  ref={this.audio}>
              <source src={this.props.sound.src} type="audio/mpeg" />
            </audio>
          </Box>
        </Column>
      );
  }
}

const Pads = (props) => (
  <Columns isMultiline>
    {audios.map( (item) => <DrumPad key={item.id} sound={item} updateDisplay={props.updateDisplay} />)}
  </Columns>
);

const Controls = (props) => (
  <Notification id="display" isColor="info" hasTextAlign="centered">{props.display}</Notification>
);

export default App;
