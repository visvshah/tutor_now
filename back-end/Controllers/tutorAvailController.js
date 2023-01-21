import asyncHandler from "express-async-handler";
import tutorAvailModel from "../Models/tutorAvail";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
export const createTutorAvail = asyncHandler(async (req, res) => {
    //Creates new tutor avail object 
})


export const loginTutor = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const tutor = await tutorModel.findOne({email})
    if(tutor && (await bcrypt.compare(password, tutor.password))) {
        const tutorToken = jwt.sign({fName:tutor.fName, lName:tutor.lName, email:tutor.email, _id: tutor._id}, "profile", {expiresIn: "1h"});
        res.json({
            _id: tutor.id,
            _id: tutor.id,
            fName: tutor.fName,
            lName: tutor.lName,
            email: tutor.email,
            number: tutor.number,
            venmo: tutor.venmo,
            school: tutor.school,
            classYear: tutor.classYear,
            classes: tutor.classes,
            gpa: tutor.gpa,
            about: tutor.about,
            token: tutorToken,
            type: 2,
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})

export const sendtutorDetails = asyncHandler(async (req, res) => {
    
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