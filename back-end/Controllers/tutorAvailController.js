import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import tutorModel from "../Models/tutorModel.js";
import { validateEmail } from "../validateFile.js";
import tutorAvailModel from "../Models/tutorAvailModel.js";
import studentModel from "../Models/studentModel.js";

export const createTutorAvail = asyncHandler(async (req, res) => {
    //Creates new tutor avail object, tutorId and course should be in the req.body
    const {tutorId} = await req.body;

    const tutor = await tutorModel.findOne({_id: tutorId});
    console.log(tutor);
    console.log("Tutor found!" + tutor.email)
    tutor.setAvailability = true;
    let courses = tutor.classes;


    //make sure tutor doesn't exist in tutoravail
    const tutorExists = await tutorAvailModel.findOne({
        tutorId
    })
    if(tutorExists) {
        res.status(400)
        throw new Error('tutor already exists')
    }

    // Create tutor avail
    const tutorAvail = await tutorAvailModel.create({
        tutorId,
        courses,
        fName: tutor.fName,
        lName: tutor.lName,
        email: tutor.email,
        number: tutor.number,
        venmo: tutor.venmo,
        school: tutor.school,
        classYear: tutor.classYear,
        gpa: tutor.gpa,
        about: tutor.about,
        rating: tutor.rating,
        numRatings: tutor.numRatings,
    }).then(()=>{
        res.json({
            tutorId,
            courses,
            fName: tutor.fName,
            lName: tutor.lName,
            email: tutor.email,
            number: tutor.number,
            venmo: tutor.venmo,
            school: tutor.school,
            classYear: tutor.classYear,
            gpa: tutor.gpa,
            about: tutor.about,
            rating: tutor.rating,
            numRatings: tutor.numRatings,
        })
    })


})


export const fetchTutors = asyncHandler(async (req, res) => {
   //creates an array of able to teach the class in the req.body
    const {courseName} = await req.body;
    //find all tutors who have the course in their courses array
    const tutors = await tutorAvailModel.find({courses: courseName})
   .then(tutoravails => res.json(tutoravails))
   .catch(err => res.status(400).json('Error: ' + err));

})

export const getAllTutors = asyncHandler(async (req, res) => {
    //creates an array of able to teach the class in the req.body
        const tutors = await tutorAvailModel.find()
         .then(tutoravails => res.json(tutoravails))
            .catch(err => res.status(400).json('Error: ' + err));
    })


export const requestTutor = asyncHandler(async (req, res) => {
    //in the req.body there should be a studentid and coursename
    //Update tutor's studentId to match the requesting student's id and update tutor's course to reflect the course they have to tutor
    const {studentId, tutorId, courseName} = await req.body;
    //Tutor dsf = search by id to get the tutor

    console.log("studentId: " + studentId);
    console.log("tutorId: " + tutorId);
    console.log("courseName: " + courseName);

    const student = await studentModel.findOne({studentId})
    let fName = student.fName;
    let lName = student.lName;

    await tutorModel.findOneAndUpdate({_id: tutorId}, {studentId: studentId});


    const tutor = await tutorModel.find({_id: tutorId})
    //debug
    console.log(tutor)

    tutor[0].tutorAvail = false;
    tutor[0].courseToTutor = courseName;
    let tutorEmail = tutor[0].email;
    
    console.log(tutor[0].studentId)
    tutor[0].studentId = studentId;
    console.log(tutor[0].studentId)


    console.log(tutorEmail)
   // await tutor.save()

    res.status(200).json({
        success: true,
        data: tutor[0]
    });
    //send an email to the tutor
    validateEmail(tutorEmail, fName, lName, courseName);
    tutorAvailModel.findByIdAndDelete({_id: tutorId})
})


export const deleteAvailTutor = asyncHandler(async (req, res) => {

    const _id = req.params.id;
    const tutorAvail = await tutorAvailModel.findById(req.params.id)
    const tutorId = tutorAvail.tutorId;
    const tutor = await tutorModel.findOne({tutorId})
    tutor.setAvailability = false;
    tutor.courseToTutor = "";
    await tutor.save()


    //deleting the tutor avail object
    tutorAvailModel.findByIdAndDelete(_id)
    .then(() => res.json('Tutoravail deleted.'))
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