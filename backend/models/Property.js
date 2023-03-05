const mongoose = require('mongoose')
const { Schema } = mongoose

const propertySchema = new Schema({
    propertyName: {
        type: String,
        require: [true, 'Property must have a name']
    },
    location: {
        type: String,
        enum: ["Zenica", "Sarajevo", "Tuzla", "Mostar", "Banja Luka", "Bihać", "Bosanski Brod", "Neum", "Brcko"],
        require: [true, 'Property must have a location']
    },
    category: {
        type: String,
        enum: ["For Sale", "For Rent", "Holiday Rent"],
        require: [true, 'Property must have a category']
    },
    type: {
        type: String,
        enum: ["House", "Apartment", "Commercial Property", "Land"],
        require: [true, 'Property must have a type']
    },
    price: {
        type: Number,
        require: [true, 'Property must have a price']
    },
    bedrooms: {
        type: Number,
        require: true
    },
    bathrooms: {
        type: Number,
        require: true
    },
    area: {
        type: Number,
        require: [true, 'Property must have an area']
    },
    photos: {
        type: [String],
        require: [true, 'Property must have photos'],
    },
    description: {
        type: String,
        minlength: 100, // minimum 10 characters required
        maxlength: 350, // maximum 200 characters allowed
        require: [true, 'Property must have a description'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Property', propertySchema)