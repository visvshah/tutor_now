import React from 'react'
import "./home.css"

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
    const getStudents = (boardNumber) =>{
        console.log(boards);
        fetch("http://localhost:5001/api/students/getboards", { method: "PATCH", body: JSON.stringify(boards), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                
            })
        .catch(e => {
            console.log(e)
        })
      }
  return (
    <div>
        <div className="left">
            
        </div>
        <div className="right">
            <div className="timer">
                
            </div>
        </div>
    </div>
  )
}
