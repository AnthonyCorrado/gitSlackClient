import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr(),
  color: DS.attr(),
  team_id: DS.attr(),
  is_bot: DS.attr(),
  profile: DS.attr()
});
