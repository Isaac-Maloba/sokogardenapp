import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'

export const Makepayment = () => {
    // Destructure the details passed from the Getproducts component
    // The useLocation hook allows us to destructure the properties passed from the previous component
    const { product } = useLocation().state || {}
    // console.log("The details passed from get products are: ",product )

    // Declare the Navigate hook
    const navigate = useNavigate()
    // Below we specify the image base URL
    const img_url = "https://maloba.alwaysdata.net/static/images/"

    // Initialize hooks to manage the states of your application
    const [number, setNumber] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Create a function that will handle the submit action
    const handlesubmit = async (e) => {
        // Prevent the site from reloading
        e.preventDefault()

        // Update the loading hook
        setLoading(true)

        try {
            // Create a form data object
            const formdata = new FormData()

            // Append the data to the formdata
            formdata.append("phone", number)
            formdata.append("amount", product.product_cost)

            const response = await axios.post("https://maloba.alwaysdata.net/api/mpesa_payment", formdata)

            // Set loading back to default
            setLoading(false)

            // Update the success hook with a message
            setSuccess(response.data.message)
        }
        catch (error) {
            // If there is an error, respond to the error
            // Set loading back to default
            setLoading(false)
            // Update the error hook with a message
            setLoading(error.message)
        }
    }


    return (
        <div className='row justify-content-center '>
            {/* <button className='btn btn-outline-primary'>Back to Products</button> */}
            <h1 className="text-success">Make Payment - Lipa na M-Pesa</h1>

            {/* Back button */}
            <div className="col-md-1">
                <input type="button"
                    value="<- Back"
                    className='btn btn-primary'
                    onClick={() => navigate("/")} />
            </div>
            <div className="col-md-8 card shadow p-4">
                <img src={img_url + product.product_photo} alt="product photo" className='product_img' />
                <div className="card-body">
                    <h2 className="text-warning"> {product.product_name} </h2>
                    <p className="text-black">{product.product_description}</p>
                    <h3 className="text-danger">{product.product_cost}</h3>

                    <form onSubmit={handlesubmit}>

                        {/* Bind the loading hook */}
                        {loading && <Loader />} <br />

                        <h3 className="text-success">{success}</h3>
                        <h3 className="text-danger">{error}</h3>
                        <input type="tel"
                            placeholder='Enter your M-Pesa Phone Number 2547XXXXXXXX'
                            className='form-control'
                            required
                            onChange={(e) => setNumber(e.target.value)} /> <br />
                        {/* {number} */}

                        <input type="submit"
                            value="Make Payment"
                            className='btn btn-success form-control' />
                    </form>
                </div>
            </div>
        </div>
    )
}
