import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Toast from './Toast'

export default function ToastList() {
    const {toastList} = useSelector(state => state.ToastReducer);
    
    return (
        <div style={{position: 'fixed', top: '5%', right: 0, zIndex: 200}}>
            {toastList?.map((toast, index) => {
                return <Toast key={index} toast={toast} />
            })}
        </div>
    )
}
