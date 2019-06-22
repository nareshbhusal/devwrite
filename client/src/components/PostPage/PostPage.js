import React from 'react';
import styles from './PostPage.module.css';

import { fetchPost, likePost, savePost, deletePost, followUser, fetchUser } from '../../helpers';
import { Link } from 'react-router-dom';

import PostActions from './PostActions/PostActions';
import UserIcon from '../UserIcon/UserIcon';
import Comment from '../Comment/Comment';

import authContext from '../../contexts/authContext';


const RenderDiscussion = ({ context, post, fetchPostData }) => {
        
    const { id, title, author, comments } = post;
    const editorCommentData = {
        postId: id
    }
    return (
        <section id="#discussion" className={styles.discussion}>
            <h2 className={styles.discussionHeading}>
                Responses to "{title}" by {author}
            </h2>
            <Comment comment={editorCommentData} />
            <div className={styles.comments}>

                {!comments.length ? 
                <h2>No responses</h2> : null}

                {comments.reverse().map(comment => {
                    // console.log(comment)
                    return (
                        <Comment key={comment.body} 
                            comment={comment} 
                            postActionHandler={fetchPostData}/>
                    );
                })}
            </div>
        </section>
    );
}


class PostPage extends React.Component {

    state = {}

    static contextType = authContext;

    followAuthor = async() => {
        await followUser(this.state.user);
        await this.isAuthorFollowed();
    }

    likePost = async() => {
        const { id } = this.state;
        await likePost(id);
        await this.fetchPostData(id);
    }

    savePost = async() => {
        const { id } = this.state;
        await savePost(id);
        await this.fetchPostData(id);
    }

    fetchPostData = async () => {
        await this.setState({ error: '' });
        const { id } = this.props;
        const post = await fetchPost(id);
        await this.setState({ ...post });
        const isAuthor = this.isAuthor();
        await this.isAuthorFollowed();
        await this.setState({ isAuthor });
    }

    componentDidMount = async() => {
        await this.setState({ error: '' });
        await this.fetchPostData();
    }

    isAuthor = () => {
        const context = this.context || {};
        return context.id == this.state.user;
    }
    isAuthorFollowed = async() => {
        const user = await fetchUser(this.state.user);
        await this.setState({ isAuthorFollowed: user.followed });
    }

    renderTags(tags){
        return (
            <p className={styles.tags}>
                {tags.map(tag => {
                    return (
                        <Link key={tag} to={tag} 
                            className={styles.tag}>
                            {`#${tag}`}
                        </Link>
                    );
                })}
            </p>
        );
    }

    render(){
        // console.log(this.state);
        const { username, user, date, readingTime, title, body, tags, error, isAuthorFollowed } = this.state;
        if (error) {
            return <p style={{margin: '4rem 0'}}>{this.state.error}</p>
        }
        if (!title) {
            return <p>Loading...</p>
        }
        const context = this.context || {};

        return (
            <div className={styles.container}>

                <h1 className={styles.title}>
                    {title}
                </h1>

                <div className={styles.info}>
                    <UserIcon name={username}
                        className={styles.usericon} id={user}/>
                        
                    <div className={styles.publish}>

                        <p className={styles.author_container}>
                            <Link to={`/user/`+user} className={styles.author}>
                                {username}
                            </Link>
                            <button className={styles.followButton} 
                                onClick={this.followAuthor}>
                                {isAuthorFollowed ? 'unfollow' : 'follow'}
                            </button>
                        </p>
                        
                        <p className={styles.time}>
                            <span className={styles.date}>
                                {date}
                            </span>
                            &middot;
                            <span className={styles.length}>
                                {readingTime}
                            </span>
                        </p>
                    </div>
                </div>

                <p className={styles.body} 
                    dangerouslySetInnerHTML={{__html: body}}>
                </p>

                {this.renderTags(tags)}

                <PostActions { ...this.state } likePost={this.likePost} savePost={this.savePost} deletePost={deletePost}/>
                <div className={styles.breakLine}></div>
                <RenderDiscussion context={context} 
                    post={this.state} 
                    fetchPostData={this.fetchPostData}/>
            </div>
        );
    }
}

export default PostPage;