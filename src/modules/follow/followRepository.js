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
                select:{
                    followers_id:true,
                    users_follows_followers_idTousers:{
                        select:{
                            id:true,
                            username:true
                        }
                    }
                }
            },
            follows_follows_following_idTousers:{
                select:{
                    following_id:true,
                    users_follows_following_idTousers:{
                        select:{
                            id:true,
                            username:true
                        }
                    }
                }
            }
        }
    })
}
