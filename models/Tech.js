const mongoose = require('mongoose');

const TechSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	techId: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('tech', TechSchema);
