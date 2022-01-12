import React from 'react';
import styles from './ModalSkeleton.module.css';

export default function ModalSkeleton() {
    return (
        <div className={styles['row']}>
            <div style={{width: "calc(65% - 20px)"}}>
                <div className={`${styles['skeleton']}`}></div>
                <div style={{width: '80%'}} className={`${styles['skeleton']}`}></div>
                <div style={{width: '100%', height: '150px', marginBottom: 30}} className={`${styles['skeleton']}`}></div>
                <div style={{width: '60%', height: 15}} className={`${styles['skeleton']}`}></div>
                <div className={styles['row']}>
                    <div className={`${styles['skeleton']} ${styles['circle']}`}></div>
                    <div style={{width: '90%', height: '50px'}} className={`${styles['skeleton']}`}></div>
                </div>
            </div>
            <div style={{width: "calc(35% - 20px)"}}>
                <div style={{marginBottom: 30}}>
                    <div style={{width: '60%', height: 15}} className={`${styles['skeleton']}`}></div>
                    <div className={`${styles['skeleton']}`}></div>
                </div>
                <div style={{marginBottom: 30}}>
                    <div style={{width: '60%', height: 15}} className={`${styles['skeleton']}`}></div>
                    <div className={`${styles['skeleton']}`}></div>
                </div>
                <div style={{marginBottom: 30}}>
                    <div style={{width: '60%', height: 15}} className={`${styles['skeleton']}`}></div>
                    <div className={`${styles['skeleton']}`}></div>
                </div>
            </div>
        </div>
    )
}
