import React from 'react';
import styles from './PostActions.module.css';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import helpers from '../../../helpers/index';

let likePost = helpers.likePost;
let savePost = helpers.savePost;
let deletePost = helpers.deletePost;

const postActions = ({ id, liked, saved, likedBy, reFetchPostData }) => {
    const alert = useAlert();

    const like = async() => {
        await likePost(id, alert);
        await reFetchPostData(id);
    }

    const dlt = async() => {
        await deletePost(id, alert);
        await reFetchPostData(id);
    }

    const save = async() => {
        await savePost(id, alert);
        await reFetchPostData(id);
    }

    return (
        <div className={styles.actions}>
            <div className={styles.like}>
                <button title={liked ? "Unlike" : "Like"} className={styles.likeButton} onClick={like}>
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
                <button title="Delete post" className={styles.deleteButton} onClick={dlt}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>

            {/*  */}

            <button title={saved ? "Unsave" : 'Save'} className={styles.saveButton} onClick={save}>
                <i className={`fa fa-bookmark${saved ? '' : '-o'}`}></i>
            </button>
        </div>
    );
}

export default postActions;