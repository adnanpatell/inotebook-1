import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"", password:"", cpassword:""})
    let history = useNavigate();
    const handleSubmit=async (e)=>{

        e.preventDefault();
        const {name, email,password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
          
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({name,email,password})
          });
          const json= await response.json()
          console.log(json)

            //save the auth token & redirect
            if(json.success){
            localStorage.setItem('token', json.authtoken);
            history('/')     
            props.showAlert("Account Created Successfully!", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }     
          
    }
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label" >Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name"  onChange={onchange} />
    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onchange} />
    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onchange} minlength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onchange}  minlength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
