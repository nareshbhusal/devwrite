import React from 'react';
import styles from './Post.module.css';

import { Link } from 'react-router-dom';
import history from '../../../history';
import authContext from '../../../contexts/authContext';
import { fetchPost, savePost, deletePost, likePost } from '../../../helpers/index';

import PostActions from '../../PostPage/PostActions/PostActions';
import UserIcon from '../../UserIcon/UserIcon';


class Post extends React.Component {

    state = {}

    static contextType = authContext;

    updatePostData = async() => {
        const postData = await fetchPost(this.state.id);
        await this.setState({ ...postData });
    }

    likePost = async() => {
        // like
        const { id } = this.state;
        await likePost(id);
        await this.updatePostData(id);
    }

    savePost = async() => {
        // save
        const { id } = this.state;
        await savePost(id);
        await this.updatePostData(id);
    }

    updateButtonStyles = async() => {

        if (this.isPostSaved()) {
            await this.setState({ liked: true });
        } else {
            await this.setState({ liked: false });
        }
        if (this.isPostLiked()) {
            await this.setState({ saved: true });
        } else {
            await this.setState({ saved: false });
        }
    }

    postClickHandler = (e) => {
        const tagName = e.target.tagName.toLowerCase();
        if (tagName !=='a' && tagName !=='button' && tagName!=='i'){
            history.push(`/post/${this.state.id}`);
        }
    }

    async componentDidMount(){
        const { id } = this.props;
        await this.setState({ id });
        await this.updatePostData();
    }

    render(){
        const { username, user, likedBy, id, date, readingTime, title, body, tags, liked, saved } = this.state;

        if (!title) {
            return null;
        }
        const postId = id;
        const likes = likedBy.length;

        return (
            <article onClick={this.postClickHandler} className={styles.container+` post`}>
                <div className={styles.info}>
                    <UserIcon className={styles.usericon} name={username} id={user}/>
                    <div className={styles.publish}>
                        <Link to={`/user/`+user} className={styles.author}>
                            {username}
                        </Link>
                        <p className={styles.time}>
                            <span className={styles.date}>{date}</span>
                            &middot;
                            <span className={styles.length}>{readingTime}</span>
                        </p>
                    </div>
                </div>
                <h2 className={styles.title}>
                    {title}
                </h2>
                <p className={styles.body}>
                    {`${body.slice(0, 115)} ${body.length > 115 ? '...' : ''}`}
                </p>
                <Link to={`/post/${postId}`} 
                    className={styles.readmore}>
                    Read more
                </Link>
                <p className={styles.tags}>
                    {tags.map(tag => {
                        return <Link key={tag} to={tag} className={styles.tag}>{`#`+tag}</Link>
                    })}
                </p>
                
                <PostActions { ...this.state } savePost={this.savePost} likePost={this.likePost} deletePost={deletePost}/>

            </article>
        );
    }   
}

export default Post;