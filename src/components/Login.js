import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const [credentials, setcredentials] = useState({ email: "", password: "" })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json.sucess)
    if (json.sucess === true) {
      console.log(json.accessToken)
      sessionStorage.setItem('accessToken', json.accessToken);
      navigate("/")
    }
    else {
      alert("Invalid Credentials")
    }
  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{
      // backgroundImage: `url(${backgroundImg})`, // Replace with the actual path to your image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }}>
      <div className='container d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
        <form onSubmit={handleSubmit}>
          <h1 >Welcome to Login Page</h1>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input type="text" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
          </div>
          <div className="form-group form-check my-2">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
          </div>
          <div className='my-2'>
            <button type="submit" className="btn btn-primary" > Login</button>
            <a className="btn btn-outline-primary mx-2" href="/register" role='button'>Register</a>
          </div>
        </form>
      </div></div>
  )
}

 
