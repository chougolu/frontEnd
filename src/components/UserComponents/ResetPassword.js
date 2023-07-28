import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export const ResetPassword = () => {

    const id = useParams();

    const navigate = useNavigate();

    // For message
    const [message, setMessage] = useState(null);

    // For error status
    const [status, setStatus] = useState();

    // Empty status
    const [inputVal, setInputVal] = useState({
        "newPassword": ""
    });

    // Input handler
    const inputHandler = (event) => {
        setInputVal({ ...inputVal, [event.target.name]: event.target.value });
    }

    // Form handler
    const formHandler = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post(`http://localhost:4000/auth/update-password/${id.id}`, inputVal);
            if (res.data.success) {
                setStatus('success')
                setMessage(res.data.message);
                setTimeout(() => {
                    navigate('/profile')
                }, 2000);
            } else {
                setStatus('validationError')
                setMessage(res.data.message);
            }
        } catch (error) {
            if (error.response.data.message) {
                setStatus('validationError')
                setMessage(error.response.data.message);
            }
        }
    }
    return (
        <div  style={{width:"500px", margin:"auto" }} className="card">
            <div className="card-body">
                <h5 className="card-title">Reset-password</h5>
                <p className="card-text" style={{ color: "black" }}>If you want to reset your current password, Please enter a new password.</p>
                <form onSubmit={formHandler}>
                    <div className="form-row align-items-center">
                        <div className="col-sm-10 my-1">
                            <input type="password" className="form-control" name='newPassword' defaultValue={inputVal.newPassword} id="inlineFormInputName" onChange={inputHandler} placeholder="Enter your new password" />
                        </div>
                        <div className="col-auto my-1">
                            <button type="submit" className="btn btn-primary">Reset</button>
                        </div>
                    </div>
                    {status === 'validationError' && <p style={{ color: "red", textAlign: "center", fontFamily: "monospace", fontWeight: "bold" }}><AiOutlineCloseCircle className="error-icon" /> {message}</p>}
                    {status === 'success' && <p style={{ color: "green", textAlign: "center", fontFamily: "monospace", fontWeight: "bold" }}><FaCheckCircle className="success-icon" /> {message}</p>}
                </form>
            </div>
        </div>
    )
}
