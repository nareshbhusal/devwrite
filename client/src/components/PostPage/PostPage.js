import React from 'react';
import styles from './PostPage.module.css';
import { Link } from 'react-router-dom';
import textVersion from 'textversionjs';

import PostActions from './PostActions/PostActions';
import UserIcon from '../UserIcon/UserIcon';
import Comment from '../Comment/Comment';
import authContext from '../../contexts/authContext';

import helpers from '../../helpers';
const fetchPost = helpers.fetchPost;
const fetchUser = helpers.fetchUser;
const followUser = helpers.followUser;

const RenderDiscussion = ({ context, post, fetchPostData }) => {
        
    const { id, title, username, comments } = post;
    const editorCommentData = {
        postId: id,
        username: context.name,
        userId: context.id
    }
    return (
        <section id="discussion" className={styles.discussion}>
            <h2 className={styles.discussionHeading}>
                Responses to "{textVersion(title)}" by {username}
            </h2>
            <Comment reFetchPostData={fetchPostData} comment={editorCommentData} />
            <div className={styles.comments}>

                {!comments.length ? 
                <h2>No responses</h2> : null}

                {comments.reverse().map(comment => {
                    const key = `${comment.id}${comment.userId}${comment.createdAt}`
                    return (
                        <Comment key={key} 
                        comment={comment} />
                    );
                })}
            </div>
        </section>
    );
}


class PostPage extends React.Component {

    state = {}
    _isMounted=false;
    static contextType = authContext;

    followAuthor = async() => {
        await followUser(this.state.user);
        await this.isAuthorFollowed();
    }

    fetchPostData = async (id=this.props.id) => {
        if (!this._isMounted) {
            return;
        }
        await this.setState({ err: '' });
        const post = await fetchPost(id);
        await this.setState({ ...post });
        await this.isAuthorFollowed();
        const isAuthor = this.isAuthor();
        await this.setState({ isAuthor });
    }

    componentDidMount = async() => {
        this._isMounted=true;
        const { id } = this.props;
        await this.setState({ id: id });
        await this.fetchPostData(id);
    }
    componentWillUnmount() {
        this._isMounted = false;
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
        const { username, user, date, readingTime, title, body, tags, err, isAuthorFollowed, photo } = this.state;
        if (err) {
            return <p style={{margin: '4rem 0'}}>{this.state.err}</p>
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
                        className={styles.usericon} 
                        id={user}
                        avatarURL={photo}/>
                        
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

                <PostActions { ...this.state } 
                    reFetchPostData={this.fetchPostData}/>
                <div className={styles.breakLine}></div>
                <RenderDiscussion context={context} 
                    post={this.state} 
                    fetchPostData={this.fetchPostData}/>
            </div>
        );
    }
}

export default PostPage;