const User = require("../models/UserModel")
const { hashPassword, comparePaswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");
const e = require("express");
const { use } = require("../routes/userRoutes");
const Review = require("../models/ReviewModel");

const getUsers = async (req, res, next) => {
    try {
        // get all fields except password
        //const users = await User.find({}).select("-password");
        const users = await User.find({})
        return res.json(users);
    } catch (err) {
        next(err);
    }
}


// registering new user
const registerUsers = async (req, res, next) => {
    try {
        const { name, lastName, email, password } = req.body
        if (!(name && lastName && email && password)) {
            return res.status(400).send("All inputs are required")
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: "user exists" })
        } else {
            const hashPass = hashPassword(password);

            const user = await User.create({
                name,
                lastName,
                email: email.toLowerCase(),
                password: hashPass
            });

            // json is used foe what we want to send in response, here we don't want to send password.
            res
                .cookie("access_token", generateAuthToken(
                    user._id,
                    user.name,
                    user.lastName,
                    user.email,
                    user.isAdmin), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict"
                })
                .status(201).json({
                    success: "user created",
                    userCreated: {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                })
        }
    } catch (err) {
        next(err);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password, doNotLogout } = req.body;
        if (!(email && password)) {
            return res.status(400).send("All inputs are required");
        }

        const user = await User.findOne({ email });
        if (user && comparePaswords(password, user.password)) {

            let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            }

            // maxAge = 7 days
            if (doNotLogout) {
                cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 }
            }

            return res
                .cookie("access_token", generateAuthToken(
                    user._id,
                    user.name,
                    user.lastName,
                    user.email,
                    user.isAdmin
                ),
                    cookieParams
                )
                .status(201).json({
                    success: "user logged in",
                    userLoggedIn: {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        doNotLogout
                    }
                })
        } else {
            return res.status(401).send("wrong credentials")
        }


    } catch (err) {
        next(err);
    }
}

const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).orFail();

        user.name = req.body.name || user.lastName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber;
        user.address = req.body.address;
        user.country = req.body.country;
        user.zipCode = req.body.zipCode;
        user.city = req.body.city;
        user.state = req.body.state;
        if (req.body.password !== user.password) {
            user.password = hashPassword(req.body.password);
        }

        await user.save();

        res.json({
            success: "user updated",
            userUpdated: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });

    } catch (err) {
        next(err);
    }
}

const getUserProfile = async (req, res, next) => {
    try {
        const users = await User.findById(req.params.id).orFail();
        return res.send(users);
    } catch (err) {
        next(err);
    }
}

const writeReview = async (req, res, next) => {
    try {
        const { comment, rating} = req.body;
        if(!(comment && rating)) {
            return res.status(400).send("All the inputs are required")
        }

        const ObjectId = require("mongodb").ObjectId;
        let reviewId = new ObjectId();

        await Review.create([
            {
                _id: reviewId,
                comment: comment,
                rating: Number(rating),
                user: { _id: req.user._id, name: req.user.name + "" + req.user.lastName}
            }
        ])

        res.send('review created');
    } catch (err) {
        next(err);
    }
}

module.exports = { getUsers, registerUsers, loginUser, updateUserProfile, getUserProfile, writeReview }