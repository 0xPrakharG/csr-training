const TodoBoard = ({ moveToNext, moveToPrev, tasks }) => {
    return (
        <div className="todo-board">
            <div className="container">
                <h3>Ready to Start</h3>
                {tasks.ready && (
                    <section className="ready">
                        {tasks.ready.map((readyTask) => (
                            <p key={readyTask.id} className="todo-content">
                                {readyTask.content}
                                <span>
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
                )}
            </div>
            <div className="container">
                <h3>In Progress</h3>
                {tasks.inProgress && (
                    <section className="in-progress">
                        {tasks.inProgress.map((readyTask) => (
                            <p key={readyTask.id} className="todo-content">
                                {readyTask.content}
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
                )}
            </div>
            <div className="container">
                <h3>Completed</h3>
                {tasks.completed && (
                    <section className="completed">
                        {tasks.completed.map((readyTask) => (
                            <p key={readyTask.id} className="todo-content">
                                {readyTask.content}
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
                )}
            </div>
        </div>
    );
};

export default TodoBoard;
