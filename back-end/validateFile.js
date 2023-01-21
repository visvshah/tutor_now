//Currently sends an OTP to the email address provided by the user

import asyncHandler from "express-async-handler";
import tutorModel from "../Models/tutorModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import nodemailer from "nodemailer";
let usermail = "";
    
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: "thanatosdies@gmail.com",
        pass: "gopklerjilpptkct"
    }
});

// Generate a random OTP
let otp = Math.floor(100000 + Math.random() * 900000);





export const validateEmail = (email, studentName, studentSubject) => {
    usermail = email;
    let studentName = studentName;
    let studentSubject = studentSubject;
    let mailOptions = {
        from: "GoTutor",
        to: usermail,
        subject: `${studentName} wants to learn ${studentSubject}}`,
        text: `${studentName} is waiting for you to accept their request to learn ${studentSubject}. Please check your dashboard to accept or decline their request.`
    };
    console.log(usermail);
    try {
        console.log("Sending OTP...");
        transporter.sendMail(mailOptions)
            .then(info => console.log(`OTP sent: ${info.response}`))
            .catch(error => console.log(error));
    }
    catch(error) {
        console.log(error);
    }
}