import React, {useState} from 'react'
import "./studentHome.css"
import "./tutorHome.css"
export default function TutorHome({user}) {

    console.log(user.email)
    const [isAvailable, setIsAvailable] = useState(false);
    const [request, changeRequest] = useState({
        minutes: 0,
        tutorId : user._id,
    })

    const [finished, setFinished] = useState(false);
    const [student, setStudent] = useState();
    const handleSubmit = (event) =>{
        event.preventDefault();
        changeRequest({...request, tutorId: user._id})
        user.isAvailable = true;
        localStorage.setItem("profile", JSON.stringify(user));
        console.log(request)
        fetch("http://localhost:5001/api/tutorsavails/create", { method: "POST", body: JSON.stringify(request), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                setIsAvailable(true);
                return res.json()
            })
        .catch(e => {
            console.log(e);
        })
    }
    const handleRequest = () =>{
        fetch("http://localhost:5001/api/tutors/" + user._id, { method: "GET", mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            if(data.studentId) {
                getStudentDetails(data.studentId);
                // localStorage.setItem("profile", data);
                console.log("There is a student id");
            }
            else {
                console.log("No student id");
            }
        })
        .catch(e => {
            console.log(e)
        })
    }
    const getStudentDetails = (studentId) =>{
        console.log(studentId)
        fetch("http://localhost:5001/api/students/" + studentId, { method: "GET", mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                console.log("in first then");
                return res.json()
            })
            .then(data => {
                console.log("in second then");
                console.log(data);
                setStudent(data);
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

                                    <button onClick={handleSubmit} className="tutorButton">Set Availability Now!</button>
                                </>
                            )}
                            {isAvailable && (
                                <>
                                    <h1 className='heading'>Sucess! We will email you when you have a match!</h1>
                                    <button onClick={handleRequest} className="tutorButton">Reload?</button>
                                </>
                            )}
                            </>
                        )}
                        {finished && (
                            <div className="finishPage">      
                                <h1 className='tutorEndHeader'>Congrats! Here is your Student:</h1>
                                <div className="bigNameHeader">
                                    <h1>{student.fName + " " + student.lName}</h1>
                                </div>
                                <div className="bottomInformation">
                                    <div className="lowerInformation">
                                        <p className="informationPa">{"Class Year :" + student.classYear}</p>
                                        <p className="informationPa">{"Phone :" + student.number}</p>
                                        <p className="informationPa">{"Email :" + student.email}</p>
                                        <p className="informationPa">{"Venmo :" + student.venmo}</p>
                                    </div>
                                </div>
                    
                            </div>
                        )}

                </div>
    </div>
  )
}
