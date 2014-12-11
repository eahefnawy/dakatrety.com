Template.IAmAdminSoFuckOffTeachers.helpers({

    teacher: function() {
        return Teachers.find({}, {
            sort: {
                epoch: -1
            }
        })
    },
    admin: function() {
        if (Meteor.user().username == 'admin') {
            return true
        }
    }
})


Template.singleTeacher.events({
    'click .removeTeacher': function(e, t) {
        e.preventDefault();
        e.stopPropagation();
        Meteor.call('IAmAdminSoFuckOffTeachersRemove', this._id, function(error, result) {
            if (error) {
                console.log('remove teacher error admin')
            } else {
                console.log('teacher removed')
            }

        })
        return false;
    },
    'change .changeName': function(e, t){
        
        Meteor.call('changeName', this._id, $('.changeName').val(), this.postition, function(error, result){
            if (error) {
                console.log('change name teacher error admin')
            } else {
                console.log('done changing name')
            }
        })
    }
})
