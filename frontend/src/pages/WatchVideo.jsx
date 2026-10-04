import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThumbsUp, Bell } from "lucide-react";

import "./WatchVideo.css";

function WatchVideo(){
   
    const { videoId } = useParams();
    
    const [ video, setVideo] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState("");

    const [liked, setLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);


    const fetchVideo = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("accessToken")
            

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/videos/${videoId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            setVideo(response.data?.data);
        }
        catch(error) {
            console.error("Error in Fetching Video: ", error);
            setError("Failed to Load Video")
        }finally{
            setLoading(false);
        }
    };

    const handleLike = async () => {
  try {
    setLikeLoading(true);

    const token = localStorage.getItem("accessToken");

    await axios.post(
      `${import.meta.env.VITE_API_URL}/likes/video/${videoId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLiked((prev) => !prev);
  } catch (error) {
    console.error("Error toggling like:", error);
  } finally {
    setLikeLoading(false);
  }
    };   

    useEffect( () => {
        fetchVideo();
        
    }, [videoId] );

    if(loading){
        return (
            <div className="watch-page">
                <div className="watch-message"> Loading Video...</div>
            </div>
        );
    }

    if (error || !video) {
        return (
            <div className="watch-page">
                <div className="watch-message">
                    <h2> Something Went Wrong !! </h2>
                    <p>{error}</p>

                    <button onClick={fetchVideo}> Try Again </button>
                </div>
            </div>
        );
    }

    return (
        <div className="watch-page">
            <div className="watch-container">

                <video 
                className="watch-player"
                src={video.videoFile}
                poster={video.thumbnail}
                controls
                autoPlay
                />

                <h1 className="watch-title"> {video.title} </h1>

                <div className="watch-actions">
                    <div className="watch-channel">
                        <div className="channel-avatar">
                            {video.owner?.fullName?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div>
                            <h3>{video.owner?.fullName || "Unkown Channel"}</h3>

                            <p> @{video.owner?.username || "user"}</p>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="subscribe-button">
                            <Bell size={19} />
                            Subscribe
                        </button>
                        
                <button
                  className={`like-button ${liked ? "liked" : ""}`}
                  onClick={handleLike}
                  disabled={likeLoading}
                    >
                  <ThumbsUp size={18} />

                  {likeLoading
                    ? "Loading..."
                    : liked
                    ? "Liked"
                    : "Like"}
                        </button>
                    </div>
                </div>

                <div className="video-description">
                    <p className="video-views">
                        {video.views || 0} views
                    </p>

                    <p>
                        {video.description || "No description Available"}
                    </p>
                </div>
            </div>
        </div>
    );

}

export default WatchVideo