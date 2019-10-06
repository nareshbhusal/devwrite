import React, { useEffect, useState } from 'react';
import styles from './UserComment.module.css';
import { Link } from 'react-router-dom';

const userComment = (props) => {
    useEffect(() => {
        (async () => {
            const { postId, id } = props.comment;
            let commentData = await getComment(postId, id);
            commentData = commentData || {};
            setComment(commentData);
        })();
    }, [])
    const getComment = props.getComment;
    let [comment, setComment] = useState({postId: props.comment.postId, id: props.comment.id});
    const { err, deleted, postId, id, userId, postTitle, username, createdAt, body } = comment;
    if (err || deleted) {
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