import { v4 as uuidV4 } from "uuid";
import feedRepository from "./feedRepository.js";
import AppError from "../../helpers/appError.js";


const createFeed = async (userId, content) => {
  const dateNow = new Date();
  const id = uuidV4();
  const dataToSave = {
    id,
    user_id: userId,
    content: content,
    created_at: dateNow,
  };
  const feed = await feedRepository.saveFeed(dataToSave);
  return {
    content: feed.content,
    created_at: feed.created_at,
  };
};

const getFeedById = async (id) => {
  const getFeed = await feedRepository.searchFeedById(id);
  if (!getFeed) {
    throw new AppError("posts not found", 404);
  }
  return {
    total_posts_content: getFeed.length,
    posts: getFeed.map((g) => ({
      owned_post: g.users.username,
      content_id: g.id,
      content: g.content,
      create_post: g.created_at,
    })),
  };
};

const getMainFeed = async (userId, page, limit) => {
  const currentPage = Math.max(parseInt(page), 1);
  const following = await feedRepository.getFollowingUser(userId);
  if (following.length === 0) {
    return {
      data: {
        posts:"feeds not found"
      },
      pagination: {
        current_page: currentPage,
        limit: limit,
        total_posts: 0,
        total_pages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }

  const followingUser = following.map((f) => f.following_id);

  const { feeds, totalCount } = await feedRepository.getMainFeeds(
    followingUser,
    currentPage,limit
  );

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data:{
      posts:feeds
    },
    pagination: {
      current_page: currentPage,
      limit: limit,
      total_posts: totalCount,
      total_pages: totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
};

export default { createFeed, getFeedById, getMainFeed };
