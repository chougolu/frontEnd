import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export const UpdateCategory = () => {

    const id = useParams();

    const navigate = useNavigate();

    // For message
    const [message, setMessage] = useState(null);
    const [arr, setArr] = useState([]);

    // For error status
    const [status, setStatus] = useState();

    const [inputVal, setInputVal] = useState({
        "name": "",
        "description": ""
    });

    //Input handler.
    const inputHandler = (event) => {
        const { name, value } = event.target;
        setInputVal({ ...inputVal, [name]: value });
    }

    //Form handler.
    const formHandler = (event) => {
        event.preventDefault();
        axios.patch(`http://localhost:4000/category-update/${id.editId}`, inputVal).then((res) => {
             if (res.data.success) {
                 setStatus('success');
                 toast.success(res.data.message, {
                     position: toast.POSITION.TOP_RIGHT
                 });
             } else {
                 setStatus('validationError');
                 toast.error(res.data.message, {
                     position: toast.POSITION.TOP_RIGHT
                 });
             }
             setTimeout(() => {
                 navigate(`/show_category`);
             }, 1500);
        }).catch((error) => {
            if (error.response.data.message) {
                setStatus('validationError');
                setMessage(error.response.data.message);
            } else {
                console.log(error);
            }
        })
    }

    // Get category.
    useEffect(() => {
        axios.get(`http://localhost:4000/category-edit/${id.editId}`).then((res) => {
            setArr(res.data.singleCategoryData)
            setInputVal({'name':res.data.singleCategoryData.name,'description':res.data.singleCategoryData.description});
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <>
            <ToastContainer />
            <div className='container p-4 mt-3'>
                <h3 className="text-center">
                    Edit-Category
                </h3>
                {status === 'validationError' && <p style={{ color: "red", textAlign: "center", fontFamily: "monospace", fontWeight: "bold", paddingTop: "15px" }}><AiOutlineCloseCircle className="error-icon" /> {message}</p>}
                <form action="" onSubmit={formHandler}>
                    <div className="form-group">
                        <input type="text" onChange={inputHandler} name='name' defaultValue={inputVal.name} placeholder='Name' className="form-control" />
                    </div>
                    <div className="form-group">
                        <textarea name="description" onChange={inputHandler} placeholder='Description' defaultValue={inputVal.description} className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}

