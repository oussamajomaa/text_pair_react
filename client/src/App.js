// import logo from './logo.svg';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './component/Nav';
import { UserContextProvider } from './component/UserContext';
import Validation from './pages/Validation';

// import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
// import { useState, useRef } from 'react';

function App() {
    const role = localStorage.getItem('role')

    return (
        <UserContextProvider>
            <Router>
                <Nav />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/validation' element={<Validation />}></Route>
                </Routes>
            </Router>
        </UserContextProvider>
    )
}
export default App;
