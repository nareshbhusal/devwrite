import React from 'react';
import styles from './TagsCloud.module.css';
import { Link } from 'react-router-dom';

const tagsCloud = ({ tags }) => {
    return (
        <article className={styles.container}>
            
            {tags ? tags.map(tag => {
                return (
                    <Link key={tag.tagName} className={styles.tag} to={`?tag=${tag.tagName}`}>
                        {`#${tag.tagName}`}
                    </Link>
                )
            }) :
            <p>No tags found :/</p>
            }
        </article>
    )
}

export default tagsCloud;