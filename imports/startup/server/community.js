// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Community } from '../../api/community/community.js';
import { CommunityMembers } from './data.js';

Meteor.startup(() => {
  // if the Links collection is empty

	CommunityMembers.map(function(arg){
		Community.upsert({
			"name":arg.name
		},{
			$set:{
			"twitter":arg.twitter,
			"linkedin":arg.linkedin,
			"image":arg.image
			}
		});
	})
});
