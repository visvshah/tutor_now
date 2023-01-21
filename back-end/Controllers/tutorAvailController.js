import asyncHandler from "express-async-handler";
import tutorAvailModel from "../Models/tutorAvail";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
export const createTutorAvail = asyncHandler(async (req, res) => {
    //Creates new tutor avail object 
})


export const fetchTutors = asyncHandler(async (req, res) => {
   //creates an array of able to teach the class in the req.body
})

export const requestTutor = asyncHandler(async (req, res) => {
    //in the req.body there should be a studentid and coursename
    //Update tutor's studentId to match the requesting student's id and update tutor's course to reflect the course they have to tutor
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