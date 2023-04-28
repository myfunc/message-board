import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateMessage from "./pages/CreateMessage/CreateMessage";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:page?" element={<Home />} />
                <Route path="/create-message" element={<CreateMessage />} />
            </Routes>
        </Router>
    );
};

export default App;
