import { v4 as uuiV4 } from "uuid";

import AppError from "../../helpers/appError.js";
import followRepository from "./followRepository.js";

const addFollow = async (userNow, username) => {
  const whereClause = {
    username: username,
  };
  const getUser = await followRepository.generateUser(whereClause);
  if (!getUser) {
    throw new AppError("user not found", 404);
  }
  if (userNow === getUser.id) {
    throw new AppError("you cant follow yourself", 409);
  }
  const existing = await followRepository.existingUser(userNow, getUser.id);
  if (existing) {
    throw new AppError(`you are already following ${username}`, 409);
  }
  const id = uuiV4();
  const date = new Date();
  const dataToSave = {
    id,
    followers_id: userNow,
    following_id: getUser.id,
    created_at: date,
  };
  await followRepository.addFollow(dataToSave);
  return {
    status: `now you are following ${username}`,
  };
};

const unFollow = async (userNow, username) => {
  const whereClause = {
    username: username,
  };
  const getUser = await followRepository.generateUser(whereClause);
  if (!getUser) {
    throw new AppError("user not found", 404);
  }
  const existing = await followRepository.existingUser(userNow, getUser.id);
  if (!existing) {
    throw new AppError(`you are not following ${username}`, 400);
  }
  await followRepository.deleteFollow(existing.id);
  return {
    status: `now you are unFollowing ${username}`,
  };
};


const getFollowingById = async (id) => {
  const whereClause = {
    id: id,
  };
  const checkUser = await followRepository.generateUser(whereClause);
  if (!checkUser) {
    throw new AppError("Not valid id", 404);
  }
  const followings = await followRepository.getFollowingById(id);
  if (!followings) {
    return {
      followings: "no followings yet",
    };
  }
  return {
    total_following: followings.length,
    following: followings.map((f) => ({
      id: f.users_follows_following_idTousers.id,
      username: f.users_follows_following_idTousers.username,
    })),
  };
};

const getFollowersById = async (id) => {
  const whereClause = {
    id: id,
  };
  const checkUser = await followRepository.generateUser(whereClause);
  if (!checkUser) {
    throw new AppError("Not valid id", 404);
  }
  const followers = await followRepository.getFollowersById(id)
  if (!followers) {
    return {
      followers: "no followers yet",
    };
  }
  return {
    total_followers: followers.length,
    followers: followers.map((f) => ({
      id: f.users_follows_followers_idTousers.id,
      username: f.users_follows_followers_idTousers.username,
    })),
  };
};

export default { addFollow, unFollow, getFollowingById,getFollowersById };
