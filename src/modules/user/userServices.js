
import repository from './userRepository.js'
import AppError from '../../helpers/appError.js';

const getById = async (id) => {
   const user = await repository.findUser(id);
    if(!user){
        throw new AppError('user not found', 404);
    }

   return{
        id : user.id,
        username: user.username
   }
}

const searchByUsername = async(username) => {
    const whereClause = {
        username: {
            contains: username,
            mode: 'insensitive'
        }
    }
    const result = await repository.findUser(whereClause, {multiple:true});
    return{
       dataFound: result.length ,
       users: result.map(user => ({
           id: user.id,
           username: user.username
       }))
   }
}

export default {getById, searchByUsername}