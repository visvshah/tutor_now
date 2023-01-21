import asyncHandler from "express-async-handler";
import studentModel from "../Models/studentModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
export const registerStudent = asyncHandler(async (req, res) => {
    const { fName, lName, email, age, password} = await req.body;
        
        if(!fname.length > 0 || !lname.length > 0 ||!email.length > 0 || !password.length > 0 || !age.length > 0) {
            res.status(400)
            throw new Error('Please add all fields')
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)
        // Check if student exists
        const studentExists = await studentModel.findOne({email})
        if(studentExists) {
            res.status(400)
            throw new Error('student already exists')
        }
        // Create student
        const student = await studentModel.create({
            fName,
            lName,
            email,
            number,
            venmo,
            password: hashedPassword,
            school,
            classYear,
        })
        const studentToken = jwt.sign({fName, lName, email, id: student._id}, "profile", {expiresIn: "1h"});
        if(student) {
            res.status(201).json({
                _id: student.id,
                fName: student.fName,
                lName: student.lName,
                email: student.email,
                number: student.number,
                venmo: student.venmo,
                school: student.school,
                classYear: student.classYear,
                token: studentToken,
                type: 1,
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

export const sendStudentDetails = asyncHandler(async (req, res) => {
    
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