import e from 'cors'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email ,  password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            //save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert("Loggedin successfully", "success");
        }
        else{
            props.showAlert("invalid details", "danger")
        }
    }


    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }



    return (
        <>
        <h2 className='my-3 mx-3'>Login to contine to iNotebook</h2>
        <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" onChange={onchange} value={credentials.email} name='email' aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={onchange} name='password' value={credentials.password} id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    )
}

export default Login
