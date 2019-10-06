import React, { useState, useEffect } from 'react';
import styles from './UserInfo.module.css';
import { Link } from 'react-router-dom';
import UserIcon from '../../UserIcon/UserIcon';
import Loader from '../../Loader/Loader';
import authContext from '../../../contexts/authContext';
import helpers from '../../../helpers/index';
const editUser = helpers.editUser;
import { useAlert } from 'react-alert';

const avatarSize=20;

const userInfo = (props) => {
    let { id, ownProfile, name, 
        about, website, following, followers, 
        createdAt, followed, logout, followUser 
    } = props;

    const photo = props.photo || '';
    let [avatarURL, setAvatarURL] = useState(photo);
    const [editing, toggleEdit] = useState(false);
    const alert = useAlert();
    const userContext =  React.useContext(authContext);

    const onSubmitHandler = async(id) => {
        const name = nameRef.current.innerText;
        const website = websiteRef.current.innerText;
        const about = aboutRef.current.innerText;
        const res = await editUser({ id, name, about, website, photo: avatarURL }, alert);
        if (res.msg) {
            toggleEdit(false);
        }
        // refresh auth
        userContext.reEvaluateAuth();
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
    if (!name){
        return <Loader />;
    }
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
                            onClick={()=>toggleEdit(!editing)}>
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
            <UserIcon key={id}
            editing={editing}
            onChangeHandler={setAvatarURL} 
            avatarURL={avatarURL} name={name} 
            id={id} size={avatarSize}/>
        </section>
    );
}

export default userInfo;