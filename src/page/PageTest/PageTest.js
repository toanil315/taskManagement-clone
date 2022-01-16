import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
                                    background: 'white',
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

        setTodos({ ...todos, inProgress: [...clone]});
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
                        return <div
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
                        </div>;
                    }}
                </Droppable>
            </div>
        </DragDropContext>
    );
}