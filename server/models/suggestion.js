const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuggestionSchema = new Schema({
	title: {type: String},
},{
	collection: 'suggestions'
});
mongoose.model('suggestion', SuggestionSchema);

module.exports = SuggestionSchema;