class Voice {
  constructor(params) {
    const {type, frequency} = params;

    const context = new (window.AudioContext) || window.webkitAudioContext();
    const osc = context.createOscillator();
    const gainControl = context.createGain();

    osc.type = 'square';
    gainControl.gain.value = 0;
    osc.connect(gainControl);
    gainControl.connect(context.destination);

    osc.frequency.setValueAtTime(frequency, context.currentTime);
    osc.start();

    this.osc = osc;
    this.gainControl = gainControl;
    this.context = context;
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
  }

  static get KEYS() {
    return _KEYS;
  }

  keyDown(key) {
    Player.KEYS[key].voice.on();
  }

  keyUp(key) {
    Player.KEYS[key].voice.off();
  }

  keyDownHandler(e) {
    if (!Player.KEYS[e.key]) {
      return;
    }
    this.keyDown(e.key);
  }

  keyUpHandler(e) {
    this.keyUp(e.key);
  }
}

const _KEYS = {
  'a': {voice: new Voice({frequency: 130.81})},
  'w': {voice: new Voice({frequency: 138.59})},
  's': {voice: new Voice({frequency: 146.83})},
  'e': {voice: new Voice({frequency: 155.56})},
  'd': {voice: new Voice({frequency: 164.81})},
  'f': {voice: new Voice({frequency: 174.61})},
  't': {voice: new Voice({frequency: 185.01})},
  'g': {voice: new Voice({frequency: 196.01})},
  'y': {voice: new Voice({frequency: 207.65})},
  'h': {voice: new Voice({frequency: 220.00})},
  'u': {voice: new Voice({frequency: 233.08})},
  'j': {voice: new Voice({frequency: 246.94})},
  'k': {voice: new Voice({frequency: 261.63})},
  'o': {voice: new Voice({frequency: 277.18})},
  'l': {voice: new Voice({frequency: 293.66})},
  'p': {voice: new Voice({frequency: 311.13})},
  ';': {voice: new Voice({frequency: 329.63})},
}
