
import { useState } from "react";

import axios from 'axios';
import './login.css'

const baseUrl = 'http://localhost:5001'


function Login() {
    const [result, setResult] = useState("");


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const loginHandler = async(e) => {
        e.preventDefault();
        
        try {
            let response = await axios.post(`${baseUrl}/login`, {

                email: email,
                password: password
            },{
                withCredentials: true
            })


            console.log("Login successful");
            setResult("Login successful")

        } catch (e) {
            console.log("e: ", e);
        }

        // e.reset();
    }
    


    return (
        <>
            <h4>This is Login page</h4>

            <form onSubmit={loginHandler} className="loginForm">


                <textarea
                    className="TextField"
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="username"
                    placeholder="email"
                    autoComplete="username"
                    onChange={(e) => { setEmail(e.target.value) }}
                />


                <br />

                <textarea
                    className="TextField"
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="current-password"
                    autoComplete="current-password"
                    placeholder="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <br />
                <button  type="submit">Login</button>

            </form>
            
            <p>{result}</p>
        </>
    )
}

export default Login;