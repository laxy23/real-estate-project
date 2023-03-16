const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'User must have a name']
    },
    email: {
        type: String,
        require: [true, 'User must have a email']
    },
    password: {
        type: String,
        require: [true, 'User must have a password']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'male', 'female'],
        require: [true, 'User must have a gender']
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    properties: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Property'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)