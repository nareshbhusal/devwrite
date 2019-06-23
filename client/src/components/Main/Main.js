import React from 'react';

import Nav from '../Nav/Nav';
import UserPage from '../User/UserPage/UserPage';
import PostPage from '../PostPage/PostPage';
import Posts from '../Posts/Posts';
import PopularTags from '../PopularTags/PopularTags';
import Footer from '../Footer/Footer';

import { Link } from 'react-router-dom';
import queryString from 'query-string';
import qs from 'qs';

import devWrite from '../../devwrite';
import { getCurrentUser } from '../../helpers/index';
import authContext from '../../contexts/authContext';

import styles from './Main.module.css';

class Main extends React.Component{

    state = {}

    async determineDestination(){
        const { userId, postId } = this.props.match.params;
        const pathname = this.props.location.pathname.toString();

        await this.setState({ userId, postId, pathname });
    }

    pathChanged(){
        return this.props.location.pathname.toString() !== this.state.pathname;
    }

    fetchPopularTags = async () => {
        try {
            await devWrite.get('tags/');
        } catch(err) {
            console.log(err);
        }
    }

    getLoggedUser = async() => {
        const user = await getCurrentUser();
        await this.setState({ user });
    }

    async fetchData(){
        await this.getLoggedUser();
    }

    componentDidUpdate(){

        if(this.pathChanged()) {
            this.determineDestination();
            console.log('changed route')
        }
    }

    async componentDidMount(){
        this.determineDestination();
        await this.fetchData();
    }
    
    renderMain(){
        
        const { postId, userId, pathname } = this.state;

        if (!pathname) {
            return <h2>Loading...</h2>
        }
        if (postId) {
            return (
                <main className={styles.main}>
                    
                    <PostPage className={styles.postpage} id={postId}/>
                </main>
            );

        } else if (userId) {
            
            return <UserPage match={this.props.match} location={this.props.location} />

        } else {
            const query = qs.parse(this.props.location.search, {
                ignoreQueryPrefix: true
            })
            const pathParams = { ...this.props.match.params, ...query};
            return (
                <main className={styles.main}>
                    <div className={styles.posts}>
                        <Posts pathParams={pathParams}/>
                    </div>

                    <div className={styles.sidebar}>
                        <PopularTags />
                    </div>
                </main>
            );
        }
    }

    render() {
        const contextData = {...this.state.user, reEvaluateAuth:this.getLoggedUser}
        return (
            <div className={styles.container}>
                <authContext.Provider value={contextData}>
                    <Nav />
                    {this.renderMain()}
                    <Footer className={styles.footer} />
                </authContext.Provider>
                
            </div>
        );
    }
}

export default Main;