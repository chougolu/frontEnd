import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfileUpProtected = (props) => {
    const navigate = useNavigate();
    const { ProfileUpdate } = props;

    useEffect(() => {
        const loginStatus = localStorage.getItem('login_status');
        if (loginStatus == "false") {
            navigate('/register');
        }
    });

    return (
        <>
            <ProfileUpdate />
        </>
    );
};
