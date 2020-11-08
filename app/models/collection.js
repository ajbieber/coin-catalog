/**
 * @module app.models.collection
 *
 * @author Austin Bieber
 *
 * @description Defines the collection database model.
 */

// NPM Modules
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Internal Modules
const validate = require('../lib/validate');


const CollectionSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true,
		default: uuidv4,
		validate: validate.Collection._id
	},
	name: {
		type: String,
		required: true,
		validate: validate.Collection.name
	},
	description: {
		type: String,
		default: ''
	},
	user: {
		type: String,
		ref: 'User',
		index: true,
		required: true
	}
});

module.exports = mongoose.model('Collection', CollectionSchema);