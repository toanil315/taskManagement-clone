import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <div className={styles['sidebar']}>
            <div className={styles['logo']}>
                <img src={require('../../assets/img/blue.png')} alt="logo" />
            </div>
            <ul className={styles['list']}>
                <li>
                    <NavLink className={({isActive}) => { 
                        return isActive ? `${styles['sidebar-item']} ${styles['active']}` : styles['sidebar-item']
                    }} to=""><i className="fas fa-list"></i> Projects</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => { 
                        return isActive ? `${styles['sidebar-item']} ${styles['active']}` : styles['sidebar-item']
                    }} to="createProject"><i className="fa fa-plus"></i> Create Project</NavLink>
                </li>
                <div className={styles['line']}></div>
                <li>
                    <p className={styles['sidebar-item']}> <i className="fa fa-truck"></i> Release</p>
                </li>
                <li>
                    <p className={styles['sidebar-item']}><i className="fa fa-cog"></i> Project Settings</p>
                </li>
                <li>
                    <p className={styles['sidebar-item']}><i className="fa fa-chart-line"></i> Reports</p>
                </li>
                <li>
                    <p className={styles['sidebar-item']}><i className="fas fa-sort-amount-up-alt"></i> Filter</p>
                </li>
                
            </ul>
        </div>
    )
}
