import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard.jsx";  
import "./Home.css";


function Home(){
    
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchVideos = async () => {
        try {
            setLoading(true);
            setError("")

            const response = await axios.get(`${import.meta.enx.VITE_APP_URL}/videos/`)

            const videoData = response.data?.data?.docs || response.data?.data || [];

            setVideos(videoData);

        } catch (error) {
            console.log("Error Fetching Videos ", error);
            setError("Failed to Load Videos ")
        }finally{
            setLoading(false);
        }
    };

    useEffect( () => {
        fetchVideos()
    }, []);

    if(loading){
        return (
            <div className="home-page">
                <div className="video-grid">
                    {[1,2,3,4,5,6].map((item) => (
                        <div className="video-skeleton" key={item} >
                            <div className="skeleton-thumbnail"></div>
                                <div className="skeleton-info">
                                    <div className="skeleton-avatar"></div>

                                    <div className="skeleton-text">
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>

                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if(error){
        return(
            <div className="home-page">
                <div className="home-message">
                <h2> Something Went Wrong </h2>
                <p>{error}</p>

                <button onClick={fetchVideos}> Try Again </button>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page">
            <div className="video-grid">
                {videos.length > 0 ? (videos.map((video) =>(
                    < VideoCard
                    key={video._id}
                    video={video}
                    />
                ) ) 
             ): (
                <div className="home-message">
                    <h2> NO Videos Found </h2>
                    <p> Upload a Video to see here </p>
                </div>
             ) }
            </div>
        </div>
    );

}

export default Home;