import React from 'react';
import styles from './UserCard.module.css';

import { followUser, fetchUser } from '../../../helpers/index';
import { Link } from 'react-router-dom';
import history from '../../../history';

import UserIcon from '../../UserIcon/UserIcon';

class userCard extends React.Component {

    state = {}
    fetchData = async() => {
        const user = fetchUser(this.props.id);
        await this.setState({ ...user });
    }
    async componentDidMount() {
        await this.fetchData();
    }

    render() {
        const name= this.state.name || "Nota Stalker";
        const about=this.state.about || "I like kids. I also like to watch people in the park, especially the kid... on the park."
        const id = 'id';
        return (
            <article onClick={()=>history.push(`/user/${id}`)} className={styles.container}>
                <UserIcon className={styles.usericon} name={name} id={id}/>
                <div className={styles.info}>
                    <Link to={`user/${id}`} className={styles.name}>
                        {name}
                    </Link>
                    <p className={styles.about}>
                        {about}
                    </p>
                    <button onClick={()=>followUser(id)} className={styles.followButton}>
                        Follow
                    </button>
                </div>
            </article>
        );
    }
}

export default userCard;