import './App.css';
import Navbar from './Components/Navbar/navbar';
import Home from './Components/Home/home';
import Auth from './Components/Auth/auth';
import Landing from './Components/Landing/landing';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useEffect } from 'react';
import useSendOTP from './OTPForm';



function App() {

  const [userEmail, setUserEmail] = useState('');
  const { status, error } = useSendOTP(userEmail);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserEmail(e.target.email.value);
  }

  return (
    <BrowserRouter>
      <div className="App">

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" name="email" required/>
          </label>
          <button type="submit">Send OTP</button>
        </form>
        { status === 'sending' && <p>Sending OTP...</p> }
        { status === 'sent' && <p>OTP sent to {userEmail}</p> }
        { status === 'error' && <p>Error: {error.message}</p> }
      </div>

        <Navbar/>
          <Routes>
              <Route path = "/" element = {<Home/>}/>
              <Route path = "/login" element = {<Auth/>}/>
              <Route path='/landing' element={<Landing/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
