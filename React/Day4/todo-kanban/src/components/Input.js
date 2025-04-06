const Input = ({ newTask, setNewTask, addTask }) => {
    return (
        <form className="form">
            <label className="name-label">Enter the task</label>
            <input
                type="text"
                placeholder="Update UI, Create Submit Button"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="input-box"
            />
            <button onClick={addTask}>Add Task</button>
        </form>
    );
};

export default Input;
