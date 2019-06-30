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

var defaultPlayer = new Player({
  frequency: 440,
  type: 'sine'
});
var sawPlayer = new Player({
  frequency: 300,
  type: 'sawtooth'
});