import React, {useState} from "react";
import "./auth.css"
import {useNavigate} from "react-router-dom";

export default function Auth() {
    const [logIn, changeLogIn] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(logIn){
            sendLogIn()
        }
        else{
            sendSignUp()
        }

    }
    const sendLogIn = (e) =>{
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

    const sendSignUp = (e) =>{
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

    const changeMode = () =>{
        changeLogIn(!logIn);
    }
    const [isTutor, setIsTutor] = useState(false)

    const [tutorData, setTutorData] = useState({
        fName: "",
        lName: "",
        email: "",
        //age: "",
        password: "",
        classYear: undefined,
        about: "",
        profilePicture: "",
        //interests: [],
        classesToTutor: [],
        tutorHistory: [/*tutor, date*/],
        venmo: "",
        phoneNumber: "",
        gpa: undefined,
        organizations: [],
        reviews: [],
        rating: undefined,
    })

    const [studentData, setStudentData] = useState({
        fName: "",
        lName: "",
        email: "",
        password: "",
        classYear: undefined,
        profilePicture: "",
        interests: [],
        classesTaken: [],
    })

return (
    <div>
        {/*<div className="authPage">
            <h1 className = "header" >{logIn ? "Log In" : "Sign Up"}</h1>
            <form autoComplete = "off" validate = "true" className = "form" onSubmit = {handleSubmit}> 
                <input placeholder = "Your email" id = "email" name = "email" type ="email" onChange = {(e) => settutorData({...tutorData, email: e.target.value})}/>
                { !logIn && (
                    <>
                        <input placeholder = "Your first name" id = "fName" name = "fName" type ="fName" onChange = {(e) => settutorData({...tutorData, fName: e.target.value})}/>
                        <input placeholder = "Your last name" id = "lName" name = "lName" type ="lName" onChange = {(e) => settutorData({...tutorData, lName: e.target.value})}/>
                        <input placeholder = "Your age" id = "age" name = "age" type ="age" onChange = {(e) => settutorData({...tutorData, age: e.target.value})}/>
                    </>
                    )
                }
                
                <input placeholder = "Enter Password" id = "password" name = "password" type ="password" onChange = {(e) => settutorData({...tutorData, password: e.target.value})}/>
                <button className = "submitButton" type="submit" onClick = {handleSubmit}>Submit</button>
                {error && (
                    <>
                        <div className = "error">Error!</div>
                    </>
                )}
            </form>
            <button className = "changeMode" onClick = {changeMode}>{logIn ? "Sign Up Instead" : "Log In instead"}</button>
        </div>*/}
    </div>
    )
}