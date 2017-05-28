import './home.html';
// Loading Component
import '../../components/loading';
// Finish Page
import '../finish/';
// Database Import
import { Community } from '/imports/api/community/community.js';

var Shuffle = require('shuffle-array');

Template.App_home.onCreated(function(){
	// ReactiveVar Definitions
	_self = this;

	_self.answers = new ReactiveVar();
	_self.question = new ReactiveVar();
	_self.wrong_answer = new ReactiveVar();
	_self.true_answers = new ReactiveVar(new Array());
	_self.timer = new ReactiveVar();
	_self.timerId = new ReactiveVar();

	// First question get
	Meteor.call('community.question.get',function(err,resp){
		_self.question.set(resp.question);
		_self.answers.set(Shuffle(resp.answers));

	});

	Meteor.subscribe('community');
});

Template.App_home.onRendered(function(){
	// Timer Init for first time opening page
	_self = this;
	_self.timer.set(15);
	var timerId = Meteor.setInterval(function(){
		let time = _self.timer.get();
		if(time <= 0 ){
			_self.wrong_answer.set(_self.question.get());
			_self.true_answers.set(false);
		}
		_self.timer.set((time - 1));
	},1000)
	_self.timerId.set(timerId);


});

Template.App_home.onDestroyed(function(){
	_self = this;
	Meteor.clearInterval(_self.timerId.get())
})

Template.App_home.helpers({
	question(){
		return Template.instance().question.get();
	},
	answers(){
		return Template.instance().answers.get();
	},
	true_answers(){
		return Template.instance().true_answers.get();
	},
	community(){
		return Community.find().fetch();
	},
	timer(){
		return Template.instance().timer.get();
	},
	wrong_answer(){
		return Template.instance().wrong_answer.get();
	}
});

Template.App_home.events({
	'click a.answer'(event, instance) {
		// Question And Answer Get
		const question = instance.question.get();
		const answer = question._id == this._id;

		// Clear The Timer
		var timerId = _self.timerId.get();
		Meteor.clearInterval(timerId);

		// Check if answer is true
		if(!answer){
			instance.wrong_answer.set(question);
			instance.true_answers.set(false);
			return false;
		};

		// Get Guessed Answers
		let already_guessed = instance.true_answers.get();
		// Push new answer to array
		already_guessed.push(this._id);
		instance.true_answers.set(already_guessed);

		// If all questions is finished
		if(Community.find().count() == already_guessed.length){
			_self.true_answers.set(false);
			FlowRouter.go('/win');
			return false;
		}
		// Clear old question and answers
		instance.question.set(false);
		instance.answers.set(false);

		// Get New Question and answers
		Meteor.call('community.question.get',already_guessed,function(err,resp){
			if(!err){
				// New Question and Answers added
				_self.question.set(resp.question);
				_self.answers.set(Shuffle(resp.answers));

				// Check image status
				$('<img />').attr({'src':resp.question.image})
					.on('load', function() {
						// Timer Has Been Set
						_self.timer.set(15);
						// New Timer init
						timerId = Meteor.setInterval(function(){
							let time = _self.timer.get();
							if(time <= 0 ){
								_self.wrong_answer.set(_self.question.get());
								_self.true_answers.set(false);
							}
							_self.timer.set((time-1));
						},1000);
						_self.timerId.set(timerId);
					})


			}
		})

	}
});
