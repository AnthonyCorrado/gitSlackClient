import Ember from 'ember';

export default Ember.Route.extend({
  voiceService: Ember.inject.service('voice'),
  model: function() {
    return Ember.Object.create({
      words: null
    });
  },

  actions: {
    startSpeechRec: function() {
      var _this = this;
      this.get('voiceService').startRec()
        .then((data) => {
        _this.modelFor('home').set('words', data);
      })
      // this.modelFor('home').set('words', 'Message to Carla');
    }
  }
});
