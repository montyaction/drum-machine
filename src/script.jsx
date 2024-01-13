import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

const e = [{
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}]
  , t = [{
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
}, {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}]
  , a = {
    backgroundColor: "blue",
    boxShadow: "0 3px blue",
    height: 77,
    marginTop: 13
}
  , s = {
    backgroundColor: "grey",
    marginTop: 10,
    boxShadow: "3px 3px 5px black"
};

class DrumPad extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          padStyle: {
              backgroundColor: "grey",
              marginTop: 10,
              boxShadow: "3px 3px 5px black",
          },
      };
      this.playSound = this.playSound.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.activatePad = this.activatePad.bind(this);
  }

  componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
      if (e.keyCode === this.props.keyCode) {
          this.playSound();
      }
  }

  activatePad() {
      if (this.props.power) {
          this.setState((state) => ({
              padStyle: state.padStyle.backgroundColor === "blue" ? s : a
          }));
      } else {
          this.setState((state) => ({
              padStyle:
                  state.padStyle.marginTop === 13
                      ? s
                      : { height: 77, marginTop: 13, backgroundColor: "grey", boxShadow: "0 3px grey" },
          }));
      }
  }

  playSound() {
      const audio = document.getElementById(this.props.keyTrigger);
      audio.currentTime = 0;
      audio.play();
      this.activatePad();
      setTimeout(() => this.activatePad(), 100);
      this.props.updateDisplay(this.props.clipId.replace(/-/g, " "));
  }

  render() {
      return (
          <div
              className="drum-pad"
              id={this.props.clipId}
              onClick={this.playSound}
              style={this.state.padStyle}
          >
             {this.props.power && (
                <audio className="clip" id={this.props.keyTrigger} src={this.props.clip}></audio>
             )}
             {!this.props.power && (
                 <audio className="clip" id={this.props.keyTrigger} src="#"></audio>
             )}
              {this.props.keyTrigger}
          </div>
      );
  }
}

class DrumMachine extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          power: true,
          display: String.fromCharCode(160),
          currentPadBank: e,
          currentPadBankId: "Heater Kit",
          sliderVal: 0.3,
      };
      this.displayClipName = this.displayClipName.bind(this);
      this.selectBank = this.selectBank.bind(this);
      this.adjustVolume = this.adjustVolume.bind(this);
      this.powerControl = this.powerControl.bind(this);
      this.clearDisplay = this.clearDisplay.bind(this);
  }

  powerControl() {
      this.setState({
          power: !this.state.power,
          display: this.state.power ? 'OFF' : 'ON',
      });
  }

  selectBank() {
      if (this.state.power) {
          if (this.state.currentPadBankId === "Heater Kit") {
              this.setState({
                  currentPadBank: t,
                  display: "Smooth Piano Kit",
                  currentPadBankId: "Smooth Piano Kit",
              });
          } else {
              this.setState({
                  currentPadBank: e,
                  display: "Heater Kit",
                  currentPadBankId: "Heater Kit",
              });
          }
      }
  }

  displayClipName(name) {
      if (this.state.power) {
          this.setState({
              display: name,
          });
      }
  }

  adjustVolume(e) {
      if (this.state.power) {
          this.setState({
              sliderVal: e.target.value,
              display: "Volume: " + Math.round(100 * e.target.value),
          });
          setTimeout(() => this.clearDisplay(), 1000);
      }
  }

  clearDisplay() {
      this.setState({
          display: String.fromCharCode(160),
      });
  }
  
  render() {
      const powerFloat = this.state.power ? { float: "right" } : { float: "left" };
      const bankFloat = this.state.currentPadBank === e ? { float: "left" } : { float: "right" };

      document.querySelectorAll(".clip").forEach((audio) => {
          audio.volume = this.state.sliderVal;
      });

      return (
          <div className="inner-container" id="drum-machine">
              <div className="drum-pads">
                {this.state.currentPadBank.map((pad) => (
                  <DrumPad
                  key={pad.id}
                    keyCode={pad.keyCode}
                    keyTrigger={pad.keyTrigger}
                    clipId={pad.id}
                    clip={pad.url}
                    clipVolume={this.state.sliderVal}
                    currentPadBank={this.state.currentPadBank}
                    power={this.state.power}
                    updateDisplay={this.displayClipName}
                  />
                ))}
              </div>      
             
              <div className="logo">
                  <div className="inner-logo">FCC{String.fromCharCode(160)}</div>
                  <i className="inner-logo fa fa-free-code-camp"></i>
              </div>
              <div className="controls-container">
                  <div className="control">
                      <p>Power</p>
                      <div className="select" onClick={this.powerControl}>
                          <div className="inner" style={powerFloat}></div>
                      </div>
                  </div>
                  <p id="display">{this.state.display}</p>
                  <div className="volume-slider">
                      <input
                          max="1"
                          min="0"
                          onChange={this.adjustVolume}
                          step="0.01"
                          type="range"
                          value={this.state.sliderVal}
                      />
                  </div>
                  <div className="control">
                      <p>Bank</p>
                      <div className="select" onClick={this.selectBank}>
                          <div className="inner" style={bankFloat}></div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DrumMachine />
    </StrictMode>
);