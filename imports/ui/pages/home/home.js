import './home.html';
import '../../components/loading';
import '../finish/'
import { Community } from '/imports/api/community/community.js';

var Shuffle = require('shuffle-array');

Template.App_home.onCreated(function(){
	// counter starts at 0
	_self = this;
	_self.answers = new ReactiveVar();
	_self.question = new ReactiveVar();
	_self.wrong_answer = new ReactiveVar();
	_self.true_answers = new ReactiveVar(new Array());
	_self.timer = new ReactiveVar();

	Meteor.call('community.question.get',function(err,resp){
		_self.question.set(resp.question);
		_self.answers.set(Shuffle(resp.answers));
	});

	Meteor.subscribe('community');
});

Template.App_home.onRendered(function(){
	_self = this;
	_self.timer.set(15);
	// setInterval(function(){
	// 	let time = _self.timer.get();
	// 	if(time <= 0 ){
	// 		_self.wrong_answer.set(_self.question.get());
	// 		_self.true_answers.set(false);
	// 	}
	// 	_self.timer.set((time - 0.10).toFixed(1));
	// },100)
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
		const question = instance.question.get();
		const answer = question._id == this._id;
		if(!answer){
			instance.wrong_answer.set(question);
			instance.true_answers.set(false);
			return false;
		};
		let already_guessed = instance.true_answers.get();
		already_guessed.push(this._id);
		instance.true_answers.set(already_guessed);

		instance.question.set(false);
		instance.answers.set(false);
		Meteor.call('community.question.get',already_guessed,function(err,resp){
			if(!err){
				_self.question.set(resp.question);
				_self.answers.set(Shuffle(resp.answers));
			}
		})

	}
});
