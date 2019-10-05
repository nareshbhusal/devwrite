import React, { useState } from 'react';
import styles from './Register.module.css';
import { useAlert } from 'react-alert';
import helpers from '../../../helpers/index';
const createUser = helpers.createUser;


const register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const alert = useAlert();

    const handleNameInput = e => {
        setName(e.target.value);
    }
    const handleEmailInput = e => {
        setEmail(e.target.value);
    }
    const handlePasswordInput = e => {
        setPassword(e.target.value);
    }
    const onSubmitHandler = async e => {
        e.preventDefault();
        createUser({ name, email, password }, alert);
    }

    return (
        <form onSubmit={onSubmitHandler} className={styles.form}>
            <h1 className={styles.heading}>
                Create account!
            </h1>
            <input value={name} onChange={handleNameInput} className={styles.input} name="name" type="text" placeholder="Full name"/>
            <input value={email} onChange={handleEmailInput} className={styles.input} name="email" type="email" placeholder="Email address"/>
            <input value={password} onChange={handlePasswordInput} className={styles.input} name="password" type="password" placeholder="Password" />
            <input className={styles.input} type="submit" value="Register"/>
        </form>
    );
}

export default register;