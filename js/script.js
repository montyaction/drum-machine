
document.addEventListener('DOMContentLoaded', function () {
  "use strict"

  const drumPadsHeater = [{
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
  }],
    drumPadsChord = [{
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
    }],
    padStyleInactive = {
      backgroundColor: "grey",
      marginTop: 10,
      boxShadow: "3px 3px 5px black",
    },
    padStyleActive = {
      backgroundColor: "blue",
      boxShadow: "0 3px blue",
      height: 77,
      marginTop: 13
    };

  class DrumPad {
    constructor(clipId, keyTrigger, keyCode, clip, updateDisplay, power) {
      this.power = power;
      this.clipId = clipId;
      this.keyTrigger = keyTrigger;
      this.keyCode = keyCode;
      this.clip = clip;
      this.updateDisplay = updateDisplay;
      this.padStyle = padStyleInactive;

      this.activatePad = this.activatePad.bind(this);
      this.playSound = this.playSound.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);

      document.addEventListener('keydown', this.handleKeyPress);
    }

    activatePad() {
      if (this.power) {
        console.log(this.power);
        this.padStyle = (this.padStyle.backgroundColor === 'blue') ? padStyleInactive : padStyleActive;
      } else {
        console.log(this.power);
        this.padStyle = (this.padStyle.marginTop === 13) ? padStyleInactive : {
          backgroundColor: 'grey',
          boxShadow: '0 3px grey',
          marginTop: 13,
          height: 77,
        };
      }
    }

    playSound() {
      const audio = document.getElementById(this.keyTrigger);
      audio.currentTime = 0;
      audio.play();
      this.activatePad();
    }

    handleKeyPress(e) {
      if (e.keyCode === this.keyCode) {
        this.playSound();
      }
    }

    render() {
      const drumPadElement = document.createElement('div');
      drumPadElement.className = 'drum-pad';
      drumPadElement.id = this.clipId;
      drumPadElement.addEventListener('click', this.playSound);
      Object.assign(drumPadElement.style, this.padStyle);

      const audioElement = document.createElement('audio');
      audioElement.className = 'clip';
      audioElement.id = this.keyTrigger;
      audioElement.dataKey = this.keyCode;
      audioElement.src = this.clip;

      drumPadElement.appendChild(audioElement);
      drumPadElement.appendChild(document.createTextNode(this.keyTrigger));

      return drumPadElement;
    }
  }

  class DrumMachine {
    constructor() {
      this.power = true;
      this.display = String.fromCharCode(160);
      this.currentPadBank = drumPadsHeater;
      this.currentPadBankId = 'Heater Kit';
      this.sliderVal = 0.3;

      this.powerControl = this.powerControl.bind(this);
      this.displayClipName = this.displayClipName.bind(this);
      this.adjustVolume = this.adjustVolume.bind(this);
      this.selectBank = this.selectBank.bind(this);
      this.clearDisplay = this.clearDisplay.bind(this);

      this.render();
    }

    powerControl() {
      this.power = !this.power;
      console.log(this.power);
    }

    displayClipName(name) {
      if (this.power) {
        this.display = name;
      }
    }

    adjustVolume(e) {
      if (this.power) {
        this.sliderVal = e.target.value;
        this.display = 'Volume: ' + Math.round(100 * e.target.value);
      }
    }

    selectBank() {
      if (this.power) {
        if (this.currentPadBankId === 'Heater Kit') {
          this.currentPadBank = drumPadsChord;
          this.display = 'Smooth Piano Kit';
          this.currentPadBankId = 'Smooth Piano Kit';
        } else {
          this.currentPadBank = drumPadsHeater;
          this.display = 'Heater Kit';
          this.currentPadBankId = 'Heater Kit';
        }
      }
    }

    clearDisplay() {

    }

    render() {
      const drumMachineContainer = document.createElement('div');
      drumMachineContainer.id = 'drum-machine';

      const drumPadsContainer = document.createElement('div');
      drumPadsContainer.className = 'drum-pads';

      const drumPads = this.power
        ? this.currentPadBank.map(pad =>
          new DrumPad(
            pad.id,
            pad.keyTrigger,
            pad.keyCode,
            pad.url,
            this.displayClipName,
            this.power
          ).render()
        )
        : this.currentPadBank.map(pad =>
          new DrumPad(
            pad.id,
            pad.keyTrigger,
            pad.keyCode,
            '#',
            this.displayClipName,
            this.power
          ).render()
        );

      drumPads.forEach(pad => drumPadsContainer.appendChild(pad));

      const logoContainer = document.createElement('div');
      logoContainer.className = 'logo';

      const innerLogo = document.createElement('div');
      innerLogo.className = 'inner-logo';
      innerLogo.appendChild(document.createTextNode('FCC' + String.fromCharCode(160)));

      const innerIcon = document.createElement('i');
      innerIcon.className = 'inner-logo fa fa-free-code-camp';

      logoContainer.appendChild(innerLogo);
      logoContainer.appendChild(innerIcon);

      const controlsContainer = document.createElement('div');
      controlsContainer.className = 'controls-container';

      const powerControlContainer = document.createElement('div');
      powerControlContainer.className = 'control';

      const powerControlText = document.createElement('p');
      powerControlText.appendChild(document.createTextNode('Power'));

      const powerControlSelect = document.createElement('div');
      powerControlSelect.className = 'select';
      powerControlSelect.addEventListener('click', this.powerControl);

      const innerPowerControl = document.createElement('div');
      innerPowerControl.className = 'inner';
      Object.assign(innerPowerControl.style, this.power ? { float: 'right' } : { float: 'left' });

      powerControlSelect.appendChild(innerPowerControl);

      powerControlContainer.appendChild(powerControlText);
      powerControlContainer.appendChild(powerControlSelect);

      const displayContainer = document.createElement('p');
      displayContainer.id = 'display';
      displayContainer.appendChild(document.createTextNode(this.display));

      const volumeSliderContainer = document.createElement('div');
      volumeSliderContainer.className = 'volume-slider';

      const volumeSliderInput = document.createElement('input');
      volumeSliderInput.type = 'range';
      volumeSliderInput.min = '0';
      volumeSliderInput.max = '1';
      volumeSliderInput.step = '0.01';
      volumeSliderInput.value = this.sliderVal;
      volumeSliderInput.addEventListener('change', this.adjustVolume);

      volumeSliderContainer.appendChild(volumeSliderInput);

      const bankControlContainer = document.createElement('div');
      bankControlContainer.className = 'control';

      const bankControlText = document.createElement('p');
      bankControlText.appendChild(document.createTextNode('Bank'));

      const bankControlSelect = document.createElement('div');
      bankControlSelect.className = 'select';
      bankControlSelect.addEventListener('click', this.selectBank);

      const innerBankControl = document.createElement('div');
      innerBankControl.className = 'inner';
      Object.assign(innerBankControl.style, this.currentPadBank === drumPadsHeater ? { float: 'left' } : { float: 'right' });

      bankControlSelect.appendChild(innerBankControl);

      bankControlContainer.appendChild(bankControlText);
      bankControlContainer.appendChild(bankControlSelect);

      controlsContainer.appendChild(powerControlContainer);
      controlsContainer.appendChild(displayContainer);
      controlsContainer.appendChild(volumeSliderContainer);
      controlsContainer.appendChild(bankControlContainer);

      drumMachineContainer.appendChild(drumPadsContainer);
      drumMachineContainer.appendChild(logoContainer);
      drumMachineContainer.appendChild(controlsContainer);

      document.body.appendChild(drumMachineContainer);
    }
  }


  // function removeTransition(e) {
  //   if (['height', 'margin-top', 'box-shadow'].includes(e.propertyName)) {
  //     e.target.classList.remove('play', 'playing');
  //   }
  // }

  // function disableControls() {
  //   bankElement.removeEventListener('click', bankSwitchHandler);
  //   volumeSlider.disabled = true;
  // }

  // function enableControls() {
  //   bankElement.addEventListener('click', bankSwitchHandler);
  //   volumeSlider.disabled = false;
  // }

  // function setAudioData(selectedBank) {
  //   audios.forEach((audio, i) => {
  //     audio.src = selectedBank[i].url;
  //     audio.parentNode.id = selectedBank[i].id;
  //   });
  // }

  // function powerSwitchHandler() {
  //   const selectedBank = (bankElement.style.float === 'left') ? audiosURL1 : audiosURL2;

  //   powerElement.style.float = (powerElement.style.float === 'left') ? 'right' : 'left';
  //   display.innerText = (powerElement.style.float === 'left') ? 'Power: OFF' : 'Power: ON';

  //   if (powerElement.style.float === 'left') {
  //     disableControls();
  //     audios.forEach(audio => audio.src = '#');
  //   } else {
  //     enableControls();
  //     setAudioData(selectedBank);
  //   }
  // }

  // function bankSwitchHandler() {
  //   const selectedBank = (bankElement.style.float === 'left') ? audiosURL2 : audiosURL1;
  //   const bankName = (bankElement.style.float === 'left') ? 'Smooth Piano Kit' : 'Heater Kit';

  //   bankElement.style.float = (bankElement.style.float === 'left') ? 'right' : 'left';
  //   display.innerText = bankName;
  //   setAudioData(selectedBank);
  // }

  // function playAudio(pad) {
  //   if (powerElement.style.float === 'right') {
  //     const audio = pad.querySelector('.clip');
  //     pad.classList.add('playing');
  //     audio.currentTime = 0;
  //     audio.play();
  //     display.innerText = pad.id;
  //   } else {
  //     pad.classList.add('play');
  //   }
  // }

  // disableControls();

  // drumPads.forEach((pad) => {
  //   pad.addEventListener('click', () => playAudio(pad));
  //   pad.addEventListener('transitionend', removeTransition);

  //   document.addEventListener('keydown', (event) => {
  //     if (event.key.toUpperCase() === pad.innerText) {
  //       playAudio(pad);
  //     }
  //   });
  // });

  // powerElement.parentNode.addEventListener('click', powerSwitchHandler);

  // volumeSlider.addEventListener('input', () => {
  //   const volume = volumeSlider.value;
  //   audios.forEach((audio) => {
  //     audio.volume = volume;
  //   });
  //   display.innerText = `Volume: ${Math.floor(volume * 100)}`;
  // });

  new DrumMachine();
});
