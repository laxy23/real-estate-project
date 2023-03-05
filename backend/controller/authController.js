const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { createError } = require('../utils/error')
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            gender: req.body.gender,
        };

        const { email } = newUser
        const userExist = await User.findOne({ email })

        if (userExist) {
            return next(createError(404, "User already exists"));
        }

        const user = await User.create(newUser);

        console.log(user)
        res.status(201).json({
            ...user._doc,
        });
    } catch (error) {
        next(error);
    }
};
exports.login = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return next(createError(404, "User not found"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect)
            return next(createError(400, "Invalid credentials!"));

        const isAdmin = user.isAdmin === "admin" ? true : false;

        const token = generateToken(user._id, isAdmin);

        const { password, ...otherDetails } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({ ...otherDetails });
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const userId = req.params.id

        if (userId) {
            const user = await User.findById(userId)

            res.status(200).json({
                user
            })
        }

    } catch (error) {
        next(error)
    }
}

exports.updateMe = async (req, res, next) => {
    try {
        const userId = req.params.id

        console.log(req.user.id)

        const { name } = req.body

        console.log(name)
        const user = await User.findByIdAndUpdate(req.user.id, { name }, { new: true })

        res.status(200).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

// Generate token
const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT, {
        expiresIn: "30d",
    });
};