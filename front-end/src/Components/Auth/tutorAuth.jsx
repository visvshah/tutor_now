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
        if (currentPage < 2) {
            changePage(currentPage + 1);
        }
        else {
            changePage(0);
        }
    }
    const [logIn, changeLogIn] = useState(false);
    const [error, setError] = useState(false);
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


    /*const [isTutor, setIsTutor] = useState(0)*/

    const [tutorData, setTutorData] = useState({
        fName: "",
        lName: "",
        email: "",
        number: "",
        venmo: "",
        //age: "",
        password: "",
        school: "",
        classYear: undefined,
        classes: [],
        gpa: undefined,
        about: "",
        //profilePicture: "",
        //interests: [],
        //tutorHistory: [/*tutor, date*/],
        /*organizations: [],
        reviews: [],
        rating: undefined,*/
    })


    return (
        <div className="authPage">
            <form autoComplete="off" validate="true" className="form" onSubmit={handleSubmit}>
                <div className="projectSlider" style={{ transform: `translateX(-${currentPage * 100}vw)` }}>
                    <div className="projectHolder">
                        {/*<div>
                            {!logIn && (
                                <>
                                <button className="tutorButton">Tutor</button>
                                <button className="studentButton">Student</button>
                                </>
                            )}
                            </div>*/}
                        <div>

                            <>
                                <>
                                    <input placeholder="Your email" id="email" name="email" type="email" onChange={(e) => setTutorData({ ...tutorData, email: e.target.value })} />
                                    <input placeholder="Enter Password" id="password" name="password" type="password" onChange={(e) => setTutorData({ ...tutorData, password: e.target.value })} />
                                    <input placeholder="Your first name" id="fName" name="fName" type="fName" onChange={(e) => setTutorData({ ...tutorData, fName: e.target.value })} />
                                    <input placeholder="Your last name" id="lName" name="lName" type="lName" onChange={(e) => setTutorData({ ...tutorData, lName: e.target.value })} />
                                    <input placeholder="Your age" id="age" name="age" type="age" onChange={(e) => setTutorData({ ...tutorData, age: e.target.value })} />
                                </>
                                {(currentPage != 0) && (
                                    <button onClick={() => moveLeft()} className='leftArrow'>Back</button>
                                )
                                }
                                {(currentPage != 2) && (
                                    <button onClick={() => moveRight()} className='submitButton'>Next</button>
                                )
                                }
                            </>
                            {error && (
                                <>
                                    <div className="error">Error!</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
