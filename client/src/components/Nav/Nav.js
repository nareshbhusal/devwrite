import React, { useContext } from 'react';
import styles from './Nav.module.css';
import Logo from '../Logo/Logo';
import UserIcon from '../UserIcon/UserIcon';
import { Link } from 'react-router-dom';

import authContext from '../../contexts/authContext';

const Nav = ({ searchHandler }) => {

    const context = useContext(authContext);
    const user = context || {};

    return (
        <div className={styles.container}>
            <Logo className={styles.logo} />
            <input onSubmit={searchHandler} placeholder="search" className={styles.search} name="query" />
            <div className={styles.right}>
                <Link className={styles.writeLink} to="/editor">
                    write a post
                </Link>
                {user.name ? 

                    <UserIcon className={styles.UserIcon} 
                    name={user.name} 
                    avatarURL={user.photo}
                    id={user.id}/>
                    :
                    <Link className={styles.signinLink} to="/signin">
                        Sign in
                    </Link>
                }
                
            </div>
        </div>
    );
}

export default Nav;