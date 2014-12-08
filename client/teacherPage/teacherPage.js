var courses = [];
Template.teacherPage.helpers({
    positiveOpinions: function() {
        return Opinions.find({
            $and: [{
                teacherId: this._id
            }, {
                polarity: 'positive'
            }]
        }, {
            sort: {
                epoch: -1
            }
        });
    },
    negativeOpinions: function() {
        return Opinions.find({
            $and: [{
                teacherId: this._id
            }, {
                polarity: 'negative'
            }]
        }, {
            sort: {
                epoch: -1
            }
        });
    },
    noLikes: function() {
        return (this.negativeOpinions === 0) ? 'grey' : false;
    },
    positiveOpinionsString: function() {
        return this.positiveOpinions.toString()
    },
    negativeOpinionsString: function() {
        return this.negativeOpinions.toString()
    },
    isDisabled: function() {
        return (myOpinions.findOne({
            teacherId: this._id
        })) ? 'disabled' : null;
    },
    isDisabledClass: function() {
        return (myOpinions.findOne({
            teacherId: this._id
        })) ? 'disabledButtons' : null;
    },
    isDisabledCourses: function() {
        return (myOpinions.findOne({
            teacherId: this._id
        })) ? 'none' : 'block';
    },
    disablingDiv: function(){
        return (myOpinions.findOne({
            teacherId: this._id
        })) ? 'disablingDiv' : null;
    },
    placeholder: function() {
        var onTrue = '.شكرا! رأيك وصلنا'
        var onFalse = 'ايه رأيك فى ' + this.fullName + '؟'
        return (myOpinions.findOne({
            teacherId: this._id
        })) ? onTrue : onFalse;
    },
    courses: function() {
        var coursesObjs = []
        $.each(this.courses, function(index, value) {

            var obj = {
                name: value
            }
            coursesObjs.push(obj)
        })
        return coursesObjs;
    },
    modalClass: function(){
        return Session.get('modalClass')
    },
    modalTitle: function(){
        return Session.get('modalTitle')
    }
});
Template.teacherPage.events({
    'click #positiveOpinion': function(e, t) {
        Session.set('polarity', 'positive')
        Session.set('modalClass', 'positiveModal')
        Session.set('modalTitle', 'رأى اجابى')
        $('#opinion').focus();


    },
    'click #negativeOpinion': function(e, t) {
        Session.set('polarity', 'negative')
        Session.set('modalClass', 'negativeModal')
        Session.set('modalTitle', 'رأى سلبى')
        $('#opinion').focus();


    },
    'click #submitOpinion': function(e, t) {
        if ($('#opinion').val() != "") {



            Meteor.call('insertOpinion', $('#opinion').val(), this._id, Session.get('polarity'), function(error, result) {
                if (error) {
                    console.log('insert opinion error')
                } else {

                    $('#opinion').val('');
                    $('#closeButton').click();
                }
            });


        } else {
            console.log('empty')
        }
    }

});

Template.teacherPage.rendered = function() {
    $('#opinion').autosize({
        placeholder: true
    });


    $('#courses').selectize({
        delimiter: ',',
        persist: false,
        create: function(input) {
            return {
                value: input,
                text: input
            }
        },

        onChange: function(value) {
            courses = value.split(",");
        }
    });


    $('.post-tags').selectize({
        delimiter: ',',
        persist: false,
        create: function(input) {
            return {
                value: input,
                text: input
            }
        },

        onChange: function(value) {
            activityObj.tags = value.split(",");
        }
    });
    classieGlobal();
    modalEffectsGlobal();
    if(myOpinions.findOne({teacherId: this._id})){
        $('#positiveOpinion').off()
        $('#negatveiOpinion').off()
        }
}
