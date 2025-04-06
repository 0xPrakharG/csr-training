import { useState } from "react";
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

    const getTaskKey = (taskId) => {
        for (const key in tasks) {
            if (tasks[key].find((task) => task.id === taskId)) {
                return key;
            }
        }
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

    return (
        <div className="board">
            <Input
                newTask={newTask}
                setNewTask={setNewTask}
                addTask={addTask}
            />
            <TodoBoard
                tasks={tasks}
                moveToNext={moveToNext}
                moveToPrev={moveToPrev}
            />
        </div>
    );
};

export default Kanban;
