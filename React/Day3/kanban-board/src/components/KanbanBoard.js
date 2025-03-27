import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import DroppableColumn from "./DroppableColumn";
import DraggableTask from "./DragabbleTask";

const KanbanBoard = () => {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("tasks")) || {
            todo: [],
            inProgress: [],
            done: [],
        }
    );
    const [newTaskContent, setNewTaskContent] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const sourceColumn = Object.keys(tasks).find((key) =>
            tasks[key].some((task) => task.id === active.id)
        );
        const destinationColumn = over.id;

        if (
            !sourceColumn ||
            !destinationColumn ||
            sourceColumn === destinationColumn
        )
            return;

        const taskToMove = tasks[sourceColumn].find(
            (task) => task.id === active.id
        );
        const newSourceTasks = tasks[sourceColumn].filter(
            (task) => task.id !== active.id
        );
        const newDestinationTasks = [...tasks[destinationColumn], taskToMove];

        setTasks({
            ...tasks,
            [sourceColumn]: newSourceTasks,
            [destinationColumn]: newDestinationTasks,
        });
    };

    const addTask = () => {
        if (!newTaskContent.trim()) return;
        const newTask = {
            id: `task-${Date.now()}`,
            content: newTaskContent,
        };
        setTasks({ ...tasks, todo: [...tasks.todo, newTask] });
        setNewTaskContent("");
    };

    const deleteTask = (taskId, columnId) => {
        setTasks({
            ...tasks,
            [columnId]: tasks[columnId].filter((task) => task.id !== taskId),
        });
    };

    return (
        <DndContext onDragEnd={onDragEnd}>
            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    value={newTaskContent}
                    onChange={(e) => setNewTaskContent(e.target.value)}
                    placeholder="Enter task description"
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="kanban-board">
                {Object.entries(tasks).map(([columnId, columnTasks]) => (
                    <DroppableColumn
                        key={columnId}
                        id={columnId}
                        title={columnId}
                    >
                        {columnTasks.map((task) => (
                            <div
                                key={task.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <DraggableTask task={task} />
                                <button
                                    onClick={() =>
                                        deleteTask(task.id, columnId)
                                    }
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </DroppableColumn>
                ))}
            </div>
        </DndContext>
    );
};

export default KanbanBoard;
