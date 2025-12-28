import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 


const Signup = (props) => {

  const [credentials, setCredentials] = useState({email:"", password:"", name:""})
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email ,  password: credentials.password, name: credentials.name })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert("Account created successfully", "success");
        }
        else{
            props.showAlert("invalid credentials", "danger");
        }
    }

  const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }


  return (
    <div className='container'>
      <h2 className='my-3'>Signup to continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={onchange} name="name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="email" onChange={onchange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onchange} name="password"minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onchange} name="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
