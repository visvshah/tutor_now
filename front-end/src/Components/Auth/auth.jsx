import React, { useState } from 'react'
import StudentAuth from "./studentAuth"
import TutorAuth from './tutorAuth'
import "./auth.css"
function Auth() {
    const [isTutor, setIsTutor] = useState(0);
    return (
        <div className='authPage'>
            {(isTutor === 0) && (
                        <>
                            <h1 className="logInMainHeader">What are you logging in as?</h1>
                            <button onClick={() => setIsTutor(1)} className="tutorButton">Tutor</button>
                            <button onClick={() => setIsTutor(2)} className="studentButton">Student</button>
                        </>
                    )}
                    {(isTutor === 1) && (
                        <TutorAuth />
                    )}
                    {(isTutor === 2) && (
                        <StudentAuth />
                    )}
        </div>
    )
}

export default Auth