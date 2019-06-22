import React from 'react';
import styles from './UserComment.module.css';

const userComment = (props) => {
    const { postTitle, username, userId, postId, id, createdAt, body, err } = props.comment;
    if (err) {
        return <p style={{color: 'pink'}}>{err}</p>;
    }
    return (
        <div className={styles.container}>
            <p>{body}</p>
        </div>
    )
}

export default userComment;