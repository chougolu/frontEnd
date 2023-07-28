import React, { useEffect, useState } from 'react'
import '../css/Product.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const navigate = useNavigate();

    //Create a array.
    const [arr, setArr] = useState([])

    //Get products data from db.
    useEffect(() => {
        axios.get('http://localhost:4000/get-products').then((res) => {
            setArr(res.data.allProductsData);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    //Read more....
    const readMore = (readMoreId) => {
        navigate(`/product-details/${readMoreId}`);
    }

    return (
        <>
            <div className='product_container'>
                <div className="row">
                    {arr.map((item, index) => {
                        return (
                            <div className="col-sm-3 mt-4" key={index}>
                                <div className=" product-card card mb-2" style={{ width: '230px', height: '420px' }} >
                                    <img id='productImg' src={`http://localhost:4000/${item.productImg}`} style={{ width: '100%', height: '230px' }} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name.slice(0, 7)}...</h5>
                                        <h6 className="card-text">{item.description.slice(0, 15)}...</h6>
                                        <p style={{ color: 'red', fontWeight: 'bold' }} className="card-text">{item.price} /-</p>
                                        <button onClick={() => readMore(item.id)} href="#" className="btn btn-primary mt-2">Read more..</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

