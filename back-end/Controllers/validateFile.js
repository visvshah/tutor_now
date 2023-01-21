import asyncHandler from "express-async-handler";
import tutorModel from "../Models/tutorModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import nodemailer from "nodemailer";
let usermail = "jogsoham2003@gmail.com";
    
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

// Create the email messagef
let mailOptions = {
    from: "Thanatos",
    to: usermail,
    subject: 'One-Time Password',
    text: `Your OTP is: ${otp}`
};


export const validateEmail = (email) => {
    usermail = email;
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
