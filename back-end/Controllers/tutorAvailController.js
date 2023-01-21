import asyncHandler from "express-async-handler";
import tutorAvailModel from "../Models/tutorAvailModel";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import tutorModel from "../Models/tutorModel";
import { validateEmail } from "../validateFile";


export const createTutorAvail = asyncHandler(async (req, res) => {
    //Creates new tutor avail object, tutorId and course should be in the req.body
    const {tutorId, courses} = await req.body;
    // Check if tutor avail exists
    const tutorAvailExists = await tutorAvailModel.findOne({
        tutorId: tutorId
    })
    if(tutorAvailExists) {
        res.status(400)
        throw new Error('tutor already exists')
    }
    // Create tutor avail
    const tutorAvail = await tutorAvailModel.create({
        tutorId,
        courses,
    })
    

})


export const fetchTutors = asyncHandler(async (req, res) => {
   //creates an array of able to teach the class in the req.body
   tutorAvailModel.find()
   .then(tutoravails => res.json(tutoravails))
   .catch(err => res.status(400).json('Error: ' + err));
})


export const requestTutor = asyncHandler(async (req, res) => {
    //in the req.body there should be a studentid and coursename
    //Update tutor's studentId to match the requesting student's id and update tutor's course to reflect the course they have to tutor
    const {studentId, courseName, tutorId, tutorEmail, studentName} = await req.body;
    //Tutor dsf = search by id to get the tutor

    const tutor = await tutorModel.findOne({tutorId})
    tutor.tutorAvail = false;
    tutor.courseToTutor = courseName;
    await tutor.save()

    res.status(200).json({
        success: true,
        data: tutor
    });
    //send an email to the tutor
    validateEmail(tutorEmail, studentName, courseName);


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