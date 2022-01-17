import React, { Fragment, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../component/Sidebar/Sidebar';
import { TOKEN } from '../../util/constant';
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
