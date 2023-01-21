const nodemailer = require('nodemailer');

// Create a transport for sending email
let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
        user: 'username',
        pass: 'password'
    }
});

// Generate a random OTP
let otp = Math.floor(100000 + Math.random() * 900000);

// Create the email message
let mailOptions = {
    from: '"Your App" <noreply@example.com>',
    to: 'user@example.com',
    subject: 'One-Time Password',
    text: `Your OTP is: ${otp}`
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`OTP sent: ${info.response}`);
    }
});
