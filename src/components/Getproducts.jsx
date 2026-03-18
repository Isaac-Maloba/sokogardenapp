import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';

const Getproducts = () => {
  // Initialize the hooks to help you manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Below we specify the image base URL
  const img_url = "https://maloba.alwaysdata.net/static/images/"

  // Create a function to help you fetch the products from your API database
  const fetchProducts = async () => {
    try {
      // Update the loading hook
      setLoading(true)

      // Interact with your endpoint for fetching the products
      const response = await axios.get("https://maloba.alwaysdata.net/api/get_products")

      // Update the products hook with the response given from the API
      setProducts(response.data)

      // Set the loading hook back to default
      setLoading(false)
    }
    catch (error) {
      // If there is an error:
      //   1. Set the loading hook back to default
      setLoading(false)
      //   2. Update the roor hook with a message
      setError(error.message)
    }
  }

  // We shall use the useEffect hook that automatically re-renders new features in case of any changes
  useEffect(() => {
    fetchProducts()
  }, [])

  // console.log("The products fetched are", products)

  return (
    <div className='row'>
      <h3 className="text-primary">Available Products</h3>
      {loading && <Loader />}
      <h4 className="text-danger">{error}</h4>

      {/* Map the products fetched from the API to the user interface */}
      {products.map((product) => (
        <div className="col-md-3 justify-content-center mb-3">
        <div className="card shadow">
          <img src={img_url + product.product_photo}
            alt="product name"
            className='product_img mt-3' />
          <div className="card-body">
            <h5 className="text-primary">{product.product_name}</h5>
            <p className="text-dark">{product.product_description.slice(0, 50)}...</p>
            <h4 className="text-success">KES {product.product_cost}</h4>
          </div>
        </div>

      </div>
      ))}

    </div>
  )
}

export default Getproducts;