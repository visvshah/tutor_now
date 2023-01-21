import { useState, useEffect } from 'react';

import nodemailer from 'nodemailer';

// Custom hook for sending OTP via email
function useSendOTP(userEmail) {
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userEmail) return;
        setStatus('sending');

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
            to: userEmail,
            subject: 'One-Time Password',
            text: `Your OTP is: ${otp}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                setError(error);
                setStatus('error');
            } else {
                setStatus('sent');
            }
        });
    }, [userEmail]);

    return { status, error };
}

// Example component that uses the custom hook
function OTPForm({ userEmail }) {
    const { status, error } = useSendOTP(userEmail);

    return (
        <div>
            { status === 'sending' && <p>Sending OTP...</p> }
            { status === 'sent' && <p>OTP sent to {userEmail}</p> }
            { status === 'error' && <p>Error: {error.message}</p> }
        </div>
    );
}

//exort usesendotp
export default useSendOTP;


//Students can demnad an on demand tutor. Tutors have a window of how long they're free. Here's how the algorithm works:
//1. Student requests a tutor by pressing the tutor now button
//2. The student is matched with a tutor who is free at the time. For this, a push notification is sent to all the tutors who are free at the time. A notification is sent to a new tutor every minute, starting from the tutor with the most reputation. If the tutor accepts the request, the student is connected to the tutor. If the tutor rejects the request, the next tutor is notified. If all the tutors reject the request, the student is notified that no tutors are available at the moment.

