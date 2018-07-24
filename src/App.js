import React, { Component } from 'react';
import './App.css';

const backgroundColors = ['violet', 'green', 'orange'];
const padColumns = 3;
const audios = [
    {
        name: 'kicks-claps-hats',
        sounds:
            [
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
    },
    {
        name: 'Kawai SX240',
        sounds:
            [
                {
                    id: 'Q',
                    keyCode: 81,
                    src: 'static/sounds/bigrez1.mp3',
                    text: 'bigrez-1'
                },
                {
                    id: 'W',
                    keyCode: 87,
                    src: 'static/sounds/bigrez2.mp3',
                    text: 'bigrez-2'
                },
                {
                    id: 'E',
                    keyCode: 69,
                    src: 'static/sounds/ringmod.mp3',
                    text: 'ring-mod'
                },
                {
                    id: 'A',
                    keyCode: 65,
                    src: 'static/sounds/fatbass-c2.mp3',
                    text: 'fatbass-c2'
                },
                {
                    id: 'S',
                    keyCode: 83,
                    src: 'static/sounds/fatbass-c4.mp3',
                    text: 'fatbass-c4'
                },
                {
                    id: 'D',
                    keyCode: 68,
                    src: 'static/sounds/fatbass-g2.mp3',
                    text: 'fatbass-g2'
                },
                {
                    id: 'Z',
                    keyCode: 90,
                    src: 'static/sounds/snare1.mp3',
                    text: 'snare-1'
                },
                {
                    id: 'X',
                    keyCode: 88,
                    src: 'static/sounds/snare2.mp3',
                    text: 'snare-2'
                },
                {
                    id: 'C',
                    keyCode: 67,
                    src: 'static/sounds/zap.mp3',
                    text: 'zap'
                }
            ]
    }
];

// add passing to display
function zeroPadding(val) {
  const toPad = parseInt(val);

  if (toPad === 100) {
    return toPad;
  } else if (toPad >= 10) {
    return `0${toPad}`;
  } else {
    return `00${toPad}`;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        bank: 0,
        display: '...',
        volume: 50
    };

    this.updateBank = this.updateBank.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
  }

  updateBank(index, text) {
      this.setState({
          bank: index,
          display: text
      });
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
      <div className="container App" id="drum-machine">
        <h1 className="title is-1 has-text-centered">Drum Machine</h1>
        <div className="columns">
          <div className="column is-7">
            <Pads updateDisplay={this.updateDisplay} volume={this.state.volume} bank={ this.state.bank } />
          </div>
          <div className="column">
            <Controls volume={ zeroPadding(this.state.volume) } updateBank={ this.updateBank }
                    updateVolume={ this.updateVolume } display={this.state.display} />
          </div>
        </div>
      </div>
    );
  }
}

class DrumPad extends Component {
    constructor(props) {
      super(props);
      // create a ref and attach it to the element
      this.audio = React.createRef();

      this.handleKeypress = this.handleKeypress.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    // add listener on mount
    componentDidMount() {
      window.addEventListener("keyup", this.handleKeypress);
    }

    // remove listener on unmount
    componentWillUnmount() {
      window.removeEventListener("keyup", this.handleKeypress);
    }

    playSound() {
      // When a ref is passed to an element in render, a reference to the node becomes accessible at
      // the current attribute of the ref.
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
        <div className="column is-one-third">
          <button className={`drum-pad ${ this.props.backgroundColor }-radial-background button is-centered` } onClick={this.handleClick}>
            <p>{this.props.sound.id}</p>
            <audio className="clip" id={this.props.sound.id}  ref={this.audio} 
              src={this.props.sound.src} type="audio/mpeg" onEnded={ (e) => e.target.parentElement.style.opacity = .6 }>
            </audio>
          </button>
        </div>
      );
  }
}

const Pads = (props) => (
  <div className="columns is-multiline">
    {audios[props.bank].sounds.map( (item, index) => <DrumPad key={item.id} sound={item} volume={props.volume} updateDisplay={props.updateDisplay}
      backgroundColor={backgroundColors[Math.trunc(index / padColumns)]}/>)}
  </div>
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
            <div className="notification has-text-info has-text-centered" id="display">{this.props.display}</div>
            <input className="slider" step="1" min="0" max="100" type="range" onChange={this.handleSlider} />
            <div className="notification is-primary" id="display-volume">{this.props.volume}</div>
            <Banks updateBank = { this.props.updateBank } />
        </div>
    );
  }
}

class Banks extends Component {
  constructor(props) {
    super(props);

    this.state = {
        current: 0
    };

    this.changeBank = this.changeBank.bind(this);
  }

  changeBank(e) {
      const el = e.target;
      const index = el.dataset.index;

      this.props.updateBank(index, el.dataset.name);

      this.setState({
          current: index
      });

      this.render();
  }

  render() {
    return (
        <div className="box">
            { audios.map((bank, index) => (
                <span className={`tag is-medium is-${ index == this.state.current ? 'warning' : 'black' }`} key={bank.name}
                    onClick={ this.changeBank } data-index={ index } data-name={ bank.name }>
                    { index + 1 }
                </span>
                )
            )
            }
        </div>
    );
  }
}

export default App;
