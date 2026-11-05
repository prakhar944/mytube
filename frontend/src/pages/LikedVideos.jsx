import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import "./LikedVideos.css";

function LikedVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchLikedVideos = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("accessToken");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/likes/videos`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data?.data;

            const likedItems = data?.docs || data || [];

            const formattedVideos = likedItems.map((item) => ({
                ...item.videoDetails,
                _id: item.video, 
                owner: item.videoOwner,
            }));

            setVideos(formattedVideos);        } 
            catch (error) {
            console.error("Error fetching liked videos:", error);
            setError(
                error.response?.data?.message ||
                "Unable to fetch liked videos."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLikedVideos();
    }, []);

    return (
        <div className="liked-videos-page">
            <div className="liked-videos-header">
                <div>
                    <h1>Liked Videos</h1>
                    <p>Videos you have liked</p>
                </div>

                <span className="liked-count">
                    {videos.length} Videos
                </span>
            </div>

            {loading ? (
                <div className="liked-message">
                    Loading your liked videos...
                </div>
            ) : error ? (
                <div className="liked-message error">
                    <p>{error}</p>
                    <button onClick={fetchLikedVideos}>
                        Try Again
                    </button>
                </div>
            ) : videos.length === 0 ? (
                <div className="liked-empty">
                    <h2>No liked videos yet</h2>
                    <p>Videos you like will appear here.</p>
                </div>
            ) : (
                <div className="liked-videos-grid">
                    {videos.map((video) => (
                        <VideoCard
                            key={video._id}
                            video={video}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default LikedVideos;