Template.IAmAdminSoFuckOffOpinions.helpers({

opinion: function(){
	return Opinions.find({}, {sort: {epoch: -1}})
},
admin: function(){
	if(Meteor.user().username == 'admin'){
		return true
	}
}
})


Template.singleOpinion.events({
	'click .removeOpinion': function(e, t){
		Meteor.call('IAmAdminSoFuckOffOpinionsRemove', this._id, function(error, result){
			if (error) {
                    console.log('remove opinion error admin')
                } else {
                	console.log('done')
                }

		})
	}
})