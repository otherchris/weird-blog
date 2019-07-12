"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Voice =
/*#__PURE__*/
function () {
  function Voice(params) {
    _classCallCheck(this, Voice);

    var type = params.type,
        frequency = params.frequency;
    var context = new window.AudioContext() || window.webkitAudioContext();
    var osc = context.createOscillator();
    var gainControl = context.createGain();
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

  _createClass(Voice, [{
    key: "setGain",
    value: function setGain(gain) {
      this.gainControl.gain.value = gain;
    }
  }, {
    key: "off",
    value: function off() {
      this.gainControl.gain.value = 0;
    }
  }]);

  return Voice;
}();

var Player =
/*#__PURE__*/
function () {
  function Player(params) {
    _classCallCheck(this, Player);

    this.voices = setVoices('sine');
    this.sustain = false;
    this.sustainDuration = 800;
    this.masterGain = 1;
  }

  _createClass(Player, [{
    key: "setVoiceGain",
    value: function setVoiceGain(voice, gain) {
      voice.setGain(gain);
    }
  }, {
    key: "sustainRangeHandler",
    value: function sustainRangeHandler(e) {
      this.sustainDuration = e.target.value;
    }
  }, {
    key: "gainRangeHandler",
    value: function gainRangeHandler(e) {
      this.masterGain = e.target.value / 100;
    }
  }, {
    key: "keyDownHandler",
    value: function keyDownHandler(e) {
      var _this = this;

      if (this.sustain) {
        if (this.voices[e.key].voice.gainControl.gain.value === 0) {
          this.setVoiceGain(this.voices[e.key].voice, this.masterGain);
          setTimeout(function () {
            _this.voices[e.key].voice.off();
          }, this.sustainDuration);
        }

        return;
      }

      if (!this.voices[e.key]) {
        return;
      }

      this.setVoiceGain(this.voices[e.key].voice, this.masterGain);
    }
  }, {
    key: "keyUpHandler",
    value: function keyUpHandler(e) {
      if (this.sustain) {
        return;
      }

      if (!this.voices[e.key]) {
        return;
      }

      this.voices[e.key].voice.off();
    }
  }, {
    key: "waveSelectHandler",
    value: function waveSelectHandler(e) {
      this.setType(e.target.value);
    }
  }, {
    key: "setType",
    value: function setType(type) {
      delete this.voices;
      this.voices = setVoices(type);
    }
  }, {
    key: "sustainSelectHandler",
    value: function sustainSelectHandler(e) {
      this.sustain = e.target.checked;
    }
  }]);

  return Player;
}();

var setVoices = function setVoices(type) {
  return _KEYS(type);
};

var KEYNAMES = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', ';'];

var _KEYS = function _KEYS(type) {
  return {
    'a': {
      voice: new Voice({
        frequency: 130.81,
        type: type
      })
    },
    'w': {
      voice: new Voice({
        frequency: 138.59,
        type: type
      })
    },
    's': {
      voice: new Voice({
        frequency: 146.83,
        type: type
      })
    },
    'e': {
      voice: new Voice({
        frequency: 155.56,
        type: type
      })
    },
    'd': {
      voice: new Voice({
        frequency: 164.81,
        type: type
      })
    },
    'f': {
      voice: new Voice({
        frequency: 174.61,
        type: type
      })
    },
    't': {
      voice: new Voice({
        frequency: 185.01,
        type: type
      })
    },
    'g': {
      voice: new Voice({
        frequency: 196.01,
        type: type
      })
    },
    'y': {
      voice: new Voice({
        frequency: 207.65,
        type: type
      })
    },
    'h': {
      voice: new Voice({
        frequency: 220.00,
        type: type
      })
    },
    'u': {
      voice: new Voice({
        frequency: 233.08,
        type: type
      })
    },
    'j': {
      voice: new Voice({
        frequency: 246.94,
        type: type
      })
    },
    'k': {
      voice: new Voice({
        frequency: 261.63,
        type: type
      })
    },
    'o': {
      voice: new Voice({
        frequency: 277.18,
        type: type
      })
    },
    'l': {
      voice: new Voice({
        frequency: 293.66,
        type: type
      })
    },
    'p': {
      voice: new Voice({
        frequency: 311.13,
        type: type
      })
    },
    ';': {
      voice: new Voice({
        frequency: 329.63,
        type: type
      })
    }
  };
};