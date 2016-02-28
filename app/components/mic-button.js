import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['applySmall', 'fontColor'],
  applySmall: false,

  click: function() {
    this.sendAction();
  },

  actions: {
    startMic: function() {
      this.set('applySmall', true);
      this.set('fontColor', true);
    }
  }
});
