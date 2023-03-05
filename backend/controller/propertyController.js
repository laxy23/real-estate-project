const User = require('../models/User')
const Property = require('../models/Property')

exports.createProperty = async (req, res, next) => {
    try {
        const newProperty = {
            propertyName: req.body.propertyName,
            type: req.body.type,
            category: req.body.category,
            location: req.body.location,
            price: req.body.price,
            bedrooms: req.body.bedrooms,
            bathrooms: req.body.bathrooms,
            area: req.body.area,
            photos: req.body.photos,
            description: req.body.description,
            user: req.user.id
        }

        const property = await Property.create(newProperty)

        res.status(201).json({
            success: 'true',
            property
        })

    } catch (error) {
        next(error)
    }
}
exports.getAllProperties = async (req, res, next) => {
    try {
        if (Object.keys(req.query).length > 0) {
            const { minPrice, maxPrice, excludeLocations, type, category, minBed, maxBed, minBath, maxBath } = req.query

            const min = parseInt(minPrice)
            const max = parseInt(maxPrice)
            const maxBedrooms = parseInt(maxBed)
            const minBedrooms = parseInt(minBed)
            const maxBathrooms = parseInt(maxBath)
            const minBathRooms = parseInt(minBath)

            console.log(min, max)
            const prop = await Property.aggregate([
                {
                    $match: {
                        price: { $gte: min, $lte: max },
                        location: { $nin: [excludeLocations] },
                        type: type,
                        category: category,
                        bedrooms: { $gte: minBedrooms, $lte: maxBedrooms },
                        bathrooms: { $gte: minBathRooms, $lte: maxBathrooms },
                    },
                },
            ])

            res.status(200).json({
                results: prop.length,
                success: 'true',
                prop
            })
        } else {
            const property = await Property.find()

            res.status(200).json({
                results: property.length,
                success: 'true',
                property
            })
        }

    } catch (error) {
        next(error)
    }
}
exports.getProperty = async (req, res, next) => {
    try {
        const propertyId = req.params.id

        const property = await Property.findById(propertyId)

        res.status(200).json({
            success: 'true',
            property
        })

    } catch (error) {
        next(error)
    }
}
exports.getPropertyByLocation = async (req, res, next) => {
    try {
        const propertyLocation = req.params.location

        const property = await Property.find({ location: propertyLocation })

        res.status(200).json({
            results: property.length,
            success: 'true',
            property
        })

    } catch (error) {
        next(error)
    }
}
exports.deleteMyProperty = async (req, res, next) => {
    try {
        const propertyId = req.params.propertyId

        await Property.findByIdAndDelete(propertyId)

        res.status(200).json({
            success: 'true',
            message: 'Property deleted successfully'
        })

    } catch (error) {
        next(error)
    }
}