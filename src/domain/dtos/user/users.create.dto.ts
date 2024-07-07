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
        // if(!role) return ["Missing role", undefined];

        return [undefined,new UserCreateUserDto(name, email, password, role)];
    };
};