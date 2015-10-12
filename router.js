Router.map(function() {

  this.route('home', {
    path: '/',
    layoutTemplate: 'layout',
    template: 'home',
    notFoundTemplate: 'notFound',
    onBeforeAction: function() {
      if (Meteor.isClient) {
        Session.set('clickedOpinion', false);
        Session.set('clickedSubmitTeacher', false);
        $('body,html').scrollTop(0);
        Session.set('teachers', []);
        Session.set('notSearching', true);
        this.next();
      }
    },

    waitOn: function() {
      return Meteor.subscribe('home');
    },

    loadingTemplate: 'spinner'
  });

  this.route('teacherPage', {
    path: '/teachers/:id',
    layoutTemplate: 'layout',
    template: 'teacherPage',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'spinner',
    data: function() {
      return Teachers.findOne(this.params.id);
    },
    onBeforeAction: function() {
      if (Meteor.isClient) {
        Session.set('clickedOpinion', false);
        Session.set('clickedSubmitTeacher', false);
        $('body,html').scrollTop(0);
        this.next();
      }
    },

    waitOn: function() {
      return Meteor.subscribe('teacher', this.params.id);
    }
  });

  this.route('filterTeachers', {
    path: '/filter/teachers',
    template: 'filterTeachers',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'spinner',
    data: function() {
      return Teachers.find();
    },

    onBeforeAction: function() {
      if (Meteor.isClient) {
        $('body,html').scrollTop(0);
        this.next();
      }
    },
    waitOn: function() {
      return Meteor.subscribe('filterTeachers');
    }
  });

  this.route('filterOpinions', {
    path: '/filter/opinions',
    template: 'filterOpinions',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'spinner',
    data: function() {
      return Opinions.find();
    },
    onBeforeAction: function() {
      if (Meteor.isClient) {
        $('body,html').scrollTop(0);
        this.next();
      }
    },

    waitOn: function() {
      return Meteor.subscribe('filterOpinions');
    }
  });
});

Router.configure({
  notFoundTemplate: 'notFound'
});

Router.plugin('dataNotFound', {
  notFoundTemplate: 'notFound'
});
