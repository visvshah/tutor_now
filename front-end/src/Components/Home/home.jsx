import React from 'react'
import "./home.css"
import tutorHome from './tutorHome';
import studentHome from './studentHome';

export default function home() {
    const [students, updateStudents] = useState();
    const user = JSON.parse(localStorage.getItem("profile"));
    if(!user) {
        return (
        <div className="holder">
            <h1 className="logInFirst">Log in First!</h1>
        </div>
        )
    }
    
  return (
    <div>
        {(user.type == 1) && (
            <studentHome/>
        )}
        {(user.type == 2) && (
            <tutorHome/>
        )}
    </div>
  )
}
