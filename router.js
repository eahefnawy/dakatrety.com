Router.map(function() {

    this.route('home', {
        path: '/',
        layoutTemplate: "layout",
        template: 'home',
        notFoundTemplate: 'notFound',
        onBeforeAction: function() {
            if (Meteor.isClient) {
                $('body,html').scrollTop(0)
                this.next()
                Session.set('teachers', undefined)
            }

        },
        waitOn: function(){
            return Meteor.subscribe('home');
        },
        loadingTemplate: 'spinner'

    });


    this.route('teacherPage', {
        path: '/teachers/:id',
        layoutTemplate: "layout",
        template: 'teacherPage',
        notFoundTemplate: 'notFound',
        loadingTemplate: 'spinner',
        data: function() {
            return Teachers.findOne(this.params.id);
        },
        onBeforeAction: function() {
            if (Meteor.isClient) {
                $('body,html').scrollTop(0)
                this.next()
            }

        },
        waitOn: function(){
            return Meteor.subscribe('teacher', this.params.id);
        },
        loadingTemplate: 'spinner'

    });

});
