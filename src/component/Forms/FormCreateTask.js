import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { editorkey } from "../../util/constant";
import styles from "./Form.module.css";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { projectServices } from "../../services/ProjectServices";
import * as Yup from "yup";
import { createTaskAction } from "../../redux/actions/ProjectActions";
import { SHOW_TOAST } from "../../redux/types/ToastType";
import { HIDE_DRAWER } from "../../redux/types/DrawerType";

const { Option } = Select;

export default function FormCreateTask({ projectId }) {
    const [infos, setInfo] = useState({
        types: [],
        status: [],
        priorities: [],
        members: [],
    });
    const dispatch = useDispatch();

    const getInfos = () => {
        const dataTypes = projectServices.getType();
        const dataStatus = projectServices.getStatus();
        const dataPriority = projectServices.getPrority();
        const dataMembers = projectServices.getUserByProjectId(projectId);
        Promise.all([dataTypes, dataStatus, dataPriority, dataMembers]).then((values) => {
            const [responseTypes, responseStatus, responsePriority, responseMembers] = values;
            setInfo({
                types: responseTypes.data.content,
                status: responseStatus.data.content,
                priorities: responsePriority.data.content,
                members: responseMembers.data.content,
            });
        })
        .catch((error) => {
            dispatch({
                type: HIDE_DRAWER
            })
            dispatch({
                type: SHOW_TOAST,
                toast: {
                    id: Date.now(),
                    type: "error",
                    title: "Opps! Something went wrong.",
                    description: "You should add member into project before create task!"
                }
            })
        });
    };

    useEffect(() => {
        getInfos();
    }, [projectId]);

    const clearForm = () => {
        formik.setValues({
            listUserAsign: [],
            taskName: "",
            description: "",
            statusId: "1",
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: Number(projectId),
            typeId: 1,
            priorityId: 1,
        });
    };

    const formik = useFormik({
        initialValues: {
            listUserAsign: [],
            taskName: "",
            description: "",
            statusId: "1",
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: Number(projectId),
            typeId: 1,
            priorityId: 1,
        },
        validationSchema: Yup.object({
            taskName: Yup.string().required("*Project Name is Required!"),
            description: Yup.string().required("*Description is Required!"),
            originalEstimate: Yup.number().min(1, "*Original Estimate is invalid!"),
        }),
        onSubmit: (values) => {
            dispatch(createTaskAction(values, projectId));
            clearForm();
        },
    });

    const renderTypes = () => {
        return infos.types?.map((type, index) => {
            return (
                <Option key={index} value={type.id}>
                    {type.taskType === "bug" ? (
                        <i
                            style={{ color: "rgb(189, 28, 28)", paddingRight: "8px" }}
                            className="fa fa-bug"
                        ></i>
                    ) : (
                        <i
                            style={{ color: "#4FADE6", paddingRight: "8px" }}
                            className="fas fa-check-square"
                        ></i>
                    )}
                    {type.taskType}
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

    const renderMember = () => {
        // mem.avatar
        return infos.members?.map((mem, index) => {
            return (
                <Option key={index} value={mem.userId} label={mem.name}>
                    <img
                        style={{ width: 25, height: 25, borderRadius: "50%", marginRight: 10 }}
                        src={mem.avatar}
                        alt="avatar"
                    />
                    {mem.name}
                </Option>
            );
        });
    };

    const renderPriority = () => {
        return infos.priorities?.map((priority, index) => {
            return (
                <Option key={index} value={priority.priorityId}>
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

    const handleChangeMember = (value) => {
        formik.setFieldValue("listUserAsign", value);
    };

    const handleStatusChange = (value) => {
        formik.setFieldValue("statusId", value);
    };

    const handleTypeChange = (value) => {
        formik.setFieldValue("typeId", value);
    };

    const handleEstimateChange = (event) => {
        let time = Number(event.target.value);
        formik.setFieldValue("originalEstimate", time);
        formik.setFieldValue("timeTrackingSpent", 0);
        formik.setFieldValue("timeTrackingRemaining", time);
    };

    const handleEditorChange = (value) => {
        formik.setFieldValue("description", value);
    };

    const handlePriorityChange = (value) => {
        formik.setFieldValue("priorityId", value);
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={styles["form"]}>
                <div className={`${styles["field"]} ${formik.errors.taskName ? "error" : ""}`}>
                    <p>Task Name</p>
                    <input
                        placeholder="type something..."
                        className={styles["field-input"]}
                        type="text"
                        name="taskName"
                        onChange={formik.handleChange}
                        value={formik.values.taskName}
                    />
                    <p className={styles["error"]}>
                        {formik.errors.taskName && formik.touched.taskName
                            ? formik.errors.taskName
                            : ""}
                    </p>
                </div>
                <div className={styles["group"]}>
                    <div className={styles["field"]}>
                        <p>Type</p>
                        <Select
                            name="typeId"
                            className={styles["field-input"]}
                            value={formik.values.typeId}
                            style={{ width: "100%" }}
                            onChange={handleTypeChange}
                        >
                            {renderTypes()}
                        </Select>
                    </div>
                    <div className={styles["field"]}>
                        <p>Status</p>
                        <Select
                            name="statusId"
                            className={styles["field-input"]}
                            value={formik.values.statusId}
                            style={{ width: "100%" }}
                            onChange={handleStatusChange}
                        >
                            {renderStatus()}
                        </Select>
                    </div>
                </div>
                <div className={styles["field"]}>
                    <p>Description</p>
                    <Editor
                        value={formik.values.description}
                        name="description"
                        apiKey={editorkey}
                        onEditorChange={handleEditorChange}
                        init={{
                            height: 180,
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
                    <p className={styles["error"]}>
                        {formik.errors.description && formik.touched.description
                            ? formik.errors.description
                            : ""}
                    </p>
                </div>
                <div className={styles["field"]}>
                    <p>Assigness</p>
                    <Select
                        value={formik.values.listUserAsign}
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select members..."
                        onChange={handleChangeMember}
                        optionLabelProp="label"
                        name="listUserAsign"
                    >
                        {renderMember()}
                    </Select>
                </div>
                <div className={styles["group"]}>
                    <div
                        className={`${styles["field"]} ${
                            formik.errors.originalEstimate ? "error" : ""
                        }`}
                    >
                        <p>Original Estimate</p>
                        <input
                            placeholder="Estimate..."
                            className={styles["field-input"]}
                            type="text"
                            name="originalEstimate"
                            onChange={handleEstimateChange}
                            value={formik.values.originalEstimate}
                        />
                        <p className={styles["error"]}>
                            {formik.errors.originalEstimate && formik.touched.originalEstimate
                                ? formik.errors.originalEstimate
                                : ""}
                        </p>
                    </div>
                    <div className={styles["field"]}>
                        <p>Priority</p>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="select priority..."
                            onChange={handlePriorityChange}
                            value={formik.values.priorityId}
                            name="priorityId"
                        >
                            {renderPriority()}
                        </Select>
                    </div>
                </div>
                <button type="submit" className={styles["button"]}>
                    Create Task
                </button>
            </form>
        </div>
    );
}
