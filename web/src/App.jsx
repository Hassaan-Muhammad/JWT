import { useState, useContext, useEffect } from "react";
import { GlobalContext } from './context/Context';
import axios from "axios";


import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";


import Home from "./components/home";
import About from "./components/about";
import Gallery from "./components/gallery";
import Login from "./components/login";
import Signup from "./components/signup";



function App() {
  const baseUrl = 'http://localhost:5001'

  let { state, dispatch } = useContext(GlobalContext);
  const [fullName, setFullName] = useState("");


  const logoutHandler = async () => {
    try {
      let response = await axios.post(`${baseUrl}/logout`, {
        withCredentials: true
      })
      dispatch({
        type: 'USER_LOGOUT'
      })
    } catch (error) {
      console.log("axios error", error)
    }
  }


  useEffect(() => {

    const baseUrl = 'http://localhost:5001'

    const getProfile = async () => {

      try {
        let response = await axios.get(`${baseUrl}/products`, {
          withCredentials: true
        })
        dispatch({
          type: 'USER_LOGIN'
        })
      } catch (error) {
        dispatch({
          type: 'USER_LOGOUT'
        })
      }

    }
    getProfile()
  },[])


  return (
    <div>

      {
        (state.isLogin === true) ?
          <ul className='navBar'>
            <li> <Link to={`/`}>Home</Link> </li>
            <li> <Link to={`/gallery`}>Gallery</Link> </li>
            <li> <Link to={`/about`}>About</Link> </li>
            <li> {fullName} <button onClick={logoutHandler}>Logout</button> </li>
          </ul>
          : null}

      {
        (state.isLogin === false) ?
          <ul className='navBar'>
            <li> <Link to={`/`}>Login</Link> </li>
            <li> <Link to={`/signup`}>Signup</Link> </li>
          </ul>
          : null
      }

      {(state.isLogin === true) ?

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null}

      {(state.isLogin === false) ?
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null
      }

      {(state.isLogin === null) ?
        <div> Splash screen</div>
        : null}


    </div>
  );
}

export default App;