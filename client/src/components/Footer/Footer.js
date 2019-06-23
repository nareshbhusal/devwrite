import React from 'react';
import styles from './Footer.module.css';

import githubLogo from '../../assets/github-logo.png';

const footer =()=>{
    const year = new Date().getUTCFullYear();
    const personalWebsite = "https://github.com/nareshsharma123";
    const repoLink = "https://github.com/nareshsharma123/devwrite";
    return (
        <div className={styles.container}>
            <p>
                
            </p>
            <p className={styles.copyStatement}>
                &copy; {year} Copyright: <span>DevWrite</span> 
                <a className={styles.repoLink} href={repoLink}>
                    <img className={styles.logo} src={githubLogo} />
                </a>
            </p>
            <p>
                Created by: 
                <a className={styles.personalWebsite} 
                    target="_blank" 
                    href={personalWebsite}>
                    Naresh Bhusal
                </a>
            </p>
        </div>
    );
}

export default footer;