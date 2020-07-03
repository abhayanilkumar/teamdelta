const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Candidate = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        userName: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        skillSet: [{type: String}],
        jobExpSet: [{type: String}],
        interestSet: [{type: String}],
        jobSearch: {type: Boolean, default: true},
        loginHistory: [{dateTime: Date, userAgent: String}]
    },
    {timestamps: true}
);

module.exports = mongoose.model('candidates', Candidate);