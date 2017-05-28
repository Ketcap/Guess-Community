import './index.html';


Template.App_finish.onRendered(()=>{
	$('ul.tabs').tabs();
})

Template.App_finish.events({
	'click a.playAgain':function(event){
		event.preventDefault();
		document.location.reload(true);
	}
})
