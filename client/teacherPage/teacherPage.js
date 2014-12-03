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
    isDisabled: function(){
        return (myOpinions.findOne({teacherId: this._id})) ? 'disabled' : null; 
    },
    isDisabledClass: function(){
        return (myOpinions.findOne({teacherId: this._id})) ? 'disabledButtons' : null; 
    },
    isDisabledCourses: function(){
        return (myOpinions.findOne({teacherId: this._id})) ? 'none' : 'block'; 
    },
    placeholder: function(){
        var onTrue = '.شكرا! رأيك وصلنا'
        var onFalse = 'ايه رأيك فى ' + this.fullName + '؟'
        return (myOpinions.findOne({teacherId: this._id})) ? onTrue : onFalse; 
    },
    courses: function(){
        var coursesObjs = []
        $.each(this.courses, function(index, value){
            
            var obj = {
                name: value
            }
            coursesObjs.push(obj)
        })
        return coursesObjs;
    }
});
Template.teacherPage.events({
    'click #positiveOpinion': function(e, t) {
        if (($('#opinion').val() != "") && (courses.length != 0)) {
            var myPositiveOpinion = Opinions.insert({
                opinion: $('#opinion').val(),
                epoch: new Date().getTime(),
                teacherId: this._id,
                polarity: 'positive'
            });

            Teachers.update(this._id, {
                $inc: {
                    positiveOpinions: 1
                }
            });

            updateGrade(this._id)
            $('#opinion').val('');
            $('#opinion').css('height', '92px');

            myOpinions.insert({
                teacherId: this._id,
                opinionId: myPositiveOpinion
            })
            var that = this;
            $.each(courses, function(index, value){

                if(!Teachers.findOne({$and: [{_id: that._id}, {courses: value}]}))
                {
                    Teachers.update(that._id, {$push: {courses: value}})
                }
            })
            var selectize = $("#courses")[0].selectize;
                                    selectize.clear();
        } else {
            console.log('empty')
        }


    },
    'click #negativeOpinion': function(e, t) {
        if ($('#opinion').val() != "") {
            var myNegativeOpinion = Opinions.insert({
                opinion: $('#opinion').val(),
                epoch: new Date().getTime(),
                teacherId: this._id,
                polarity: 'negative'
            });

            Teachers.update(this._id, {
                $inc: {
                    negativeOpinions: 1
                }
            });
            updateGrade(this._id)
            $('#opinion').val('');
            $('#opinion').css('height', '92px');

            myOpinions.insert({
                teacherId: this._id,
                opinionId: myNegativeOpinion
            })
            var that = this;
            $.each(courses, function(index, value){

                if(!Teachers.findOne({$and: [{_id: that._id}, {courses: value}]}))
                {
                    Teachers.update(that._id, {$push: {courses: value}})
                }
            })
        } else {
            console.log('empty')
        }


    },

});

Template.teacherPage.rendered = function() {
    $('#opinion').autosize({
        placeholder: true
    });

    $('#opinion').css('height', '72px')

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
}
