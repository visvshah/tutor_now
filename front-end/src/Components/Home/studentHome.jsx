import React, {useState} from 'react'
import "./studentHome.css"
export default function StudentHome({user}) {
    const [didReq, setDidReq] = useState(false);
    const [request, changeRequest] = useState({
        studentId: user._id,
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
        console.log(request)
        changeRequest({...request, studentId: user._id})
        changeRequest({...request, courseName: request.courseName})


        fetch("http://localhost:5001/api/tutorsavails/fetch", { method: "PATCH", body: JSON.stringify(request), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()

            })
            .then(data => {
                addTutor([])
                console.log(data)
                Object.values(data).forEach(function(tutor) {
                    addTutor(tutors.concat(tutor));
                });
                setDidReq(true);
            })
        .catch(e => {
            console.log(e)
        })
    }

    const handleRequest = (tutorId, actualId, num) =>{
        console.log(tutorId)
        console.log(request.courseName)
        //changeBooking(prev => ({...prev, studentId: booking.studentId, courseName: request.courseName, tutorId: tutorId}))
        changeBooking({...booking, studentId: booking.studentId})
        changeBooking({...booking, courseName: request.courseName})

        console.log("booking: ")
        console.log(booking)


        fetch("http://localhost:5001/api/tutorsavails/request", { method: "PATCH", body: JSON.stringify({studentId: booking.studentId, courseName: request.courseName, tutorId: tutorId}), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                setFinished(true);
                setActualTutor(tutors[num]);

                console.log(actualTutor);
            })
        .catch(e => {
            console.log(e)
        })
        //delete from tutorsavails through the
        
        

        fetch("http://localhost:5001/api/tutorsavails/" + actualId, { method: "DELETE", mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
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
                <div className={'leftHome ' + (didReq && 'active')}>
                    {!finished && (
                        <>
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
                                        <button className = "requestTutorButton" type="submit" onClick = {()=> handleRequest(tutor.tutorId, tutor._id, num)}>Request</button>
                                    </div>
                                    
                                </div>
                            ))}
                        </>
                    )}

                </div>
                <div className="rightHome">
                    {!finished && (
                        <>
                            <h1 className ="heading">Tutor Now: $10.22/hour</h1>
                            <form autoComplete = "off" validate = "true" className = "form" onSubmit = {handleSubmit}>
                                <input placeholder = "What class do you need help with?" id = "class" name = "class" type ="class" onChange = {(e) => changeRequest({...request, courseName: e.target.value})}/> 
                                <button className = "submitButton" type="submit" onClick = {handleSubmit}>Submit</button>
                            </form>
                        </>
                    )}
                    {finished && (
                        <div className="finishPage">
                            <h1 className='tutorEndHeader'>Congrats! Here is your tutor:</h1>
                            <div className="finishPage">
                                    
                                    <div className="bigNameHeader">
                                        <h1>{actualTutor.fName + " " + actualTutor.lName}</h1>
                                    </div>
                                    <div className="bottomInformation">
                                        <div className="lowerInformation">
                                            <p className="informationPa">{"School :" + actualTutor.school}</p>
                                            <p className="informationPa">{"Phone :" + actualTutor.number}</p>
                                            <p className="informationPa">{"Email :" + actualTutor.email}</p>
                                            <p className="informationPa">{"Venmo :" + actualTutor.venmo}</p>
                                            <p className="informationPa">{"About :" + actualTutor.about}</p>
                                        </div>
                                    </div>
                            
                            </div>
                        </div>
                    )}
                </div>

        
    </div>
  )
}
