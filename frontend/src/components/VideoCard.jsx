import { Link } from "react-router-dom"
import "./VideoCard.css"

function VideoCard({video}){

    const formatDuration = (seconds) => {
        if(!seconds){
            return "0:00";
        }

        const mins = Math.floor(seconds/60);
        const secs = Math.floor(seconds%60)

        return `${mins}:${secs.toString().padStart(2,"0")}`;
    };

    const formatViews = (views) => {
        if(!views){
            return "0 views";
        }

        if(views >= 1000000){
            return `${(views/1000000).toFixed(1)}M views`
        }
        if(views >= 1000){
            return `${(views/1000).toFixed(1)}K views`
        }

        return `${views}views`;
    };

    const getTimeAgo = (date) => {
        if(!date) return "";

        const seconds = Math.floor((new Date() - new Date(date))/1000);
        if(seconds<60)return "just now";

        const minutes = Math.floor(seconds/60);
        if(minutes< 60)return `${minutes} minutes ago`; 

        const hours = Math.floor(minutes/60);
        if(hours < 24)return `${hours} hours ago`; 

        const days = Math.floor(hours/24);
        if(days < 30)return `${days} days ago`; 

        const months = Math.floor(days/30);
        if(months < 12)return `${months} months ago`; 

        const years = Math.floor(months/12);
        return `${years} years ago`; 
    };


    return (
        <Link to={`/watch/${video._id}`} className="video-card">
            <div className="video-thumbnail-container">
                <img 
                src={video.thumbnail}
                alt={video.title}
                className="ideo-thumbnail"
                />
                <span className="video-duration">
                    {formatDuration(video.duration)}
                </span>
            </div>

            <div className="video-info">
                <div className="video-avatar">

                    {video.owner?.fullName?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="video-details">
                    <h2 className="video-title">{video.title}</h2>

                    <p className="video-channel">
                        {VideoCard.owner?.fullName || "Unknown Channel"}
                    </p>

                    <p className="video-meta">
                        {formatViews(video.views)}
                        <span>•</span>

                        {getTimeAgo(video.createdAt)}
                    </p>
                </div>
            </div>

        </Link>
    );
}


export default VideoCard;