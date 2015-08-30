updateInfo = function(){
        Info.update({name: "Info"}, {$set: {
        	totalDrs: Teachers.find({postition: "د. "}).count(),
        	totalEngs: Teachers.find({postition: "م. "}).count(),
        	totalPositiveOpinions: Opinions.find({polarity: 'positive'}).count(),
        	totalNegativeOpinions: Opinions.find({polarity: 'negative'}).count()
        }})
}
