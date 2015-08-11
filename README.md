# Blabla v0.1alpha

> An awesome wrapper for the Chrome Speech(Synthesis) API 

Use Chrome to speak text and or listen to voice input with ease.


## Install

Just include `blabla.js` into your project. 

TODO: Add to bower / npm (for browserify)?


## Usage

### Speaker 

```js

Blabla.speak('Hello!');

Blabla.setVoice('Monica');
Blabla.speak('Hola!');

Blabla.speaker.on('start', function () {
	// Started speaking
});
Blabla.speaker.on('end', function () {
	// Done speaking
});
```

### Listener

```js

var listener = Blabla.listen();
listener.start();

// Listen for 3 seconds
setTimeout(function () { listener.stop(); }, 3000);

Blabla.listener.on('result', function (data) {
    var result = data.results[0][0];
    console.log(result);
});

Blabla.listener.on('error', function (error) {
	// Something went wrong (ie: timeout, no mic access)
});
```

## API

### Blabla.isSupported;
Type: `boolean`

Check if the user's browser supports speaking and listening. 

Example: 
```
if (!Blabla.isSupported) alert('Please use Google Chrome');
```

### Blabla.speak(text);

#### text

Type: `string`

The text that will be spoken

### Blabla.setVoice(voiceName);

#### voiceName

Type: `string`

The voice to use for speaking (*see Blabla.voices*).

### Blabla.speaker.on(event, callback);

This is Blabla's public speaker, no need to assign it to a variable.

#### event: start
Type: `string`
Speaking has started

#### event: stop
Type: `string`
Speaking has stopped

#### event: error
Type: `string`
There was an error while speaking

#### callback
Type: `Function`

Function to run when event occurs, only has a parameter `error` on the error event.


### Blabla.listen([options]);

Type: `Function`
Returns: `Object`

Returns an object with a `stop()` method to stop the listening. 

#### option: live

Type: `boolean`
Default: `false`

When true, live listening will be enabled and `Blabla.listener.on('result', fn); will be called every time a new word is spoken.

### Blabla.listener.on(event, callback);

This is Blabla's public listener, no need to assign it to a variable.

#### event: start
Type: `string`
Listening has started

#### event: stop
Type: `string`
Listening has stopped

#### event: error
Type: `string`
There was an error while listening (ie: no acccess to microphone)

#### event: result
Type: `string` 

Event for when we receive results from the SpeechSynthesisAPI

#### callback
Type: `Function`

Has a parameter `result` for the event result.

You will need to result.results which is another `object`
The `result.results` object will have the following properties:
- [0-9999] (`number`) - Key, the result be will 0 with normal listening and `result.results.length - 1` for live listening.
- isFinal (`boolean`) - Shows if it's the final result (used for live listening)
- length (`number`) - Amount of results 

**[0-9999]**: The result, another `object` containing the following properties
- confidence (`float`) - 0-1, how sure Google is that the result is correct
- transcript (`stirng`) - The spoken text by the user

To get the result you'll need to do something like `result.results[0][0].transcript`.



### Blabla.on(event, callback)

#### event: voicesLoaded

Type: `string`  

When Blabla.voices[] becomes available, this gets loaded. You can't access Blabla.voices onLoad because 
Chome loads the voices asynchronous. You generally only need this method if you want to list the voices.

#### callback

Type: `function`

Function to execute after the voices are loaded.

### Blabla.voices

Type: `array`  

An array of objects containing voice objects.


## License

MIT © [Jilles Soeters](http://jilles.me)