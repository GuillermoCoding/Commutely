const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
	jobTitle: {type: String},
},{
	collection: 'jobs'
});
mongoose.model('job', JobSchema);

module.exports = JobSchema;