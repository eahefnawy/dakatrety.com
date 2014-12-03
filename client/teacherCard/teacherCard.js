Template.teacherCard.helpers({
	noLikes: function(){
        return (this.negativeOpinions === 0) ? 'grey' : false;

	}
});