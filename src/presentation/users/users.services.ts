import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { User } from "../../data";
import { CustomError, UserCreateUserDto, UserLoginDto, UserUpdateDto } from "../../domain";
import { EmailService } from "./email.service";

enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'   
};

export class UserServices {
    constructor(
        private readonly emailServices : EmailService
    ){};
    
    async create(userData : UserCreateUserDto) {
        const user = new User();

        user.email =  userData.email.toLowerCase().trim();
        user.name =  userData.name.toLowerCase().trim();
        user.password =userData.password;

        if(user.role) {
            user.role = userData.role.toUpperCase().trim();
        };

        return await User.findOne({
            where : {
                email : user.email,
                status :  Status.ACTIVE,
            }
        })
            .then(repetEmail => {
                if (repetEmail) {
                    return Promise.reject(CustomError.badRequest("Email already registered."));
                };
                return user.save(); 
            })
            .then( user=> this.sendEmailValdationLink(user.email)
            .then(()=> user))
            .then(user => JwtAdapter.generateToken({id :user.id})
            .then(token=>{
                if(!token){
                    return Promise.reject(CustomError.internalServer("Error While Creating JWT"));
                };
                return {token, user};
            }))
            .catch(error => {
                    return Promise.reject(error);
            });
    };

    async loginUser(loginData:UserLoginDto) {

        const user  =  await User.findOne({
            where :  {
                email : loginData.email,
                status : Status.ACTIVE,
                emailValidate  : true,
            }
        })  
        if(!user) throw CustomError.unAuthorized("Invalid credentials11");


            const isMatching =  bcryptAdapter.compare(loginData.password, user.password);
          
            
            if( !isMatching ) throw CustomError.unAuthorized("Invalid credentials password");
            
            const token = await JwtAdapter.generateToken({ id: user.id });
            if( !token ) throw CustomError.internalServer('Error while creating JWT');

            return {
                token :  token,
                user :{
                    id :  user.id,
                    name :  user.name,
                    email :  user.email,
                    role : user.role
                }
        };
        
    };

    public sendEmailValdationLink = async (email:string)=>{

        const token  = await JwtAdapter.generateToken({email});

        if(!token) throw CustomError.internalServer("Error gatting token");

        const link = `${envs.WEBSERVICES_URL}/validate-email/${token}`;

        const html = `
            <h1>Validate you email</h1>
            <p> Click on the follwing to validate your email </p>
            <a href=${link}> Validate your emial ${email}</a>
        `;

        const isSent = this.emailServices.sendEmail({
            to :  email,
            subject : "Validate your email", 
            htmlBody :  html
        });
        
        if(!isSent) throw CustomError.internalServer("Erro sending emial");

        return true;
    };
    
    
    public validateEmail = async(token: string)=>{
        await  JwtAdapter.validateToken<{email:string}>(token)
            .then(decodeToken => {
                if(!decodeToken) return Promise.reject(CustomError.unAuthorized("Token no autorizado"));

                const {email} = decodeToken as {email : string}; 

                if(!email) return Promise.reject(CustomError.internalServer("Email not in token"));

                return User.findOne({
                    where : {
                        email
                    }
                });  
            })
            .then(user => {
                if(!user) return Promise.reject(CustomError.internalServer("Email not exists"));
                user.emailValidate = true;
                 user.save();
                 return true
            })

            .catch(error => {
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
        });

        if (!user) {
            throw CustomError.notFound(`User with id ${id} not found`);
        };

        return user;
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


        return await user?.save()
            .then(user => user)
            .catch(err => Promise.reject(err));
    };

};