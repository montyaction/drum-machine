
document.addEventListener('DOMContentLoaded', function () {
  "use strict"
  const drumPads = document.querySelectorAll('.drum-pad');
  const audios = document.querySelectorAll('.clip');
  const powerElement = document.querySelectorAll('.control .inner')[0];
  const bankElement = document.querySelectorAll('.control .inner')[1];
  const volumeSlider = document.querySelector('.volume-slider input');
  const display = document.getElementById('display');

  const audiosURL1 = [{
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  }, {
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  }, {
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  }, {
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  }, {
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  }, {
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  }, {
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  }, {
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  }, {
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }],
    audiosURL2 = [{
      id: "Chord-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
    }, {
      id: "Chord-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
    }, {
      id: "Chord-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
    }, {
      id: "Shaker",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
    }, {
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
    }, {
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
    }, {
      id: "Punchy-Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
    }, {
      id: "Side-Stick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
    }, {
      id: "Snare",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
    }];

  function removeTransition(e) {
    if (['height', 'margin-top', 'box-shadow'].includes(e.propertyName)) {
      e.target.classList.remove('play', 'playing');
    }
  }

  function disableControls() {
    bankElement.parentNode.removeEventListener('click', bankSwitchHandler);
    volumeSlider.disabled = true;
  }

  function enableControls() {
    bankElement.parentNode.addEventListener('click', bankSwitchHandler);
    volumeSlider.disabled = false;
  }
  
  function setAudioData(selectedBank) {
    audios.forEach((audio, i) => {
      audio.parentNode.id = selectedBank[i].id;
      audio.src = selectedBank[i].url;
    });
  }

  function playAudio(pad) {
    if (powerElement.style.float === 'right') {
      const audio = pad.querySelector('.clip');
      pad.classList.add('playing');
      audio.currentTime = 0;
      audio.play();
      display.innerText = pad.id;
    } else {
      pad.classList.add('play');
    }
  }

  function handelKeyPress(e) {
    const audio = document.getElementById(e.key.toUpperCase());
    const pad = audio.parentNode;
    playAudio(pad);
  }

  function powerSwitchHandler() {
    const selectedBank = (bankElement.style.float === 'left') ? audiosURL1 : audiosURL2;

    powerElement.style.float = (powerElement.style.float === 'left') ? 'right' : 'left';
    display.innerText = (powerElement.style.float === 'left') ? 'Power: OFF' : 'Power: ON';

    if (powerElement.style.float === 'left') {
      disableControls();
      audios.forEach(audio => audio.src = '#');
    } else {
      enableControls();
      setAudioData(selectedBank);
    }
  }
  
  function volumeSliderHandler() {
    const volume = volumeSlider.value;
    audios.forEach((audio) => {
      audio.volume = volume;
    });
    display.innerText = `Volume: ${Math.floor(volume * 100)}`;
  }
  
  function bankSwitchHandler() {
    const selectedBank = (bankElement.style.float === 'left') ? audiosURL2 : audiosURL1;
    const bankName = (bankElement.style.float === 'left') ? 'Smooth Piano Kit' : 'Heater Kit';

    bankElement.style.float = (bankElement.style.float === 'left') ? 'right' : 'left';
    display.innerText = bankName;
    setAudioData(selectedBank);
  }
  
  disableControls();

  drumPads.forEach((pad) => {
    pad.addEventListener('click', () => playAudio(pad));
    pad.addEventListener('transitionend', removeTransition);
  });
  document.addEventListener('keydown', handelKeyPress);

  powerElement.parentNode.addEventListener('click', powerSwitchHandler);
  volumeSlider.addEventListener('input', volumeSliderHandler);
});
