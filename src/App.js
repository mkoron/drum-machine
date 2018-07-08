import React, { Component } from 'react';


class App extends Component {
  render() {
    return (
      <div className="App" id="drum-machine">
        <Display />
      </div>
    );
  }
}

const Display = () => (
  <div id="display">
    <p>Hello World</p>
    <DrumPad />
  </div>
);

const DrumPad = () => (
  <div class="drum-pad">
    <p>M</p>
  </div>
);

export default App;
