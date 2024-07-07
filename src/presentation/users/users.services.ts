import { User } from "../../data";
import { UserCreateUserDto, UserUpdateDto } from "../../domain";

enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'   
};

export class UserServices {
    constructor(){};

    async create(userData : UserCreateUserDto) {
        const user = new User();

        user.email =  userData.email.toLowerCase().trim();
        user.name =  userData.name.toLowerCase().trim();
        user.password = userData.password;
        // user.role = userData.role.toUpperCase().trim();

        return await User.findOne({
            where : {
                email : user.email
            }
        })
            .then(repetEmail => {
                if (repetEmail) {
                    return Promise.reject(new Error("Email already registered."));
                };
                return user.save();
            })
            .then(user => user)
            .catch(error => {
                    console.error('Error saving user:', error);
                    return Promise.reject(error);
            });
    };

    async findAllUsers(){
        return await User.find({
            where: {
                status: Status.ACTIVE
            }
        })
            .then(inactiveUsers => {
                return inactiveUsers;
            })
            .catch(error => {
                return Promise.reject(error); 
            });
    };

    async findUserById (id:number){
        const user =  await User.findOne({
            where :{
                id, 
                status :  Status.ACTIVE
            }
             
        })

        if(!id){
           throw Error(`videogame with id ${id} not found`)
        }
       return user
    };

    async updateUserById (id:number, userData:UserUpdateDto) {
        const user = await this.findUserById(id);

        user!.name =  userData.name.toLowerCase().trim();
        user!.email =  userData.email.toLowerCase().trim();
        user!.role =  userData.role.trim();

        return await user?.save()
            .then(user => user)
            .catch(erro => Promise.reject(erro));
    };


    async deleteUserById(id:number){
        const user =  await this.findUserById(id);

        user!.status =  Status.INACTIVE;

        console.log(user?.status)

        return await user?.save()
            .then(user => user)
            .catch(err => Promise.reject(err));
    };

};