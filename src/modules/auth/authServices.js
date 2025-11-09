import {v4 as uuidV4} from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import AppError from '../../helpers/appError.js';
import repository from './authRepository.js';


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

export default {registerUser}