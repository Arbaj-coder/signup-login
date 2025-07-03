import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');
    setTimeout(() => {
      navigate('/login');
    }, 1000)
  }

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:8080/products';
      const token = localStorage.getItem('token');

      const response = await fetch(url, {
        method: 'GET', // optional, since GET is default
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          Array.isArray(products) && products.map((item, index) => (
            <ul key={index}>
              <span>{item.name} : {item.price}</span>
            </ul>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home