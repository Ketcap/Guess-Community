// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Links } from '../results.js';

Meteor.publish('Results.find', function (arg) {
  return Results.find(arg);
});
