import {v4 as uuidV4} from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

import AppError from '../../helpers/appError.js';
import repository from './authRepository.js';
import redisClient from '../../config/cache/redisClient.js';


const registerUser = async (data) => {

    const id = uuidV4();
    const {
        username,
        password
    } = data;
    
   const whereClause = {
        username:username
    }
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const existingUser = await repository.findUser(whereClause);
    if (existingUser){
        throw  new AppError('username already taken', 409);
    }
    const date = new Date();
    const saveData = {
        id,
        username,
        password:hashedPassword,
        created_at:date
    }
    const user = await repository.createUser(saveData);
    return {
        "username":user.username
    }

}

const loginUser = async (data, ua, ipAddress) => {
    const {
        username,
        password
    } = data;

    const whereClause = {
        username:username
    }
    const user = await repository.findUser(whereClause);
    if (!user){
        throw  new AppError('User not found', 404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
        throw  new AppError('Invalid password', 401);
    }
    if(user.deleted_at){
        throw  new AppError('User account is deleted', 403);
    }
    const accessToken = jwt.sign(
        {id:user.id, username:user.username},
        process.env.JWT_SECRET_TOKEN,
        {expiresIn:process.env.JWT_VALIDITY}
    )
    const id = uuidV4();
    const refreshToken = uuidV4();
    const now = new Date();
    const refreshTokenExpiry = new Date(
        now.getTime() + 30*24*60*60*1000
    );
 
    const device = ua.isMobile
    ? "Mobile"
    : ua.isTablet
    ? "Tablet"
    : ua.isDesktop
    ? "Desktop"
    : "unknown";

    const user_agent={
        browser: ua.browser,
        version: ua.version,
        os: ua.os,
        platform: ua.platform,
        source: ua.source
    };
    const ip_address = ipAddress;

    const SessionData = {
        id,
        id_user: user.id,
        refresh_token: refreshToken,
        device,
        user_agent,
        refresh_token_exp: refreshTokenExpiry,
        is_revoked: false,
        access_token: accessToken,
        ip_address,
        created_at: now
    }
    await repository.createSession(SessionData);

    return {
        success:true,
        id_user:user.id,
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: "Bearer",
        expires_in: process.env.JWT_VALIDITY
    }



}

const logOutUser = async (userId, accessToken) => {
 
   const whereClause = {
       access_token: accessToken,
    }
    const sessions = await repository.findSessions(whereClause);
    if (!sessions || sessions.length === 0){
        throw new AppError('No active sessions found', 404);
    }
    const now = new Date();
    const dataToUpdate ={
        is_revoked: true,
        deleted_at: now,
    }
    await repository.updateSession(sessions.id,dataToUpdate);

    const ttl = 25 * 60 * 60; // 25 hours in seconds
    await redisClient.set(`blacklist_access_token:${accessToken}`, 'revoked', 'EX', ttl);
    return {
        success:true,
        message: 'Logged out successfully'
    }
   
}

const getNewAccessToken = async (refreshToken) => {
    const whereClause = {
        refresh_token: refreshToken
    }
    const dateNow = new Date();
    const findSessions = await repository.findSessions(whereClause);
    if (!findSessions){
        throw new AppError('Session not found', 404);
    }
    if (findSessions.is_revoked){
        throw new AppError('Refresh token is revoked', 401);
    }
    if (findSessions.refresh_token_exp < dateNow){
        throw new AppError('Refresh token is expired', 401);
    }
    const user = await repository.findUser({id: findSessions.id_user});
    if (!user){
        throw new AppError('User not found', 404);
    }

    await redisClient.set(`blacklist_access_token:${findSessions.access_token}`, 'revoked', 'EX', 25*60*60);
    const newAccessToken = jwt.sign(
        {
            id:user.id,
            username:user.username
        },
        process.env.JWT_SECRET_TOKEN,
        {expiresIn:process.env.JWT_VALIDITY}
    )
    const dataToUpdate = {
        access_token: newAccessToken
    }
    await repository.updateSession(findSessions.id, dataToUpdate);
    return {
        access_token: newAccessToken,
        token_type: "Bearer",
        expires_in: process.env.JWT_VALIDITY
    }
}
export default {registerUser,loginUser, logOutUser, getNewAccessToken}