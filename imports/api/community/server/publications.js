// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Community } from '../community.js';

Meteor.publish('community',function(){
	return Community.find();
})
