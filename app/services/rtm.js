import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  getContacts() {
    return new Ember.RSVP.Promise((resolve) => {
      resolve(this.get('store').findAll('contact'));
    })
  },

  getContact(name) {
    return new Ember.RSVP.Promise((resolve) => {
      this.get('store').filter('contact', function(person) {
        if (person.get('name') == name) {
         resolve(person);
        }
      });
    })
  }
});
