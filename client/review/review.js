Template.review.helpers({
	time: function(){
		return moment.unix(this.epoch/1000).fromNow();
	}
});