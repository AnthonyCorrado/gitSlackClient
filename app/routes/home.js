import Ember from 'ember';

export default Ember.Route.extend({
  voiceService: Ember.inject.service('voice'),
  rtmService: Ember.inject.service('rtm'),
  model: function() {
    return Ember.Object.create({
      words: '_',
      contacts: this.get('rtmService').getContacts()
        .then((contacts) => {
          this.modelFor('home').set('contacts', contacts);
        })
    });
  },

  analyzeReq: function(words) {
    var analysis = this.get('voiceService').analyze(words);
    console.log(analysis);
    if (analysis.type === 'user') {
      this.get('rtmService').getContact(analysis.subject)
        .then((contact) => {
          console.log('this is analyze', contact);
        })   
    }
  },

  actions: {
    startSpeechRec: function() {
      var _this = this;
      this.get('voiceService').startRec()
        .then((result) => {
          this.analyzeReq(result);
          _this.modelFor('home').set('command', result);
          _this.modelFor('home').set('isFadeIn', true);
          _this.modelFor('home').set('fadeOut', true);
        })
    }
  }
});
