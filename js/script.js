
document.addEventListener('DOMContentLoaded', function () {
  "use strict"
  const drumPads = document.querySelectorAll('.drum-pad');
  const audios = document.querySelectorAll('.clip');
  const powerElement = document.querySelectorAll('.control .inner')[0];
  const bankElement = document.querySelectorAll('.control .inner')[1];
  const volumeSlider = document.querySelector('.volume-slider input');
  const display = document.getElementById('display');

  const audiosURL1 = [{
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
    audiosURL2 = [{
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
    play = {
      backgroundColor: "orange",
      boxShadow: "0 3px orange",
      height: 77,
      marginTop: 13
    },
    stop = {
      backgroundColor: "grey",
      marginTop: 10,
      boxShadow: "3px 3px 5px black"
    };

  function removeTransition(e) {
    if (['height', 'margin-top', 'box-shadow'].includes(e.propertyName)) {
      e.target.classList.remove('play', 'playing');
    }
  }

  function disableControls() {
    bankElement.removeEventListener('click', bankSwitchHandler);
    volumeSlider.disabled = true;
  }

  function enableControls() {
    bankElement.addEventListener('click', bankSwitchHandler);
    volumeSlider.disabled = false;
  }
  
  function setAudioData(selectedBank) {
    audios.forEach((audio, i) => {
      audio.src = selectedBank[i].url;
      audio.parentNode.id = selectedBank[i].id;
    });
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

  function bankSwitchHandler() {
    const selectedBank = (bankElement.style.float === 'left') ? audiosURL2 : audiosURL1;
    const bankName = (bankElement.style.float === 'left') ? 'Smooth Piano Kit' : 'Heater Kit';

    bankElement.style.float = (bankElement.style.float === 'left') ? 'right' : 'left';
    display.innerText = bankName;
    setAudioData(selectedBank);
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

  disableControls();

  drumPads.forEach((pad) => {
    pad.addEventListener('click', () => playAudio(pad));
    pad.addEventListener('transitionend', removeTransition);

    document.addEventListener('keydown', (event) => {
      if (event.key.toUpperCase() === pad.innerText) {
        playAudio(pad);
      }
    });
  });

  powerElement.parentNode.addEventListener('click', powerSwitchHandler);

  volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    audios.forEach((audio) => {
      audio.volume = volume;
    });
    display.innerText = `Volume: ${Math.floor(volume * 100)}`;
  });
  
});
