import prisma from "../../config/db/prismaClient.js";

const findUser = async (whereClause) => {
    return await prisma.users.findFirst({
        where: whereClause
    });

}

const createUser = async (data) => (await prisma.users.create({data}))


export default{findUser,createUser}
