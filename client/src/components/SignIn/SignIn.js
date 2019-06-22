import React from 'react';
import styles from './SignIn.module.css';

import Login from './Login/Login';
import Register from './Register/Register';

class SignIn extends React.Component{
    state = {
        currentForm: 'register'
    }

    registerRef = React.createRef();
    loginRef = React.createRef();

    switchForm = async() => {
        const newForm = this.state.currentForm === 'register' ? 'login' : 'register';
        await this.setState({ currentForm: newForm });
    }

    renderButtonStyling = () => {
        const active = {
            backgroundColor: '#fff',
            cursor: 'default'
        }

        const inActive = {
            backgroundColor: '#ddddde',
            cursor: 'pointer'
        }
        
        const registerStyle = this.registerRef.current.style;
        const loginStyle = this.loginRef.current.style;

        if (this.state.currentForm==='register') {
            registerStyle.backgroundColor = active.backgroundColor;
            registerStyle.cursor = active.cursor;

            loginStyle.backgroundColor = inActive.backgroundColor;
            loginStyle.cursor = inActive.cursor;

        } else {
            loginStyle.backgroundColor = active.backgroundColor;
            loginStyle.cursor = active.cursor;

            registerStyle.backgroundColor = inActive.backgroundColor;
            registerStyle.cursor = inActive.cursor;
        }
    }

    componentDidUpdate(){
        this.renderButtonStyling();
    }
    componentDidMount(){
        this.renderButtonStyling();
    }

    render() {
        
        const { currentForm } = this.state;
        return (
            <div className={styles.container}>

                <div className={styles.wrapper}>
                    
                    <div className={styles.sideImage}>
                    </div>
                    <div className={styles.form}>
                        <div className={styles.toggleButtons}>
                            <button 
                                ref={this.registerRef}
                                onClick={async ()=>await this.setState({ currentForm: 'register' })} 
                                className={styles.toggleButton}>
                                Register
                            </button>

                            <button 
                            ref={this.loginRef}
                                onClick={async()=>await this.setState({ currentForm: 'login' })} 
                                className={styles.toggleButton}>
                                Login
                            </button>
                        </div>
                        {
                        currentForm === 'login' ? 
                        <Login /> :
                        <Register />
                        }
                    </div>

                </div>
            </div>
        )
    }
}

export default SignIn;