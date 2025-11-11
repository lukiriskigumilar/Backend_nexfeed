import prisma from "../../config/db/prismaClient.js";

const findSessionsActive = async (id_user) =>{
   return await prisma.sessions.findMany({
        where:{
            id_user:id_user,
            is_revoked:false,
            refresh_token_exp:{
                gt:new Date(),
            },
        },
    })
}

const findSessionById = async (idSession) => {
    return await prisma.sessions.findUnique({
        where:{
            id:idSession
        }
    })
}

const updateSession = async (id, dataToUpdate) => {
    return await prisma.sessions.update({
        where: {id: id},
        data: dataToUpdate
    });
}

export default{findSessionsActive,updateSession, findSessionById}