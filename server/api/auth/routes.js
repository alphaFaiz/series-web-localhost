const express = require('express');
const bcryptjs = require('bcryptjs');
const adminModel = require('../admin/model');
const admin = require('firebase-admin');
const authRouter = express.Router();

authRouter.post('/create-user', async (req, res) => {
    try {
        const adminInfo = req.body;
        
        //hash password
        const hashPassword = bcryptjs.hashSync(adminInfo.password, 10);

        //save to database
        const newAdmin = new adminModel({
            ...adminInfo,
            password: hashPassword,
        });
        await newAdmin.save();
        res.status(201).json({
            id: newAdmin._id,
        });
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const {name, password} = req.body;

        const existUser = await adminModel.findOne({name: name}).exec();
        if(existUser) {
            //check password
            if(bcryptjs.compareSync(password, existUser.password)) {

                // req.session.authAdmin = {
                //     id: existAdmin._id,
                //     username: existAdmin.name,
                // };
                // req.session.save();
                //403 unauthorize

                res.status(200).json({
                    success:true,
                    message: 'Login success',
                    Id: existUser._id,
                    name: existUser.name,
                    role: existUser.role
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: 'Password is not correct',
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: 'not found'
            });
        }
    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});

authRouter.post('/facebookOauth', async (req, res) => {
    try {
        const idToken = req.body.idToken;
        const result = await admin.auth().verifyIdToken(idToken);
        res.status(200).json({
            success: true,
            verifyIdToken: result,
        });
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});

module.exports = authRouter;