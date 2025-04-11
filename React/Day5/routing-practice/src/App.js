import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="home" element={<Home />} />
                <Route path="signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
