import asyncHandler from "express-async-handler";
import studentModel from "../Models/studentModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
export const registerUser = asyncHandler(async (req, res) => {
    const { fName, lName, email, age, password} = await req.body;
        
        if(!fname.length > 0 || !lname.length > 0 ||!email.length > 0 || !password.length > 0 || !age.length > 0) {
            res.status(400)
            throw new Error('Please add all fields')
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)
        // Check if user exists
        const userExists = await userModel.findOne({email})
        if(userExists) {
            res.status(400)
            throw new Error('User already exists')
        }
        // Create user
        const user = await userModel.create({
            fName,
            lName,
            email,
            number,
            venmo,
            password: hashedPassword,
            school,
            classYear,
        })
        const userToken = jwt.sign({fName, lName, email, id: user._id}, "profile", {expiresIn: "1h"});
        if(user) {
            res.status(201).json({
                _id: user.id,
                fName: user.fName,
                lName: user.lName,
                email: user.email,
                age: user.age,
                password: user.password,
                board1: user.board1,
                board2: user.board2,
                board3: user.board3,
                token: userToken,
            })
            
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
})


export const loginUser = asyncHandler(async (req, res) => {
    /** 
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        const userToken = jwt.sign({fName:user.fName, lName:user.lName, email:user.email, _id: user._id}, "profile", {expiresIn: "1h"});
        res.json({
            _id: user.id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            age: user.age,
            password: user.password,
            board1: user.board1,
            board2: user.board2,
            board3: user.board3,
            token: userToken,
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
    */
})

export const updateUser = asyncHandler(async (req, res) => {
    
})
export const createSession = asyncHandler(async (req, res) => {
    
})
export const createReview = asyncHandler(async (req, res) => {

})
const generateToken = (id) => {
    return jwt.sign({id}, "abc123", {
        expiresIn: '30d',
    })

}