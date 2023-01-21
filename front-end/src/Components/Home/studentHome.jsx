import React, {useState} from 'react'
import "./studentHome.css"
export default function StudentHome({user}) {
    const [didReq, setDidReq] = useState(false);
    const [request, changeRequest] = useState({
        studentId : user._id,
        class: "",
    })
    const [booking, changeBooking] = useState({
        studentId : user._id,
        courseName: "",
        tutorId: "",
    })
    const [finished, setFinished] = useState(false);
    const [tutors, addTutor] = useState([]);
    const [actualTutor, setActualTutor] = useState();
    const handleSubmit = (event) =>{
        event.preventDefault();
        fetch("http://localhost:5001/api/tutorAvails/fetch", { method: "PATCH", body: JSON.stringify(request), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                JSON.stringify(data).forEach(function(tutor) {
                    addTutor(tutors.concat(tutor));
                });
                setDidReq(true);
            })
        .catch(e => {
            console.log(e)
        })
    }
    const handleRequest = (tutorId) =>{
        changeBooking({...booking, tutorId: tutorId})
        changeBooking({...booking, courseName: request.class})
        fetch("http://localhost:5001/api/tutorAvails/request", { method: "PATCH", body: JSON.stringify(booking), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                setFinished(true);
                setActualTutor(JSON.stringify(data));
            })
        .catch(e => {
            console.log(e)
        })
    }
  return (
    <div className="studentHome">
        {!finished && (
            <>
                <div className={'leftHome ' + (didReq && 'active')}>
                    {(tutors.length == 0) && (
                        <>
                            No Available Tutors!
                        </>
                    )}
                    {tutors.map((tutor, num) =>(
                        <div className = "tutorInfo" key = {num}>
                            <h1>{tutor.fName + " " + tutor.lName}</h1>
                            <h1>{"Rating: " + tutor.rating}</h1>
                            <button className = "submitButton" type="submit" onClick = {handleRequest(tutor._id)}>Request</button>
                        </div>
                    ))}
                </div>
                <div className="rightHome">
                    <h1 className ="heading">Tutor Now: $10.22/hour</h1>
                    <form autoComplete = "off" validate = "true" className = "form" onSubmit = {handleSubmit}>
                        <input placeholder = "What class do you need help with?" id = "class" name = "class" type ="class" onChange = {(e) => changeRequest({...request, class: e.target.value})}/> 
                        <button className = "submitButton" type="submit" onClick = {handleSubmit}>Submit</button>
                    </form>
                </div>
            </>
        )}
        {finished && (
            <div className="finishPage">
                <h1>Congrats! Here is your tutor:</h1>
                <div className="header">
                    <h2>{actualTutor.fName + " " + actualTutor.lName}</h2>
                    <h2>{"School :" + actualTutor.school}</h2>
                    <h2>{"Phone :" + actualTutor.phone}</h2>
                    <h2>{"Email :" + actualTutor.email}</h2>
                    <h2>{"Venmo :" + actualTutor.venmo}</h2>
                </div>
            </div>
        )}
    </div>
  )
}
