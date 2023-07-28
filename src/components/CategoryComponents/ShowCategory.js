import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShowCategory = () => {

    const navigate = useNavigate();

    const [totalRecord, setTotalRecord] = useState(0)
    const [limit, setLimit] = useState(2);
    const [page, setPage] = useState([]);
    const [activePage, setActivePage] = useState(1);


    // For page calculate
    const totalPageCalculate = (totalRecord, limit) => {
        const totalPages = Math.ceil(totalRecord / limit);
        const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
        setPage(pages);
        console.log(pages,"pages");

    };

    useEffect(() => {
        totalPageCalculate(totalRecord, limit);
    }, [totalRecord, limit]);


    // Create an array to manage category.
    const [arr, setArr] = useState([]);

    const [del, setDel] = useState()

    // Delete...
    const deleteCategory = (deleteId) => {
        axios.delete(`http://localhost:4000/category-delete/${deleteId}`).then((res) => {
            if (res.data.success) {
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(() => {
                    navigate('/show_category');
                }, 1000);
                setDel(!del)
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    // Get all category.
    useEffect(() => {
        axios.get('http://localhost:4000/category', {
            params: {
                page: activePage,
                limit
            }
        }).then((res) => {
            console.log(res.data);
            setTotalRecord(res.data.totalRecord)
            setLimit(res.data.limit)
            setArr(res.data.allCategoryData)
        }).catch((error) => {
            console.log(error);
        })
    }, [activePage]);

    // Edit...
    const editCategory = (editId) => {
        navigate(`/update_category/${editId}`);
    }

    return (
        <>
            <ToastContainer />
            <div style={{ width: '1200px', margin: 'auto' }}>
                <h3 className="text-center">
                    Show-category
                </h3>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link">Previous</a>
                        </li>
                        {page.map((item, index) => {
                            return (
                                <li key={index} className={`page-item ${item === activePage ? "active" : ""}`}>
                                    <a className="page-link" href="#" onClick={() => setActivePage(item)}>{item}</a>
                                </li>
                            );
                        })}
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>

                <div className="row">
                    {arr.map((item, index) => {
                        return (
                            <div className="col-sm-3" key={index}>
                                <div className="card mb-3" style={{ fontFamily: " 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", height: '200px' }}>
                                    <div className="card-header">
                                        Name : {item.name}
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-text mb-4">Description : {item.description}</h6>
                                        <button className="btn btn-danger" onClick={() => deleteCategory(item.id)}>Delete</button>
                                        &nbsp;
                                        <button className="btn btn-success" onClick={() => editCategory(item.id)}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div >
        </>
    )
}
