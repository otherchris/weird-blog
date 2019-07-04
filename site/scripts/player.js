"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player =
/*#__PURE__*/
function () {
  function Player(params) {
    _classCallCheck(this, Player);

    var type = params.type,
        frequency = params.frequency,
        duration = params.duration;
    var context = new window.AudioContext() || window.webkitAudioContext();
    var osc = context.createOscillator();
    var gainControl = context.createGain();
    osc.type = type;
    gainControl.gain.value = 0;
    osc.connect(gainControl);
    gainControl.connect(context.destination);
    osc.frequency.setValueAtTime(frequency, context.currentTime);
    osc.start();
    this.osc = osc;
    this.gainControl = gainControl;
    this.context = context;
  }

  _createClass(Player, [{
    key: "play",
    value: function play(frequency, duration) {
      var _this = this;

      this.osc.frequency.setValueAtTime(frequency, this.context.currentTime);
      this.gainControl.gain.value = 1;
      setTimeout(function () {
        _this.gainControl.gain.value = 0;
      }, duration);
    }
  }, {
    key: "on",
    value: function on() {
      this.gainControl.gain.value = 1;
    }
  }, {
    key: "half",
    value: function half() {
      this.gainControl.gain.value = 0.2;
    }
  }, {
    key: "off",
    value: function off() {
      this.gainControl.gain.value = 0;
    }
  }, {
    key: "setFreq",
    value: function setFreq(freq) {
      this.osc.frequency.setValueAtTime(freq, this.context.currentTime);
    }
  }]);

  return Player;
}();

var OscPlayer =
/*#__PURE__*/
function () {
  function OscPlayer(params) {
    _classCallCheck(this, OscPlayer);

    var real = params.real,
        imag = params.imag,
        frequency = params.frequency,
        duration = params.duration;
    this.real = real;
    var context = new window.AudioContext() || window.webkitAudioContext();
    var osc = context.createOscillator();
    var gainControl = context.createGain();
    var wave = context.createPeriodicWave(real, imag, {
      disableNormalization: true
    });
    osc.setPeriodicWave(wave);
    gainControl.gain.value = 0;
    osc.connect(gainControl);
    gainControl.connect(context.destination);
    osc.frequency.setValueAtTime(frequency, context.currentTime);
    osc.start();
    this.osc = osc;
    this.gainControl = gainControl;
    this.context = context;
  }

  _createClass(OscPlayer, [{
    key: "play",
    value: function play(frequency, duration) {
      var _this2 = this;

      this.osc.frequency.setValueAtTime(frequency, this.context.currentTime);
      this.gainControl.gain.value = 1;
      setTimeout(function () {
        _this2.gainControl.gain.value = 0;
      }, duration);
    }
  }, {
    key: "on",
    value: function on() {
      this.gainControl.gain.value = 1;
    }
  }, {
    key: "half",
    value: function half() {
      this.gainControl.gain.value = 0.1;
    }
  }, {
    key: "off",
    value: function off() {
      this.gainControl.gain.value = 0;
    }
  }, {
    key: "setFreq",
    value: function setFreq(freq) {
      this.osc.frequency.setValueAtTime(freq, this.context.currentTime);
    }
  }]);

  return OscPlayer;
}();

var defaultPlayer = new Player({
  frequency: 440,
  type: 'triangle'
});
defaultPlayer.on();
setInterval(function () {
  var freq = Math.random() * 500;
  osc1.setFreq(freq);
}, 100);
setInterval(function () {
  var freq = Math.random() * 500;
  defaultPlayer.setFreq(freq);
}, 1000);
var sawPlayer = new Player({
  frequency: 200,
  type: 'sawtooth'
});
var osc1 = new OscPlayer({
  real: new Float32Array([0, 1, 1, 0.5, 1, 0, 0, 0, 0, -1, 1, 1, 1, 0, 1]),
  imag: new Float32Array([1, 0, 1, 0, -1, 0, 0.5, 1, 1, 0, -0.5, 0.5, 0.5, 0.5, 0]),
  frequency: 150,
  duration: 1000
});