import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Navbar.css';

export const Navbar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('user_token');

    const logOut = () => {
        localStorage.removeItem('user_token');
        localStorage.setItem('login_status', false);
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">E-commerce</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {/* <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li> */}
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li> 
                        <li className="nav-item active">
                            <Link className="nav-link" to="/show-products">Products <span className="sr-only">(current)</span></Link>
                        </li> 
                        <li className="nav-item active">
                            <Link className="nav-link" to="/add-product">Add-Product <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                Category
                            </Link>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/add_category">Add-Category</Link>
                                <Link className="dropdown-item" to="/show_category">Show Category</Link>
                            </div>
                        </li>
                        {(token != null) ?
                            <li className="nav-item active">
                                <a id='anchor' className="nav-link" onClick={() => logOut()}>Logout <span className="sr-only">(current)</span></a>
                            </li> :
                            <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/register">Register <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
                                </li>
                            </>}
                        <li className="nav-item active">
                            <Link className="nav-link" to="/profile">Profile <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
