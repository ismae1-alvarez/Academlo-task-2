import {hashSync, genSaltSync} from "bcrypt";

export const bcryptAdapter = {

    hash : (password: string)=>{
        const salt = genSaltSync(12);
        return hashSync(password, salt);
    }
};