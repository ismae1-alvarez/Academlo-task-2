export class RepairsCreateDto{
    constructor(
        public readonly user_id : number,
        public readonly date :  string
    ){};


    static create(object : {[key:string] : any}): [string?, RepairsCreateDto?]{
        const {user_id, date} = object;

        if(!user_id) return ["Missing id", undefined];
        if(isNaN(+user_id)) return ["el Id debes ser un numero", undefined];
        if(!date) return ["Missing date", undefined];
        
        return [ undefined, new RepairsCreateDto( user_id, date)];
    };
};