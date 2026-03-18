import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
    // Initialize the hooks
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhoneNumber] = useState("");

    // Define the three states the application will move through:
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Below is a function that will handle the submit action
    const handleSubmit = async (e) => {
        // Below we prevent our site from reloading
        e.preventDefault()
        // Update our loading hook with a message that will be displayed to the user who is trying to register
        setLoading("Please wait. Registration in progress...")

        try {
            // Create a form data object that will enale you to capture the form details entered on the form
            const formdata = new FormData();
            // Insert the four details (username, email, password, phone) in terms of key-value pairs
            formdata.append("username", username);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("phone", phone);

            // By use of axios, we can access the method post
            const response = await axios.post("https://maloba.alwaysdata.net/api/signup", formdata)
            // Set back the loading hook to default
            setLoading("");
            // In case everything goes well, update the success hook with a message
            setSuccess(response.data.message)
            // Clear your hooks
            setUsername("");
            setEmail("");
            setPassword("");
            setPhoneNumber("");

            setTimeout(() => {
                setSuccess("");
            }, 5000);

        }
        catch (error) {
            // Set loading back to default
            setLoading("");
            // Update the error hook with the message given back from the response
            setError(error.message)
        }
    }

    return (
        <div className='row justify-content-center mt-4'>
            <div className="card col-md-6 shadow p-4">
                <h1 className='text-primary'>Sign Up</h1>
                <h5 className="text-info">{loading}</h5>
                <h5 className="text-success">{success}</h5>
                <h5 className="text-danger">{error}</h5>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter your Username' className='form-control'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} required /> <br />

                    {/* {username} */}

                    <input type="email" placeholder='Enter your Email Address' className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required /> <br />

                    {/* {email} */}

                    <input type="password" placeholder='Enter you Password' className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required /> <br />

                    {/* {password} */}

                    <input type="tel" placeholder='Enter your Phone Number' className='form-control'
                        value={phone}
                        onChange={(e) => setPhoneNumber(e.target.value)} required /> <br />

                    {/* {phonenumber} */}

                    <input type="submit" value="Sign Up" className='btn btn-primary' />
                    <br /><br />

                    Already have an account? <Link to={'/signin'}>Signin</Link>

                </form>
            </div>
        </div>
    )
}

export default Signup;

// Research on Axios module in ReactJS