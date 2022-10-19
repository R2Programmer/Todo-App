import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date: string;

    @Column()
    completed: boolean;

    @ManyToOne(() => User, (user)=> user.todos)
    user : User;
}
