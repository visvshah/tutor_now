import './App.css';
import Navbar from './Components/Navbar/navbar';
import Home from './Components/Home/home';
import Auth from './Components/Auth/auth';
import Landing from './Components/Landing/landing';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
