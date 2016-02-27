import DS from 'ember-data';

// export default DS.FixtureAdapter.extend({
// });
export default DS.RESTAdapter.extend({
  host: 'http://localhost:3000'
});
