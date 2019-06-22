import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserIcon.module.css';

const userIcon = ({name, id}) => {
    name = name || 'anon';
    let initials = name[0].toString().toUpperCase();
    initials = name.split(' ').length > 1 ? initials + name.split(' ')[name.split(' ').length - 1][0].toUpperCase() : initials;

    return (
        <Link to={`/user/${id}`} className={styles.userIcon}>
            {initials}
        </Link>
    );
}

export default userIcon;