import React from 'react';
import styles from './Comment.module.css';
import { Link } from 'react-router-dom';
import authContext from '../../contexts/authContext';
import ContentEditable from 'react-contenteditable';
import UserIcon from '../UserIcon/UserIcon';
import helpers from '../../helpers';
const fetchAvatar = helpers.fetchAvatar;
const getComment = helpers.getComment;
const postComment = helpers.postComment;
const editComment = helpers.editComment;
const likeComment = helpers.likeComment;
const deleteComment = helpers.deleteComment;

const RenderTimeInfo = ({ createdAt, editedAt, isEditor })=> {
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

class Comment extends React.Component{

    static contextType = authContext;
    
    state = {
        editing: false,
        body: ''
    }
    _isMounted=true;
    bodyRef = React.createRef();

    submitComment = async() => {
        const { body, postId } = this.state;
        const res = await postComment({ body, postId });
        // if (!res.err){
            this.setState({ editing: false, body: '' });
            await this.props.reFetchPostData(postId);
        // }
    }
    submitUpdatedComment = async() => {
        const { body, postId, id } = this.state;

        const res = await editComment({ body, postId, id });
        if (!res.err){
            this.setState({ editing: false, body: '' });
            await this.fetchComment();
        }
    }
    fetchComment = async() => {
        if (!this.props.comment.body){
            return;
        }
        let { postId, id } = this.props.comment;
        const res = await getComment(postId, id);
        const { body, isLiked, userId, likes, createdAt, username, err, deleted } = res;
        const photo = await fetchAvatar(userId);
        await this.setState({ body, postId, isLiked, userId, id, likes, createdAt, username, err, deleted, photo });
    }

    deleteComment = async() => {
        if (confirm('Are you sure you want to delete this comment?')){
            const { id, postId } = this.state;
            await deleteComment({ id, postId });
            await this.props.reFetchPostData();
        }
    }

    likeComment = async() => {
        const { id, postId } = this.state;
        await likeComment({ id, postId });
        await this.fetchComment();
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
                    <button onClick={()=>this.submitComment()} className={styles.submitButton}>
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

    componentDidMount = async() => {
        let { body, postId } = this.props.comment;
        body=body || '';
        const isEditor = !body;
        const context = this.context || {};
        const { photo, username } = context;
        await this.setState({ isEditor, photo, username, postId });
        await this.fetchComment();
    }
    componentWillUnmount() {
        this._isMounted = false;
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
        
        let { username, userId, body, isLiked, likes, isEditor, photo, err, deleted } = this.state;
        if (err || deleted){
            return null;
        }
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
                        <RenderTimeInfo {...this.state} />
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