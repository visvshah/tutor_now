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
    const [tutors, addTutor] = useState([]);
    const handleSubmit = (event) =>{
        event.preventDefault();
        fetch("http://localhost:5001/api/tutorAvails/fetch", { method: "PATCH", body: JSON.stringify(request), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                data.forEach(function(tutor) {
                    addTutor(tutors.concat(tutor));
                });
                setDidReq(true);
            })
        .catch(e => {
            console.log(e)
        })
    }
    const handleRequest = (tutorId) =>{
        event.preventDefault();
        changeBooking({...booking, tutorId: tutorId})
        changeBooking({...booking, courseName: request.class})
        fetch("http://localhost:5001/api/tutorAvails/request", { method: "PATCH", body: JSON.stringify(booking), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                data.forEach(function(tutor) {
                    addTutor(tutors.concat(tutor));
                });
                setDidReq(true);
            })
        .catch(e => {
            console.log(e)
        })
    }
  return (
    <div className="studentHome">
        <div className={'leftHome ' + (didReq && 'active')}>
            {tutors.map((tutor, num) =>(
                <div className = "tutorInfo" key = {num}>
                    <h1>{tutor.fName + " " + tutor.lName}</h1>
                    <h1>{"Rating: " + tutor.rating}</h1>
                    <button className = "submitButton" type="submit" onClick = {handleRequest(tutor._id)}>Request</button>
                </div>
            ))}
        </div>
        <div className="rightHome">
            <h1 className ="heading">Tutor Now: $10/hour</h1>
            <form autoComplete = "off" validate = "true" className = "form" onSubmit = {handleSubmit}>
                <input placeholder = "What class do you need help with?" id = "class" name = "class" type ="class" onChange = {(e) => changeRequest({...request, class: e.target.value})}/> 
                <button className = "submitButton" type="submit" onClick = {handleSubmit}>Submit</button>
            </form>
        </div>
    </div>
  )
}
