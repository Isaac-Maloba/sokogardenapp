import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  // Define the two hooks for capturing/storing the user's input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Declare the three additional hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Below is the hook to redirect us to another page on successful login
  const navigate = useNavigate()

  // Below is the function to handle the sign in action
  const handlesubmit = async (e) => {
    // Prevent the site form reloading
    e.preventDefault()
    // Update the loading hook with a message
    setLoading("You are being signed in. Kindly be patient...")

    try{
      // Create a formData object that will hold the email and the password
      const formdata = new FormData()
      // Insert/append the email and the password on the formData created
      formdata.append("email", email);
      formdata.append("password", password);
      // Interact with axios for the response
      const response = await axios.post("https://maloba.alwaysdata.net/api/signin", formdata);
      // Set the loading hook back to default
      setLoading("");
      // Check whether the user exists as part of your response
      if(response.data.user){
        // If user is there, definitely the details entered during the signin are correct
        // setSuccess("Login Successful")

        // Store user details in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // If login is successful, the the user nbe redirected to another page
        navigate("/")
      }
      else{
        // If user is not found, that means the credentials entered on the form are incorrect
        setError("Login Failed. Countercheck your credentials and try again")
      }
    }
    catch(error) {
      // Set laoding back to default
      setLoading("");
      //Update the error hook with a message
      setError("Something went wrong. Please try again")
    }
  }

  return (
    <div className='row justify-content-center mt-4'>
        <div className="col-md-6 card shadow p-4">
          <h1 className='text-primary'>Sign In</h1>
          <h5 className='text-info'>{loading}</h5>
          <h5 className="text-success">{success}</h5>
          <h5 className="text-danger">{error}</h5>

          <form onSubmit={handlesubmit}>
            <input type="email"
            placeholder='Enter your Email Address'
            className='form-control'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}/> <br />

            {/* {email} */}

            <input type="password"
            placeholder='Enter your Password'
            className='form-control'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}/> <br />

            {/* {password} */}

            <input type="submit"
            value="Signin"
            className='btn btn-primary'/> <br />

            Don't have an account? <Link to={'/signup'}>Sign Up</Link>
          </form>
        </div>
    </div>
  )
}

export default Signin;