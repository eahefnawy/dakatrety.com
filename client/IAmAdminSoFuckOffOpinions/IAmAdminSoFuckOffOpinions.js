Template.IAmAdminSoFuckOffOpinions.helpers({

positiveOpinion: function(){
	return Opinions.find({polarity: "positive"}, {sort: {epoch: -1}})
},
negativeOpinion: function(){
	return Opinions.find({polarity: "negative"}, {sort: {epoch: -1}})
},
admin: function(){
	if(Meteor.user().username == 'admin'){
		return true
	}
}
})


Template.singleOpinion.events({
	'click .removeOpinion': function(e, t){

        e.preventDefault();
        e.stopPropagation();
		Meteor.call('IAmAdminSoFuckOffOpinionsRemove', this._id, function(error, result){
			if (error) {
                    console.log('remove opinion error admin')
                } else {
                	console.log('done')
                }

		})
		return false
	},
	'click .changeOpinion': function(e, t){

        e.preventDefault();
        e.stopPropagation();
		Meteor.call('changeOpinion', this._id, t.$('.singleOpinionTextarea').val(), function(error, result){
			if (error) {
                    console.log('change opinion error admin')
                } else {
                	console.log('done')
                }

		})
		return false
	},
	'click .reverseOpinion': function(e, t){

        e.preventDefault();
        e.stopPropagation();
        var newPolarity = undefined;
        if(this.polarity === "positive") {
        	newPolarity = "negative"
        } else {
        	newPolarity = "positive"
        }
		Meteor.call('reverseOpinion', this._id, newPolarity, this.teacherId, function(error, result){
			if (error) {
                    console.log('reverse opinion error admin')
                } else {
                	console.log('done')
                }

		})
		return false
	},
	'click .offensiveOpinion': function(e, t){

        e.preventDefault();
        e.stopPropagation();
        
        var placeholderText = "الكومنت دة اتشال! بليز يا جماعة لو عايزين تقولو رأيكو قولو باحترم و موضوعية, حتى لو كان كلام سلبى, مكنش كدة يبقى بلاش احسن"
  
		Meteor.call('offensiveOpinion', this._id, placeholderText, function(error, result){
			if (error) {
                    console.log('offensive opinion error admin')
                } else {
                	console.log('done')
                }

		})
		return false
	}

})
Template.IAmAdminSoFuckOffOpinions.rendered = function(){

    $('.singleOpinionTextarea').autosize();
}
Template.singleOpinion.helpers({

	teacherName: function(){
		return Teachers.findOne(this.teacherId).fullName
	}
})