const TodoBoard = ({ moveToNext, moveToPrev, tasks, deleteTask, editTask }) => {
    return (
        <div className="todo-board">
            <div className="container">
                <h3>Ready to Start</h3>
                {tasks.ready.length > 0 ? (
                    <section className="ready">
                        {tasks.ready.map((readyTask) => (
                            <p key={readyTask.id} className="todo-content">
                                {readyTask.content}
                                <button
                                    onClick={() => deleteTask(readyTask.id)}
                                >
                                    X
                                </button>
                                <button onClick={() => editTask(readyTask.id)}>
                                    edit
                                </button>
                                <span className="buttons">
                                    <button
                                        onClick={() => moveToNext(readyTask.id)}
                                        className="next-btn"
                                    >
                                        Move to In Progress
                                    </button>
                                </span>
                            </p>
                        ))}
                    </section>
                ) : (
                    <div className="empty-msg">
                        <p>There are no tasks to show</p>
                    </div>
                )}
            </div>
            <div className="container">
                <h3>In Progress</h3>
                {tasks.inProgress.length > 0 ? (
                    <section className="in-progress">
                        {tasks.inProgress.map((readyTask) => (
                            <p key={readyTask.id} className="todo-content">
                                {readyTask.content}
                                <button
                                    onClick={() => deleteTask(readyTask.id)}
                                >
                                    X
                                </button>
                                <button onClick={() => editTask(readyTask.id)}>
                                    edit
                                </button>
                                <span>
                                    <button
                                        onClick={() => moveToPrev(readyTask.id)}
                                        className="prev-btn"
                                    >
                                        Move to Previous State
                                    </button>
                                    <button
                                        onClick={() => moveToNext(readyTask.id)}
                                        className="next-btn"
                                    >
                                        Mark as Completed
                                    </button>
                                </span>
                            </p>
                        ))}
                    </section>
                ) : (
                    <div className="empty-msg">
                        <p>There are no tasks to show</p>
                    </div>
                )}
            </div>
            <div className="container">
                <h3>Completed</h3>
                {tasks.completed.length > 0 ? (
                    <section className="completed">
                        {tasks.completed.map((readyTask) => (
                            <p key={readyTask.id} className="todo-content">
                                {readyTask.content}
                                <button
                                    onClick={() => deleteTask(readyTask.id)}
                                >
                                    X
                                </button>
                                <button onClick={() => editTask(readyTask.id)}>
                                    edit
                                </button>
                                <span>
                                    <button
                                        onClick={() => moveToPrev(readyTask.id)}
                                        className="prev-btn"
                                    >
                                        Move to Previous State
                                    </button>
                                </span>
                            </p>
                        ))}
                    </section>
                ) : (
                    <div className="empty-msg">
                        <p>There are no tasks to show</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoBoard;
