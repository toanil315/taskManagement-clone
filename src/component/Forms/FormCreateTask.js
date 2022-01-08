import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { editorkey } from "../../util/constant";
import styles from "./Form.module.css";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { projectServices } from "../../services/ProjectServices";

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
        });
    };

    useEffect(() => {
        getInfos();
    }, []);

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
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const renderTypes = () => {
        return infos.types?.map((type, index) => {
            return (
                <Option key={index} value={type.id}>
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
                    {mem.name}
                </Option>
            );
        });
    };

    const renderPriority = () => {
        return infos.priorities?.map((priority, index) => {
            return (
                <Option key={index} value={priority.priorityId}>
                    {priority.priority}
                </Option>
            );
        })
    }

    const handleChangeMember = (value) => {
        console.log(value);
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
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={styles["form"]}>
                <div className={styles["field"]}>
                    <p>Task Name</p>
                    <input
                        placeholder="type something..."
                        className={styles["field-input"]}
                        type="text"
                        name="taskName"
                        onChange={formik.handleChange}
                    />
                    <p className={styles["error"]}></p>
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
                        value=""
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
                    <p className={styles["error"]}></p>
                </div>
                <div className={styles["field"]}>
                    <p>Assigness</p>
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="select members..."
                        onChange={handleChangeMember}
                        optionLabelProp="label"
                    >
                        {renderMember()}
                    </Select>
                </div>
                <div className={styles["group"]}>
                    <div className={styles["field"]}>
                        <p>Original Estimate</p>
                        <input
                            placeholder="Estimate..."
                            className={styles["field-input"]}
                            type="text"
                            name="originalEstimate"
                            onChange={handleEstimateChange}
                        />
                    </div>
                    <div className={styles["field"]}>
                        <p>Priority</p>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="select priority..."
                            onChange={handlePriorityChange}
                            value={formik.values.priorityId}
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
