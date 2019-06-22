import React from 'react';
import styles from './Login.module.css';

import { loginUser } from '../../../helpers/index';

class Login extends React.Component{

    state = {
        email: '',
        password:''
    }

    onSubmitHandler = async(e) => {
        e.preventDefault();
        loginUser(this.state);
    }

    onChangeHandler = async (e) => {
        const { name, value } = e.target;
        await this.setState({ [name]: value });
    }

    render() {

        return (
            <form onSubmit={this.onSubmitHandler} className={styles.form}>
                <h1 className={styles.heading}>
                    Welcome back!
                </h1>
                <input value={this.state.email} onChange={this.onChangeHandler} className={styles.input} name="email" type="email" placeholder="Email address"/>
                <input value={this.state.password} onChange={this.onChangeHandler} className={styles.input} name="password" type="password" placeholder="Password" />
                <input className={styles.input} type="submit" value="Login"/>
            </form>
        );
    }
}

export default Login;