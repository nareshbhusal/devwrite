import React from 'react';
import styles from './UserCard.module.css';

import { Link } from 'react-router-dom';
import history from '../../../history';

import UserIcon from '../../UserIcon/UserIcon';
import helpers from '../../../helpers/index';
const fetchUser = helpers.fetchUser;

class userCard extends React.Component {

    state = {}
    fetchData = async() => {
        const user = await fetchUser(this.props.id);
        await this.setState({ ...user });
    }
    async componentDidMount() {
        await this.fetchData();
    }
    follow = async() => {
        this.props.followUser(this.props.id);
        await this.fetchData();
    }

    render() {
        let { id, name, about, website, createdAt, followed, photo } = this.state;
        about = about || '';
        website = website ||'';
        const description = about || `Member since ${createdAt}`;

        return (
            <article className={styles.container}>
                <UserIcon className={styles.usericon} name={name} id={id} avatarURL={photo}/>
                <div className={styles.info}>
                    <Link to={`/user/${id}`} className={styles.name}>
                        {name}
                    </Link>
                    <br />
                    <Link to={`/user/${id}`} className={styles.about}>
                        {description}
                    </Link>
                    <br />
                    <button onClick={()=>this.follow(id)} className={styles.followButton}>
                        { followed ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            </article>
        );
    }
}

export default userCard;