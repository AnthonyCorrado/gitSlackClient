import Ember from 'ember';

export default Ember.Service.extend({

  startRec: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      function recognizeSpeech() {
        Ember.run.later(function() {
          resolve('Message to tony');
        }, 2000)
        // var maxMatches = 5;
        // var language = "en-US"; // optional
        // window.plugins.speechrecognizer.start(resultCallback, errorCallback, maxMatches, language);
      }

      function resultCallback(result) {
        console.log(result.results[0][0]);
        resolve(result.results[0][0].transcript);
      }

      function errorCallback(error){
        console.log(error);
      }

      recognizeSpeech();
    });
  },

  analyze: function(command) {
    var result = {};
    var wordArr = command.toLowerCase().split(' ');
    if (wordArr[0] === 'message') {
      result = {
        subject: wordArr[wordArr.length - 1],
        type: 'user'
      }
    } else if (wordArr[0] === 'slack') {
      result = {
        subject: wordArr[wordArr.length - 1],
        type: 'channel'
      }
    }
    return result;
  }
});
