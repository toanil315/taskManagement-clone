import React, { Fragment } from 'react'
import styles from './Breadcumb.module.css';
import {NavLink} from 'react-router-dom';

export default function Breadcumb({slashes}) {
    return (
        <div className={styles['breadcumb']}>
            <p>Jira Clone</p>
            {slashes.map((item, index) => {
                return <Fragment key={index}>
                    <span className={styles['slash']}>/</span>
                    <p>{item}</p>
                </Fragment>
            })}
        </div>
    )
}
