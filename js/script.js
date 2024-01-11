$(document).ready(function () {
  "use strict";

  const powerElement = $('.control .inner').eq(0);
  const bankElement = $('.control .inner').eq(1);

  const audioURL1 = [
    { id: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
    { id: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
    { id: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
    { id: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
    { id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
    { id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
    { id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
    { id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
    { id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
  ];

  const audioURL2 = [
    { id: "Chord-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },
    { id: "Chord-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },
    { id: "Chord-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },
    { id: "Shaker", url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },
    { id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },
    { id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },
    { id: "Punchy-Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },
    { id: "Side-Stick", url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },
    { id: "Snare", url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" }
  ];

  function removeTransition(e) {
    if (['height', 'margin-top', 'box-shadow'].includes(e.originalEvent.propertyName)) {
      $(this).removeClass('play playing');
    }
  }

  function disableControls() {
    bankElement.parent().off('click', bankSwitchHandler);
    $('input').prop('disabled', true);
  }

  function enableControls() {
    bankElement.parent().on('click', bankSwitchHandler);
    $('input').prop('disabled', false);
  }

  function setAudioData(selectedBank) {
    $('.clip').each(function (i) {
      $(this).parent().prop('id', selectedBank[i].id);
      this.src = selectedBank[i].url;
    });
  }

  function playAudio(pad) {
    if (powerElement.css('float') === 'right') {
      const audio = pad.find('.clip')[0];
      pad.addClass('playing');
      audio.currentTime = 0;
      audio.play();
      $('#display').text(pad.prop('id'));
    } else {
      pad.addClass('play');
    }
  }

  function handelKeyPress(e) {
    const audio = $('#' + e.key.toUpperCase());
    const pad = audio.parent();
    playAudio(pad);
  }

  function powerSwitchHandler() {
    const selectedBank = (bankElement.css('float') === 'left') ? audioURL1 : audioURL2;

    powerElement.css('float', (powerElement.css('float') === 'left') ? 'right' : 'left');
    $('#display').text((powerElement.css('float') === 'left') ? 'Power: OFF' : 'Power: ON');

    if (powerElement.css('float') === 'left') {
      disableControls();
      $('.clip').each(function () {
        this.src = '#';
      });
    } else {
      enableControls();
      setAudioData(selectedBank);
    }
  }

  function volumeSliderHandler() {
    const volume = $('input').val();
    $('.clip').each(function () {
      this.volume = volume;
    });
    $('#display').text(`Volume: ${Math.floor(volume * 100)}`);
  }

  function bankSwitchHandler() {
    const selectedBank = (bankElement.css('float') === 'left') ? audioURL2 : audioURL1;
    const bankName = (bankElement.css('float') === 'left') ? 'Smooth Piano Kit' : 'Heater Kit';

    bankElement.css('float', (bankElement.css('float') === 'left') ? 'right' : 'left');
    $('#display').text(bankName);
    setAudioData(selectedBank);
  }

  disableControls();

  $('.drum-pad').on('click', function () {
    playAudio($(this));
  });
  
  $('.drum-pad').on('transitionend', removeTransition);
  
  $(document).on('keydown', handelKeyPress);
  
  powerElement.parent().on('click', powerSwitchHandler);
  $('input').on('input', volumeSliderHandler);
});