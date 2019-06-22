import React from 'react';
import styles from './UserInfo.module.css';
import { editUser } from '../../../helpers/index';

import { Link } from 'react-router-dom';

const renderAvatar = (name) => {
    name = name || 'Anonymous';
    let initials = name[0].toString().toUpperCase();
    initials = name.split(' ').length > 1 ? initials + name.split(' ')[name.split(' ').length - 1][0].toUpperCase() : initials;
    return (
        <div className={styles.avatar}>
            {initials}
        </div>
    );
}

const userInfo = (props) => {
    let { id, ownProfile, editing, name, about, website, following, followers, createdAt, followed, logout, toggleEdit, followUser } = props;

    const onSubmitHandler = async(id) => {
        const name = nameRef.current.innerText;
        const website = websiteRef.current.innerText;
        const about = aboutRef.current.innerText;

        await editUser({ id, name, about, website });
    }
    const followButtonTxt = followed ? 'Unfollow' : 'Follow';
    followers= followers || [];
    following=following || [];

    const nameRef = React.createRef();
    const aboutRef = React.createRef();
    const websiteRef = React.createRef();

    const editingBlockStyle = {
        marginBottom: '1rem',
        borderBottom: '1px solid #000',
        background: 'rgba(0,0,0,0.7)',
        color: '#fff'
    };

    return (
        <section className={styles.container}>
            <div className={styles.info}>
                <h1 
                    style={editing ? editingBlockStyle : {}}
                    suppressContentEditableWarning={true}
                    contentEditable={editing} 
                    className={styles.name} 
                    autoCorrect="false"
                    ref={nameRef} >
                    {name}
                </h1>

                <p contentEditable={editing} 
                    style={editing ? editingBlockStyle : {}}
                    suppressContentEditableWarning={true}
                    className={styles.about} 
                    placeholder="about you" 
                    ref={aboutRef}>
                    {about}
                </p>

                <p className={styles.memberSince}>
                    Member since 
                    <br></br>
                    <span>{createdAt}</span>
                </p>

                {!ownProfile && !website ? 
                null : 
                <p className={styles.website} name="website">
                    website:
                    <a contentEditable={editing} 
                        href={website ? `http://${website}` : window.location.href}
                        style={editing ? editingBlockStyle : {}}
                        suppressContentEditableWarning={true}
                        autoCorrect="false"
                        ref={websiteRef}
                        target="_blank" >
                        {website || "yourwebsite.com/EditBelow"}
                    </a>
                </p>
                }
                

                <div className={styles.networkLinks}>
                    <Link to={`/user/${id}/network/following`}>
                        {following.length} Following
                    </Link>
                    <Link to={`/user/${id}/network/followers`}>
                        {followers.length} Followers
                    </Link>
                </div>
                
                {ownProfile ? 
                <React.Fragment>
                    <div className={styles.authButtons}>
                        <button className={styles.editButton} 
                            onClick={toggleEdit}>
                            {editing ? 'Cancel' : 'Edit'}
                        </button>
                        {editing ?
                            <button className={styles.submitButton} 
                                onClick={()=>onSubmitHandler(id)}>
                                Submit Changes
                            </button>
                            : null
                        }
                    
                    </div>
                    <button 
                        className={styles.logoutButton} 
                        onClick={logout}>
                        Logout
                    </button>
                </React.Fragment>
                
                :
                <button 
                    className={styles.followButton} 
                    onClick={()=>followUser(id)}>
                    {followButtonTxt}
                </button>
                }
                
            </div>

            <div className={styles.avatarWrapper}>
                {renderAvatar(name)}
            </div>
            
        </section>
    );
}

export default userInfo;