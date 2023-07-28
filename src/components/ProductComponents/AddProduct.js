import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export const AddProduct = () => {

    const [arr, setArr] = useState([]);

    // For message
    const [message, setMessage] = useState(null);

    // For error status
    const [status, setStatus] = useState();

    const [inputVal, setInputVal] = useState({
        "product_category_id": "",
        "name": "",
        "description": "",
        "SKU": "",
        "price": "",
        "productImg": "",
    })

    //Input handler.
    const inputHandler = (event) => {
        const { name, value } = event.target;
        setInputVal({ ...inputVal, [name]: value });
    }

    // File handler
    const fileHandler = (event) => {
        setInputVal({ ...inputVal, 'productImg': event.target.files[0] })
    }

    //Form handler.
    const formHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('product_category_id', inputVal.product_category_id);
        formData.append('name', inputVal.name);
        formData.append('description', inputVal.description);
        formData.append('SKU', inputVal.SKU);
        formData.append('price', inputVal.price);
        formData.append('productImg', inputVal.productImg);
        axios.post('http://localhost:4000/add-product', formData).then((res) => {
            if (res.data.success) {
                setStatus('success');
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch((error) => {
            if (error.response.data.message) {
                setStatus('validationError');
                setMessage(error.response.data.message);
            }
        })
    }

    //Get product category.
    useEffect(() => {
        axios.get('http://localhost:4000/product-category').then((res) => {
            setArr(res.data.productCategoryData);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    
    return (
        <>
            <ToastContainer />
            <div className='container p-4 mt-3'>
                <h3 className="text-center">
                    Add Product
                </h3>
                {status === 'validationError' && <p style={{ color: "red", textAlign: "center", fontFamily: "monospace", fontWeight: "bold", paddingTop: "15px" }}><AiOutlineCloseCircle className="error-icon" /> {message}</p>}
                <form onSubmit={formHandler}>
                    <select onChange={inputHandler} name='product_category_id' aria-readonly required className="form-group form-control" aria-label="Default select example">
                        <option>Select-product-category</option>
                        {arr.map((item, index) => {
                            return (
                                <option key={index} value={item.id}>{item.name}</option>
                            )
                        })}
                    </select>
                    <div className="form-group">
                        <input type="text" onChange={inputHandler} name='name' placeholder='Name' className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={inputHandler} name='description' placeholder='Description' className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="number" onChange={inputHandler} name='SKU' placeholder='SKU' className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="number" onChange={inputHandler} name='price' placeholder='Price' className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="file" className="form-control" onChange={fileHandler} name='productImg' placeholder='Product image' />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Add-Product</button>
                    </div>
                </form>
            </div>
        </>
    )
}
