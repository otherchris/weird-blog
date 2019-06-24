"use strict";

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // create Oscillator node

var oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(330, audioCtx.currentTime); // value in hertz

oscillator.connect(audioCtx.destination);
oscillator.start();

var player = function player(data) {
  alert(data);
};