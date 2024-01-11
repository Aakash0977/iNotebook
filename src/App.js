import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Home } from './components/Home';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import { Login } from './components/Login';
import { Register } from './components/Register';


function App() {
  return (
    <>
    <NoteState>
    <Router>
        <Navbar/>
        <Alert message = "This is the Alert"/>
        <div className='container'> 
        <Routes>
          <Route exact path='/' element= {<Home/>}/>
          <Route exact path='/login' element= {<Login/>}/>
          <Route exact path='/register' element= {<Register/>}/>
          <Route exact path='/about' element= {<About/>}/>
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
