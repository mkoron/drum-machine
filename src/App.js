import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import { Container, Columns, Column, Box, Title } from 'bloomer';



const audios = [
  {
    id: 'Q',
    src: 'sounds/clap-808.mp3',
    text: 'clap-808'
  },
  {
    id: 'W',
    src: 'sounds/clap-707.mp3',
    text: 'clap-707'
  },
  {
    id: 'E',
    src: 'sounds/clap-707.mp3',
    text: 'clap-101'
  },
  {
    id: 'Q',
    src: 'sounds/clap-808.mp3',
    text: 'clap-808'
  },
  {
    id: 'W',
    src: 'sounds/clap-707.mp3',
    text: 'clap-707'
  },
  {
    id: 'E',
    src: 'sounds/clap-707.mp3',
    text: 'clap-101'
  },
  {
    id: 'Q',
    src: 'sounds/clap-808.mp3',
    text: 'clap-808'
  },
  {
    id: 'W',
    src: 'sounds/clap-707.mp3',
    text: 'clap-707'
  },
  {
    id: 'E',
    src: 'sounds/clap-707.mp3',
    text: 'clap-101'
  }
] 

class App extends Component {
  render() {
    return (
      <Container className="App" id="drum-machine">
        <Title hasTextAlign='centered'>Drum Machine</Title>
        <Display />
      </Container>
    );
  }
}

const Display = () => (
  <div id="display">
    <Pads />
  </div>
);

const DrumPad = (props) => (
    <Column isSize="1/3">
      <Box className="drum-pad" hasTextAlign='centered'>{props.sound.text}</Box>
    </Column>
);


const Pads = () => (
  <Columns isMultiline>
    {audios.map( (item) => <DrumPad sound={item} />)}
  </Columns>
);

export default App;
