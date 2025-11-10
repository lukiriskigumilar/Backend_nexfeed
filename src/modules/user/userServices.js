
import repository from './userRepository.js'
import AppError from '../../helpers/appError.js';
import prisma from '../../config/db/prismaClient.js';

// function helpers
function checkFollowing(result,userNow){
    let isFollowing = false;
    let isFollowed = false;
    let currentUser = false;

    if(userNow === result.id){
        return { currentUser:true };
    }else{
        for(const follow of result.follows_follows_following_idTousers){
        if(follow.followers_id === userNow){
            isFollowing = true;
        }
    }

    for(const follow of result.follows_follows_followers_idTousers){
        if(follow.following_id === userNow){
            isFollowed = true;
        }
    }
    }

    return { isFollowing, isFollowed, currentUser };
}

//service 

const getById = async (id,userNow) => {
   const whereClause = {
        id: id
    }
   const user = await repository.findUser(whereClause);
    if(!user){
        throw new AppError('user not found', 404);
    }
    const { isFollowing, isFollowed, currentUser } = checkFollowing(user, userNow);

  const result = {
        id : user.id,
        username: user.username,
        total_following: user._count.follows_follows_followers_idTousers,
        total_followers: user._count.follows_follows_following_idTousers,
        currentUser
   };

   if(!currentUser){
    result.isFollowing = isFollowing,
    result.isFollowed = isFollowed
   }
   return result;
}

const searchByUsername = async(username,userNow) => {
    const whereClause = {
        username: username
    }
    const result = await repository.findUser(whereClause);
    if(!result){
        throw new AppError('user not found', 404);
    }

    const { isFollowing, isFollowed, currentUser } = checkFollowing(result,userNow)
   const response = {
        id: result.id,
        username: result.username,
        total_following: result._count.follows_follows_followers_idTousers,
        total_followers: result._count.follows_follows_following_idTousers,
        currentUser
    }
    if(!currentUser){
       response.isFollowing = isFollowing,
       response.isFollowed = isFollowed
    }
    return response;
}

const currentUser = async (userNow) =>{
    const whereClause = {
        id:userNow
    }
    const currentUser = await repository.findUser(whereClause);
    if(!currentUser){
        throw new AppError("current user not found",404)
    }
    return {
        id:currentUser.id,
        username:currentUser.username,
        total_following:currentUser._count.follows_follows_followers_idTousers,
        total_followers:currentUser._count.follows_follows_following_idTousers
    }
}

export default {getById, searchByUsername,currentUser}