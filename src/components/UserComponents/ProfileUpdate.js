import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import defaultImg from '../../../src/prrrr.png';
import { useNavigate } from 'react-router-dom';

export const ProfileUpdate = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('user_token');

    const config = {
        headers: { Authorization: token }
    };

    const [isImg, setisImg] = useState('oldImg');

    //Empty state.
    const [inputVal, setInputVal] = useState({
        "email": "",
        "firstName": "",
        "mobile": "",
        "lastName": "",
        "address_line_1": "",
        "city": "",
        "address_line_2": "",
        "country": "",
        "telephone": "",
        "password": "",
        "postal_code": "",
        "profileImg": ""
    });

    // Get profile data.
    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/auth/profile', config);
            setInputVal({
                "email": res.data.combinedData.userData.email,
                "firstName": res.data.combinedData.userData.firstName,
                "mobile": res.data.combinedData.userAddressData.mobile,
                "lastName": res.data.combinedData.userData.lastName,
                "address_line_1": res.data.combinedData.userAddressData.address_line_1,
                "city": res.data.combinedData.userAddressData.city,
                "address_line_2": res.data.combinedData.userAddressData.address_line_2,
                "country": res.data.combinedData.userAddressData.country,
                "telephone": res.data.combinedData.userData.telephone,
                "password": res.data.combinedData.userData.password,
                "profileImg": res.data.combinedData.userData.profileImg,
                "postal_code": res.data.combinedData.userAddressData.postal_code,
            });
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
            setInputVal({ ...inputVal, "profileImg": event.target.files[0] });

            // Read the file to show the preview
            reader.readAsDataURL(event.target.files[0]);
        }
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
            const response = await axios.patch(`http://localhost:4000/auth/profile-update`, formData, config);
            if (response.data.message === "Mobile and telephone number should be separate.") {
                setStatus('validationError');
                setMessage(response.data.message);
            } else if (response.data.message === 'Email or Mobile or Telephone is already exists.') {
                setStatus('validationError');
                setMessage(response.data.message);
            } else if(response.data.success){
                setStatus('success');
                toast.success(response.data.message, {
                    position: "top-right"
                });
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
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
            <div className="container mt-2">
                <h3 className="text-center">Edit profile !</h3>
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
                                <textarea name="address_line_1" className='form-control' defaultValue={inputVal.address_line_1} onChange={inputHandler} placeholder='Address line 1'></textarea>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" defaultValue={inputVal.city} onChange={inputHandler} placeholder='City' name='city' />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group mt-4">
                                <textarea name="address_line_2" className='form-control' defaultValue={inputVal.address_line_2} onChange={inputHandler} placeholder='Address line 2'></textarea>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" defaultValue={inputVal.country} onChange={inputHandler} placeholder='Country' name='country' />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input type="number" className="form-control mt-4" defaultValue={inputVal.telephone} onChange={inputHandler} placeholder='Telephone' name='telephone' />
                            </div>
                            <div className="form-group ">
                                <input type="hidden" className="form-control" defaultValue={inputVal.password} onChange={inputHandler} placeholder='Password' name='password' />
                            </div>
                            <div className="form-group">
                                <input type="file" className="form-control" onChange={fileHandler} placeholder='Profile image' />
                                {isImg == 'oldImg' ? ( inputVal.profileImg == "" ? <img style={{ width: "80px", height: "70px" }} src={defaultImg} className='img-fluid' alt="" /> : <img style={{ width: "80px", height: "70px" }} src={`http://localhost:4000/${inputVal.profileImg}`} className='img-fluid' alt="" />) 
                                    :
                                    <img style={{ width: "80px", height: "70px" }} src={isImg} className='img-fluid' alt="" />}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group mt-4">
                                <input type="number" className="form-control" defaultValue={inputVal.postal_code} onChange={inputHandler} placeholder='Postal code' name='postal_code' />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}