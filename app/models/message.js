import DS from 'ember-data';

export default DS.Model.extend({
  recipientId: DS.attr(),
  recipient: DS.attr(),
  senderId: DS.attr(),
  sender: DS.attr(),
  body: DS.attr()
});
