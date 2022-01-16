import React, { useEffect, useRef, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { DELETE_TOAST } from "../../redux/types/ToastType";
import styles from "./Toast.module.css";

function Toast({ toast }) {
    const { id, type, title, description } = toast;
    const [display, setDisplay] = useState(true);
    const toastRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const node = toastRef.current;
        setTimeout(() => {
            node.classList.add(styles["hide"]);
        }, 5500);

        setTimeout(() => {
            node.style.display = 'none';
        }, 6001);
        setTimeout(() => {
            dispatch({
                type: DELETE_TOAST,
                toastId: id,
            })
        }, 6001);
    }, []);

    return display ? (
        <div ref={toastRef} className={`${styles["toast"]} ${styles[type]} ${Date.now()}`}>
            <span className={styles["line"]}></span>
            <span className={styles["logo"]}>
                {type === "success" ? (
                    <i className="fa fa-check"></i>
                ) : (
                    <i className="fa fa-exclamation"></i>
                )}
            </span>
            <div className={styles["toast-content"]}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    ) : (
        ""
    );
}

export default memo(Toast);
