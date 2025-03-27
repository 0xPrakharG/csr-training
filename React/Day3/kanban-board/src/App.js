import KanbanBoard from "./components/KanbanBoard";
import "./App.css";

function App() {
    // const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });

    // useEffect(() => {
    //     JSON.parse(localStorage.getItem("tasks"));
    // }, []);

    // useEffect(() => {
    //     JSON.parse(localStorage.setItem("tasks", JSON.stringify(tasks)));
    // }, [tasks]);

    return (
        <div>
            <h1>Kanban Board</h1>
            <KanbanBoard />
        </div>
    );
}

export default App;
