import React, {useState} from 'react'
import "./home.css"
import TutorHome from './tutorHome';
import StudentHome from './studentHome';

export default function Home() {
    const [students, updateStudents] = useState();
    const user = JSON.parse(localStorage.getItem("profile"));
    
    if(!user) {
        return (
        <div className="home">
            <h1 className="logInFirst">Log in First!</h1>
        </div>
        )
    }
    
  return (
    <div className = "home">

        {(user.type == 1) && (
            <StudentHome user = {user}/>
        )}
        {(user.type == 2) && (
            <TutorHome/>
        )}
    </div>
  )
}
