import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Projects.module.css";
import { Table, Tooltip, Popconfirm, Popover, AutoComplete } from "antd";
import Breadcumb from "../../component/Breadcumb/Breadcumb";
import { useDispatch, useSelector } from "react-redux";
import {
    assignUserToProjectAction,
    deleteProjectAction,
    getAllProjectAction,
    getProjectCategoryAction,
} from "../../redux/actions/ProjectActions";
import { getListUserAction } from "../../redux/actions/UserActions";
import { SET_PROJECT_UPDATE } from "../../redux/types/ProjectType";
import { DISPLAY_DRAWER, SET_COMPONENT } from "../../redux/types/DrawerType";
import FormUpdateProject from "../../component/Forms/FormUpdateProject";
import {NavLink} from 'react-router-dom';

export default function Projects() {
    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState(undefined);
    const [valueInput, setValueInput] = useState("");
    const {projects} = useSelector(state => state.ProjectReducer);
    const dispatch = useDispatch();
    const searchUserRef = useRef(null);

    const getListUser = async (name) => {
        const data = await dispatch(getListUserAction(name));
        setUsers([...data]);
    };

    useEffect(() => {
        dispatch(getProjectCategoryAction());
        dispatch(getAllProjectAction());
    }, []);

    const confirmDelete = async (projectId) => {
        const isSuccess = await dispatch(deleteProjectAction(projectId));
        if (isSuccess) dispatch(getAllProjectAction());
    };

    const handleSearch = (value) => {
        setValueInput(value);
        if (searchUserRef.current) {
            clearTimeout(searchUserRef.current);
        }
        searchUserRef.current = setTimeout(() => {
            getListUser(value);
        }, 400);
    };

    const handleSelect = (value, option) => {
        setUserSelected(value);
        setValueInput(option.label);
    };

    const handleAssignUser = async (model) => {
        const isSuccess = await dispatch(assignUserToProjectAction(model));
        if (isSuccess) dispatch(getAllProjectAction());
    };

    const handleUpdate = (project) => {
        dispatch({
            type: SET_COMPONENT,
            payload: {
                component: <FormUpdateProject />,
                title: "Update Project"
            }
        })
        dispatch({
            type: SET_PROJECT_UPDATE,
            projectUpdate: project
        })
        dispatch({
            type: DISPLAY_DRAWER
        })
    }

    const renderUserListResult = useMemo(() => {
        return users?.map((user, index) => {
            return { label: user.name, value: user.userId };
        });
    }, [users]);


    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            width: "10%",
            render: (text, record, index) => {
                return <NavLink className={styles['text']} to={`projects/${text}`}>{text}</NavLink>
            }
        },
        {
            title: "Project Name",
            dataIndex: "projectName",
            width: "30%",
            render: (text, record, index) => {
                return <NavLink className={styles['text']} to={`projects/${record.id}`}>{text}</NavLink>
            }
        },
        {
            title: "Category",
            dataIndex: "categoryName",
            width: "15%",
            render: (text, record, index) => {
                switch (record.categoryId) {
                    case 1: {
                        return (
                            <span className={`${styles["cate-tag"]} ${styles["green"]}`}>
                                {text}
                            </span>
                        );
                    }
                    case 2: {
                        return (
                            <span className={`${styles["cate-tag"]} ${styles["blue"]}`}>
                                {text}
                            </span>
                        );
                    }

                    case 3: {
                        return (
                            <span className={`${styles["cate-tag"]} ${styles["red"]}`}>{text}</span>
                        );
                    }

                    default:
                        break;
                }
            },
        },
        {
            title: "Members",
            dataIndex: "members",
            width: "30%",
            render: (text, record, index) => {
                const assignComponent = (
                    <>
                        <AutoComplete
                            value={valueInput}
                            placeholder="Search something..."
                            onSearch={handleSearch}
                            onSelect={handleSelect}
                            style={{ width: 200 }}
                            options={renderUserListResult}
                        />
                        <button
                            onClick={() => {
                                handleAssignUser({
                                    projectId: record.id,
                                    userId: userSelected,
                                });
                                setValueInput("");
                            }}
                            className={styles["button-assign-user"]}
                        >
                            Assign
                        </button>
                    </>
                );
                if (text.length <= 2) {
                    return (
                        <div className={styles["list"]} key={index}>
                            {text.map((member) => {
                                return (
                                    <Tooltip
                                        placement="topRight"
                                        title={member?.name}
                                        key={member?.userId}
                                    >
                                        <div className={styles["ava"]}>
                                            <img src={member?.avatar} alt="avatar" />
                                        </div>
                                    </Tooltip>
                                );
                            })}
                            <Tooltip placement="topRight" title="Add new member">
                                <Popover
                                    content={assignComponent}
                                    title="Assign users"
                                    trigger="click"
                                    placement="right"
                                >
                                    <div style={{ cursor: "pointer" }} className={styles["ava"]}>
                                        <i className="fa fa-plus"></i>
                                    </div>
                                </Popover>
                            </Tooltip>
                        </div>
                    );
                }
                let membersClone = text.slice(0, 2);
                return (
                    <div className={styles["list"]} key={index}>
                        {membersClone.map((member) => {
                            return (
                                <Tooltip
                                    placement="topRight"
                                    title={member?.name}
                                    key={member?.userId}
                                >
                                    <div className={styles["ava"]}>
                                        <img src={member?.avatar} alt="avatar" />
                                    </div>
                                </Tooltip>
                            );
                        })}
                        <Tooltip placement="topRight" title="more">
                            <div className={styles["ava"]}>
                                <i className="fa fa-ellipsis-h"></i>
                            </div>
                        </Tooltip>
                        <Tooltip placement="topRight" title="Add new member">
                            <Popover
                                content={assignComponent}
                                title="Assign users"
                                trigger="click"
                                placement="right"
                            >
                                <div style={{ cursor: "pointer" }} className={styles["ava"]}>
                                    <i className="fa fa-plus"></i>
                                </div>
                            </Popover>
                        </Tooltip>
                    </div>
                );
            },
        },
        {
            title: "Actions",
            dataIndex: "id",
            width: "15%",
            render: (text, record, index) => {
                return (
                    <div className={styles["list"]} key={index}>
                        <Tooltip placement="topRight" title="Update Project">
                            <button onClick={() => {handleUpdate(record)}} className={`${styles["button"]} ${styles["update"]}`}>
                                <i className="fas fa-edit"></i>
                            </button>
                        </Tooltip>
                        <Tooltip placement="topRight" title="Delete Project">
                            <Popconfirm
                                title="Are you sure to delete this Project?"
                                onConfirm={() => {
                                    confirmDelete(text);
                                }}
                                okText="Yes"
                                cancelText="No"
                                placement="leftTop"
                            >
                                <button className={`${styles["button"]} ${styles["delete"]}`}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </Popconfirm>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    return (
        <div className={styles["projects"]}>
            <Breadcumb slashes={["Projects"]} />
            <h1 className={styles["title"]}>Project List</h1>
            <Table rowKey={(record) => record?.id} columns={columns} dataSource={projects} />
        </div>
    );
}
