import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlineCloseCircle } from 'react-icons/ai';

export const Register = () => {

    //Empty state.
    const [inputVal, setInputVal] = useState({
        "email": "",
        "firstName": "",
        "mobile": "",
        "lastName": "",
        "password": "",
        "address_line_1": "",
        "telephone": "",
        "address_line_2": "",
        "city": "",
        "postal_code": "",
        "country": "",
        "profileImg": ""
    });

    // For message
    const [message, setMessage] = useState(null);

    // For error status
    const [status, setStatus] = useState();

    // File handler
    const fileHandler = (event) => {
        setInputVal({ ...inputVal, "profileImg": event.target.files[0] });
    }

    //Input handler
    const inputHandler = (event) => {
        setInputVal({ ...inputVal, [event.target.name]: event.target.value });
    }

    //Form handler
    const formHandler = async (event) => {
        try {
            event.preventDefault();
            const formData = new FormData();
            formData.append('email', inputVal.email);
            formData.append('firstName', inputVal.firstName);
            formData.append('mobile', inputVal.mobile);
            formData.append('lastName', inputVal.lastName);
            formData.append('password', inputVal.password);
            formData.append('address_line_1', inputVal.address_line_1);
            formData.append('telephone', inputVal.telephone);
            formData.append('address_line_2', inputVal.address_line_2);
            formData.append('city', inputVal.city);
            formData.append('postal_code', inputVal.postal_code);
            formData.append('country', inputVal.country);
            formData.append('profileImg', inputVal.profileImg);
            const response = await axios.post(`http://localhost:4000/register`, formData);
            if (response.data.message === "Mobile and telephone number should be separate.") {
                setStatus('validationError');
                setMessage(response.data.message);
            } else if (response.data.message === 'Email or Mobile or Telephone is already exists.') {
                setStatus('validationError');
                setMessage(response.data.message);
            } else {
                setStatus('success');
                toast.success(response.data.message, {
                    position: "top-right"
                });
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
            <div className="container mt-2">
                <h3 className="text-center">Register Here !</h3>
                {status === 'validationError' && <p style={{ color: "red", textAlign: "center", fontFamily: "monospace", fontWeight: "bold", paddingTop: "15px" }}><AiOutlineCloseCircle className="error-icon" /> {message}</p>}
                <form onSubmit={formHandler} className='mt-3 p-4' encType='multipart/form-data'>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input type="text" className="form-control" defaultValue={inputVal.email} onChange={inputHandler} placeholder='Email' name='email' />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" defaultValue={inputVal.firstName} onChange={inputHandler} placeholder='First Name' name='firstName' />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input type="number" className="form-control" defaultValue={inputVal.mobile} onChange={inputHandler} placeholder='Mobile' name='mobile' />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" defaultValue={inputVal.lastName} onChange={inputHandler} placeholder='Last name' name='lastName' />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group mt-4">
                                <input type="password" className="form-control" defaultValue={inputVal.password} onChange={inputHandler} placeholder='Password' name='password' />
                            </div>
                            <div className="form-group">
                                <textarea name="address_line_1" className='form-control' defaultValue={inputVal.address_line_1} onChange={inputHandler} placeholder='Address line 1'></textarea>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input type="number" className="form-control mt-4" defaultValue={inputVal.telephone} onChange={inputHandler} placeholder='Telephone' name='telephone' />
                            </div>
                            <div className="form-group mt-4">
                                <textarea name="address_line_2" className='form-control' defaultValue={inputVal.address_line_2} onChange={inputHandler} placeholder='Address line 2'></textarea>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input type="text" className="form-control mt-4" defaultValue={inputVal.city} onChange={inputHandler} placeholder='City' name='city' />
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" defaultValue={inputVal.postal_code} onChange={inputHandler} placeholder='Postal code' name='postal_code' />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group mt-4">
                                <input type="text" className="form-control" defaultValue={inputVal.country} onChange={inputHandler} placeholder='Country' name='country' />
                            </div>
                            <div className="form-group mt-4">
                                <input type="file" className="form-control" onChange={fileHandler} name='profileImg' placeholder='Profile image' />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group mt-4">
                                <div className="form-group mt-4">
                                    <button className="btn btn-primary">Register</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group mt-4">
                                <p><a href="/login">Login</a> if you are already registered.</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}