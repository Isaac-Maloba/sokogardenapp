import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {
  // Introduce the hooks
  const [product_name, setProoductName] = useState("");
  const [product_description, setProductDesription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  // Declare the hooks to manage the state of your application
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Create a function that will handle the submit action
  const handleSubmit = async (e) => {   // An asynchronous anonymous arrow function
    // Prevent the site form reloading
    e.preventDefault()
    // Set the loading hook with a message/ activate thr loader
    setLoading(true)

    try{
      // Create a form data
      const formdata = new FormData()
      // Append the details to te form data created
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo)

      // Interact with axios to hel you use the methid post
      const response = await axios.post("https://maloba.alwaysdata.net/api/add_product", formdata)

      // Set the loading hook back to default
      setLoading(false);

      // Update the success hook with a message
      setSuccess(response.data.message)

      // Clear the hooks/set them back to default
      setProoductName("");
      setProductDesription("");
      setProductCost("");
      setProductPhoto("");

      e.target.reset()

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
    catch(error) {
      // Set the loading hook back to default
      setLoading(false);
      // Update the setErroe hook with a message
      setError(error.message)
    }
  }
  return (
    <div className='row justify-content-center mt-4'>
        <div className="col-md-6 p-4 card shadow">
          <h2 className='text-primary'>Add a Product</h2>

          {/* Bind the loading hook */}
          {loading && <Loader/>} <br />

          <h3 className="text-success">{success}</h3>
          <h3 className="text-danger">{error}</h3>

          <form onSubmit={handleSubmit}>
            <input type="text"
            placeholder='Product Name'
            className='form-control'
            required
            value={product_name}
            onChange={(e) => setProoductName(e.target.value)}/> <br />
            {/* {product_name} */}
            <input type="text"
            placeholder='Product Description'
            className='form-control'
            required
            value={product_description}
            onChange={(e) => setProductDesription(e.target.value)}/> <br />
            {/* {product_description} */}
            <input type="number"
            placeholder='Product Cost'
            className='form-control'
            required
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}/> <br />
            {/* {product_cost} */}
            <label>Upload the Product Photo</label> <br />
            <input type="file"
            className='form-control'
            required
            accept='image/*'
            onChange={(e) => setProductPhoto(e.target.files[0])}/> <br />

            <input type="submit"
            value="Add Product"
            className='btn btn-primary'/>
          </form>
        </div>
    </div>
  )
}

export default Addproducts;