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

        
        if(!regularExps.email.test(email)) return ['Invalid email'];
        if(!regularExps.password.test(password)) return ['The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'];




        return [undefined,new UserLoginDto(email, password)];
    };
};