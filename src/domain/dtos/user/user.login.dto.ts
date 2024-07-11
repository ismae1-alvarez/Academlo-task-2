import { regularExps } from "../../../config";

export class UserLoginDto {
    constructor(
        public readonly email : string,
        public readonly password: string,
    ){};



    static login(object : {[key : string] : any}) : [string?, UserLoginDto?]{
        const { email, password} =  object;
        
        if(!email) return ["Missing email", undefined];
        if(!password) return ["Missing password", undefined];

        return [undefined,new UserLoginDto(email, password)];
    };
};