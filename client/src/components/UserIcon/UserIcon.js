import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserIcon.module.css';

const userIcon = ({ name = 'anon', id, size=4, avatarURL, onChangeHandler, editing }) => {

    let initials = name[0].toString().toUpperCase();
    initials = name.split(' ').length > 1 ? initials + name.split(' ')[name.split(' ').length - 1][0].toUpperCase() : initials;

    let dynamicStyle = {
        width: `${size}rem`,
        height: `${size}rem`,
        fontSize: `${size/2.2}rem`,
    }
    avatarURL = avatarURL || '';
    const imageStyle = {backgroundImage: `url(${avatarURL})`};

    return (
        <div className={styles.container}>

        <Link to={`/user/${id}`} style={dynamicStyle} className={styles.userIcon}>
            <div className={styles.image} 
            style={imageStyle}>
            </div>
            <span className={styles.initials}>
                {initials}
            </span>
        </Link>
        {editing ? 
        <input 
        value={avatarURL}
        type="text"
        className={styles.input} 
        placeholder={avatarURL || "type avatar url"} 
        onChange={(e)=>onChangeHandler(e.target.value)} />
        :null
        }
    </div>
    );
}

export default userIcon;