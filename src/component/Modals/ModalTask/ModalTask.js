import { Editor } from "@tinymce/tinymce-react";
import { Dropdown, Select, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "../../../redux/types/ModalType";
import { projectServices } from "../../../services/ProjectServices";
import { editorkey } from "../../../util/constant";
import styles from "./ModalTask.module.css";
import parse from "html-react-parser";
import { getProjectDetailAction, updateTaskAction } from "../../../redux/actions/ProjectActions";
import ModalConfirm from "./ModalConfirm";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";

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
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);
    const [taskDetail, setTaskDetail] = useState({});
    const [comments, setComments] = useState([]);
    const [editorContent, setEditorContent] = useState("");
    const [commentContent, setCmtContent] = useState("");
    const [showEditor, setShowEditor] = useState(false);
    const [visibleModalConfirm, setModalConfirm] = useState(false);
    const { visible, taskId, projectId } = useSelector((state) => state.ModalReducer.modalTask);
    const debounceRef = useRef(null);
    const dispatch = useDispatch();

    const getInfos = () => {
        const dataTypes = projectServices.getType();
        const dataStatus = projectServices.getStatus();
        const dataPriority = projectServices.getPrority();
        const dataMembers = projectServices.getUserByProjectId(projectId);
        const dataTask = projectServices.getTaskDetail(taskId);
        const dataComment = projectServices.getComment(taskId);
        Promise.all([dataTypes, dataStatus, dataPriority, dataMembers, dataTask, dataComment]).then(
            (values) => {
                const [
                    responseTypes,
                    responseStatus,
                    responsePriority,
                    responseMembers,
                    responseTask,
                    responseComment,
                ] = values;
                setInfo({
                    types: responseTypes.data.content,
                    status: responseStatus.data.content,
                    priorities: responsePriority.data.content,
                    members: responseMembers.data.content,
                });
                setTaskDetail(responseTask.data.content);
                setComments(responseComment.data.content);
                setEditorContent(responseTask.data.content.description);
                setTimeout(() => {
                    setLoadingSkeleton(false);
                }, 800);
            }
        );
    };

    useEffect(() => {
        setLoadingSkeleton(true);
        if (taskId !== "" && projectId !== "") {
            getInfos();
            setShowEditor(false);
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

    const renderComment = () => {
        return comments?.map((cmt, index) => {
            return (
                <li key={index} className={styles["comment"]}>
                    <img src={cmt.user.avatar} alt="avatar" />
                    <div className={styles["cmt-content"]}>
                        <h4>{cmt.user.name}</h4>
                        <p>{cmt.contentComment}</p>
                    </div>
                </li>
            );
        });
    };

    const handleCmtChange = (event) => {
        setCmtContent(event.target.value);
    };

    const handleNameChange = (event) => {
        setTaskDetail({
            ...taskDetail,
            taskName: event.target.value,
        });
    };

    const handleTypeChange = (value) => {
        setTaskDetail({
            ...taskDetail,
            typeId: value,
        });
    };

    const handleDescriptionChange = (value) => {
        setEditorContent(value);
    };

    const handleStatusChange = (value) => {
        setTaskDetail({
            ...taskDetail,
            statusId: value,
        });
    };

    const handleAssignessChange = (value) => {
        //Bo gia tri default("Add more") ra khoi mang id
        const assignessFilter = value.filter((memberId) => {
            return memberId !== "";
        });
        //Chuyen ve format array = [
        //    {id}
        // ]
        const assignessArray = assignessFilter.map((id) => {
            return { id };
        });
        setTaskDetail({
            ...taskDetail,
            assigness: assignessArray,
        });
    };

    const handlePriorityChange = (value) => {
        setTaskDetail({
            ...taskDetail,
            priorityId: value,
        });
    };

    const handleEstimateChange = (event) => {
        setTaskDetail({
            ...taskDetail,
            originalEstimate: Number(event.target.value),
        });
    };

    const handleTrackingSpentChange = (event) => {
        setTaskDetail({
            ...taskDetail,
            timeTrackingSpent: Number(event.target.value),
            timeTrackingRemaining: taskDetail.originalEstimate - Number(event.target.value),
        });
    };

    useEffect(() => {
        if (taskDetail.taskName) {
            if (debounceRef.current !== null) {
                clearTimeout(debounceRef.current);
            }
            debounceRef.current = setTimeout(() => {
                console.log("debounce");
                //Change format from { assigness: [{id1}, {id2}...]} to { listUserAsign: [id1, id2,...]} for correct format in API
                let modelTask = { ...taskDetail };
                modelTask.listUserAsign = taskDetail.assigness?.map(({ id }) => {
                    return id;
                });
                delete modelTask.assigness;
                dispatch(updateTaskAction(modelTask));
            }, 700);
        }
    }, [taskDetail]);

    const sendComment = async (modalComment) => {
        try {
            console.log(modalComment);
            const { status } = await projectServices.insertComment(modalComment);
            if (status === 200) {
                setCmtContent("");
                const { data } = await projectServices.getComment(taskId);
                setComments(data.content);
            }
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const hideModalConfirm = () => {
        setModalConfirm(false);
    };

    const deleteTask = async () => {
        try {
            const { status } = await projectServices.deleteTask(taskId);
            if (status === 200) {
                await dispatch(getProjectDetailAction(projectId));
                setModalConfirm(false);
                dispatch({ type: HIDE_MODAL });
                return true;
            }
        } catch (error) {
            console.log("error: ", { ...error });
        }
    };

    if (loadingSkeleton) {
        return (
            <div style={{ display: visible ? "block" : "none" }} className={styles["modal-task"]}>
                <div className={styles["overlay"]}>
                    <div className={styles["content"]}>
                        <ModalSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <ModalConfirm
                title="Are you sure you want to delete this task?"
                note="Once you delete, it's gone for good."
                confirm={deleteTask}
                contentBtn="Delete Task"
                visible={visibleModalConfirm}
                onCancel={hideModalConfirm}
            />
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
                                    onChange={handleTypeChange}
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
                                <span
                                    onClick={() => {
                                        setModalConfirm(true);
                                    }}
                                    className={styles["item"]}
                                >
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
                                    onChange={handleNameChange}
                                />
                                <div className={styles["field"]}>
                                    <p className={styles["title"]}>Description</p>
                                    {showEditor ? (
                                        <div style={{ height: 300 }}>
                                            <Editor
                                                value={editorContent || ""}
                                                name="description"
                                                apiKey={editorkey}
                                                onEditorChange={handleDescriptionChange}
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
                                            <button
                                                onClick={() => {
                                                    setTaskDetail({
                                                        ...taskDetail,
                                                        description: editorContent,
                                                    });
                                                    setShowEditor(false);
                                                }}
                                                style={{ marginTop: "15px" }}
                                                className={styles["button"]}
                                            >
                                                Save
                                            </button>
                                            <button
                                                style={{ marginTop: "15px" }}
                                                onClick={() => {
                                                    setShowEditor(false);
                                                    setEditorContent(taskDetail.description);
                                                }}
                                                className={`${styles["button"]} ${styles["no-bg"]}`}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => {
                                                setShowEditor(true);
                                            }}
                                            style={{ minHeight: 300 }}
                                        >
                                            <div>{parse(taskDetail.description || "")}</div>
                                        </div>
                                    )}
                                </div>
                                <div className={styles["field"]}>
                                    <p className={styles["title"]}>Comments</p>
                                    <div className={styles["comment"]}>
                                        <img
                                            src={"https://ui-avatars.com/api/?name=Lona"}
                                            alt="avatar"
                                        />
                                        <div>
                                            <textarea
                                                rows={3}
                                                placeholder="Type something..."
                                                className={`${styles["task-name"]} ${styles["comment-field"]}`}
                                                type="text"
                                                onChange={handleCmtChange}
                                                value={commentContent}
                                            />
                                            <button
                                                onClick={() => {
                                                    sendComment({
                                                        taskId,
                                                        contentComment: commentContent,
                                                    });
                                                }}
                                                className={styles["button"]}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                    <ul className={styles["list-comment"]}>{renderComment()}</ul>
                                </div>
                            </div>
                            <div className={styles["content-right"]}>
                                <div className={styles["field"]}>
                                    <p className={styles["title"]}>Status</p>
                                    <Select
                                        onChange={handleStatusChange}
                                        value={taskDetail?.statusId}
                                        placeholder="Select a status"
                                    >
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
                                        onChange={handleAssignessChange}
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
                                        onChange={handlePriorityChange}
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
                                        onChange={handleEstimateChange}
                                        value={taskDetail.originalEstimate || 0}
                                        type="number"
                                        className={styles["field-number"]}
                                        min={0}
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
                                                        onChange={handleTrackingSpentChange}
                                                        min={0}
                                                        max={taskDetail.originalEstimate || 8}
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
        </>
    );
}
