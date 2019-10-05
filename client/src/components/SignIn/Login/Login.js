import React, { useState } from 'react';
import styles from './Login.module.css';

import helpers from '../../../helpers/index';
const loginUser = helpers.loginUser;

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInput = e => {
        setEmail(e.target.value);
    }
    const handlePasswordInput = e => {
        setPassword(e.target.value);
    }
    onSubmitHandler = async(e) => {
        e.preventDefault();
        loginUser(this.state);
    }

    return (
        <form onSubmit={onSubmitHandler} className={styles.form}>
            <h1 className={styles.heading}>
                Welcome back!
            </h1>
            <input value={email} onChange={handleEmailInput} className={styles.input} name="email" type="email" placeholder="Email address"/>
            <input value={password} onChange={handlePasswordInput} className={styles.input} name="password" type="password" placeholder="Password" />
            <input className={styles.input} type="submit" value="Login"/>
        </form>
    );
}

export default login;