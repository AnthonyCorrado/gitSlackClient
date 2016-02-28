import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['applySmall', 'fontColor'],
  applySmall: false,
  halfBar: '50%',

  actions: {
    startMic: function() {
      this.set('applySmall', true);
      this.set('fontColor', true);
      this.set('halfBar', '50%');
    }
  }
});
