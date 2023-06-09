import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


const Register = () => {
  const [inputs, setInputs] =useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]:e.target.value }))
  }

  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login")
    } catch(err) {
      setErr(err.response.data);
    }
  }

  return (
    <div className='auth'>
        <div className="wrapper">
            <h1>REGISTER</h1>
            <form>
                <input type="text" placeholder='username' name="username" onChange={handleChange} required/>
                <input type="text" placeholder='email' name='email' onChange={handleChange} required />
                <input type="password" placeholder='password' name="password" onChange={handleChange} required/>
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}
                <span>Do you have an account <Link to="/login">Login</Link></span>
            </form>
        </div>
    </div>
  )
}

export default Register