import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export const AddCategory = () => {

    const [inputVal, setInputVal] = useState({
        "name": "",
        "description": ""
    });

    // For message
    const [message, setMessage] = useState(null);

    // For error status
    const [status, setStatus] = useState();

    //Input handler.
    const inputHandler = (event) => {
        const { name, value } = event.target;
        setInputVal({ ...inputVal, [name]: value });
    }

    //Form handler.
    const formHandler = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post('http://localhost:4000/category-add', inputVal);
            if (response.data.success) {
                setStatus('success');
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else{
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
                    Add Category
                </h3>
                {status === 'validationError' && <p style={{ color: "red", textAlign: "center", fontFamily: "monospace", fontWeight: "bold", paddingTop: "15px" }}><AiOutlineCloseCircle className="error-icon" /> {message}</p>}
                <form action="" onSubmit={formHandler}>
                    <div className="form-group">
                        <input type="text" onChange={inputHandler} name='name' placeholder='Name' className="form-control" />
                    </div>
                    <div className="form-group">
                        <textarea name="description" onChange={inputHandler} placeholder='Description' className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Add-Category</button>
                    </div>
                </form>
            </div>
        </>
    )
}
