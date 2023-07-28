import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResetPassProtected = (props) => {
    const navigate = useNavigate();
    const { ResetPassword } = props;

    useEffect(() => {
        const loginStatus = localStorage.getItem('login_status');
        if (loginStatus == "false") {
            navigate('/register');
        }
    });

    return (
        <>
            <ResetPassword />
        </>
    );
};
