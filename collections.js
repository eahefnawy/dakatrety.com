Teachers = new Mongo.Collection("teachers");
Opinions = new Mongo.Collection("opinions");

if(Meteor.isServer){

Meteor.publish("home", function () {
  return Teachers.find();
});

Meteor.publish("teacher", function (teacherId) {
  return [Teachers.find(teacherId), Opinions.find({teacherId: teacherId})];
});

Teachers.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return false;
  },
  remove: function (userId, doc) {
    return false;
  }
});

Opinions.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return false;
  },
  remove: function (userId, doc) {
    return false;
  }
});

}
