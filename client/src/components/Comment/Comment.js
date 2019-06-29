import React from 'react';
import styles from './Comment.module.css';

import { Link } from 'react-router-dom';
import devwrite from '../../devwrite';

import ContentEditable from 'react-contenteditable';
import UserIcon from '../UserIcon/UserIcon';

import authContext from '../../contexts/authContext';
import { fetchAvatar } from '../../helpers';

class Comment extends React.Component{

    static contextType = authContext;

    _isMounted=true;
    state = {
        editing: false,
        body: ''
    }

    bodyRef = React.createRef();

    submitComment = async() => {
        try {
            const { body, postId } = this.state;
            const res = await devwrite.post(`posts/${postId}/comment`, {
                body
            });
            console.log(res.data);
            this.setState({ editing: false, body: '' });
            await this.props.reFetchPost(postId);

        } catch(err) {
            console.log(err.response);
            alert(err.response.data.err || err.response.data); // alert error
        }
    }

    deleteComment = async() => {
        if (confirm('Are you sure you want to delete this comment?')){
            try {
                const { id, postId } = this.state;
    
                const res = await devwrite.delete(`posts/${postId}/comment/${id}`);
                console.log(res.data);
                await this.props.reFetchPost(postId);
            } catch(err) {
                console.log(err.response.data.err || err.response.data);
            }
        }
    }

    likeComment = async() => {
        try {
            const { id, postId } = this.state;

            const res = await devwrite.post(`posts/${postId}/comment/${id}/like`);
            console.log(res.data);
            await this.props.reFetchPost(postId);
        } catch(err) {
            console.log(err.response);
            alert(err.response.data.err);
        }
    }

    submitUpdatedComment = async() => {
        try {
            const { body, postId, id } = this.state;

            const res = await devwrite.put(`posts/${postId}/comment/${id}`, {
                body
            });
            console.log(res.data);
            await this.setState({ editing: false });

        } catch(err) {
            console.log(err.response.data.err);
            alert(err.response.data.err); // alert error
        }
    }

    isCommentAuthor = () => {
        const context = this.context || {};
        return Boolean(context.name);
    }

    renderAuthButtons = () => {
        const { body, editing } = this.state;

        if (!this.props.comment.body) {
            return (
                <div className={styles.authbuttons}>
                    <button onClick={this.submitComment} className={styles.submitButton}>
                        submit
                    </button>
                </div>
            );
        }
        if (!this.isCommentAuthor()) {
            return null;
        }
        if (body) {
            if (editing) {
                return (
                    <div className={styles.authbuttons}>
                        <button className={styles.submitButton} onClick={this.submitUpdatedComment}>
                            submit changes
                        </button>
                        <button className={styles.cancelButton} onClick={this.toggleEdit}>
                            cancel
                        </button>
                    </div>
                );
            }
            return (
                <div className={styles.authbuttons}>
                    <button className={styles.editButton} onClick={this.toggleEdit}>
                        edit
                    </button>
                    <button className={styles.deleteButton} onClick={this.deleteComment}>
                        delete
                    </button>
                </div>
            );
        }
    }

    toggleEdit= async()=> {
        await this.setState({ editing: !this.state.editing });
    }

    handleChange = async e => {

        const value = e.target.value;
        await this.setState({ body: value });
    };
    async componentDidUpdate() {
        if (!this._isMounted) {
            return;
        }
        let { body, createdAt, id, postId, userId, isLiked, likedBy } = this.props.comment;
        likedBy=likedBy || [];
        const likes = likedBy.length;
        body = body || '';
        const isEditor = !body;
        if (likes !==this.state.likes || isLiked !==this.state.isLiked) {
            await this.setState({ body, postId, isLiked, userId, id, isEditor, likes, createdAt });
        }
    }

    componentDidMount = async() => {
        let { body, createdAt, id, postId, userId, isLiked, likedBy, username } = this.props.comment;
        likedBy=likedBy || [];
        const likes = likedBy.length;
        body = body || '';
        const isEditor = !body;
        const photo = await fetchAvatar(userId);
        await this.setState({ body, postId, isLiked, userId, id, isEditor, likes, createdAt, username, photo });
    }
    componentWillUnmount() {
        this._isMounted = false;
      }

    renderTimeInfo() {
        const { createdAt, editedAt, isEditor } = this.state;
        if(isEditor) {
            return null;
        }
        return (
            <div className={styles.time}>
                <span className={styles.date}>
                    {new Date(parseInt(createdAt)).toDateString().split(' ').splice(1).join(' ')}
                </span>
                
                {editedAt ? 
                <React.Fragment>
                    &middot;
                    <span style={{marginLeft: '0.3rem'}} className={styles.date}>
                        edited {new Date(parseInt(editedAt)).toDateString().split(' ').splice(1).join(' ')}
                    </span>
                </React.Fragment>
                : null
                }
            </div> 
        );
    }
    renderBody(){
        const { body, editing, isEditor } = this.state;

        let isEnabled = editing || isEditor;

        if (this.isCommentAuthor()) {
        return (
            <ContentEditable
                ref={this.bodyRef}
                className={styles.body}
                contentEditable
                html={body} 
                placeholder="Add to the discussion"
                disabled={!isEnabled}
                onChange={this.handleChange}
                tagName='p'
                />
            );
        }
        return <p className={styles.body}>{body}</p>
    }

    render() {
        
        let { username, userId, body, isLiked, likes, isEditor, photo } = this.state;

        return(
            <article className={styles.container+` post`}>

                <div className={styles.info}>
                    <UserIcon className={styles.usericon} 
                        name={username} id={userId} 
                        avatarURL={photo}/>
                        
                    <div className={styles.publish}>
                        <Link to={`/user/`+userId} className={styles.author}>
                            {username}
                        </Link>
                        {this.renderTimeInfo()}
                    </div>
                </div>

                {this.renderBody(body)}

                <div className={styles.actions}>
                    {!isEditor ? 
                    <div className={styles.likes}>
                        <button className={styles.likeButton} onClick={this.likeComment}>
                            <i className={`fa fa-heart${isLiked ? '' : '-o'}`}></i>
                        </button>
                        <span className={styles.likesCount}>
                            {likes +` likes`}
                        </span>
                    </div> :
                    null
                    }
                    
                    {this.renderAuthButtons()}
                </div>
            </article>
        );
    }
}

export default Comment;