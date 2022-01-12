import React from 'react'
import { useSelector } from 'react-redux';
import styles from './Loading.module.css';

export default function Loading() {
    const {visible} = useSelector(state => state.LoadingReducer);
    return (
        <div style={{display: visible ? "block" : "none"}} className={styles['loading']}>
            <img src={require("../../assets/img/loading.gif")} alt="loading" />
        </div>
    )
}
