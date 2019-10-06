import React from 'react';
import styles from './UserComment.module.css';

import { Link } from 'react-router-dom';

const userComment = (props) => {
    const { postTitle, username, userId, postId, id, createdAt, body, err } = props.comment;
    if (err) {
        return null;
    }
    return (
        <div className={styles.container}>
            <div to={`/post/${postId}`} className={styles.info}>
                <Link className={styles.username} to={`/user/${userId}`}>
                    {username}
                </Link>
                commented on
                <Link to={`/post/${postId}`}>
                    <p className={styles.title} 
                        dangerouslySetInnerHTML={{__html: postTitle}}>
                    </p>
                </Link>
                <p className={styles.date}>
                    {new Date(parseInt(createdAt)).toDateString().split(' ').slice(1,).join(' ')}
                </p>
            </div>
            <Link to={`/post/${postId}#discussion`}>
                <p className={styles.body} 
                    dangerouslySetInnerHTML={{__html: body}}>
                </p>
            </Link>
        </div>
    );
}

export default userComment;