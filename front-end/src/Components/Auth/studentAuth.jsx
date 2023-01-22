import React, { useState } from "react";
import "./auth.css"
import { useNavigate } from "react-router-dom";

export default function StudentAuth() {
    const [currentPage, changePage] = useState(0);
    const moveLeft = () => {
        if (currentPage > 0) {
            changePage(currentPage - 1);
        }
        else {
            currentPage(2);
        }

    }
    const moveRight = () => {
        if (currentPage < 2) {
            changePage(currentPage + 1);
        }
        else {
            changePage(0);
        }
    }
    const [logIn, changeLogIn] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (logIn) {
            sendLogIn()
        }
        else {
            sendSignUp()
        }

    }
    const sendLogIn = (e) => {
        fetch("http://localhost:5001/api/students/login", { method: "POST", body: JSON.stringify(studentData), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                localStorage.setItem("profile", JSON.stringify(data));
                navigate('/');
            })
        .catch(e => {
            console.log(e)
        })
    }

    const sendSignUp = (e) => {
        fetch("http://localhost:5001/api/students/signup", { method: "POST", body: JSON.stringify(studentData), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json();
            })
            .then(data => {
                localStorage.setItem("profile", JSON.stringify(data));
                navigate('/');
            })
        .catch(e => {
            console.log(e)
        })
    }

    const changeMode = (event) => {
        event.preventDefault();;
        changeLogIn(!logIn);
    }


    const [studentData, setStudentData] = useState({
        fName: "",
        lName: "",
        email: "",
        number: "",
        venmo: "",
        password: "",
        classYear: "",
        school: "",
        classYear: ""
    })
    const exitButton = (e) => {
        window.location.reload(true);
        console.log("Hello")
    }

    return (
        <div className="authPage">
            <h1 className="header">Student</h1>
            <button onClick={() => exitButton()} className='exitButton'>Exit</button>
            <form autoComplete="off" validate="true" className="form" onSubmit={handleSubmit}>
                <div className="projectSlider" style={{ transform: `translateX(-${currentPage * 100}vw)` }}>
                    <div className="projectHolder">
                        <h1 className="header" >{logIn ? "Log In" : "Sign Up"}</h1>
                        {logIn && (
                            <>
                                <input placeholder="Your email" id="email" name="email" type="email" onChange={(e) => setStudentData({ ...studentData, email: e.target.value })} />
                                <input placeholder="Enter Password" id="password" name="password" type="password" onChange={(e) => setStudentData({ ...studentData, password: e.target.value })} />
                                <button className="submitButton" type="submit" onClick={handleSubmit}>{/*logIn ? "Next" :*/ "Submit"}</button>
                            </>
                        )}
                        {!logIn && (
                            <>
                                <input placeholder="Your first name" id="fName" name="fName" type="fName" onChange={(e) => setStudentData({ ...studentData, fName: e.target.value })} />
                                <input placeholder="Your last name" id="lName" name="lName" type="lName" onChange={(e) => setStudentData({ ...studentData, lName: e.target.value })} />
                                <input placeholder="Your email" id="email" name="email" type="email" onChange={(e) => setStudentData({ ...studentData, email: e.target.value })} />
                                <input placeholder="Enter Password" id="password" name="password" type="password" onChange={(e) => setStudentData({ ...studentData, password: e.target.value })} />
                                <button onClick={() => moveRight()} className='submitButton'>Next</button>
                            </>
                        )}
                        <button className="changeMode" onClick={changeMode}>{!logIn ? "Log In Instead" : "Sign Up instead"}</button>
                    </div>
                    <div className="projectHolder">
                        <h1 className="header">Tell us more about yourself</h1>
                        <input placeholder="What school do you go to?" id="school" name="school" type="school" onChange={(e) => setStudentData({ ...studentData, school: e.target.value })} />
                        <input placeholder="What is your class standing?" id="classYear" name="classYear" type="classYear" onChange={(e) => setStudentData({ ...studentData, classYear: e.target.value })} />
                        <button onClick={() => moveRight()} className='submitButton'>Next</button>
                            
                    </div>
                    <div className="projectHolder">
                        <h1 className="header">Tell us even more about yourself</h1>
                        <input placeholder="What is your phone number?" id="number" name="number" onChange={(e) => setStudentData({ ...studentData, number: e.target.value })} />
                        <input placeholder="What is your venmo?" id="venmo" name="venmo" type="venmo" onChange={(e) => setStudentData({ ...studentData, venmo: e.target.value })} />
                        <button className="submitButton" type="submit" onClick={handleSubmit}>{/*logIn ? "Next" :*/ "Submit"}</button>
                    </div>
                </div>
                {(currentPage > 0) && (
                    <button onClick={() => moveLeft()} className='leftArrow'>Back</button>
                )}
            </form>
        </div>
    )
}
