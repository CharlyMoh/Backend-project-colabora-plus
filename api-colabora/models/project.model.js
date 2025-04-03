const mongoose = require('mongoose');
const ProjectSchema = mongoose.Schema({
    nameProject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    userInCharge:{
        type: String,
        required: true
    },
    teammates: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: String,
        required: true
    }
})

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;