import prisma from "../../config/db/prismaClient.js";

const findUser = async (whereClause) => {
    return await prisma.users.findFirst({
        where: whereClause
    });

}

const createUser = async (data) => (await prisma.users.create({data}))

const findSessions = async (whereClause) => {
    return await prisma.sessions.findFirst({
        where: whereClause
    });
}

const createSession = async (data) => (await prisma.sessions.create({data}))

const updateSession = async (id, dataToUpdate) => {
    return await prisma.sessions.update({
        where: {id: id},
        data: dataToUpdate
    });
}


export default{findUser,createUser,createSession,updateSession,findSessions}
