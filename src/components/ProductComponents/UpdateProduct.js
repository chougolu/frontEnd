import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateProduct = () => {

  const navigate = useNavigate();

  const id = useParams();

  const [arr, setArr] = useState([]);


  const [isImg, setisImg] = useState('oldImg');

  //Empty state.
  const [inputVal, setInputVal] = useState({
    "product_category_id": "",
    "name": "",
    "description": "",
    "SKU": "",
    "price": "",
    "productImg": "",
  });

  // Get profile data.
  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/edit-product/${id.editId}`);
      setInputVal(res.data.editProductData);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  // FileReader for displaying image preview
  const reader = new FileReader();
  reader.onloadend = () => {
    setisImg(reader.result);
  };

  // For message
  const [message, setMessage] = useState(null);

  // For error status
  const [status, setStatus] = useState();

  // File handler
  const fileHandler = (event) => {
    if (event.target.files[0]) {
      setisImg('newImg'); // Show the new image preview
      setInputVal({ ...inputVal, "productImg": event.target.files[0] });

      // Read the file to show the preview
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  //Input handler
  const inputHandler = (event) => {
    setInputVal({ ...inputVal, [event.target.name]: event.target.value });
  }

  //Get product category.
  useEffect(() => {
    axios.get('http://localhost:4000/product-category').then((res) => {
      setArr(res.data.productCategoryData);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  //Form handler
  const formHandler = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append('product_category_id', inputVal.product_category_id);
      formData.append('name', inputVal.name);
      formData.append('description', inputVal.description);
      formData.append('SKU', inputVal.SKU);
      formData.append('price', inputVal.price);
      formData.append('productImg', inputVal.productImg);

      const response = await axios.patch(`http://localhost:4000/update-product/${id.editId}`, formData);
      if (response.data.success) {
        setStatus('success');
        toast.success(response.data.message, {
          position: "top-right"
        });
        setTimeout(() => {
          navigate(`/product-details/${id.editId}`)
        }, 2000);
      } else {
        setStatus('validationError');
        setMessage(response.data.message);
      }
    } catch (error) {
      if (error.response.data.message) {
        setStatus('validationError');
        setMessage(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  }
  return (
    <>
      <ToastContainer />
      <div className='container p-4 mt-3'>
        <h3 className="text-center">
          Edit Product
        </h3>
        {status === 'validationError' && <p style={{ color: "red", textAlign: "center", fontFamily: "monospace", fontWeight: "bold", paddingTop: "15px" }}><AiOutlineCloseCircle className="error-icon" /> {message}</p>}
        <form action="" onSubmit={formHandler}>
          <select onChange={inputHandler} name='product_category_id' className="form-group form-control" aria-label="Default select example" defaultValue={inputVal.product_category_id}>
            <option>Select-product-category</option>
            {arr.map((item, index) => {
              return (
                <option key={index} value={item.id}>{item.name}</option>
              )
            })}
          </select>
          <div className="form-group">
            <input type="text" onChange={inputHandler} name='name' placeholder='Name' defaultValue={inputVal.name} className="form-control" />
          </div>
          <div className="form-group">
            <input type="text" onChange={inputHandler} name='description' defaultValue={inputVal.description} placeholder='Description' className="form-control" />
          </div>
          <div className="form-group">
            <input type="number" onChange={inputHandler} name='SKU' placeholder='SKU' defaultValue={inputVal.SKU} className="form-control" />
          </div>
          <div className="form-group">
            <input type="number" onChange={inputHandler} name='price' defaultValue={inputVal.price} placeholder='Price' className="form-control" />
          </div>
          <div className="form-group">
            <input type="file" className="form-control" onChange={fileHandler} placeholder='Profile image' />
            {isImg == 'oldImg' ? <img style={{ width: "80px", height: "70px" }} src={`http://localhost:4000/${inputVal.productImg}`} className='img-fluid' alt="" />
              :
              <img style={{ width: "80px", height: "70px" }} src={isImg} className='img-fluid' alt="" />}
          </div>
          <div className="form-group">
            <button className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </>
  )
}
