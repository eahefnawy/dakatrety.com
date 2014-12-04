Template.home.events({
    'keyup #search': function(e, t) {
        //Teachers.findOne({name: {$regex : ".*ا.*", $options: "i"}})
        var regularEx = ".*" + $('#search').val() + ".*"
        var teachers = Teachers.find({$or: [{
            fullName: {
                $regex: regularEx,
                $options: "i"
            }
        },{
            courses: {
                $regex: regularEx,
                $options: "i"
            }
        }]}, {
            sort: {
                opinionsPercent: -1
            }
        }).fetch();
        Session.set('teachers', teachers);
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
        if (!Session.get('teachers')) {
            return Teachers.find({}, {sort: {opinionsPercent: -1}})
        } else {
            return Session.get('teachers')
        }


    }
});
