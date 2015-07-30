var Blabla = (function () {

  'use strict';

  var Blabla = {};
  var _settings = {
    speaker: {},
    listener: {}
  };
  var recognizer;

  // Check for support
  Blabla.isSupported = (function () {
    return (
      'speechSynthesis' in window &&
        'webkitSpeechRecognition' in window);
  })();

  Blabla.voices = [];
  // Set the voices (voices are loaded async!!)
  speechSynthesis.addEventListener('voiceschanged', function () {
    Blabla.voices = speechSynthesis.getVoices();
  });

  Blabla.listVoices = function () {
    return Blabla.voices.map(function (voice) {
      return voice.name;
    });
  };

  Blabla.setVoice = function (name) {
    var search = Blabla.voices.filter(function (voice) {
      if (voice.name === name) {
        return voice;
      }
    });

    if (!search.length) {
      throw Error('Not a valid voice \'' + name + '\', use Blabla.listVoices to get the available voices');
    }
    _settings.voice = search[0];
  };

  Blabla.speak = function (sentence) {

    // Create a speech utterance object, this takes a string as argument.
    var utterance = new SpeechSynthesisUtterance(sentence);

    // Change voice if needed
    if (_settings.voice) {
      utterance.voice = _settings.voice;
    }

    // Any registered 'on(...) handlers?
    for (var event in _settings.speaker) {
      // Set callbacks
      utterance['on' + event] = _settings.speaker[event];
    }

    // Speak text out loud.
    speechSynthesis.speak(utterance);
  };

  // Listen (option.live = false)
  Blabla.listen = function (options) {
    if (!options) {
      options = { live: false };
    }

    recognizer = new webkitSpeechRecognition();

    if (options.live) {
      recognizer.continuous = true;
      recognizer.interimResults = true;
    }

    recognizer._start = recognizer.start;
    recognizer.start = function () {
      // Any registered 'on(...) handlers?
      for (var event in _settings.listener) {
        recognizer['on' + event] = _settings.listener[event];
      }
      return recognizer._start();
    };

    return recognizer;
  };

  // Speaker event listeners
  Blabla.speaker = {
    on: function (ev, cb) {
      _settings.speaker[ev] = cb;
    }
  };
  Blabla.listener = {
    on: function (ev, cb) {
      _settings.listener[ev] = cb;
    }
  };

  return Blabla;
})();

