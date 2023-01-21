import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import tutorModel from "../Models/tutorModel.js";
import { validateEmail } from "../validateFile.js";
import tutorAvailModel from "../Models/tutorAvailModel.js";


export const createTutorAvail = asyncHandler(async (req, res) => {
    //Creates new tutor avail object, tutorId and course should be in the req.body
    const {tutorId} = await req.body;


    const tutor = await tutorModel.findOne({id: tutorId});

    let courses = tutor.classes;
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
    const {studentId, tutorId, courseName} = await req.body;
    //Tutor dsf = search by id to get the tutor
    const student = await studentModel.findOne({studentId})
    let fName = student.fName;
    let lName = student.lName;
    const tutor = await tutorModel.findOne({tutorId})
    tutor.tutorAvail = false;
    tutor.courseToTutor = courseName;
    let tutorEmail = tutor.email;
    await tutor.save()

    res.status(200).json({
        success: true,
        data: tutor
    });
    //send an email to the tutor
    validateEmail(tutorEmail, fName, lName, courseName);
})


export const deleteAvailTutor = asyncHandler(async (req, res) => {

    const _id = req.params.id;
    const tutorAvail = await tutorAvailModel.findById(req.params.id)
    const tutorId = tutorAvail.tutorId;
    const tutor = await tutorModel.findOne({tutorId})
    tutor.tutorAvail = true;
    tutor.courseToTutor = "";
    await tutor.save()


    //deleting the tutor avail object
    tutorAvailModel.findByIdAndDelete(_id)
    .then(() => res.json('Exercise deleted.'))
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