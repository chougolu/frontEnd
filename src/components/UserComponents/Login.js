import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';


export const Login = () => {

    const navigate = useNavigate();

    // Empty state.
    const [inputVal, setInputVal] = useState({
        "email": "",
        "password": ""
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
            const res = await axios.post(`http://localhost:4000/login`, inputVal);
            if (res.data.success) {
                setStatus('success');
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                localStorage.setItem('login_status', true);
                localStorage.setItem('user_token', res.data.token);
                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
            } else {
                setStatus('validationError');
                setMessage(res.data.message);
            }
        } catch (error) {
            if (error.response.data.message) {
                setStatus('validationError');
                setMessage(error.response.data.message);
            }
        }
    }
    return (
        <>
            <ToastContainer />
            <div className='main' style={{ padding: "20px" }}>
                <section className="sign-in">
                    <div className="container">
                        <div className="signin-content">
                            <div className="signin-image">
                                <figure><img src="images/signin-image.jpg" alt="sing up image" /></figure>
                                <p>If you are not registered then <a href="/register">register</a> first.</p>
                            </div>
                            <div className="signin-form">
                                <h2 className="form-title">Sign-In</h2>
                                {status === 'validationError' && <p style={{ color: "red", textAlign: "center", fontFamily: "monospace", fontWeight: "bold" }}><AiOutlineCloseCircle className="error-icon" /> {message}</p>}
                                <form className="register-form" id="login-form" onSubmit={formHandler}>
                                    <div className="form-group">
                                        <label htmlFor='your_name'><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="email" name="email" id="user_name" onChange={inputHandler} placeholder="User email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="password" id="your_pass" onChange={inputHandler} placeholder="Password" />
                                    </div>
                                    <div className="form-group form-button">
                                        <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                                        <p style={{ color: "black", float: "right", fontWeight: "bold", marginTop: "7px", textDecoration: "none" }}><a href='forget-password'>Forget password.</a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
