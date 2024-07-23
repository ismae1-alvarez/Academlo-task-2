import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users.model";

enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED" 
};

@Entity()
export class Repairs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id :  number;
    
    @Column()
    user_id : number;

    @Column({
        type : "varchar",
        length  : 60,
        nullable :  false, 
    })
    date :  Date | string;

    @Column({
        type :"varchar",
        length : 60,
        nullable : false,
        unique: true
    })
    motor_number :string;

    @Column({
        type :"varchar",
        length : 200,
        nullable : false
    })
    description: string;


    @Column({
        type  :"enum",
        enum : Status,
        default :Status.PENDING
    })
    status :  Status | string;

    @ManyToMany(()=> User,(user)=> user.repairs)
    user : User;


    @CreateDateColumn()
    create_at : Date;

    @UpdateDateColumn()
    update_at : Date;
};