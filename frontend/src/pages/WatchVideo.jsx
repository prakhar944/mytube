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

    const [subscribed, setSubscribed] = useState(false);
    const [subscribeLoading, setSubscribeLoading] = useState(false);

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");




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



    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("accessToken");
      
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comments/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        setComments(
          response.data?.data?.docs ||
          response.data?.data ||
          []
        );
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const handleAddComment = async (e) => {
      e.preventDefault();

      if (!commentText.trim()) return;

      try {
        setCommentLoading(true);
      
        const token = localStorage.getItem("accessToken");
      
        await axios.post(
          `${import.meta.env.VITE_API_URL}/comments/${videoId}`,
          {
            content: commentText,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        setCommentText("");
      
        await fetchComments();
      } catch (error) {
        console.error("Error adding comment:", error);
      } finally {
        setCommentLoading(false);
      }
    };

    const handleEditStart = (comment) => {
  setEditingCommentId(comment._id);
  setEditCommentText(comment.content);
    };

    const handleUpdateComment = async (commentId) => {
  try {
    const token = localStorage.getItem("accessToken");

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/comments/c/${commentId}`,
      {
        content: editCommentText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEditingCommentId(null);
    setEditCommentText("");

    await fetchComments();
  } catch (error) {
    console.error("Error updating comment:", error);
  }
    };

    const handleDeleteComment = async (commentId) => {
  try {
    const token = localStorage.getItem("accessToken");

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/comments/c/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await fetchComments();
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
    };






    const handleSubscribe = async () => {
      try {
        setSubscribeLoading(true);

        const token = localStorage.getItem("accessToken");

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/subscriptions/channel/${video.owner._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Subscription response:", response.data);

        setSubscribed((prev) => !prev);
      } catch (error) {
        console.error(
          "Error toggling subscription:",
          error.response?.data || error
        );
      } finally {
        setSubscribeLoading(false);
      }
    };




        useEffect(() => {
      fetchVideo();
      fetchComments();
          }, [videoId]);

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
                        <button
                          className={`subscribe-button ${
                            subscribed ? "subscribed" : ""
                          }`}
                          onClick={handleSubscribe}
                          disabled={subscribeLoading}
                        >
                          <Bell size={18} />
                      
                          {subscribeLoading
                            ? "Loading..."
                            : subscribed
                            ? "Subscribed"
                            : "Subscribe"}
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

                      <div className="comments-section">
          <h2>Comments</h2>

          <form
            className="comment-form"
            onSubmit={handleAddComment}
          >
            <input
              type="text"
              value={commentText}
              onChange={(e) =>
                setCommentText(e.target.value)
              }
              placeholder="Add a comment..."
            />

            <button
              type="submit"
              disabled={
                commentLoading || !commentText.trim()
              }
            >
              {commentLoading ? "Posting..." : "Comment"}
            </button>
          </form>
            
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
  <div
    className="comment-card"
    key={comment._id}
  >
    <div className="comment-avatar">
      {comment.owner?.fullName
        ?.charAt(0)
        ?.toUpperCase() || "U"}
    </div>

    <div className="comment-content">
      <h4>
        {comment.owner?.fullName || "User"}
      </h4>

      {editingCommentId === comment._id ? (
        <div className="comment-edit-area">
          <input
            type="text"
            value={editCommentText}
            onChange={(e) =>
              setEditCommentText(e.target.value)
            }
          />

          <div className="comment-edit-buttons">
            <button
              onClick={() =>
                handleUpdateComment(comment._id)
              }
            >
              Save
            </button>

            <button
              onClick={() => {
                setEditingCommentId(null);
                setEditCommentText("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>{comment.content}</p>

          <div className="comment-actions">
            <button
              onClick={() =>
                handleEditStart(comment)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDeleteComment(comment._id)
              }
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  </div>
))
    ) : (
      <p className="no-comments">
        No comments yet.
      </p>
    )}
  </div>
                    </div>
            </div>
        </div>
    );

}

export default WatchVideo