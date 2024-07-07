export class UserUpdateDto{
    constructor(
        public readonly name : string,
        public readonly email : string,
        public readonly role : string
    ){};

    static update(object : {[key:string] : any}):[string?, UserUpdateDto?]{
        const {name, email, role} =  object;    

        if(!name) return ["Missing name", undefined];
        if(!role) return ["Missing role", undefined];
        if(role !== "CLIENT" && role !== "EMPLOYEE") return["CLIENT or EMPLOYEE", undefined];

        return [undefined, new UserUpdateDto(name, email, role)]
    };
};