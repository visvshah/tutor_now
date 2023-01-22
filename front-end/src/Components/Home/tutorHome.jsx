import React, {useState} from 'react'
import "./studentHome.css"
export default function StudentHome({user}) {
    const [isAvailable, setIsAvailable] = useState(false);
    const [request, changeRequest] = useState({
        minutes: 0,
        tutorId : "",
    })
    const [finished, setFinished] = useState(false);
    const [student, setStudent] = useState();
    const handleSubmit = (event) =>{
        event.preventDefault();
        changeRequest({...request, tutorId: user._id})
        fetch("http://localhost:5001/api/tutorsavails//create", { method: "POST", body: JSON.stringify(request), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                setIsAvailable(true)
            })
        .catch(e => {
            console.log(e)
        })
    }
    const handleRequest = () =>{
        fetch("http://localhost:5001/api/tutors/" + user._id, { method: "GET", mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                if(data.studentId != "") {
                    getStudentDetails(data.studentId)
                }
            })
        .catch(e => {
            console.log(e)
        })
    }
    const getStudentDetails = (studentId) =>{
        fetch("http://localhost:5001/api/students/" + studentId, { method: "GET", mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                setStudent(student);
                setFinished(true);
            })
        .catch(e => {
            console.log(e)
        })
    }
  return (
    <div className="studentHome">
                <div className={'leftHome ' + (isAvailable && 'active')}>
                    
                </div>
                <div className="rightHome">
                        {!finished && (
                            <>
                            {!isAvailable && (
                                <>
                                    <h1 className='heading'>Start Tutoring Now!</h1>
                                    <input placeholder="How many minutes are you available for from now?" id="minutes" name="minutes" type="minutes" onChange={(e) => changeRequest({ ...request, minutes: e.target.value })} />
                                    <button onClick={() => handleSubmit} className="tutorButton">Set Availability Now!</button>
                                </>
                            )}
                            {isAvailable && (
                                <>
                                    <h1 className='heading'>Sucess! We will email you when you have a match!</h1>
                                    <button onClick={() => handleSubmit} className="tutorButton">Reload?</button>
                                </>
                            )}
                            </>
                        )}
                        {finished && (
                            <div className="studentHolder">
                                <h1>You have been matched with a Student!</h1>
                                <div className="leftSudentDisplay">
                                    <h1 className="header">{student.fName + " " + student.lName}</h1>
                                    <h2 className="header">{"Class :" + student.class}</h2>
                                    <h2 className="header">{" :" + student.class}</h2>
                                    <h2>{"Phone :" + student.phone}</h2>
                                    <h2>{"Email :" + student.email}</h2>
                                    <h2>{"Venmo :" + student.venmo}</h2>
                                </div>
                            </div>
                        )}

                </div>
    </div>
  )
}
