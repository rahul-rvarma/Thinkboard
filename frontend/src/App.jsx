import { Routes } from "react-router";
import {Homepage} from "./pages/homepage.jsx";
import {Createpage} from "./pages/createpage.jsx";
import {Notedetailpage} from "./pages/notedetailpage.jsx";
import { Route } from "react-router";

const App = () => {
    return <div>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/create" element={<Createpage />} />
            <Route path="/note/:id" element={<Notedetailpage />} />
        </Routes>
    </div>
}
export default App;
