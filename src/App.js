import './App.css';
import Navbar from './component/Navbar';
import HomePage from './component/HomePage';
import About from './component/About';
import NoteState from './contexts/notes/NoteStates';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="this is amazing react course"/>
          <div className='container'>
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
