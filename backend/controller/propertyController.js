let minBed;
let maxBed;
let minBath;
let maxBath;
const Property = require('../models/Property')
const multer = require("multer");
const sharp = require('sharp');
const axios = require('axios')

const multerStorage = multer.memoryStorage();

const upload = multer({
    storage: multerStorage,
});

exports.resizePhoto = (req, res, next) => {
    console.log(req.files)
    if (!req.files) return next();
    req.files.forEach((file) => {
        const imgName = file.originalname.split(".")[0];
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        file.filename = imgName + "-" + `${uniqueSuffix}.jpeg`;

        sharp(file.buffer)
            .resize(803, 537, { withoutEnlargement: true })
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`public/images/${file.filename}`);
    });
    next();
};

exports.uploadPhoto = upload.array("photos");

exports.createProperty = async (req, res, next) => {
    try {
        let images = []
        if (req.files) {
            req.files.forEach((file) => {
                images.push(file.filename)
            })
        }

        if (req.body) {
            const newProperty = {
                propertyName: req.body.propertyName,
                type: req.body.type,
                category: req.body.category,
                location: req.body.location,
                price: req.body.price,
                bedrooms: req.body.bedrooms,
                bathrooms: req.body.bathrooms,
                area: req.body.area,
                photos: images,
                description: req.body.description,
                user: req.user.id
            }

            const property = await Property.create(newProperty)

            res.status(201).json({
                success: 'true',
                property
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getValues = (type, queryUrl) => {

    const num = queryUrl.split(',')

    const numbers = num.map((range) => range.split('-').map(Number))
        .flat();

    const minValue = Math.min(...numbers);
    const maxValue = Math.max(...numbers);

    if (type === 'bed') {
        minBed = minValue // Output: 1
        maxBed = maxValue // Output: 6
    } else if (type === 'bath') {
        minBath = minValue
        maxBath = maxValue
    }

}
exports.getAllProperties = async (req, res, next) => {
    try {
        if (Object.keys(req.query).length > 0) {
            let { price, cities, homes, categories, city } = req.query
            const query = {}
            let minPrice;
            let maxPrice;

            if (req.query.bed && req.query.bed !== 'empty') {
                getValues('bed', req.query.bed)
            }
            if (req.query.bath && req.query.bath !== 'empty') {
                console.log(req.query.bath)
                getValues('bath', req.query.bath)
            }
            if (req.query.price) {
                minPrice = price.split(',')[0]
                maxPrice = price.split(',')[1]
            }

            if (price) {
                query.price = { $gte: parseInt(minPrice) }

            }
            if (maxPrice) {
                query.price = { ...query.price, $lte: parseInt(maxPrice) };
            }
            if (minBath && minBath !== undefined) {
                query.bathrooms = { $gte: parseInt(minBath) }
            }
            if (maxBath && maxBath !== undefined) {
                query.bathrooms = { ...query.bathrooms, $lte: parseInt(maxBath) }
            }
            if (minBed && minBed !== undefined) {
                query.bedrooms = { $gte: parseInt(minBed) }
            }
            if (maxBed && maxBed !== undefined) {
                query.bedrooms = { ...query.bedrooms, $lte: parseInt(maxBed) }
            }
            if (homes && homes !== 'empty') {
                query.type = { $in: homes.split(',') };
            }
            if (categories && categories !== 'empty') {
                query.category = { $in: categories.split(',') };
            }
            if (cities && cities !== 'empty') {
                console.log(cities)
                query.location = { $in: cities.split(',') };
            }
            if (city && city !== 'empty') {
                console.log(city)
                query.location = { $in: city };
            }

            const prop = await Property.find(query);
            res.status(200).json({
                results: prop.length,
                success: 'true',
                prop
            })
        } else {
            const property = await Property.find().sort({ price: -1 })

            res.status(200).json({
                results: property.length,
                success: 'true',
                property
            })
        }

    } catch (error) {
        console.log(error)
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
exports.getPropertyByType = async (req, res, next) => {
    try {
        const propertyType = req.params.type

        const property = await Property.find({ type: propertyType })

        res.status(200).json({
            results: property.length,
            success: 'true',
            property
        })

    } catch (error) {
        next(error)
    }
}
exports.getLocation = async (req, res, next) => {
    try {
        const location = req.params.location

        const response = await fetch(
            `http://api.positionstack.com/v1/forward?access_key=1f1ca6a8b0ecf47aa0fbe1c8a9a3bf97&query=${location}`
        );

        const data = await response.json()

        console.log(data);

        res.status(200).json({
            success: 'true',
            data
        })

    } catch (error) {
        next(error)
    }
}

exports.getMyProperty = async (req, res, next) => {
    try {
        // Get user id
        const userId = req.user.id;
        // Get property where userId === user
        const userProperty = await Property.find({ user: userId });
        res.status(200).json({
            success: true,
            results: userProperty.length,
            userProperty,
        });
    } catch (error) {
        next(error);
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
exports.getAllPosts = async (req, res, next) => {
    try {
        const property = await Property.aggregate([
            {
                $addFields: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: { month: "$month", _id: "$_id" },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.month",
                    result: { $push: { _id: "$_id._id", count: "$count" } },
                    range: { $push: { _id: "$_id.month", count: 0 } }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    result: 1,
                    range: 1,
                    total: { $sum: "$result.count" }
                }
            }
        ]);

        res.status(200).json({
            results: property.length,
            success: 'true',
            property
        })
    } catch (error) {
        next(error)
    }
}
