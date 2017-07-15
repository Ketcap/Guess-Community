// Import client startup through a single index entry point

import './routes.js';

Template.registerHelper('typeof',function(arg1,arg2){
	return typeof arg1 == arg2
})

Template.registerHelper('count',function(arg1){
	return arg1.length;
})

Template.registerHelper('subsReady',function(){
	return FlowRouter.subsReady();
})
