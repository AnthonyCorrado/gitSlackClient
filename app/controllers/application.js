import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    testPost: function() {
      $.ajax({
        type: "GET",
        url: "http://localhost:3000/contacts",
        success: function(data) {
          console.log(data);
        } 
      })
    }
  }
});
