Meteor.methods({

  insertTeacher: function(pos, name) {
    if ((pos == 'د. ' || pos == 'م. ') && ((name != '') && Match.test(name, String))) {

      var newTeacher = Teachers.insert({
        postition: pos,
        name: name,
        fullName: pos + name,
        positiveOpinions: 0,
        negativeOpinions: 0,
        opinionsPercent: 0,
        grade: 'U',
        gradeL: 'UL',
        courses: [],
        epoch: new Date().getTime()
      });
      updateInfo()
      return newTeacher
    } else {
      throw new Meteor.Error("GoodLuck",
        "Seems that you're trying to hack the site! Good Luck!");
    }
  },

  insertOpinion: function(opinion, teacherId, polarity) {
    if (((opinion != '') && Match.test(opinion, String)) && (polarity == 'positive' || polarity == 'negative') && (Teachers.findOne(teacherId))) {
      var theOpinion = Opinions.insert({
        opinion: opinion,
        epoch: new Date().getTime(),
        teacherId: teacherId,
        polarity: polarity
      });
      if (polarity == 'negative') {
        Teachers.update(teacherId, {
          $inc: {
            negativeOpinions: 1
          }
        });
      } else {
        Teachers.update(teacherId, {
          $inc: {
            positiveOpinions: 1
          }
        });
      }
      updateInfo()
      updateGrade(teacherId)
      return theOpinion;
    } else {
      throw new Meteor.Error("GoodLuck",
        "Seems that you're trying to hack the site! Good Luck!");
    }
  },

  filterTeachersRemove: function(teacherId) {
    if (Meteor.user().username == 'admin') {
      Teachers.remove(teacherId);
      Opinions.remove({
        teacherId: teacherId
      })
      updateInfo()
    } else {
      throw new Meteor.Error("GoodLuck",
        "Seems that you're trying to hack the site! Good Luck!");
    }
  },

  filterOpinionsRemove: function(opinionId) {
    if (Meteor.user().username == 'admin') {
      if (Opinions.findOne(opinionId).polarity == 'negative') {

        Teachers.update(Opinions.findOne(opinionId).teacherId, {
          $inc: {
            negativeOpinions: -1
          }
        });
      } else {
        Teachers.update(Opinions.findOne(opinionId).teacherId, {
          $inc: {
            positiveOpinions: -1
          }
        });
      }
      updateInfo()
      updateGrade(Opinions.findOne(opinionId).teacherId)
      Opinions.remove(opinionId);
    } else {
      throw new Meteor.Error("GoodLuck",
        "Seems that you're trying to hack the site! Good Luck!");
    }
  },

  changeName: function(teacherId, newName, pos) {
    if (Meteor.user().username == 'admin') {
      Teachers.update(teacherId, {
        $set: {
          name: newName,
          fullName: pos + newName
        }
      });
    } else {
      throw new Meteor.Error("GoodLuck",
        "Seems that you're trying to hack the site! Good Luck!");
    }
  },
  changeOpinion: function(opinionId, newOpinion) {
    if (Meteor.user().username == 'admin') {
      Opinions.update(opinionId, {
        $set: {
          opinion: newOpinion
        }
      });
    } else {
      throw new Meteor.Error("GoodLuck",
        "Seems that you're trying to hack the site! Good Luck!");
    }
  },
  reverseOpinion: function(opinionId, newPolarity, teacherId) {
    if (Meteor.user().username == 'admin') {
      Opinions.update(opinionId, {
        $set: {
          polarity: newPolarity
        }
      });

      if (newPolarity === "negative") {
        Teachers.update(Opinions.findOne(opinionId).teacherId, {
          $inc: {
            negativeOpinions: 1,
            positiveOpinions: -1
          }
        });
      } else {
        Teachers.update(Opinions.findOne(opinionId).teacherId, {
          $inc: {
            negativeOpinions: -1,
            positiveOpinions: 01
          }
        });
      }
      updateGrade(teacherId)
      updateInfo()
    } else {
      throw new Meteor.Error("GoodLuck",
        "Seems that you're trying to hack the site! Good Luck!");
    }
  },

  offensiveOpinion: function(opinionId, placeholderText) {
    if (Meteor.user().username == 'admin') {
      Opinions.update(opinionId, {
        $set: {
          isOffensive: true,
          opinion: placeholderText
        }
      });
    } else {
      throw new Meteor.Error("GoodLuck",
        "Seems that you're trying to hack the site! Good Luck!");
    }
  }
});
