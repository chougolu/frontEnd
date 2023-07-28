import React, { useState } from 'react'
import '../../css/Forget-password.css'
import axios from 'axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export const ForgetPassword = () => {

    const navigate = useNavigate();


    // Empty state
    const [inputval, setInputVal] = useState({
        "email": ""
    });

    // For message
    const [message, setMessage] = useState(null);

    // For error status
    const [status, setStatus] = useState();

    // Input handler
    const inputHandler = (event) => {
        setInputVal({ ...inputval, [event.target.name]: event.target.value });
    }

    // Form handler
    const formHandler = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post('http://localhost:4000/forget-password', inputval);
            if(res.data.success){
                setStatus('success')
                setMessage(res.data.message);
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            }

        } catch (error) {
            if(error.response.data.message){
                setStatus('validationError')
                setMessage(error.response.data.message);
            }
        }
    }
    return (
        <div id='card' className="card">
            <div className="card-body">
                <h5 className="card-title">Forgot-password</h5>
                <p className="card-text" style={{color:"black"}}>If you forgot your password please enter your registerd email and get a new password for login.</p>
                <form onSubmit={formHandler}>
                    <div className="form-row align-items-center">
                        <div className="col-sm-10 my-1">
                            <label className="sr-only" htmlFor="inlineFormInputName">Name</label>
                            <input type="email" className="form-control" name='email' defaultValue={inputval.email} id="inlineFormInputName" onChange={inputHandler} placeholder="Enter your email" />
                        </div>
                        <div className="col-auto my-1">
                            <button type="submit" className="btn btn-primary">Send</button>
                        </div>
                    </div>
                    {status === 'validationError' && <p style={{ color: "red", textAlign: "center", fontFamily: "monospace", fontWeight: "bold" }}><AiOutlineCloseCircle className="error-icon" /> {message}</p>}
                    {status === 'success' && <p style={{ color: "green", textAlign: "center", fontFamily: "monospace", fontWeight: "bold" }}><FaCheckCircle className="success-icon" /> {message}</p>}
                </form>
            </div>
        </div>
    )
}
