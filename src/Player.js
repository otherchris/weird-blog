class Voice {
  constructor(params) {
    const {type, frequency} = params;

    const context = new (window.AudioContext) || window.webkitAudioContext();
    const osc = context.createOscillator();
    const gainControl = context.createGain();

    osc.type = type || 'sine';
    gainControl.gain.value = 0;
    osc.connect(gainControl);
    gainControl.connect(context.destination);

    osc.frequency.setValueAtTime(frequency, context.currentTime);
    osc.start();

    this.osc = osc;
    this.gainControl = gainControl;
    this.context = context;
    this.frequency = frequency;
  }

  on() {
    this.gainControl.gain.value = 1;
  }

  off() {
    this.gainControl.gain.value = 0;
  }
}

class Player {
  constructor(params) {
    this.voices = setVoices('sine');
    this.sustain = false;
    this.sustainDuration = 800;
  }

  sustainRangeHandler(e) {
    this.sustainDuration = e.target.value;
  }

  keyDownHandler(e) {
    if (this.sustain) {
      if (this.voices[e.key].voice.gainControl.gain.value === 0) {
        this.voices[e.key].voice.on();
        setTimeout(() => {
          this.voices[e.key].voice.off();
        }, this.sustainDuration);
      }
      return;
    }
    if (!this.voices[e.key]) {
      return;
    }
    this.voices[e.key].voice.on();
  }

  keyUpHandler(e) {
    if (this.sustain) {
      return;
    }
    if (!this.voices[e.key]) {
      return;
    }
    this.voices[e.key].voice.off();
  }

  waveSelectHandler(e) {
    this.setType(e.target.value);
  }

  setType(type) {
    delete this.voices;
    this.voices = setVoices(type);
  }

  sustainSelectHandler(e) {
    this.sustain = e.target.checked;
  }
}

const setVoices = (type) => {
  return _KEYS(type);
};
const KEYNAMES = ['a', 'w', 's', 'e', 'd', 'f','t', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', ';'];
const _KEYS = (type) => {
  return {
    'a': {voice: new Voice({frequency: 130.81, type: type})},
    'w': {voice: new Voice({frequency: 138.59, type: type})},
    's': {voice: new Voice({frequency: 146.83, type: type})},
    'e': {voice: new Voice({frequency: 155.56, type: type})},
    'd': {voice: new Voice({frequency: 164.81, type: type})},
    'f': {voice: new Voice({frequency: 174.61, type: type})},
    't': {voice: new Voice({frequency: 185.01, type: type})},
    'g': {voice: new Voice({frequency: 196.01, type: type})},
    'y': {voice: new Voice({frequency: 207.65, type: type})},
    'h': {voice: new Voice({frequency: 220.00, type: type})},
    'u': {voice: new Voice({frequency: 233.08, type: type})},
    'j': {voice: new Voice({frequency: 246.94, type: type})},
    'k': {voice: new Voice({frequency: 261.63, type: type})},
    'o': {voice: new Voice({frequency: 277.18, type: type})},
    'l': {voice: new Voice({frequency: 293.66, type: type})},
    'p': {voice: new Voice({frequency: 311.13, type: type})},
    ';': {voice: new Voice({frequency: 329.63, type: type})},
  }
}
