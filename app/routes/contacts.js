import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    console.log(this.store.findAll('contact'));
    return this.store.findAll('contact');
  }
});
