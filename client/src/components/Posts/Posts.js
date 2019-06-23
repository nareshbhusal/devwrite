import React from 'react';
import Post from './Post/Post';
import styles from './Posts.module.css';

import devWrite from '../../devwrite';

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
        console.log(this.state);

        if (sortOrder!==this.state.sortOrder) {
            console.log('sorting changed');
        }
        if (t !==this.state.t) {
            console.log('days changed');
        }

        return sortingChanged;
    }

    fetchPosts = async () => {
        try {
            const { sortOrder, t, page, tag } = this.state;
            const URL = `posts/${sortOrder}/?tag=${tag}&t=${t}&page=${page}`;
            const res = await devWrite.get(URL);
            const newPosts = res.data;
            if (newPosts.length) {
                
                const posts = [ ...this.state.posts, ...newPosts ];

                await this.setState({ posts, page: this.state.page+1 });
            }
            
        } catch(err) {
            console.log(err);
        }
    }
    
    async componentDidUpdate(){
        const sortingChanged = await this.determineSorting();
        if (sortingChanged) {
            await this.fetchPosts();
        }
    }

    async componentDidMount() {

        await this.determineSorting();
        await this.fetchPosts();
    }
    
    render() {
        if (!this.state.posts.length) {
            return (
                <div className={styles.container}>
                    <h2 className={styles.noPosts}>No posts found!</h2>
                </div>
            );
        }
        
        return (
            <div className={styles.container}>
                
                {this.state.posts.map(post => {
                    return <Post key={post.id} id={post.id}/>
                })}
            </div>
        );
    }
}

export default Posts;