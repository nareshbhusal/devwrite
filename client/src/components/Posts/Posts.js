import React from 'react';
import Post from './Post/Post';
import styles from './Posts.module.css';

import devWrite from '../../devwrite';
import Sort from '../Sort/Sort';

class Posts extends React.Component{
    state = {
        sortOrder: 'new', // sort by `new` or `top`
        t: 1, // number of days when sorting by `top`
        page: 1, //current page number
        posts: [],
    }

    determineSorting = async () => {

        let { sortOrder, t, tag } = this.props.pathParams || {};
        sortOrder = sortOrder || 'new';
        t= t || 1;
        tag=tag || '';

        let sortingChanged = false;
        if (sortOrder!==this.state.sortOrder || t !==this.state.t || tag !==this.state.tag) {
            sortingChanged = true;
            await this.setState({ sortOrder, t, tag });
        }
        return sortingChanged;
    }

    fetchPosts = async () => {
        await this.toggleLoading();
        this.enableInfiniteScroll();
        try {
            const { sortOrder, t, page, tag } = this.state;
            const URL = `posts/${sortOrder}/?tag=${tag}&t=${t}&page=${page}`;
            const res = await devWrite.get(URL);
            const newPosts = res.data;
            if (newPosts.length) {
                const posts = [ ...this.state.posts, ...newPosts ];
                await this.setState({ posts, page: this.state.page+1 });
            } else {
                // 
                window.removeEventListener('scroll', this.scrollEventListener);
                console.log('removed listener');
            }
            
        } catch(err) {
            console.log(err);
        }
        await this.toggleLoading();
    }

    async componentDidUpdate(){
        const sortingChanged = await this.determineSorting();
        if (sortingChanged) {
            await this.setState({ posts: [], page:1 });
            await this.fetchPosts();
        }
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
            console.log('here we are!')
            await this.fetchPosts();
        }
    }

    enableInfiniteScroll() {
        window.addEventListener('scroll', this.scrollEventListener);
    }

    async componentDidMount() {
        await this.determineSorting();
        await this.fetchPosts();
    }

    toggleLoading = async() => {
        await this.setState({ loading: !this.state.loading });
    }
    
    render() {
        const { sortOrder, t, tag, loading, posts } = this.state;

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
                {loading ? 
                <p className={styles.loading}>Loading...</p> 
                :null}
            </div>
        );
    }
}

export default Posts;