import Ember from 'ember';

export default Ember.Service.extend({
  startRec: function() {

    return new Ember.RSVP.Promise(function(resolve) {
      function recognizeSpeech() {
        var maxMatches = 1;
        var promptString = ''; // optional
        var language = "en-US"; // optional
        window.plugins.speechrecognizer.startRecognize(function(result){
            resolve(result);
            return new Ember.RSVP.hash(result)
        }, function(errorMessage){
            console.log("Error message: " + errorMessage);
        }, maxMatches, promptString, language);
      }
      recognizeSpeech();
    });
  }
});
