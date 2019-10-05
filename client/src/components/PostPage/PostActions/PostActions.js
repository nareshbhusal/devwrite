import React from 'react';
import styles from './PostActions.module.css';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { likePost } from '../../../helpers/index';

const postActions = ({ id, savePost, deletePost, liked, saved, likedBy, isAuthor, user }) => {
    const alert = useAlert();
    const likePostt = async() => {
        // const { id } = this.state;
        const res = await likePost(id);
        alert.show(res.err);
        // await this.fetchPostData(id);
    }
    return (
        <div className={styles.actions}>
            <div className={styles.like}>
                <button title={liked ? "Unlike" : "Like"} className={styles.likeButton} onClick={likePostt}>
                    <i className={`fa fa-heart${liked ? '' : '-o'}`}></i>
                </button>
                
                <span className={styles.likesCount}>
                    {likedBy.length +` likes`}
                </span>
            </div>

            {/* auth buttons */}

            <div className={styles.authButtons}>
                <Link title="Edit post" to={`/editor/${id}`} className={styles.editButton}>
                    <i className="fa fa-edit"></i>
                </Link>
                <button title="Delete post" className={styles.deleteButton} onClick={()=>deletePost(id)}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>

            {/*  */}

            <button title={saved ? "Unsave" : 'Save'} className={styles.saveButton} onClick={savePost}>
                <i className={`fa fa-bookmark${saved ? '' : '-o'}`}></i>
            </button>
        </div>
    );
}

export default postActions;