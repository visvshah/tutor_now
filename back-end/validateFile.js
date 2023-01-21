//Currently sends a message requesting the tutor to accept the request

import asyncHandler from "express-async-handler";
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





export const validateEmail = (email, fName, lName, studentSubject) => {
    usermail = email;


    let mailOptions = {
        from: "GoTutor",
        to: usermail,
        subject: `${fName} ${lName} wants to learn ${studentSubject}}`,
        text: `${fName} ${lName} is waiting for you to accept their request to learn ${studentSubject}. Please check your dashboard to see this request.`
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