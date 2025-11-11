import sessionsRepository from "./sessionsRepository.js";
import AppError from "../../helpers/appError.js";
import redisClient from "../../config/cache/redisClient.js";


const findSessionActive = async (id_user,accessToken) =>{

    const activeSession = await sessionsRepository.findSessionsActive(id_user);
    if(!activeSession){
        throw new AppError("active Session not found",404)
    }
    
  const sessions = activeSession.map((session,) => (
        {
            id:session.id,
            device:session.device,
            ip_address:session.ip_address,
            user_agent:{
                os:session.user_agent.os,
                browser:session.user_agent.browser,
                version:session.user_agent.version,
                platform:session.user_agent.platform,
                source:session.user_agent.source
            },
            this_session:session.access_token === accessToken
            
        }
    ))

    return{
        sessions:sessions
    }
    
}

const logOutUser = async (idSession) => {

    const session = await sessionsRepository.findSessionById(idSession);
    if(!session){
        throw AppError('invalid session id', 404)
    }
    const accessToken = session.access_token;
    const now = new Date();
    const dataToUpdate ={
        is_revoked: true,
        deleted_at:now,
    }
    await sessionsRepository.updateSession(idSession,dataToUpdate)
    const ttl = 25 * 60 * 60; // 25 hours in seconds
    await redisClient.set(`blacklist_access_token:${accessToken}`, 'revoked', 'EX', ttl);
    return {
        message: 'Logged out session successfully'
    }
   
}

export default {findSessionActive,logOutUser}