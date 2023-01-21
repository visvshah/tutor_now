import React, { useState } from 'react'
import StudentAuth from "./studentAuth"
import TutorAuth from './tutorAuth'
import "./auth.css"
function Auth() {
    const [isTutor, setIsTutor] = useState(0);
    const [logIn, changeLogIn] = useState(true);
    const [error, setError] = useState(false);

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        if (logIn) {
            sendLogIn()
        }
        else {
            sendSignUp()
        }

    }


    const changeMode = () => {
        changeLogIn(!logIn);
    }

    const sendLogIn = (e) => {
        /** 
        fetch("http://localhost:5001/api/users/login", { method: "POST", body: JSON.stringify(tutorData), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                setError(false);
                localStorage.setItem("profile", JSON.stringify(data));
                navigate('/');
            })
        .catch(e => {
            console.log(e)
            setError(true);
        })
        **/
    }

    const sendSignUp = (e) => {
        /** 
        fetch("http://localhost:5001/api/users/signup", { method: "POST", body: JSON.stringify(tutorData), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json();
            })
            .then(data => {
                setError(false);
                localStorage.setItem("profile", JSON.stringify(data));
                navigate('/');
            })
        .catch(e => {
            setError(true);
            console.log(e)
        })
        */
    }

    return (
        <div className='authPage'>
            <h1 className="header" >{logIn ? "Log In" : "Sign Up"}</h1>
            {logIn && (
                <>
                    <input placeholder="Your email" id="email" name="email" type="email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                    <input placeholder="Enter Password" id="password" name="password" type="password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                    <button className="submitButton" type="submit" onClick={handleSubmit}>{/*logIn ? "Next" :*/ "Submit"}</button>
                    <button className="changeMode" onClick={changeMode}>{logIn ? "Sign Up Instead" : "Log In instead"}</button>
                </>
            )
            }
            {!logIn && (
                <>
                    {(isTutor === 0) && (
                        <>
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
                </>
            )}
        </div>
    )
}

export default Auth