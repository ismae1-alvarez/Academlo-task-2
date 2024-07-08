import { regularExps } from "../../../config";

export class UserCreateUserDto {
    constructor(
        public readonly name : string,
        public readonly email : string,
        public readonly password: string,
        public readonly role : string,
    ){};



    static create(object : {[key : string] : any}) : [string?, UserCreateUserDto?]{
        const {name, email, password, role} =  object;
        
        if(!name) return ["Missing name", undefined];
        if(!email) return ["Missing email", undefined];
        if(!password) return ["Missing password", undefined];
        
        if(role) {
            if(!role) return ["Missing role", undefined];
        }
        
        if(!regularExps.email.test(email)) return ['Invalid email'];
        if(!regularExps.password.test(password)) return ['The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'];




        return [undefined,new UserCreateUserDto(name, email, password, role)];
    };
};