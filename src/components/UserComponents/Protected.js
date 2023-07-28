import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Protected = (props) => {
    const navigate = useNavigate();
    const { RegisterCmnt } = props;

    useEffect(() => {
        const loginStatus = localStorage.getItem('login_status');
        if (loginStatus == "true") {
            navigate('/profile');
        }
    });

    return (
        <>
            <RegisterCmnt />
        </>
    );
};
