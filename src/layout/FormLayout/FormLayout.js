import React from 'react'
import { Outlet } from 'react-router-dom';
import styles from './FormLayout.module.css';

export default function FormLayout() {
    return (
        <div className={styles['container']}>
            <div className={styles['banner']}>
                <img src={require('../../assets/img/banner5.jpg')} alt="banner" />
            </div>
            <div className={styles['content']}>
                <Outlet />
            </div>
        </div>
    )
}
