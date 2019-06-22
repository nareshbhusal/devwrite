import React from 'react';
import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

const logo = () => {
    return (
        <Link to="/" className={styles.logo}>
            DevWrite
        </Link>
    );
}

export default logo;