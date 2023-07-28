import React, { useEffect, useState } from 'react'
import '../../css/Product.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShowProduct = () => {

    const navigate = useNavigate();

    const [dataStatus, setDataStatus] = useState('true')

    // Create an array.
    const [arr, setArr] = useState([])

    // Create an array
    const [category, setCategory] = useState([]);

    //Get products data from db.
    const getProducts = () => {
        axios.get('http://localhost:4000/get-products').then((res) => {
            setArr(res.data.allProductsData);
            setDataStatus(true);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getProducts();
    }, [])

    //Get product category.
    useEffect(() => {
        axios.get('http://localhost:4000/product-category').then((res) => {
            setDataStatus(true);
            setCategory(res.data.productCategoryData);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    //Read more....
    const readMore = (readMoreId) => {
        navigate(`/product-details/${readMoreId}`);
    }

    // Filter by category
    const filterByCategory = (categoryId) => {
        axios.get(`http://localhost:4000/get-products-by-category/${categoryId}`).then((res) => {
            if (res.data.success) {
                setDataStatus(true);
                setArr(res.data.findProductByCategoryData); // Update the 'arr' state with the filtered products.
            } else {
                setDataStatus(false);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            <ToastContainer />
            <div className='product_container'>
                <div className="d-flex justify-content-center">
                    <div className="btn-group dropright">
                        <button style={{ backgroundColor: "#a4c6e0", color: "black", border: "none" }} type="button" className="btn btn-secondary dropdown-toggle mt-2" data-toggle="dropdown" aria-expanded="false">
                            Category
                        </button>
                        <div className="dropdown-menu">
                            {category.map((item, index) => {
                                return <a className="dropdown-item" onClick={() => filterByCategory(item.id)} key={index}>{item.name}</a>;
                            })}
                        </div>
                    </div>
                </div>

                {
                    dataStatus === true ? <div className="row">
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
                    </div> :
                        (<><h2 className='text-center'> Data not found. </h2>
                            <div className="d-flex justify-content-center">
                                <button onClick={() => getProducts()} className='btn btn-primary'>Show all products</button>
                            </div>
                        </>)
                }
            </div>
        </>
    )
}

