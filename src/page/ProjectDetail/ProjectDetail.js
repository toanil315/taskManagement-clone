import { Tooltip } from "antd";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Breadcumb from "../../component/Breadcumb/Breadcumb";
import FormCreateTask from "../../component/Forms/FormCreateTask";
import { getProjectDetailAction } from "../../redux/actions/ProjectActions";
import { DISPLAY_DRAWER, SET_COMPONENT } from "../../redux/types/DrawerType";
import { DISPLAY_MODAL } from "../../redux/types/ModalType";
import styles from "./ProjectDetail.module.css";

export default function ProjectDetail() {
    const { projectId } = useParams();
    const { projectDetail } = useSelector((state) => state.ProjectReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProjectDetailAction(projectId));
    }, [projectId]);

    const displayModalTask = (taskId, projectId) => {
        dispatch({
            type: DISPLAY_MODAL,
            payload: {
                visible: true,
                taskId,
                projectId
            }
        })
    }

    const renderBoard = () => {
        return projectDetail?.lstTask?.map((listTask, index) => {
            return (
                <ul key={index} className={styles["column"]}>
                    <h3>{listTask.statusName}</h3>
                    {renderTasks(listTask.lstTaskDeTail)}
                </ul>
            );
        });
    };

    const renderTasks = (tasks) => {
        return tasks?.map((task, index) => {
            const type = task.taskTypeDetail.taskType;
            const priority = task.priorityTask.priority;
            return (
                <li onClick={() => {displayModalTask(task.taskId, task.projectId)}} key={index} className={styles["task"]}>
                    <h4>{task.taskName}</h4>
                    <div className={styles["info"]}>
                        <span
                            title={type}
                            className={`${styles["type"]} ${type === "bug" ? styles[type] : ""}`}
                        >
                            {type === "bug" ? (
                                <i className="fa fa-bug"></i>
                            ) : (
                                <i className="fas fa-check-square"></i>
                            )}
                        </span>
                        <span
                            title={`priority: ${priority}`}
                            className={`${styles["priority"]} ${styles[priority]}`}
                        >
                            {priority.includes("Low") ? (
                                <i className="fa fa-arrow-down"></i>
                            ) : (
                                <i className="fa fa-arrow-up"></i>
                            )}
                        </span>
                        <ul className={styles["assigness"]}>
                            {task.assigness.map((mem, index) => {
                                return (
                                    <li key={index}>
                                        <img src={mem.avatar} alt="assigness" />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </li>
            );
        });
    };

    const renderMembers = () => {
        return projectDetail?.members?.map((mem, index) => {
            return (
                <li key={index}>
                    <Tooltip placement="topRight" title={mem?.name}>
                        <div className={styles["ava"]}>
                            <img src={mem?.avatar} alt="avatar" />
                        </div>
                    </Tooltip>
                </li>
            );
        });
    };

    return (
        <div>
            <Breadcumb slashes={["Projects", "KanBan Board", projectId]} />
            <h1 className={styles["title"]}>{projectDetail?.projectName}</h1>
            <div className={styles["header"]}>
                <span className={styles["search"]}>
                    <label htmlFor="search">
                        <i className="fa fa-search"></i>
                    </label>
                    <input id="search" name="search" />
                </span>
                <ul className={styles["members"]}>{renderMembers()}</ul>
                <button
                    onClick={() => {
                        dispatch({
                            type: SET_COMPONENT,
                            payload: {
                                component: <FormCreateTask projectId={projectId} />,
                                title: "Create Task",
                            },
                        });
                        dispatch({
                            type: DISPLAY_DRAWER,
                        });
                    }}
                    className={styles["button"]}
                >
                    Add New Task
                </button>
            </div>
            <div className={styles["table"]}>{renderBoard()}</div>
        </div>
    );
}
