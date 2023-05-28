import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const host = "https://inotebookserver-3mx1.onrender.com";
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
            props.alrt('danger', "Password not match")
        }
        else {


            const response = await fetch(`${host}/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                navigate("/");
                props.alrt('success', "Account created successfully")
            }

        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        //signup form
        <>
            < div className="container">
                <h1 className="my-3">Sign Up to create your account</h1>
                <form >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} name='email' required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' required minLength={5} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Conform Password</label>
                        <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} onChange={onChange} name='cpassword' required minLength={5} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={() => {
                        onSubmit();
                    }}>Sign Up</button>
                </form>
            </div>

        </>
    )
}

export default SignUp