import React, { useEffect, useState } from "react";
import styles from "./ModalTask.module.css";

export default function ModalConfirm({ title, note, confirm, contentBtn, visible, onCancel }) {
    const [isLoading, setLoading] = useState(false);

    const onConfirm = async () => {
        setLoading(true);
        const isSuccess = await confirm()
        setLoading(false);
    }

    return (
        <div
            style={{ zIndex: 10, display: visible ? "block" : "none" }}
            className={styles["modal-task"]}
        >
            <div style={{ zIndex: 11 }} className={styles["overlay"]}>
                <div style={{ zIndex: 12, width: '40%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className={styles["content"]}>
                    <h2 style={{marginBottom: 25}} className={styles["title-confirm"]}>{title}</h2>
                    <p style={{marginBottom: 25}} className={styles["note-confirm"]}>{note}</p>
                    <div>
                        <button onClick={onConfirm} className={`${styles["button"]} ${isLoading ? "loading" : ""}`}>
                            {contentBtn}
                        </button>
                        <button
                            onClick={onCancel}
                            className={`${styles["button"]} ${styles["no-bg"]}`}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
