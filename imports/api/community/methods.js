import { Meteor } from 'meteor/meteor';
import { Community } from './community.js';

Meteor.methods({
	'community.question.get'(already_guessed){
		already_guessed ? true : already_guessed = new Array();

		let question = Community.aggregate([
		    {$match:{"_id":{$nin:already_guessed}}},
		    {$sample:{size:1}},
		]);

		let answers = Community.aggregate([
		    {$match:{"_id":{$nin:[question[0]._id]}}},
		    {$sample:{size:3}},
		]);
		
		return {
			question:question[0],
			answers:answers.concat(question)
		};

	}
})
