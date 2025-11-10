import prisma from "../../config/db/prismaClient.js";


const addFollow = async(dataToSave) => {
    return await prisma.follows.create(
        {
            data:dataToSave
        }
    )
}

const deleteFollow = async(id) => {
    return await prisma.follows.delete({
        where: {
            id: id
        }
    })
}

const generateUser = async (whereClause) => {
    return await prisma.users.findUnique({
        where: whereClause
    });
}

const existingUser = async (userNow,targetUser) => {
    return await prisma.follows.findFirst({
        where:{
            followers_id: userNow,
            following_id: targetUser
        }
    })
}
const getFollowingById = async (id) => {
    return await prisma.follows.findMany({
        where: {
            followers_id: id
        },
        select:{
            following_id: true,
            users_follows_following_idTousers:{
                select:{
                    id:true,
                    username:true
                }
            }
        }
        
    });
}

const getFollowersById = async (id) => {
    return await prisma.follows.findMany({
        where: {
           following_id: id
        },
        select:{
            followers_id: true,
            users_follows_followers_idTousers:{
                select:{
                    id:true,
                    username:true
                }
            }
        }
        
    });
}

export default { addFollow, generateUser, existingUser, deleteFollow,getFollowingById,getFollowersById }



























// const findUser = async(whereClause) =>{
//     return await prisma.users.findUnique({
//         where: whereClause,
//         select:{
//             id:true,
//             username:true,
//             _count:{
//                 select:{
//                     follows_follows_followers_idTousers: true,
//                     follows_follows_following_idTousers: true
//                 }
//             },
//             follows_follows_followers_idTousers:{
//                 select:{
//                     followers_id:true,
//                     users_follows_followers_idTousers:{
//                         select:{
//                             id:true,
//                             username:true
//                         }
//                     }
//                 }
//             },
//             follows_follows_following_idTousers:{
//                 select:{
//                     following_id:true,
//                     users_follows_following_idTousers:{
//                         select:{
//                             id:true,
//                             username:true
//                         }
//                     }
//                 }
//             }
//         }
//     })
// }
