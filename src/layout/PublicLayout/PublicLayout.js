import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../../component/Sidebar/Sidebar';
import './PublicLayout.css';

export default function PublicLayout() {
    return (
       <div className="container">
           <Sidebar />
           <div className="content">
               <Outlet />
           </div>
       </div>
    )
}
