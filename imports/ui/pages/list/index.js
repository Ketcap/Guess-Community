import './index.html'
// Loading Component
import '../../components/loading';

// Database Import
import { Community } from '/imports/api/community/community.js';

Template.App_list.onCreated(function(){
	//Template Variable
	_self = this;

	Meteor.subscribe('community');
});

Template.App_list.helpers({
	member(){
		return Community.find({},{sort:{name:1}}).fetch();
	}
});

Template.App_list.events({
	'click li':function(event,template){
		event.preventDefault();


	}
});

Template.App_list.onRendered(function(){

})
