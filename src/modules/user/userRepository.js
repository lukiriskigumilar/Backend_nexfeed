import prisma from "../../config/db/prismaClient.js";

const findUser = async(whereClause) =>{
    return await prisma.users.findUnique({
        where: whereClause,
        select:{
            id:true,
            username:true,
            _count:{
                select:{
                    follows_follows_followers_idTousers: true,
                    follows_follows_following_idTousers: true
                }
            },
            follows_follows_followers_idTousers:{
                select:{following_id:true}
            },
            follows_follows_following_idTousers:{
                select:{followers_id:true}
            }
        }
    })
}

export default { findUser }