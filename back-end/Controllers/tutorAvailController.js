import asyncHandler from "express-async-handler";
import tutorAvailModel from "../Models/tutorAvailModel";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import tutorModel from "../Models/tutorModel";
export const createTutorAvail = asyncHandler(async (req, res) => {
    //Creates new tutor avail object 
    //use the tutorAvailModel
    

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
    //Update tutor's availability to false


    //send an email to the tutor


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