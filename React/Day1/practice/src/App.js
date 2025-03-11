import logo from "./logo.svg";
import "./App.css";
import Profile from "./components/profile/profile";

const person = {
    firstName: "Prakhar",
    lastName: "Goyal",
    age: 23,
    occupation: "Software Developer",
};

const person2 = {
    firstName: "Prakhar",
    lastName: "Goyal",
    age: 23,
    occupation: "Software Developer",
};

function helloWorld(params) {
    return alert("Hello World");
}
function Namaste(params) {
    return alert("Namaste");
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Profile
                    person={person}
                    email={"prakhargoyal@gmail.com"}
                    onClick={helloWorld}
                />
                <Profile
                    person={person2}
                    email={"prakhar@gmail.com"}
                    onClick={Namaste}
                />
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
