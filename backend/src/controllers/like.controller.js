import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";




const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Id of video is not valid");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(400, "Video is not available");
    }

    const isLiked = await Like.findOne({
        video: videoId,
        likedBy: req.user._id,
    });

    if (isLiked) {
        await Like.findByIdAndDelete(isLiked._id);
        return res.status(200).json(
            new ApiResponse(200, { liked: false }, "Video unliked successfully")
        );
    }

    await Like.create({
        video: videoId,
        likedBy: req.user._id,
    });

    return res.status(200).json(
        new ApiResponse(200, { liked: true }, "Video liked successfully")
    );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Comment Id not found");
    }

    const isLiked = await Like.findOne({
        comment: commentId,
        likedBy: req.user._id,
    });

    if (isLiked) {
        await Like.findByIdAndDelete(isLiked._id);
        return res.status(200).json(
            new ApiResponse(200, { liked: false }, "Comment unliked successfully")
        );
    }

    await Like.create({
        comment: commentId,
        likedBy: req.user._id,
    });

    return res.status(200).json(
        new ApiResponse(200, { liked: true }, "Comment liked successfully")
    );
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Tweet Id not found");
    }

    const isLiked = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user._id,
    });

    if (isLiked) {
        await Like.findByIdAndDelete(isLiked._id);
        return res.status(200).json(
            new ApiResponse(200, { liked: false }, "Tweet unliked successfully")
        );
    }

    await Like.create({
        tweet: tweetId,
        likedBy: req.user._id,
    });

    return res.status(200).json(
        new ApiResponse(200, { liked: true }, "Tweet liked successfully")
    );
});

const getLikedVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const likes = [
        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(req.user._id),
                video: { $ne: null },
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "videoDetails",
            },
        },
        {
            $unwind: "$videoDetails",
        },
        {
            $lookup: {
                from: "users",
                localField: "videoDetails.owner",
                foreignField: "_id",
                as: "videoOwner",
            },
        },
        {
            $unwind: "$videoOwner",
        },
        {
            $project: {
                _id: 1,
                createdAt: 1,
                video: 1,
                videoDetails: 1,
                videoOwner: {
                    _id: 1,
                    username: 1,
                    fullName: 1,
                    avatar: 1,
                },
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
    ];

    const result = await Like.aggregatePaginate(likes, {
        page: Number(page),
        limit: Number(limit),
    });

    return res.status(200).json(
        new ApiResponse(200, result, "Liked Videos Fetched Successfully")
    );
});

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos,
};