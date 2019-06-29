import React from 'react';
import styles from './Editor.module.css';
import { fetchPost, createPost, editPost } from '../../helpers';
import history from '../../history';

import Logo from '../Logo/Logo';
import themeIcon from '../../assets/theme.png';
import themeIconLight from '../../assets/themeLight.png';

class Editor extends React.Component{
    state = {
        title: '',
        body: '',
        theme: 'light',
        tags: '',
        saved: true,
        toEdit: false // 
    }
    titleRef = React.createRef();
    bodyRef = React.createRef();
    tagRef = React.createRef();

    renderTopBar(){
        const { body, saved, theme } = this.state;
        return (
            <div className={styles.topbar + ` ${theme ==='dark' ? styles.dark : styles.light}`}>
                <Logo className={styles.logo} />

                <div className={styles.metaData}>
                    <span className={styles.saveStatus}>
                        {saved ? 'saved' : 'saving...'}
                    </span>
                    <span className={styles.wordCount}>
                        {body.split(' ').length} words
                    </span>
                </div>
                <div className={styles.btns}>
                    <button 
                        onClick={this.changeTheme} 
                        className={styles.themeBtn}>
                            {theme ==='light' ? 
                            <img src={themeIcon}/> :
                            <img src={themeIconLight}/>
                            } 
                    </button>
                    <button 
                        onClick={this.onSubmitHandler} 
                        className={styles.publishBtn}>
                        <i className="fa fa-paper-plane-o"></i>
                    </button>
                </div>
            </div>
        );
    }

    onSubmitHandler = async() => {
        const { postId } = this.props.match.params;
        const { title, body, tags } = this.state;
        let res;
        if(postId) {
            res = await editPost(postId, {
                title,
                body,
                tags
            });
        } else {
            res = await createPost({
                title,
                body,
                tags
            });
        }
        if (res.msg) {
            // if successful
            this.resetLocalStorage();
            history.goBack();
        }
    }

    changeTheme = async () => {
        const newTheme = this.state.theme === 'light' ? 'dark': 'light';
        await this.setState({ theme: newTheme });
        await this.savetoLocalStorage();
    }

    savetoLocalStorage = async () => {
        const { title, body, theme, tags } = this.state;
        const data = { title, body, theme, tags };
        await window.localStorage.setItem('data', JSON.stringify(data));
    }

    retrieveLocalStorage = async () => {
        let data = await window.localStorage.getItem('data');
        data = JSON.parse(data);
        let { title, body, theme, tags } = data || {};

        title = title || '';
        body = body || '';
        tags = tags || '';
        theme = theme || 'light';

        await this.setState({
            title,
            body,
            theme,
            tags
        });
    }

    handleChange = async e => {
        e.persist();

        await this.setState({ saved: false });
        const name = e.target.getAttribute('name');
        let value = this[`${name}Ref`].current.innerHTML;
        
        await this.setState({ [name]: value });
        await this.savetoLocalStorage();
        await this.setState({ saved: true });
    };

    tagsChangeHandler = async (e) => {
        const tags = e.target.value;
        const tagList = tags.trim() ? tags.split(' ') : [];
        if (tagList.length > 5) {
            return;
        }
        await this.setState({ tags });
        await this.savetoLocalStorage();
    }

    resetLocalStorage = async () => {
        const data = { title: '', body: '', theme: this.state.theme };
        window.localStorage.setItem('data', JSON.stringify(data));
    }

    componentDidMount = async() => {
        const { postId } = this.props.match.params;
        await this.retrieveLocalStorage();

        if (postId) {
            await this.setState({ title: '', body: '', tags:'' });
            const post = await fetchPost(postId);
            await this.setState({ ...post });
        }
        this.titleRef.current.innerHTML = this.state.title;
        this.bodyRef.current.innerHTML = this.state.body;
    }

    render() {
        const { theme } = this.state;
        return (
            <div className={styles.container + ` ${theme==='light' ? styles.light : styles.dark}`}>
                {this.renderTopBar()}
                <div className={styles.editor}>
                    
                    <h1 className={styles.title}
                        contentEditable
                        name="title"
                        ref={this.titleRef}
                        placeholder="Title"
                        onInput={this.handleChange}
                        onBlur={this.handleChange}>
                    </h1>

                    <p className={styles.body}
                        contentEditable
                        placeholder="Write your story"
                        name="body"
                        ref={this.bodyRef}
                        onInput={this.handleChange}
                        onBlur={this.handleChange}>
                    </p>

                    <input value={this.state.tags} 
                        onChange={this.tagsChangeHandler} 
                        placeholder="Add upto 5 tags seperated by space" 
                        type="text" name="tags" className={styles.tags}/>
                </div>
            </div>
        );
    }
}

export default Editor;