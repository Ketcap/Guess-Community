import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/main/index.js';
import '../../ui/pages/win/index.js';
import '../../ui/pages/list/index.js';


BlazeLayout.setRoot('body')
// Set up all routes in the app

FlowRouter.route('/', {
  name: 'App.main',
  action() {
    BlazeLayout.render('App_body', { main: 'App_main' });
  },
});

FlowRouter.route('/game', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/win', {
  name: 'App.win',
  action() {
    BlazeLayout.render('App_body', { main: 'App_win' });
  },
});

FlowRouter.route('/list', {
  name: 'App.list',
  action() {
    BlazeLayout.render('App_body', { main: 'App_list' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
