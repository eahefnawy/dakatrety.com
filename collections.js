Teachers = new Mongo.Collection("teachers");
Opinions = new Mongo.Collection("opinions");
Info = new Mongo.Collection("info");

if (Meteor.isServer) {
  Meteor.publish("home", function() {
    return [Teachers.find(), Info.find()];
  });

  Meteor.publish("teacher", function(teacherId) {
    return [Teachers.find(teacherId), Opinions.find({
      teacherId: teacherId
    }), Info.find()];
  });

  Meteor.publish("filterTeachers", function() {
    return Teachers.find();
  });

  Meteor.publish("filterOpinions", function() {
    return [Opinions.find(), Teachers.find()];
  });

  Meteor.startup(function() {
    if (Info.find().count() === 0) {
      Info.insert({
        name: "Info",
        totalDrs: Teachers.find({
          postition: "د. "
        }).count(),
        totalEngs: Teachers.find({
          postition: "م. "
        }).count(),
        totalPositiveOpinions: Opinions.find({
          polarity: 'positive'
        }).count(),
        totalNegativeOpinions: Opinions.find({
          polarity: 'negative'
        }).count()
      });
    }
  });
  
  Teachers.allow({
    insert: function(userId, doc) {
      return true;
    },
    update: function(userId, doc, fields, modifier) {
      return false;
    },
    remove: function(userId, doc) {
      return false;
    }
  });

  Opinions.allow({
    insert: function(userId, doc) {
      return true;
    },
    update: function(userId, doc, fields, modifier) {
      return false;
    },
    remove: function(userId, doc) {
      return false;
    }
  });

}
