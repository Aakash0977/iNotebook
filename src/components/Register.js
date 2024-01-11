import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


export const Register = () => {
    const [credentials, setcredentials] = useState({ name: "", email: "" , password:""})

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password:credentials.password })
      });
      const json = await response.json();
      
      if (json.sucess === true) {
        localStorage.setItem('token', json.authtoken);
        navigate("/login")
      }
      else{
        alert(json.result)
      }
    }
    const onChange = (e) => {
      setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div><div className='container d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <form onSubmit={handleSubmit}>
                <h1>Welcome to Register Page</h1>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Enter your Name</label>
                    <input type="text" className="form-control" id="name"onChange={onChange} name='name' aria-describedby="emailHelp" placeholder="Name" required />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputemail1">email</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name='email' placeholder="email" required minLength={5} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputemail2"> Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name='password' placeholder="Enter your password"  required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary my-2" > Register</button>
                <a className="btn btn-outline-primary mx-2" href="/login" role='button'>login</a>
            </form>
        </div></div>
    )
}
