const Input = ({ newTask, setNewTask, addTask, isEditing, editThisTask }) => {
    return (
        <form className="form">
            <label className="name-label">Enter Task Name</label>
            <input
                type="text"
                placeholder="Update UI, Create Submit Button"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="input-box"
            />
            {!!isEditing ? (
                <button onClick={editThisTask}>Edit Task</button>
            ) : (
                <button onClick={addTask}>Add Task</button>
            )}
        </form>
    );
};

export default Input;
