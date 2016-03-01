import Ember from 'ember';

export default Ember.Route.extend({
  voiceService: Ember.inject.service('voice'),
  rtmService: Ember.inject.service('rtm'),

  model: function() {
    return Ember.Object.create({
      words: '_',
      recActive: false,
      messageBody: '',
      contacts: this.get('rtmService').getContacts()
        .then((contacts) => {
          this.modelFor('home').set('contacts', contacts);
        })
    });
  },

  //temp
  afterModel() {
    var msgTest = {
      recipientId: 'dfadsf',
      recipient: 'slackbot',
      senderId: 'qwerty',
      sender: 'tony',
      body: 'how is your day going?'
    }
    this.get('rtmService').sendMsg(msgTest)
      .then((response) => {
        console.log(response);
      })
  },
  // ********
  analyzeReq: function(words) {
    var analysis = this.get('voiceService').analyze(words);
    if (analysis.type === 'user') {
      this.get('rtmService').getContact(analysis.subject)
        .then((contact) => {
          console.log('this is analyze', contact);
          this.modelFor('home').set('recipient', contact)
        })   
    } else if (analysis.type === 'channel') {
      console.log('slack the channel');
    } else if (analysis.type === 'body') {
      console.log('home message body hit');
      this.modelFor('home').set('messageBody', words);
      //
      Ember.run.later(() => {
        // alert(JSON.stringify(completeMessage));
        this.send('startSpeechRec')
      },2000)
    } else if (analysis.isSending) {
      var completeMsg = {
        recipient: this.modelFor('home').get('recipient'),
        body: this.modelFor('home').get('messageBody')
      }
      this.get('rtmService').sendMsg(completeMsg)
        .then((response) => {
          console.log(response);
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
