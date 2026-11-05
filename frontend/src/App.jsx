import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import WatchVideo from "./pages/WatchVideo.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/watch/:videoId" element={<WatchVideo />} />
                <Route path="/liked-videos" element={<LikedVideos />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;