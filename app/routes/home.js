import Ember from 'ember';

export default Ember.Route.extend({
  voiceService: Ember.inject.service('voice'),
  rtmService: Ember.inject.service('rtm'),

  model: function() {
    return Ember.Object.create({
      words: '_',
      recActive: false,
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
          this.modelFor('home').set('recipient', contact)
        })   
    }
  },

  actions: {
    startSpeechRec: function() {
      var _this = this;
      _this.modelFor('home').set('recActive', true);
      this.get('voiceService').startRec()
        .then((result) => {
          this.analyzeReq(result);
          _this.modelFor('home').set('command', result);
          _this.modelFor('home').set('isFadeIn', true);
          _this.modelFor('home').set('recActive', false);
          // _this.modelFor('home').set('fadeOut', true);
        })
    }
  }
});
