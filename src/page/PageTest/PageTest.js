import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Toast from "../../component/Toast/Toast";
import ToastList from "../../component/Toast/ToastList";
import { Editor } from "@tinymce/tinymce-react";
import { editorkey } from "../../util/constant";
import parse from "html-react-parser";
import { useRef } from "react";

const data = {
    inProgress: [
        { id: 1, todo: "practice drag and drop" },
        { id: 2, todo: "play video game" },
        { id: 3, todo: "view loans images" },
        { id: 4, todo: "clean the floor" },
    ],
    done: [{ id: 5, todo: "eat lunch" }],
};

export default function PageTest() {
    const [todos, setTodos] = useState(data);
    const [previewUrl, setPreviewUrl] = useState("");
    const [editorContent, setEditorContent] = useState(`
        <p>This is the initial content of the editor.</p>
        <img src="https://tranhtreotuonghanoi.com/wp-content/uploads/2020/03/top-tranh-ve-phong-canh-cua-hoc-sinh-dep-nhat.jpg" alt="text-img" />
    `);
    const fileUploadRef = useRef(null);

    useEffect(() => {
        if (previewUrl) {
            setEditorContent(
                (preEditorContent) =>
                    preEditorContent +
                    `${
                        previewUrl
                            ? `<p><img src="${previewUrl}" alt="text-img" /></p>`
                            : ""
                    }`
            );
        }
    }, [previewUrl]);

    const renderTodosInProgress = () => {
        return todos.inProgress?.map((todo, indexTodo) => {
            return (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={indexTodo}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                    background: "white",
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 10,
                                    ...provided.draggableProps.style,
                                }}
                            >
                                {todo.id}.{todo.todo}
                            </div>
                        );
                    }}
                </Draggable>
            );
        });
    };

    const renderTodosDone = () => {
        return todos.done.map((todo, indexTodo) => {
            return (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={indexTodo}>
                    {(provided) => {
                        return (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                    padding: 10,
                                    marginBottom: "10px",
                                    backgroundColor: "white",
                                    borderRadius: 5,
                                    ...provided.draggableProps.style,
                                }}
                            >
                                {todo.todo}
                            </div>
                        );
                    }}
                </Draggable>
            );
        });
    };

    const reorder = (todos, startIndex, endIndex) => {
        const result = Array.from(todos);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        console.log(result);
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const clone = reorder(todos.inProgress, result.source.index, result.destination.index);

        setTodos({ ...todos, inProgress: [...clone] });
    };

    const handleEditorChange = (value) => {
        console.log("value of editor: ", value);
        setEditorContent(value);
    };

    const handleFileUpload = (files) => {
        console.log(files[0]);
        const imageUrl = URL.createObjectURL(files[0]);
        setPreviewUrl(imageUrl);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: "flex", width: "50%", justifyContent: "space-between" }}>
                <Droppable droppableId="inProgress">
                    {(provided) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    width: "calc(50% - 10px)",
                                    padding: 10,
                                    backgroundColor: "#dedede",
                                }}
                            >
                                {renderTodosInProgress()}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
                <Droppable droppableId="done">
                    {(provided) => {
                        return (
                            <div
                                style={{
                                    width: "calc(50% - 10px)",
                                    padding: 10,
                                    backgroundColor: "#dedede",
                                }}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {renderTodosDone()}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </div>
            <ToastList />

            <Editor
                value={editorContent}
                name="description"
                onEditorChange={handleEditorChange}
                apiKey={editorkey}
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
                        "removeformat | help | myCustomToolbarButton",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    setup: (editor) => {
                        editor.ui.registry.addButton("myCustomToolbarButton", {
                            icon: "image",
                            onAction: () => {
                                fileUploadRef.current.click();
                            },
                        });
                    },
                }}
            />
            {<div style={{maxWidth: '60vw'}}>{parse(editorContent)}</div>}
            <input
                onChange={(event) => {
                    handleFileUpload(event.target.files);
                }}
                style={{ display: "none" }}
                type="file"
                ref={fileUploadRef}
            />
        </DragDropContext>
    );
}
