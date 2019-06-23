import React from 'react';
import styles from './Sort.module.css';
import { Link } from 'react-router-dom';
import history from '../../history';

const topPostsDays = [
    { value:1, display: 'Today' },
    { value:7, display:'This week' },
    { value:30, display: 'This month' },
    { value:365, display: 'This year' },
    { value:'all', display:'All time' }
];

const determineToggleDaysDisplay = (t) => {
    const topPostsDaysIndex = topPostsDays.findIndex(item => {
        return item.value == t;
    });
    let activeDayDisplay = `${t} days`;
    if (topPostsDaysIndex !==-1) {
        activeDayDisplay = topPostsDays[topPostsDaysIndex].display;
    }
    return activeDayDisplay;
}

const sort = ({ sortOrder, t, tag }) => {
    const [menuOpen, toggleMenu] = React.useState(false);
    const [menuOpen2, toggleMenu2] = React.useState(false);
    const sortOrderAlt = sortOrder === 'new' ? 'top' : 'new';
    const toggleDaysDisplay = determineToggleDaysDisplay(t);

    const changeTag = (e) => {
        const tag = e.target.value;
        let url = `/posts/${sortOrder}/?tag=${tag}`;
        if (t && sortOrder==='top') {
            url=url+`&t=${t}`;
        }
        history.push(url);
    }

    return (
        <div className={styles.container}>
            <div className={styles.menuWrapper}>

                <button className={styles.toggleButton} onClick={()=>toggleMenu(!menuOpen)}>
                    {sortOrder}
                    <i className="fa fa-chevron-down"></i>
                </button>
                {menuOpen ? 
                <div className={styles.menu}>
                    <Link to={`/posts/${sortOrderAlt}`} className={styles.menuItem}>
                        {sortOrderAlt}
                    </Link>
                </div>
                :null
                }
            </div>
            {sortOrder==='top' ? 
            <div className={styles.menuWrapper}>
                <button className={`${styles.toggleButton} ${styles.button2}`} onClick={()=>toggleMenu2(!menuOpen2)}>
                    {toggleDaysDisplay}
                    <i className="fa fa-chevron-down"></i>
                </button>
                {menuOpen2 ? 
                <div className={styles.menu}>
                    {topPostsDays.map(item => {
                        let link = `?t=${item.value}`;
                        if (tag) {
                            link+=`&tag=${tag}`;
                        }
                        return (
                            <Link to={link} key={item.value} className={styles.menuItem}>
                                {item.display}
                            </Link>
                        );
                    })}
                </div> :
                null
                }
            </div>
            :null
        }
        <input type="text" 
            defaultValue={tag || ''} 
            onChange={changeTag} 
            placeholder="filter by tag" 
            className={styles.tagInput}/>

        </div>
    );
}

export default sort;