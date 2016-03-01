import Ember from 'ember';

export default Ember.Service.extend({

  startRec: function() {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve) {
      function recognizeSpeech() {
        // Ember.run.later(function() {
        //   // resolve('Message to tony');
        //   resolve('message to slack bot');
        // }, 2000)
        var maxMatches = 5;
        var language = "en-US"; // optional
        window.plugins.speechrecognizer.start(resultCallback, errorCallback, maxMatches, language);
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
    var result = {},
      wordArr = command.toLowerCase().split(' '),
      lastWord = wordArr[wordArr.length - 1];

    if (wordArr[0] === 'message') {
      if (lastWord === 'bot') {
        lastWord = 'slackbot'
      }
      console.log(lastWord);
      result = {
        subject: lastWord,
        type: 'user'
      }
    } else if (wordArr[0] + wordArr[1] === 'groupmessage') {
      result = {
        subject: lastWord,
        type: 'channel'
      }
      // else reserved for message body
    } else if (wordArr[0] === 'send') {
      result = {
        isSending: true
      }
    } else {
      result = {
        subject: null,
        type: 'body'
      }
    }

    return result;
  }
});
