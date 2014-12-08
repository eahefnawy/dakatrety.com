if (!Session.get('position')) {

    Session.set('position', 'د. ')
    Session.set('positionHTML', '.د ') //arabic DOT doesn't render probably when there's space after it
    Session.set('positionText', 'الدكتور')
}

Template.layout.events({
    'submit #submitTeacher': function(e, t) {

        e.preventDefault();
        e.stopPropagation()

        if (($('#addteacherTextField').val() != "") && (Session.get('clickedSubmitTeacher') === false)) {

            Session.set('clickedSubmitTeacher', true)
            Meteor.call('insertTeacher', Session.get('position'), $('#addteacherTextField').val(), function(error, result) {
                if (error) {
                    console.log('insert teacher error')
                } else {

                    $('#addteacherTextField').val('');
                    Router.go('teacherPage', {
                        id: result
                    });
                }
            });


        } else {
            console.log("empty")
        }
    },
    'click .choosePos:nth-child(odd)': function(e, t) {
        Session.set('position', 'م. ')
        Session.set('positionHTML', '.م ')
        Session.set('positionText', 'المعيد')
    },
    'click .choosePos:nth-child(even)': function(e, t) {
        Session.set('position', 'د. ')
        Session.set('positionHTML', '.د ')
        Session.set('positionText', 'الدكتور')
    }
});

Template.layout.helpers({
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
