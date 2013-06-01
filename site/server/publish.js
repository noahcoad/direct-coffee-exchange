Growers = new Meteor.Collection("growers");

// Publish complete set of lists to all clients.
Meteor.publish('growers', function () {
  return Growers.find();
});