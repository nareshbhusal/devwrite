import React from 'react';
import styles from './Main.module.css';
import Nav from '../Nav/Nav';
import UserPage from '../User/UserPage/UserPage';
import PostPage from '../PostPage/PostPage';
import Posts from '../Posts/Posts';
import TagsCloud from '../TagsCloud/TagsCloud';
import Footer from '../Footer/Footer';

import qs from 'qs';
import helpers from '../../helpers/index';
import authContext from '../../contexts/authContext';

const getCurrentUser = helpers.getCurrentUser;
const getTagsCloud = helpers.getTagsCloud;

class Main extends React.Component{

    state = {}
    _isMounted=false;
    async determineDestination(){
        const { userId, postId } = this.props.match.params;
        const pathname = this.props.location.pathname.toString();

        await this.setState({ userId, postId, pathname });
    }

    pathChanged(){
        return this.props.location.pathname.toString() !== this.state.pathname;
    }

    getPopularTags = async () => {
        const popularTags = await getTagsCloud();
        await this.setState({ popularTags })
    }

    getLoggedUser = async() => {
        const user = await getCurrentUser();
        await this.setState({ user });
    }

    async fetchData(){
        await this.getLoggedUser();
        await this.getPopularTags();
    }

    componentDidUpdate(){
        if(this.pathChanged() && this._isMounted) {
            this.determineDestination();
        }
    }

    async componentDidMount(){
        this._isMounted=true;
        this.determineDestination();
        await this.fetchData();
    }
    componentWillUnmount(){
        this._isMounted=false;
    }
    
    renderMain(){
        const { postId, userId, pathname, popularTags } = this.state;

        if (!pathname) {
            return <h2>Loading...</h2>
        }
        if (postId) {
            return (
                <main className={styles.main}>
                    <PostPage key={`post${postId}`} className={styles.postpage} id={postId}/>
                </main>
            );

        } else if (userId) {
            return <UserPage key={`user${userId}`} match={this.props.match} location={this.props.location} />

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
                        <TagsCloud tags={popularTags} />
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
