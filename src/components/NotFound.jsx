import React from 'react';
import { Link } from 'react-router-dom';
import '@styles/_error.css';

const NotFound = () => {
    return (
        <div className='not_found'>
            <div className='not_found_wrap'>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <Link to={'/dashboard/home'}>go to home</Link>
            </div>
        </div>
    );
};

export default NotFound;