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

  _createClass(Voice, [{
    key: "on",
    value: function on() {
      this.gainControl.gain.value = 1;
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
  }

  _createClass(Player, [{
    key: "keyDown",
    value: function keyDown(key) {
      Player.KEYS[key].voice.on();
    }
  }, {
    key: "keyUp",
    value: function keyUp(key) {
      Player.KEYS[key].voice.off();
    }
  }, {
    key: "keyDownHandler",
    value: function keyDownHandler(e) {
      if (!Player.KEYS[e.key]) {
        return;
      }

      this.keyDown(e.key);
    }
  }, {
    key: "keyUpHandler",
    value: function keyUpHandler(e) {
      this.keyUp(e.key);
    }
  }], [{
    key: "KEYS",
    get: function get() {
      return _KEYS;
    }
  }]);

  return Player;
}();

var _KEYS = {
  'a': {
    voice: new Voice({
      frequency: 130.81
    })
  },
  'w': {
    voice: new Voice({
      frequency: 138.59
    })
  },
  's': {
    voice: new Voice({
      frequency: 146.83
    })
  },
  'e': {
    voice: new Voice({
      frequency: 155.56
    })
  },
  'd': {
    voice: new Voice({
      frequency: 164.81
    })
  },
  'f': {
    voice: new Voice({
      frequency: 174.61
    })
  },
  't': {
    voice: new Voice({
      frequency: 185.01
    })
  },
  'g': {
    voice: new Voice({
      frequency: 196.01
    })
  },
  'y': {
    voice: new Voice({
      frequency: 207.65
    })
  },
  'h': {
    voice: new Voice({
      frequency: 220.00
    })
  },
  'u': {
    voice: new Voice({
      frequency: 233.08
    })
  },
  'j': {
    voice: new Voice({
      frequency: 246.94
    })
  },
  'k': {
    voice: new Voice({
      frequency: 261.63
    })
  },
  'o': {
    voice: new Voice({
      frequency: 277.18
    })
  },
  'l': {
    voice: new Voice({
      frequency: 293.66
    })
  },
  'p': {
    voice: new Voice({
      frequency: 311.13
    })
  },
  ';': {
    voice: new Voice({
      frequency: 329.63
    })
  }
};