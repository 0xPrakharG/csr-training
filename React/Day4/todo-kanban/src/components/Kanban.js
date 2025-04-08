import { useEffect, useState } from "react";
import Input from "./Input";
import TodoBoard from "./TodoBoard";

const Kanban = () => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState({
        ready: [],
        inProgress: [],
        completed: [],
    });
    const [idCounter, setIdCounter] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskColumn, setEditingTaskColumn] = useState(null);

    const getTaskKey = (taskId) => {
        for (const key in tasks) {
            if (tasks[key].find((task) => task.id === taskId)) {
                return key;
            }
        }
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask) return;
        let newTaskContent = {
            id: `task-${idCounter}`,
            content: newTask,
        };
        setTasks({ ...tasks, ready: [...tasks.ready, newTaskContent] });
        setNewTask("");
        setIdCounter(() => idCounter + 1);
    };

    const deleteTask = (taskId) => {
        let sourceState = getTaskKey(taskId);
        const taskToDelete = tasks[sourceState].filter(
            (task) => task.id !== taskId
        );
        setTasks({ ...tasks, [sourceState]: taskToDelete });
    };

    const editTask = (taskId) => {
        setIsEditing(true);
        let sourceState = getTaskKey(taskId);
        const taskToEdit = tasks[sourceState].find(
            (task) => task.id === taskId
        );
        setTasks({
            ...tasks,
            [sourceState]: tasks[sourceState].filter(
                (task) => task.id !== taskId
            ),
        });
        setNewTask(taskToEdit.content);
        setEditingTaskColumn(sourceState);
        setEditingTaskId(taskId);
    };

    const editThisTask = (e) => {
        e.preventDefault();
        const updatedTask = {
            id: editingTaskId,
            content: newTask,
        };
        setTasks({
            ...tasks,
            [editingTaskColumn]: [...tasks[editingTaskColumn], updatedTask],
        });
        setIsEditing(false);
        setEditingTaskId(null);
        setEditingTaskColumn(null);
        setNewTask("");
    };

    const moveToNext = (taskId) => {
        let sourceState = getTaskKey(taskId);
        let destinationState;

        if (sourceState === "ready") {
            destinationState = "inProgress";
        } else if (sourceState === "inProgress") {
            destinationState = "completed";
        }

        setTasks({
            ...tasks,
            [sourceState]: tasks[sourceState].filter(
                (task) => task.id !== taskId
            ),
            [destinationState]: [
                ...tasks[destinationState],
                tasks[sourceState].find((task) => task.id === taskId),
            ],
        });
    };
    const moveToPrev = (taskId) => {
        let sourceState = getTaskKey(taskId);
        let destinationState;

        if (sourceState === "completed") {
            destinationState = "inProgress";
        } else if (sourceState === "inProgress") {
            destinationState = "ready";
        }

        setTasks({
            ...tasks,
            [sourceState]: tasks[sourceState].filter(
                (task) => task.id !== taskId
            ),
            [destinationState]: [
                ...tasks[destinationState],
                tasks[sourceState].find((task) => task.id === taskId),
            ],
        });
    };

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    return (
        <div className="board">
            <Input
                newTask={newTask}
                setNewTask={setNewTask}
                addTask={addTask}
                isEditing={isEditing}
                editThisTask={editThisTask}
            />
            <TodoBoard
                tasks={tasks}
                moveToNext={moveToNext}
                moveToPrev={moveToPrev}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        </div>
    );
};

export default Kanban;
