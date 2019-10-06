import React from 'react';
import styles from './UserPage.module.css';

import UserInfo from '../UserInfo/UserInfo';
import Post from '../../Posts/Post/Post';
import UserCard from '../UserCard/UserCard';
import UserComment from '../UserComment/UserComment';
import Loader from '../../Loader/Loader';
import authContext from '../../../contexts/authContext';
import helpers from '../../../helpers/index';
const fetchUser = helpers.fetchUser;
const getComment = helpers.getComment;
const logout = helpers.logout;
const followUser = helpers.followUser;

const RenderTabData = ({ currentTab, user }) => {

    let { posts } = user;
    let comments = user.commentedPosts || [];
    let savedPosts = user.savedPosts || [];
    let likedPosts = user.likedPosts || [];

    if (!posts) {
        return <Loader />
    }
    // provision for filtering duplicates
    posts = [...new Set(posts)];
    savedPosts = [...new Set(savedPosts)];
    likedPosts = [...new Set(likedPosts)];

    if (currentTab==='posts') {
        return (
            <div className={styles.userPosts}>
                {posts.map(postId => {
                    return <Post key={postId} id={postId}/>
                })}
            </div>
        );

    } else if(currentTab==='comments') {
        return (
            <div className={styles.usercomments}>
                {comments.map(comment => {
                    const key = `${comment.id}${comment.postId}`;
                    return <UserComment key={comment.createdAt} comment={comment} getComment={getComment} />
                })}
            </div>
        );
    } else if (currentTab==='likes') {
        return (
            <div className={styles.likedposts}>
                {likedPosts.map(postId => {
                    return <Post key={postId} id={postId} />
                })}
            </div>
        )
    } else if (currentTab==='saved'){
        return (
            <div className={styles.savedposts}>
                {savedPosts.map(postId => {
                    return <Post key={postId} id={postId} />
                })}
            </div>
        );
    }
}

class UserPage extends React.Component{

    postsRef = React.createRef();
    commentsRef = React.createRef();
    likesRef = React.createRef();
    savedRef = React.createRef();

    static contextType = authContext;
    _isMounted=false;
    state = {
        currentTab: 'posts',
        user: {}
    }

    logoutHandler = async() => {
        await logout();
        if (this.context) {
            await this.context.reEvaluateAuth();
        }
    }
    fetchUser = async (userId) => {
        const user = await fetchUser(userId);
        user.id =userId;
        await this.setState({ user });
    }

    followUser = async(id) => {
        await followUser(id);
        await this.fetchUser(this.state.user.id);
    }

    fetchUserComments = async() => {
        const userComments = this.state.user.commentedPosts || [];
        let comments = await Promise.all(userComments.map(async userComment => {
            return await getComment(userComment.postId, userComment.id);
        }));
        comments = comments.filter(comment => {
            return comment.deleted
        })
        await this.setState({ comments });
    }

    switchTabTo = async(tab) => {
        await this.setState({ currentTab: tab });
        await this.fetchUser();
    }

    renderTabs() {
        const isOwner = true;

        return (
            <div className={styles.tabs}>
                <button ref={this.postsRef} className={"active"} onClick={()=>this.switchTabTo('posts')}>
                    Posts
                </button>
                <button ref={this.commentsRef} onClick={()=>this.switchTabTo('comments')}>
                    Comments
                </button>
                <button ref={this.likesRef} onClick={()=>this.switchTabTo('likes')}>
                    Likes
                </button>
                {isOwner ? 
                <button ref={this.savedRef} onClick={()=>this.switchTabTo('saved')}>
                    Saved
                </button>
                : null
                }
                
            </div>
        );
    }

    toRenderNetworkProfiles = () => {
        const networkType = this.props.match.params.network;
        return Boolean(networkType);
    }

    updateTabsStyle = () => {
        if (this.toRenderNetworkProfiles() || !this.likesRef.current) {
            return;
        }
        [this.postsRef, this.commentsRef, this.likesRef, this.savedRef].forEach(xRef => {
            xRef.current.style.borderColor='transparent';
            xRef.current.style.color = '#444';
        });
        const refName = this.state.currentTab + 'Ref';
        this[refName].current.style.borderColor = '#000';
        this[refName].current.style.color = '#000';
    }

    renderNetwork = () => {
        const networkType = this.props.match.params.network;
        const { user } = this.state;
        if (!user[networkType]) {
            return <p>Loading...</p>
        }
        return (
            <div className={styles.network}>
                <h2 className={styles.networkHeading}>
                    {networkType}
                </h2>
                {user[networkType].map(id => {
                    return <UserCard key={id} followUser={this.followUser} id={id} />
                })}
            </div>
        );
    }

    async componentDidUpdate(){
        // if userId params isn't their, the route has changed
        if (!this._isMounted || !this.props.match.params.userId){
            return;
        }
        this.updateTabsStyle();
        const newUserId = parseInt(this.props.match.params.userId);
        if (newUserId !==this.state.user.id) {
            await this.fetchData();
        }
    }

    fetchData = async () => {
        const userId = parseInt(this.props.match.params.userId);
        await this.fetchUser(userId);
        await this.fetchUserComments();
    }
    async componentDidMount(){
        this._isMounted=true;
        this.updateTabsStyle();
        const userId = parseInt(this.props.match.params.userId);
        await this.fetchUser(userId);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        const { currentTab, user, err } = this.state;
        const context = this.context || {};
        
        const ownProfile = context.id == user.id;
        const toShowNetwork = this.toRenderNetworkProfiles();
        if (user.err) {
            return <div className={styles.err}>{user.err}</div>
        }
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <UserInfo key={user.id}
                    { ...user } 
                    ownProfile={ownProfile} 
                    logout={this.logoutHandler} 
                    followUser={this.followUser} />
                    {
                    toShowNetwork ? 
                    this.renderNetwork()
                    :
                    <React.Fragment>
                        {this.renderTabs()}
                        <RenderTabData user={user} 
                        currentTab={currentTab} 
                        comments={this.state.comments} />
                    </React.Fragment>
                    }
                </div>
            </div>
        );
    }
}

export default UserPage;