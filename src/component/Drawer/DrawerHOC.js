import React from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_DRAWER } from "../../redux/types/DrawerType";

export default function DrawerHOC() {
    const {visible, title, component} = useSelector(state => state.DrawerReducer);
    const dispatch = useDispatch();
    
    const handleClose = () => {
        dispatch({
            type: HIDE_DRAWER
        })
    }

    return (
        <div>
            <Drawer width={500} title={title} placement="right" visible={visible} onClose={handleClose}>
                {component}
            </Drawer>
        </div>
    );
}
