import React from 'react';
import Post from './Post/Post';
import styles from './Posts.module.css';

import devWrite from '../../devwrite';
import Sort from '../Sort/Sort';
import Loader from '../Loader/Loader';

class Posts extends React.Component{
    state = {
        sortOrder: 'new', // sort by `new` or `top`
        t: 1, // number of days when sorting by `top`
        page: 1, //current page number
        posts: [],
    }
    _isMounted=false;

    determineSorting = async () => {

        let { sortOrder, t, tag, search } = this.props.pathParams || {};
        sortOrder = sortOrder || 'new';
        t= t || 1;
        tag=tag || '';
        search=search || '';
        let sortingChanged = false;
        if (sortOrder!==this.state.sortOrder || t !==this.state.t || tag !==this.state.tag || search !==this.state.search) {
            sortingChanged = true;
            await this.setState({ sortOrder, t, tag, search });
        }
        return sortingChanged;
    }

    fetchPosts = async () => {
        await this.toggleLoading();
        this.enableInfiniteScroll();
        try {
            const { sortOrder, t, page, tag, search } = this.state;
            const URL = `posts/${sortOrder}/?tag=${tag}&t=${t}&page=${page}&search=${search}`;
            const res = await devWrite.get(URL);
            const newPosts = res.data;
            if (newPosts.length) {
                const posts = [ ...this.state.posts, ...newPosts ];
                await this.setState({ posts, page: this.state.page+1 });
            } else {
                // 
                this.disableInfiniteScroll();
                console.log('removed listener');
            }
            
        } catch(err) {
            console.log(err);
        }
        await this.toggleLoading();
    }

    async componentDidUpdate(){
        if (!this._isMounted){
            return;
        }
        const sortingChanged = await this.determineSorting();
        if (sortingChanged) {
            await this.setState({ posts: [], page:1 });
            await this.fetchPosts();
        }
    }
    componentWillUnmount(){
        this.disableInfiniteScroll();
        this._isMounted=false;
    }

    reachedNearBottom() {
        const scrollAtPercentHeight = 85;
        var D = document;
        const docHeight =  Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
        const scrollPosition = window.scrollY + window.innerHeight;
        return (scrollPosition/docHeight)*100 > scrollAtPercentHeight;
    }
    scrollEventListener = async() => {
        if (this.reachedNearBottom() && !this.state.loading) {
            console.log('load more posts now!')
            await this.fetchPosts();
        }
    }

    enableInfiniteScroll() {
        window.addEventListener('scroll', this.scrollEventListener);
    }
    disableInfiniteScroll(){
        window.removeEventListener('scroll', this.scrollEventListener);
    }

    async componentDidMount() {
        this._isMounted=true;
        await this.determineSorting();
        await this.fetchPosts();
    }

    toggleLoading = async() => {
        await this.setState({ loading: !this.state.loading });
    }
    
    render() {
        const { sortOrder, t, tag, loading, posts, search } = this.state;

        return (
            <div className={styles.container}>
                <Sort sortOrder={sortOrder} t={t} tag={tag} />
                {posts.length ?
                this.state.posts.map(post => {
                    return <Post key={post.id} id={post.id}/>
                })
                :
                <h2 className={styles.noPosts}>No posts found!</h2>
                }
                {!loading ? 
                <Loader /> 
                :null}
            </div>
        );
    }
}

export default Posts;