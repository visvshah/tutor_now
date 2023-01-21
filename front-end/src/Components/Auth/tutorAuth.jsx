import React, { useState } from "react";
import "./auth.css"
import { useNavigate } from "react-router-dom";

export default function TutorAuth() {
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
        if (currentPage < 3) {
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
        fetch("http://localhost:5001/api/tutors/login", { method: "POST", body: JSON.stringify(tutorData), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
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
        fetch("http://localhost:5001/api/tutors/signup", { method: "POST", body: JSON.stringify(tutorData), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
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

    const changeMode = () => {
        changeLogIn(!logIn);
    }


    const [tutorData, setTutorData] = useState({
        fName: "",
        lName: "",
        email: "",
        number: "",
        venmo: "",
        password: "",
        classYear: "",
        school: "",
        classYear: "",
        classes: "",
        gpa: "",
        about: "",
    })


    return (
        <div className="authPage">
            <form autoComplete="off" validate="true" className="form" onSubmit={handleSubmit}>
                <div className="projectSlider" style={{ transform: `translateX(-${currentPage * 100}vw)` }}>
                    <div className="projectHolder">
                        <h1 className="header" >{logIn ? "Log In" : "Sign Up"}</h1>
                        {logIn && (
                            <>
                                <input placeholder="Your email" id="email" name="email" type="email" onChange={(e) => setTutorData({ ...tutorData, email: e.target.value })} />
                                <input placeholder="Enter Password" id="password" name="password" type="password" onChange={(e) => setTutorData({ ...tutorData, password: e.target.value })} />
                                <button className="submitButton" type="submit" onClick={handleSubmit}>{/*logIn ? "Next" :*/ "Submit"}</button>
                            </>
                        )}
                        {!logIn && (
                            <>
                                <input placeholder="Your first name" id="fName" name="fName" type="fName" onChange={(e) => setTutorData({ ...tutorData, fName: e.target.value })} />
                                <input placeholder="Your last name" id="lName" name="lName" type="lName" onChange={(e) => setTutorData({ ...tutorData, lName: e.target.value })} />
                                <input placeholder="Your email" id="email" name="email" type="email" onChange={(e) => setTutorData({ ...tutorData, email: e.target.value })} />
                                <input placeholder="Enter Password" id="password" name="password" type="password" onChange={(e) => setTutorData({ ...tutorData, password: e.target.value })} />
                                <button onClick={() => moveRight()} className='submitButton'>Next</button>
                            </>
                        )}
                        <button className="changeMode" onClick={changeMode}>{!logIn ? "Log In Instead" : "Sign Up instead"}</button>
                    </div>
                    <div className="projectHolder">
                        <h1 className="header">Tell us more about yourself</h1>
                        <input placeholder="What school do you go to?" id="school" name="school" type="school" onChange={(e) => setTutorData({ ...tutorData, school: e.target.value })} />
                        <input placeholder="What is your class standing?" id="classYear" name="classYear" type="classYear" onChange={(e) => setTutorData({ ...tutorData, classYear: e.target.value })} />
                        <input placeholder="What is your GPA?" id="gpa" name="gpa" type="gpa" onChange={(e) => setTutorData({ ...tutorData, gpa: e.target.value })} />
                        <button onClick={() => moveRight()} className='submitButton'>Next</button>
                            
                    </div>
                    <div className="projectHolder">
                        <h1 className="header">Tell us even more about yourself</h1>
                        <input placeholder="What is your phone number?" id="number" name="number" onChange={(e) => setTutorData({ ...tutorData, number: e.target.value })} />
                        <input placeholder="What is your venmo?" id="venmo" name="venmo" type="venmo" onChange={(e) => setTutorData({ ...tutorData, venmo: e.target.value })} />
                        <input placeholder="What courses would you tutor?" id="classes" name="classes" type="classes" onChange={(e) => setTutorData({ ...tutorData, classes: e.target.value })} />
                        <p>*Seperate the courses by using a "," and enter a coure with in standard form (ex. CS18000)</p>
                        <button onClick={() => moveRight()} className='submitButton'>Next</button>
                    </div>
                    <div className="projectHolder">
                        <h1 className="header">Lastly,</h1>
                        <textarea className = "aboutInput" placeholder="Tell use about yourself!" id="about" name="about" onChange={(e) => setTutorData({ ...tutorData, numbabouter: e.target.value })} />
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
