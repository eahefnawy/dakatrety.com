Session.set('notSearching', true)
Template.home.events({
  'keyup #search': function(e, t) {
    if ($('#search').val() == "") {
      Session.set('teachers', [])
      Session.set('notSearching', true)
    } else {
      Session.set('notSearching', false)
      var regularEx = ".*" + $('#search').val() + ".*"
      var teachers = Teachers.find({
        $or: [{
          fullName: {
            $regex: regularEx,
            $options: "i"
          }
        }, {
          courses: {
            $regex: regularEx,
            $options: "i"
          }
        }]
      }, {
        sort: {
          opinionsPercent: -1
        }
      }).fetch();
      if (teachers.length === 0) {
        Session.set('notFound', true)
      } else {
        Session.set('notFound', false)
        Session.set('teachers', teachers);
      }
    }
  },
  'click #highestGrade': function(e, t) {
    Session.set('sort', -1)
  },
  'click #lowestGrade': function(e, t) {
    Session.set('sort', 1)
  }
});

Template.home.helpers({
  teachers: function() {
    return Session.get('teachers')
  },
  notSearching: function() {
    return Session.get('notSearching')
  },
  notFound: function() {
    return Session.get('notFound')
  },
  engButtonBG: function() {
    return (Session.get('position') == 'م. ') ? 'black' : false;
  },
  drButtonBG: function() {
    return (Session.get('position') == 'د. ') ? 'black' : false;
  },
  positionHTML: function() {
    return Session.get('positionHTML');
  },
  positionText: function() {
    return Session.get('positionText');
  }
});
