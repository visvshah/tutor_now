import asyncHandler from "express-async-handler";
import requestModel from "../Models/requestModel";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
export const createRequest = asyncHandler(async (req, res) => {
    const { fName, lName, email, number, venmo, school, classYear, course} = await req.body;
        
        // Check if request exists
        const requestExists = await requestModel.findOne({email})
        if(requestExists) {
            res.status(400)
            throw new Error('student already exists')
        }
        // Create request
        const request = await requestModel.create({
            fName,
            lName,
            email,
            number,
            venmo,
            school,
            classYear,
            course,
            tutorId: "",
        })
        if(request) {
            res.status(201).json({
                _id: request.id,
                timeStamp: request.timeStamp,
            })
            
        } else {
            res.status(400);
            throw new Error('Invalid student data');
        }
})


export const loginStudent = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const student = await studentModel.findOne({email})
    if(student && (await bcrypt.compare(password, student.password))) {
        const studentToken = jwt.sign({fName:student.fName, lName:student.lName, email:student.email, _id: student._id}, "profile", {expiresIn: "1h"});
        res.json({
            _id: student.id,
                fName: student.fName,
                lName: student.lName,
                email: student.email,
                number: student.number,
                venmo: student.venmo,
                school: student.school,
                classYear: student.classYear,
                token: studentToken,
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})
const generateToken = (id) => {
    return jwt.sign({id}, "abc123", {
        expiresIn: '30d',
    })

}