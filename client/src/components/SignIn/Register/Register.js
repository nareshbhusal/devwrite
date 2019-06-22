import React from 'react';
import styles from './Register.module.css';

import { createUser } from '../../../helpers/index';

class Register extends React.Component{

    state = {
        name: '',
        email: '',
        password:''
    }

    onSubmitHandler = async(e) => {
        e.preventDefault();
        await createUser(this.state);
        
    }

    onChangeHandler = async (e) => {
        const { name, value } = e.target;
        await this.setState({ [name]: value });
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler} className={styles.form}>
                <h1 className={styles.heading}>
                    Create account!
                </h1>
                <input value={this.state.name} onChange={this.onChangeHandler} className={styles.input} name="name" type="text" placeholder="Full name"/>
                <input value={this.state.email} onChange={this.onChangeHandler} className={styles.input} name="email" type="email" placeholder="Email address"/>
                <input value={this.state.password} onChange={this.onChangeHandler} className={styles.input} name="password" type="password" placeholder="Password" />
                <input className={styles.input} type="submit" value="Register"/>
            </form>
        );
    }
}

export default Register;