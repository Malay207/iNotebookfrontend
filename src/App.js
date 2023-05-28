import React, { useState } from 'react';
import './App.css';
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/Notesstate';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [alert, setalert] = useState(null)
  const setalrt = (type, message) => {
    setalert({ type: type, message: message })
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home alrt={setalrt} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login alrt={setalrt} />} />
              <Route exact path="/signup" element={<SignUp alrt={setalrt} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>


    </>
  );
}

export default App;
