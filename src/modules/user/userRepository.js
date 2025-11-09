import prisma from "../../config/db/prismaClient.js";

const findUser = async(whereClause, options = {}) =>{
    const { multiple = false } = options;

    if(multiple){
        return await prisma.users.findMany({
            where: whereClause
        })
    }

    return await prisma.users.findFirst({
        where: whereClause
    })
}

export default { findUser }