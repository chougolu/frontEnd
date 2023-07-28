import React, { useEffect, useState } from 'react'
import '../../css/ProductDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductDetails = () => {

  const navigate = useNavigate();

  const id = useParams();

  //create a array.
  const [arr, setArr] = useState([]);

  //Get products data from db.
  useEffect(() => {
    axios.get(`http://localhost:4000/edit-product/${id.readMoreId}`).then((res) => {
      setArr(res.data.editProductData);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  // Edit.
  const editProduct = (editId) => {
    navigate(`/update-product/${editId}`)
  }

   //Delete Product.
   const deleteProduct = (deleteId) => {
    axios.delete(`http://localhost:4000/delete-product/${deleteId}`).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() => {
          navigate('/show-products');
        }, 1500);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="content">

        <div className="image">
          <img src={`http://localhost:4000/${arr.productImg}`} alt="" className='img-flued' />
        </div>

        <div className="data">
          <h4>Product name : {arr.name}</h4>
          <h5>Product discription : {arr.description}.</h5>
          <h6>Price : {arr.price} /-</h6>
          <h6>SKU : {arr.SKU} </h6>
          <button onClick={() => deleteProduct(arr.id)} className="btn btn-danger">Delete</button> &nbsp;
          <button onClick={() => editProduct(arr.id)} className="btn btn-success">Edit</button>
        </div>

      </div>
    </>
  )
}
