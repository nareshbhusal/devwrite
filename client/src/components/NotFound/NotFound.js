import React from 'react';
import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

const notFound = () => {
    return (
        <div>
            404: Invalid URL
            <br></br>
            Go <Link to="/">Home</Link>
        </div>
    )
}

export default notFound;