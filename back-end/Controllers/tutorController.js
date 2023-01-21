import asyncHandler from "express-async-handler";
import tutorModel from "../Models/tutorModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
export const registerTutor = asyncHandler(async (req, res) => {
    const { fName, lName, email, age, password} = await req.body;
        
        if(!fname.length > 0 || !lname.length > 0 ||!email.length > 0 || !password.length > 0 || !age.length > 0) {
            res.status(400)
            throw new Error('Please add all fields')
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)
        // Check if tutor exists
        const tutorExists = await tutorModel.findOne({email})
        if(tutorExists) {
            res.status(400)
            throw new Error('tutor already exists')
        }
        // Create tutor
        const tutor = await tutorModel.create({
            fName,
            lName,
            email,
            number,
            venmo,
            password: hashedPassword,
            school,
            classYear,
            classes,
            gpa,
            about,
            
        })
        const tutorToken = jwt.sign({fName, lName, email, id: tutor._id}, "profile", {expiresIn: "1h"});
        if(tutor) {
            res.status(201).json({
                _id: tutor.id,
                fName: tutor.fName,
                lName: tutor.lName,
                email: tutor.email,
                number: tutor.number,
                venmo: tutor.venmo,
                password: tutor.password,
                school: tutor.school,
                classYear: tutor.classYear,
                classes: tutor.classes,
                gpa: tutor.gpa,
                about: tutor.about,
                token: tutorToken,
            })
            
        } else {
            res.status(400);
            throw new Error('Invalid tutor data');
        }
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

export const getTutor = asyncHandler(async (req, res) => {
     //sends back res.json with all tutor info. (argument is tutor id)
    
     tutorModel.findById(req.params.id)
    .then(tutor => res.json({_id: tutor.id,
        fName: tutor.fName,
        lName: tutor.lName,
        email: tutor.email,
        number: tutor.number,
        venmo: tutor.venmo,
        school: tutor.school,
        classYear: tutor.classYear,
        token: studentToken,}))
    .catch(err => res.status(400).json('Error: ' + err));
     
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