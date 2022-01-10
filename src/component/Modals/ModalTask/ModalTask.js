import { Editor } from "@tinymce/tinymce-react";
import { Dropdown, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "../../../redux/types/ModalType";
import { projectServices } from "../../../services/ProjectServices";
import { editorkey } from "../../../util/constant";
import styles from "./ModalTask.module.css";
import parse from "html-react-parser";

const { Option } = Select;

function tagRender(props) {
    const { label, value, closable, onClose } = props;
    return value === "" ? (
        <Tag className={`${styles["tag"]} ${styles["default"]}`}>
            {/* <div className={`${styles["tag"]} ${value === "" ? "default" : ""}`}></div> */}
            <span>{label}</span>
        </Tag>
    ) : (
        <Tag closable={closable} onClose={onClose} className={`${styles["tag"]}`}>
            {/* <div className={`${styles["tag"]} ${value === "" ? "default" : ""}`}></div> */}
            <span>{label}</span>
        </Tag>
    );
}

export default function ModalTask() {
    const [infos, setInfo] = useState({
        types: [],
        status: [],
        priorities: [],
        members: [],
    });
    const [taskDetail, setTaskDetail] = useState({});
    const [showEditor, setShowEditor] = useState(false);
    const { visible, taskId, projectId } = useSelector((state) => state.ModalReducer.modalTask);
    const dispatch = useDispatch();

    const getInfos = () => {
        const dataTypes = projectServices.getType();
        const dataStatus = projectServices.getStatus();
        const dataPriority = projectServices.getPrority();
        const dataMembers = projectServices.getUserByProjectId(projectId);
        const dataTask = projectServices.getTaskDetail(taskId);
        Promise.all([dataTypes, dataStatus, dataPriority, dataMembers, dataTask]).then((values) => {
            const [responseTypes, responseStatus, responsePriority, responseMembers, responseTask] =
                values;
            setInfo({
                types: responseTypes.data.content,
                status: responseStatus.data.content,
                priorities: responsePriority.data.content,
                members: responseMembers.data.content,
            });
            setTaskDetail(responseTask.data.content);
        });
    };

    useEffect(() => {
        if (taskId !== "" && projectId !== "") {
            getInfos();
        }
    }, [taskId, projectId]);

    const renderType = () => {
        return infos.types?.map((type, index) => {
            return (
                <Option key={index} value={type.id}>
                    <div className={`${styles["type"]} ${styles[type.taskType]}`}>
                        {type.taskType === "bug" ? (
                            <i style={{ paddingRight: 10 }} className="fa fa-bug"></i>
                        ) : (
                            <i style={{ paddingRight: 10 }} className="fa fa-check-square"></i>
                        )}
                        {type.taskType === "bug" ? "BUG" : "TASK"}-
                        <span className={styles["task-id"]}>{taskId || ""}</span>
                    </div>
                </Option>
            );
        });
    };

    const renderStatus = () => {
        return infos.status?.map((status, index) => {
            return (
                <Option key={index} value={status.statusId}>
                    {status.statusName}
                </Option>
            );
        });
    };

    const renderAssigness = () => {
        return infos.members?.map((mem, index) => {
            return (
                <Option
                    key={index}
                    value={mem.userId}
                    label={
                        <div>
                            <img src={mem.avatar} alt="avatar" />
                            {mem.name}
                        </div>
                    }
                >
                    <div>
                        <img
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: 10,
                            }}
                            src={mem.avatar}
                            alt="avatar"
                        />
                        {mem.name}
                    </div>
                </Option>
            );
        });
    };

    const renderPriority = () => {
        return infos.priorities?.map((priority, index) => {
            return (
                <Option value={priority.priorityId} key={index}>
                    {priority.priority.includes("Low") ? (
                        <i
                            className={`${styles["priority"]} ${
                                styles[priority.priority]
                            } fa fa-arrow-down`}
                        ></i>
                    ) : (
                        <i
                            className={`${styles["priority"]} ${
                                styles[priority.priority]
                            } fa fa-arrow-up`}
                        ></i>
                    )}
                    <span style={{ paddingLeft: 10 }}>{priority.priority}</span>
                </Option>
            );
        });
    };

    return (
        <div style={{ display: visible ? "block" : "none" }} className={styles["modal-task"]}>
            <div className={styles["overlay"]}>
                <div className={styles["content"]}>
                    <div className={styles["header"]}>
                        <div className={styles["type"]}>
                            <Select
                                showArrow={false}
                                style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "unset",
                                    border: 0,
                                }}
                                bordered={false}
                                value={taskDetail.typeId}
                            >
                                {renderType()}
                            </Select>
                        </div>
                        <div className={styles["user-ctrl"]}>
                            <span className={styles["item"]}>
                                <i className="fa fa-paper-plane"></i>
                                <span>Give feedback</span>
                            </span>
                            <span className={styles["item"]}>
                                <i className="fa fa-link"></i>
                                <span>Copy link</span>
                            </span>
                            <span className={styles["item"]}>
                                <i className="fa fa-trash"></i>
                            </span>
                            <span
                                onClick={() => {
                                    dispatch({ type: HIDE_MODAL });
                                }}
                                className={styles["item"]}
                            >
                                <i className="fa fa-times"></i>
                            </span>
                        </div>
                    </div>
                    <div className={styles["row"]}>
                        <div className={styles["content-left"]}>
                            <textarea
                                value={taskDetail.taskName}
                                className={styles["task-name"]}
                                type="text"
                            />
                            <div className={styles["field"]}>
                                <p className={styles["title"]}>Description</p>
                                {showEditor ? (
                                    <div style={{ height: 300 }}>
                                        <Editor
                                            value={taskDetail.description || ""}
                                            name="description"
                                            apiKey={editorkey}
                                            init={{
                                                height: 250,
                                                menubar: false,
                                                plugins: [
                                                    "advlist autolink lists link image charmap print preview anchor",
                                                    "searchreplace visualblocks code fullscreen",
                                                    "insertdatetime media table paste code help wordcount",
                                                ],
                                                toolbar:
                                                    "undo redo | formatselect | " +
                                                    "bold italic backcolor | alignleft aligncenter " +
                                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                                    "removeformat | help",
                                                content_style:
                                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                            }}
                                        />
                                        <button style={{marginTop: '15px'}} className={styles["button"]}>Save</button>
                                        <button
                                            style={{marginTop: '15px'}}
                                            onClick={() => {
                                                setShowEditor(false);
                                            }}
                                            className={`${styles["button"]} ${styles["no-bg"]}`}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ minHeight: 300 }}>
                                        <div
                                            onClick={() => {
                                                setShowEditor(true);
                                            }}
                                        >
                                            {parse(taskDetail.description || "")}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles["field"]}>
                                <p className={styles["title"]}>Comments</p>
                                <div className={styles["comment"]}>
                                    <img src={"https://ui-avatars.com/api/?name=Lona"} alt="avatar" />
                                    <div>
                                        <textarea
                                            rows={3}
                                            placeholder="Type something..."
                                            className={`${styles["task-name"]} ${styles['comment-field']}`}
                                            type="text"
                                        />
                                        <button className={styles["button"]}>Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles["content-right"]}>
                            <div className={styles["field"]}>
                                <p className={styles["title"]}>Status</p>
                                <Select value={taskDetail?.statusId} placeholder="Select a status">
                                    {renderStatus()}
                                </Select>
                            </div>
                            <div className={styles["field"]}>
                                <p className={styles["title"]}>Assigness</p>
                                <Select
                                    mode="multiple"
                                    style={{
                                        width: "80%",
                                        backgroundColor: "transparent",
                                        boxShadow: "unset",
                                        border: 0,
                                    }}
                                    placeholder="select one country"
                                    value={
                                        taskDetail.assigness
                                            ? [...taskDetail.assigness.map((mem) => mem.id), ""]
                                            : [""]
                                    }
                                    optionLabelProp="label"
                                    bordered={false}
                                    tagRender={tagRender}
                                >
                                    {renderAssigness()}
                                    <Option
                                        style={{ display: "none" }}
                                        value=""
                                        label={
                                            <div>
                                                <i className="fa fa-plus"></i>
                                                Add more
                                            </div>
                                        }
                                    >
                                        <div>
                                            <i className="fa fa-plus"></i>
                                            Add more
                                        </div>
                                    </Option>
                                </Select>
                            </div>
                            <div className={styles["field"]}>
                                <p className={styles["title"]}>Priority</p>
                                <Select
                                    style={{ width: "50%" }}
                                    placeholder="select priority..."
                                    name="priorityId"
                                    value={taskDetail.priorityId || ""}
                                >
                                    {renderPriority()}
                                </Select>
                            </div>
                            <div className={styles["field"]}>
                                <p className={styles["title"]}>Original estimate (hours)</p>
                                <input
                                    value={taskDetail.originalEstimate || 0}
                                    type="number"
                                    className={styles["field-number"]}
                                />
                            </div>
                            <div className={styles["field"]}>
                                <p className={styles["title"]}>Time tracking</p>
                                <div className={styles["times"]}>
                                    <i className="far fa-clock"></i>
                                    <div className={styles["timeline"]}>
                                        <div className={styles["time-bg"]}>
                                            <span
                                                style={{
                                                    width: `${
                                                        (taskDetail.timeTrackingSpent /
                                                            taskDetail.originalEstimate) *
                                                        100
                                                    }%`,
                                                }}
                                                className={styles["width"]}
                                            ></span>
                                        </div>
                                        <div className={styles["hour"]}>
                                            <span>
                                                <input
                                                    style={{
                                                        width: "40px",
                                                        marginRight: 5,
                                                        fontSize: "14px",
                                                        fontWeight: 500,
                                                        color: "#52617B",
                                                    }}
                                                    value={taskDetail.timeTrackingSpent || 0}
                                                    type="number"
                                                    className={styles["field-number"]}
                                                />
                                                h logged
                                            </span>
                                            <span>
                                                {taskDetail.originalEstimate || 0}h estimated
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
