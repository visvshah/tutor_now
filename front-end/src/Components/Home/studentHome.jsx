import React, {useState} from 'react'
import "./studentHome.css"
export default function StudentHome({user}) {
    const [didReq, setDidReq] = useState(false);
    const [request, changeRequest] = useState({
        studentId: "",
        courseName: "",
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
        changeRequest({...request, studentId: user._id})
        fetch("http://localhost:5001/api/tutorsavails/fetch", { method: "PATCH", body: JSON.stringify(request), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                
                addTutor([]);
                Object.values(data).forEach(function(tutor) {
                    addTutor(tutors.concat(tutor));
                });
                console.log(tutors);
                setDidReq(true);
            })
        .catch(e => {
            console.log(e)
        })
    }
    const handleRequest = (tutorId) =>{
        console.log(tutorId)
        changeBooking({...booking, tutorId: tutorId, courseName: request.courseName})

        console.log("booking: ")
        console.log(booking)
        fetch("http://localhost:5001/api/tutorsavails/request", { method: "PATCH", body: JSON.stringify(booking), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
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
                            <div className="topHeader">
                                <h1>{tutor.fName + " " + tutor.lName}</h1>
                            </div>
                            <div className="bottomInformation">
                                <div className="lowerInformation">
                                    <p className="informationP">{"Rating: " + tutor.rating}</p>
                                    <p className="informationP">{"GPA: " + tutor.gpa}</p>
                                    <p className="informationP">{"Class: " + tutor.classYear}</p>
                                </div>
                                <button className = "requestTutorButton" type="submit" onClick = {()=> handleRequest(tutor.tutorId)}>Request</button>
                            </div>
                            
                        </div>
                    ))}
                </div>
                <div className="rightHome">
                    <h1 className ="heading">Tutor Now: $10.22/hour</h1>
                    <form autoComplete = "off" validate = "true" className = "form" onSubmit = {handleSubmit}>
                        <input placeholder = "What class do you need help with?" id = "class" name = "class" type ="class" onChange = {(e) => changeRequest({...request, courseName: e.target.value})}/> 
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
